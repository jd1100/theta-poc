package main

import (
	"bytes"
	"encoding/json"
	"flag"
	"fmt"
	"html/template"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"strings"
	"sync"
	"time"
	//"mime/multipart"
	"git.mills.io/prologic/bitcask"
	"github.com/alexedwards/scs/v2"
	"github.com/gorilla/mux"
	"golang.org/x/crypto/bcrypt"
	"github.com/google/uuid"
	"encoding/base64"
	//"github.com/timshannon/badgerhold/v4"
	"github.com/dgraph-io/badger/v3"
	//"regexp"
)

type User struct {
	Username string //`json:"username"`
	Email string //`json:"email"`
	Password string //`json:"password"`
	ID string //`json:"password"`
	Videos []Video 
}

type UploadedVideo struct {
	Username string `json:"username"`
	VideoName string `json:"videoName"`
	FileName string `json:"fileName"`
	Thumbnail string `json:"thumbnail"`
	Video Video `json: video`
}

type ServerInfo struct {
	IP string
	Port string
}
type PreSignedURLResponse struct {
	Status string `json:"status"`
	Body   struct {
		Uploads []struct {
			ID                     string    `json:"id"`
			ServiceAccountID       string    `json:"service_account_id"`
			PresignedURL           string    `json:"presigned_url"`
			PresignedURLExpiration string    `json:"presigned_url_expiration"`
			PresignedURLExpired    bool      `json:"presigned_url_expired"`
			CreateTime             time.Time `json:"create_time"`
			UpdateTime             time.Time `json:"update_time"`
		} `json:"uploads"`
	} `json:"body"`
}

type TranscodeVideoRequestBody struct {
	SourceUploadID string `json:"source_upload_id"`
	PlaybackPolicy string `json:"playback_policy"`
}

type Video struct {
	ID               string      `json:"id"`
	PlaybackURI      string      `json:"playback_uri"`
	CreateTime       time.Time   `json:"create_time"`
	UpdateTime       time.Time   `json:"update_time"`
	ServiceAccountID string      `json:"service_account_id"`
	FileName         string `json:"file_name"`
	State            string      `json:"state"`
	SubState         string      `json:"sub_state"`
	SourceUploadID   string `json:"source_upload_id"`
	SourceURI        string      `json:"source_uri"`
	PlaybackPolicy   string      `json:"playback_policy"`
	Progress         float64     `json:"progress"`
	Error            string `json:"error"`
	Duration         string      `json:"duration"`
	Resolution       interface{} `json:"resolution"`
	Metadata         struct {
	} `json:"metadata"`
}

type TranscodeVideoResponse struct {
	Status string `json:"status"`
	Body   struct {
		Videos []Video `json:"videos"`
	} `json:"body"`
}

//used for svelte
//var testTemplate *template.Template
//

var apiID *string
var apiSecret *string

var uploadedVideos []Video
var wg sync.WaitGroup
var ip* string
var port* string
var defaultIPPort string
var dbPath string
var dbPath2 string
//var options = badgerhold.DefaultOptions
// go-sessions package
//var cookieNameForSessionID = "mycookienamesessionnameid"
//var cookie CookieStruct
//var sess = sessions.New(sessions.Config{Cookie: cookieNameForSessionID})
//var mu sync.WaitGroup
//

//scs session package
var sessionManager *scs.SessionManager

func rootHandler(w http.ResponseWriter, r *http.Request) {
	//query := r.FormValue("searchQuery")
	//source := r.FormValue("mediaSource")
	//p := mediaSearch{searchString: query, mediaSource: source}
	//fmt.Println(p.mediaSource, p.searchString)

	rootTemplate, _ := template.ParseFiles("./templates/home.html")
	if r.Method == "GET" {
		

		// check if user is logged in
		if  sessionManager.Exists(r.Context(), "username") == true {
			username := sessionManager.GetString(r.Context(), "username")
			//fmt.Fprintf(w, username)
			fmt.Println("user:", username, "is logged in!")
			rootTemplate.Execute(w, username)

		} else {
			rootTemplate.Execute(w, nil)
		}
		fmt.Println("new get request")

	} else {
		fmt.Println("post requests not allowed")
	}
}

