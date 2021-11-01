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

	"github.com/alexedwards/scs/v2"
	"github.com/gorilla/mux"
)

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
	FileName         interface{} `json:"file_name"`
	State            string      `json:"state"`
	SubState         string      `json:"sub_state"`
	SourceUploadID   interface{} `json:"source_upload_id"`
	SourceURI        string      `json:"source_uri"`
	PlaybackPolicy   string      `json:"playback_policy"`
	Progress         float64     `json:"progress"`
	Error            interface{} `json:"error"`
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
var ip *string
var port *string
var defaultIPPort string

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

	rootTemplate, _ := template.ParseFiles("./src/home.html")
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

	//testString := "input string value"
	/*
		fmap := template.FuncMap{
			"getVideoID": waitForVideoID,
		}
		t := template.Must(template.New("upload.html").Funcs(fmap).ParseFiles("./src/upload.html"))
	*/
	var videoID string
	isError := false
	if r.Method == "GET" {
		t, _ := template.ParseFiles("./src/upload.html")
		err := t.Execute(w, nil)
		if err != nil {
			fmt.Println(err)
		}

		fmt.Println("new get request")
	} else if r.Method == "POST" {
		//api_key := *apiID
		//api_secret := *apiSecret
		//var file *os.File
		// get file upload from client browser
		fmt.Println("uploading video to theta")
		//fmt.Println()
		//fmt.Println(httputil.DumpRequest(r, true))
		//b, err := io.ReadAll(r.Body)
		//fmt.Println(string(b))
		maxSize := int64(102400000000) // allow only 1GB of file size
		err := r.ParseMultipartForm(maxSize)

		if err != nil {
			fmt.Println(err)
			fmt.Fprintf(w, "Image too large. Max Size: %v", maxSize)
			return
		}

		file, _, err := r.FormFile("video_file")
		if err != nil {
			//fmt.Println(headers)
			log.Println(err)
			fmt.Fprintf(w, "Could not get uploaded file")
			return
		}
		defer file.Close()

		// end get file upload from client browser

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
			//fmt.Println(presignedUrlresponse)
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
			req, _ = http.NewRequest("PUT", uploadUrl, file)
			fmt.Println("uploading file to preassigned url")
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
				isError = true
				return
			}
		}()
		wg.Wait()
		if isError != false {
			fmt.Println("error transcoding video... exiting ")
			fmt.Fprintf(w, "error transcoding video")
			return
		} else {
			fmt.Println(videoID)
			fmt.Fprintf(w, videoID)
		}

		go func() {
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

					templ, err := template.ParseFiles("./src/videos.html")
					if err != nil {
						fmt.Println(err)
					}

					//add newVideo to uploadedVideos slice
					uploadedVideos = append(uploadedVideos, newVideo2)
					err = templ.Execute(w, uploadedVideos)
					if err != nil {
						fmt.Println(err)
					}
					break
				}
				//time.Sleep(5 * time.Second)

			}
		}()
		//wg.Wait()
		//t, _ := template.ParseFiles("./src/upload.html")
		//err = t.ExecuteTemplate(w, "upload", videoID)
		if err != nil {
			fmt.Println(err)
		}
		return

	}

}

func playVideoHandler(w http.ResponseWriter, r *http.Request) {

	//(w).Header().Set("Access-Control-Allow-Origin", "*")
	t, _ := template.ParseFiles("./src/playVideo.html")
	if r.Method == "GET" {
		fmt.Println("new get request to play video")
	} else {
		err := r.ParseForm()
		if err != nil {
			fmt.Println(err)
		}
		playbackURI2 := r.PostForm.Get("playbackURI")
		fmt.Println(playbackURI2)
		t.Execute(w, playbackURI2)
		/*
			fmt.Println("grabbing requested video " + je + "from cdn")
			client = &http.Client{}
			req, _ = http.NewRequest("GET", "https://api.thetavideoapi.com/video/"+videoID, nil)
			req.Header.Add("x-tva-sa-id", api_key)
			req.Header.Add("x-tva-sa-secret", api_secret)
			res, _ = client.Do(req)
			defer res.Body.Close()
			body, err = ioutil.ReadAll(res.Body)
			err = json.Unmarshal(body, &transcodeVideoResponse)
		*/
	}
}

func listVideosHandler(w http.ResponseWriter, r *http.Request) {
	templ, _ := template.ParseFiles("./src/videos.html")

	if r.Method == "GET" {
		//fmt.Println(uploadedVideos)
		templ.Execute(w, uploadedVideos)
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
		//w.Write([]byte("shits done bro"))
		//fmt.Fprintf(w, "shits done bro")
		return
		//sessionManager.Destroy(r.Context())
	} else {
		fmt.Println("fetching upload status for: ", req_videoID)
		w.Write([]byte(progressString))
		//fmt.Fprintf(w, upload_progress)
	}

}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	loginTemplate, _ := template.ParseFiles("./src/login.html")
	if r.Method == "GET" {
		//loginTemplate, _ := template.ParseFiles("./src/login.html")
		loginTemplate.Execute(w, nil)
	} else if r.Method == "POST" {
		r.ParseForm()
		username := r.FormValue("username")
		password := r.FormValue("password")

		sessionManager.Put(r.Context(), "username", username)
		fmt.Println(username, password)
		http.Redirect(w, r, "/", 302)

	}

}
func logoutHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		if sessionManager.Exists(r.Context(), "username") == true {
			sessionManager.Destroy(r.Context())
			http.Redirect(w, r, "/", 302)
		}
		return
	}
}

func main() {

	// scs session manager setup
	sessionManager = scs.New()
	sessionManager.Lifetime = 24 * time.Hour

	apiID = flag.String("api-id", "", "startup")
	apiSecret = flag.String("api-secret", "", "startup")
	ip = flag.String("ip", "localhost", "startup")
	port = flag.String("port", "8001", "startup")
	flag.Parse()

	if *apiID == "" || *apiSecret == "" {
		fmt.Println("no API keys provided. Exiting")
		return
	}

	defaultIPPort = *ip + ":" + *port

	fmt.Println("api-id: ", *apiID)
	fmt.Println("api-secret", *apiSecret)
	fmt.Println("Listening on", defaultIPPort)

	mux := mux.NewRouter()
	// upload video
	mux.HandleFunc("/", rootHandler)

	mux.HandleFunc("/playVideo", playVideoHandler)
	mux.HandleFunc("/videos", listVideosHandler)
	mux.HandleFunc("/login", loginHandler)
	mux.HandleFunc("/logout", logoutHandler)
	mux.HandleFunc("/upload", videoUploadHandler)
	mux.HandleFunc("/getUploadStatus/{id:video_[a-z0-9]{26}}", getUploadStatus)

	//watch video
	http.ListenAndServe(defaultIPPort, sessionManager.LoadAndSave(mux))
}