func videoUploadHandler(w http.ResponseWriter, r *http.Request) {
	var newUploadedVideo UploadedVideo
	//testString := "input string value"
	/*
		fmap := template.FuncMap{
			"getVideoID": waitForVideoID,
		}
		t := template.Must(template.New("upload.html").Funcs(fmap).ParseFiles("./templates/upload.html"))
	*/
	var base64ThumbnailFile string
	videoID := ""
	isError := false
	t, _ := template.ParseFiles("./templates/upload_new.html")
	if sessionManager.Exists(r.Context(), "username") == false {
		fmt.Fprintf(w, "error 404 user not logged in")
		return
	}
	if r.Method == "GET" {
		err := t.Execute(w, nil)
		if err != nil {
			fmt.Println(err)
		}

		fmt.Println("new get request")
	} else if r.Method == "POST" {
		
		//api_key := *apiID
		//api_secret := *apiSecret
		//var videoFile *os.File
		// get videoFile upload from client browser
		fmt.Println("uploading video to theta")
		//fmt.Println()
		//fmt.Println(httputil.DumpRequest(r, true))
		//b, err := io.ReadAll(r.Body)
		//fmt.Println(string(b))
		maxSize := int64(102400000000) // allow only 1GB of videoFile size
		err := r.ParseMultipartForm(maxSize)

		if err != nil {
			fmt.Println(err)
			fmt.Fprintf(w, "Image too large. Max Size: %v", maxSize)
			return
		}

		videoFile, _, err := r.FormFile("videoFile")
		thumbnailFile, _, err := r.FormFile("thumbnailFile")
		buf := bytes.NewBuffer(nil)
		_, err  = io.Copy(buf, thumbnailFile)
		if err != nil {
			fmt.Println(err)
		}
	
		base64ThumbnailFile = base64.StdEncoding.EncodeToString(buf.Bytes())
		//fmt.Println(base64ThumbnailFile)
		if err != nil {
			//fmt.Println(headers)
			log.Println(err)
			fmt.Fprintf(w, "Could not get uploaded videoFile")
			return
		}
		fileName := r.FormValue("fileName")
		videoName := r.FormValue("videoName")

		defer videoFile.Close()

		// end get videoFile upload from client browser

		wg.Add(1)

		go func() {
			defer wg.Done()
			var uploadId string
			var uploadUrl string
			var newVideo Video
			//var progress float64
			//var playbackURI string
			//var state string

			fmt.Println("starting theta upload process")
			api_key := *apiID
			api_secret := *apiSecret
			client := &http.Client{}
			data := url.Values{}

			// submit a post request to theta video api to get a preassignedURL
			// preassignedURL is url for an instance of a video upload
			req, _ := http.NewRequest("POST", "https://api.thetavideoapi.com/upload", strings.NewReader(data.Encode()))
			presignedUrlresponse := PreSignedURLResponse{}
			req.Header.Add("x-tva-sa-id", api_key)
			req.Header.Add("x-tva-sa-secret", api_secret)

			res, err := client.Do(req)
			if err != nil {
				fmt.Println(err)
			}
			defer res.Body.Close()

			body, err := ioutil.ReadAll(res.Body)
			if err != nil {
				fmt.Println(err)
			}
			err = json.Unmarshal(body, &presignedUrlresponse)


			if err != nil {
				fmt.Println(err)
			}
			
			fmt.Println(presignedUrlresponse)
			for index, upload := range presignedUrlresponse.Body.Uploads {
				fmt.Println(index)
				if len(presignedUrlresponse.Body.Uploads) == 1 {
					fmt.Println("number of uploads is 1")
					fmt.Println(upload.PresignedURL, upload.ID)
					uploadUrl = upload.PresignedURL
					uploadId = upload.ID
					break
				}
			}

			fmt.Println(presignedUrlresponse)
			//t.Execute(w, nil)

			// upload video to presigned url
			req, _ = http.NewRequest("PUT", uploadUrl, videoFile)
			fmt.Println("uploading videoFile to preassigned url")
			req.Header.Add("Content-Type", "application/octet-stream")

			res, err = client.Do(req)
			bb, err := io.ReadAll(res.Body)
			if err != nil {
				fmt.Println(err)
			}
			fmt.Println(string(bb))
			defer res.Body.Close()
			//fmt.Println(res)


			// transcode video using an upload
			transcodeVideoBody := &TranscodeVideoRequestBody{
				SourceUploadID: uploadId,
				PlaybackPolicy: "public",
			}

			b, err := json.Marshal(transcodeVideoBody)
			u := bytes.NewReader(b)
			transcodeVideoResponse := TranscodeVideoResponse{}
			req, _ = http.NewRequest("POST", "https://api.thetavideoapi.com/video", u)

			req.Header.Add("x-tva-sa-id", api_key)
			req.Header.Add("x-tva-sa-secret", api_secret)
			req.Header.Add("Content-Type", "application/json")

			res, err = client.Do(req)
			//bb, err = io.ReadAll(res.Body)
			fmt.Println("send request to transcode video upload")
			fmt.Println(string(bb))
			if err != nil {
				fmt.Println(err)
			}
			defer res.Body.Close()

			err = json.NewDecoder(res.Body).Decode(&transcodeVideoResponse)
			transcodeStatus := transcodeVideoResponse.Status
			
			if transcodeStatus == "success" {
				videoID = transcodeVideoResponse.Body.Videos[0].ID
				newVideo = transcodeVideoResponse.Body.Videos[0]
				progress := newVideo.Progress
				playbackURI := newVideo.PlaybackURI
				state := newVideo.State
				fmt.Println(videoID, progress, playbackURI, state) 

			} else {
				fmt.Println("error transcoding video")
				fmt.Fprintf(w, "error transcoding video")
				isError = true
				w.WriteHeader(501)
				//fmt.Fprintf(w, "error transcoding video. Please check the api keys and try again")
				return
			}
			fmt.Fprintf(w, videoID)
			return
		}()
		wg.Wait()
		if isError != false {
			fmt.Println("error transcoding video... exiting ")
			fmt.Fprintf(w, "error transcoding video")
			return
		} else if videoID != "" {
			fmt.Println(videoID)
			fmt.Fprintf(w, videoID)
		} else {
			fmt.Println("error uploading. Video not found")
			fmt.Fprintf(w, "error uploading. Video not found")
		}

		go func() {
			username := sessionManager.GetString(r.Context(), "username")
			fmt.Println(username)
			//defer wg.Done()
			var transcodeVideoResponse2 TranscodeVideoResponse
			var progress2 float64
			var playbackURI2 string
			var state2 string
			var newVideo2 Video

			api_key := *apiID
			api_secret := *apiSecret
			client := &http.Client{}


			req, _ := http.NewRequest("GET", "https://api.thetavideoapi.com/video/"+videoID, nil)

			req.Header.Add("x-tva-sa-id", api_key)
			req.Header.Add("x-tva-sa-secret", api_secret)

			res, err := client.Do(req)
			if err != nil {
				fmt.Println(err)
			}
			defer res.Body.Close()

			body, err := ioutil.ReadAll(res.Body)
			err = json.Unmarshal(body, &transcodeVideoResponse2)

			progress2 = transcodeVideoResponse2.Body.Videos[0].Progress
			playbackURI2 = transcodeVideoResponse2.Body.Videos[0].PlaybackURI
			state2 = transcodeVideoResponse2.Body.Videos[0].State
			for state2 != "success" || state2 != "failed" {
				client := &http.Client{}
				req, _ := http.NewRequest("GET", "https://api.thetavideoapi.com/video/"+videoID, nil)

				req.Header.Add("x-tva-sa-id", api_key)
				req.Header.Add("x-tva-sa-secret", api_secret)

				res, _ := client.Do(req)

				body, _ := ioutil.ReadAll(res.Body)
				err = json.Unmarshal(body, &transcodeVideoResponse2)

				newVideo2 = transcodeVideoResponse2.Body.Videos[0]
				progress2 = newVideo2.Progress
				playbackURI2 = newVideo2.PlaybackURI
				state2 = newVideo2.State
				fmt.Println(progress2)

				if state2 == "success" {
					fmt.Println("video successfully transcoded")
					fmt.Println("video playback url: " + playbackURI2)
					
					//var user User
					//var uploadedVideos []UploadedVideo
					newUploadedVideo = UploadedVideo {
						Username: username,
						VideoName: videoName,
						FileName: fileName,
						Thumbnail: base64ThumbnailFile,
						Video: newVideo2,
					}
					newUploadedVideoJson, _ := json.Marshal(newUploadedVideo)

					// if the uploaded video already exists ignore
					/*
					err = db.FindOne(&uploadedVideoResult, badgerhold.Where(badgerhold.Key).Eq(videoID))
					if err != nil {
						fmt.Println(err)
						fmt.Println("video not found in db")
						return
					}
					db.Insert(videoID, &newUploadedVideo)
					*/
					db, err := badger.Open(badger.DefaultOptions(dbPath2))

					if err != nil {
						fmt.Println(err)
					}
					defer db.Close()


					// if the uploadedVideo object doesnt exist, create it
					err = db.Update(func(txn *badger.Txn) error {
						// Your code here…
						videoEntry, err := txn.Get([]byte(videoID))
						if err != nil {
							fmt.Println(err)
							fmt.Println("failed getting video entry")
							err = txn.Set([]byte(videoID), newUploadedVideoJson)
							if err != nil {
								fmt.Println(err)
							}
							return nil
						} else {
							
							var value []byte
							value, err = videoEntry.ValueCopy(nil)
							fmt.Println(value)
						}
						return nil
					})
					if err != nil {
						fmt.Println(err)
					}

					return	
				}
				//time.Sleep(5 * time.Second)

			}
			return
		}()
		//wg.Wait()

		if err != nil {
			fmt.Println(err)
		}
		return

	}

}

func playVideoHandler(w http.ResponseWriter, r *http.Request) {

	(w).Header().Set("Access-Control-Allow-Origin", "*")
	halfURI := "https://media.thetavideoapi.com/"
	endURI := "/master.m3u8"
	reqVideoID := strings.TrimPrefix(r.URL.Path, "/playVideo/")

	uri := halfURI + reqVideoID + endURI 
	t, _ := template.ParseFiles("./templates/playVideo_new.html")
	if r.Method == "GET" {
		fmt.Println("new get request to play video")
		fmt.Println(uri)
		t.Execute(w, uri)
	}
}
func listVideosHandler(w http.ResponseWriter, r *http.Request) {
	templ, _ := template.ParseFiles("./templates/videos_new.html")

	if r.Method == "GET" {

		//var videos = []UploadedVideo{}
		var uploadedVideos []UploadedVideo
		var uploadedVideo UploadedVideo
		
		db, err := badger.Open(badger.DefaultOptions(dbPath2))

		if err != nil {
			fmt.Println(err)
		}
		defer db.Close()
		// search for video_ keys and append to uploadedVideos slice
		err = db.View(func(txn *badger.Txn) error {
			// Your code here…
			opts := badger.DefaultIteratorOptions
  			//opts.PrefetchValues = false
			it := txn.NewIterator(opts)
			defer it.Close()
			prefix := []byte("video_")
			var value []byte
			for it.Seek(prefix); it.ValidForPrefix(prefix); it.Next() {
				videoEntry := it.Item()
				//k := videoEntry.Key()
				value, err = videoEntry.ValueCopy(nil)
				if err != nil {
					return err
				}
				json.Unmarshal(value, &uploadedVideo)
				uploadedVideos = append(uploadedVideos, uploadedVideo)
			}
			return nil
		})
		if err != nil {
			fmt.Println(err)
			fmt.Println("error grabbing uploaded videos")
		} else {
			uploadedVideosBytes, _ := json.Marshal(uploadedVideos)
			//fmt.Println(uploadedVideos)
			err := templ.Execute(w, string(uploadedVideosBytes))
			if err != nil {
				fmt.Println(err)
			}
		}
	} else {
		fmt.Println("no post requests allowed")
	}

}

func getApiKey() string {
	api_key := *apiID
	return api_key
}
func getApiSecret() string {
	api_secret := *apiSecret
	return api_secret
}

func getUploadStatus(w http.ResponseWriter, r *http.Request) {
	//fmt.Println("sending upload status")
	//var progressSlice []float64
	//fmt.Println("monitoring video transcoding status")
	//time.Sleep(2 * time.Second)

	//session := sess.Start(w, r)
	req_videoID := strings.TrimPrefix(r.URL.Path, "/getUploadStatus/")
	/*
		if sessionManager.Get(r.Context(), "videoID") == nil {
			fmt.Println("no videoID in cookie :(")
			wg.Add(1)
			go setVideoID(r)
			wg.Wait()
		} else {
			temp_videoID = sessionManager.Get(r.Context(), "videoID").(string)
			videoID = ""
		}
	*/
	//fmt.Println(req_videoID)
	// trying to use sync to solve the video progress issue
	//mu.Unlock()
	api_key := *apiID
	api_secret := *apiSecret
	client := &http.Client{}
	req, _ := http.NewRequest("GET", "https://api.thetavideoapi.com/video/"+req_videoID, nil)

	req.Header.Add("x-tva-sa-id", api_key)
	req.Header.Add("x-tva-sa-secret", api_secret)

	res, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
	}
	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	var transcodeVideoResponse TranscodeVideoResponse
	err = json.Unmarshal(body, &transcodeVideoResponse)
	if err != nil {
		fmt.Println(err)
	}
	//fmt.Println(transcodeVideoResponse)

	upload_progress := transcodeVideoResponse.Body.Videos[0].Progress
	//upload_playbackURI := transcodeVideoResponse.Body.Videos[0].PlaybackURI
	//upload_state := transcodeVideoResponse.Body.Videos[0].State
	//fmt.Println(progress)
	progressString := fmt.Sprint(upload_progress)

	//progressResponse := ProgressResponse{}

	if upload_progress == 100 {
		w.Write([]byte(progressString))
		fmt.Println("upload complete for video: ", req_videoID)
		return
	} else {
		fmt.Println("fetching upload status for: ", req_videoID)
		w.Write([]byte(progressString))
	}
	return

}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	loginTemplate, _ := template.ParseFiles("./templates/login.html")
	var errorMessage string
	if r.Method == "GET" {
		//loginTemplate, _ := template.ParseFiles("./templates/login.html")
		loginTemplate.Execute(w, nil)
	} else if r.Method == "POST" {
		r.ParseForm()
		username := r.FormValue("username")
		password := r.FormValue("password")


		db, err := bitcask.Open(dbPath, bitcask.WithSync(true))
		db.Reopen()
		if err != nil {fmt.Println(err)}
		defer db.Close()
		// check if user is in DB. If not, display error in html
		usernameCheck := db.Has([]byte(username))
		if usernameCheck == true {
			// check password against one stored in db
			user := User{}
			userByte, _ := db.Get([]byte(username))
			_ = json.Unmarshal(userByte, &user)
			userPassword := user.Password

			err := bcrypt.CompareHashAndPassword([]byte(userPassword), []byte(password))
			if err != nil {
				fmt.Println()
			}
			if err != nil {
				errorMessage = "Incorrect Password"
				//loginTemplate.Execute(w, "incorrect password")
			} else {
				fmt.Println("dickmabutt")
				sessionManager.Put(r.Context(), "username", username)
				fmt.Println(user.Password, user.Username, user.ID, user.Email)
				http.Redirect(w, r, "/", 302)
			} 
		} else {
			errorMessage = "username not found"
			//loginTemplate.Execute(w, "username not found")
		}
		fmt.Fprintf(w, errorMessage)
		return

	}
	return

}
func logoutHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		if sessionManager.Exists(r.Context(), "username") == true {
			sessionManager.Destroy(r.Context())
			http.Redirect(w, r, "/", 302)
		}
		return
	}
	return
}

func registerHandler(w http.ResponseWriter, r *http.Request) {
	registerTemplate, err := template.ParseFiles("./templates/register.html")
	//fmt.Println(r.Method)
	if r.Method == "GET" {
		//fmt.Println("we're doing it")
		registerTemplate.Execute(w, nil)
		if err != nil {
			fmt.Println(err)
		}
	} else if r.Method == "POST" {
		db, err := bitcask.Open(dbPath, bitcask.WithSync(true))
		db.Reopen()
		if err != nil {
			fmt.Println(err)
		}
		defer db.Close()
		var bytes []byte
		videos := make([]Video, 0)
		uuidWithHyphen := uuid.New()
		userID := strings.Replace(uuidWithHyphen.String(), "-", "", -1)
		err = r.ParseForm()
		if err != nil {
			fmt.Println(err)
		}
		username := r.FormValue("username")
		email := r.FormValue("email")
		password := r.FormValue("password")
		fmt.Println(username)
		if db.Has([]byte(username)) == true {
			fmt.Println("username already exists")

			registerTemplate.Execute(w, "username already exists")
			return
		}
		passwordHashed, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.MinCost)
		if err != nil {
			log.Println(err)
		}
		// create user object
		user := User{
			Username: username,
			Email: email,
			Password: string(passwordHashed),
			ID: userID,
			Videos: videos,
		}

		fmt.Println(user, "\nregistered")

		// serialize user object and send to DB
		bytes, _ = json.Marshal(user)
		db.Put([]byte(username), bytes)

		fmt.Println("user registered", user)
		http.Redirect(w, r, "/", 302)
		return
	}
	return
}

func main() {

	// scs session manager setup
	sessionManager = scs.New()
	sessionManager.Lifetime = 24 * time.Hour

	apiID = flag.String("api-id", "", "startup")
	apiSecret = flag.String("api-secret", "", "startup")
	ip = flag.String("ip", "localhost", "startup")
	port = flag.String("port", "8001", "startup")
	dbPathInit := flag.String("db-path", "/tmp/db", "startup")
	flag.Parse()


	dbPath = *dbPathInit
	dbPath2 = "/tmp/data"

	//options.Dir = "data"
	//options.ValueDir = "data"

	if *apiID == "" || *apiSecret == "" {
		fmt.Println("no API keys provided. Exiting")
		return
	}

	defaultIPPort = *ip + ":" + *port

	fmt.Println("api-id: ", *apiID)
	fmt.Println("api-secret", *apiSecret)
	fmt.Println("Listening on", defaultIPPort)


	mux := mux.NewRouter()
	mux.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("./theta-svelte/public/"))))
	//mux.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("./theta-svelteKit/build/"))))
	// upload video
	mux.HandleFunc("/", rootHandler)
	mux.HandleFunc("/login", loginHandler)
	mux.HandleFunc("/logout", logoutHandler)
	mux.HandleFunc("/register", registerHandler)
	mux.HandleFunc("/playVideo/{id:video_[a-z0-9]{26}}", playVideoHandler)
	mux.HandleFunc("/videos", listVideosHandler)
	mux.HandleFunc("/upload", videoUploadHandler)
	mux.HandleFunc("/getUploadStatus/{id:video_[a-z0-9]{26}}", getUploadStatus)

	//watch video
	http.ListenAndServe(defaultIPPort, sessionManager.LoadAndSave(mux))
}
