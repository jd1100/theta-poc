package main

import (
	"bytes"
	"encoding/json"
	"flag"
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"strings"
	"time"
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

/*
func getPresignedUploadUrl() string {
	api_key := "srvacc_5c68pp78d8gimwikrm2vhzqgd"
	api_secret := "5849hmphbd4rj6dxzjzzembrm33y2nhw"
	data := url.Values{}
	client := &http.Client{}
	req, _ := http.NewRequest("POST", "https://api.thetavideoapi.com/upload", strings.NewReader(data.Encode()))
	presignedUrlresponse := PreSignedURLResponse{}
	req.Header.Add("x-tva-sa-id", api_key)
	req.Header.Add("x-tva-sa-secret", api_secret)


	res, _ := client.Do(req)
	defer res.Body.Close()

	//body, err := ioutil.ReadAll(res.Body)
	err = json.NewDecoder(res.Body).Decode(&presignedUrlresponse)
	//err = json.Unmarshal(body, &presignedUrlresponse)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(presignedUrlresponse)

	return presignedUrlresponse.Uploads.PresignedURL


}
*/
var apiID *string
var apiSecret *string
var uploadUrl string
var uploadId string
var state string
var progress float64
var playbackURI string
var videoId string
var transcodeVideoResponse TranscodeVideoResponse
var newVideo Video
var uploadedVideos []Video

func rootHandler(w http.ResponseWriter, r *http.Request) {
	//query := r.FormValue("searchQuery")
	//source := r.FormValue("mediaSource")
	//p := mediaSearch{searchString: query, mediaSource: source}
	//fmt.Println(p.mediaSource, p.searchString)
	t, _ := template.ParseFiles("./src/home.html")
	if r.Method == "GET" {
		t.Execute(w, nil)
		fmt.Println("new get request")
	} else {
		fmt.Println("post requests not allowed")
	}
}

func videoUploadHandler(w http.ResponseWriter, r *http.Request) {
	t, _ := template.ParseFiles("./src/upload.html")
	if r.Method == "GET" {
		t.Execute(w, nil)
		fmt.Println("new get request")
	} else {
		api_key := *apiID
		api_secret := *apiSecret
		data := url.Values{}
		client := &http.Client{}
		req, _ := http.NewRequest("POST", "https://api.thetavideoapi.com/upload", strings.NewReader(data.Encode()))
		presignedUrlresponse := PreSignedURLResponse{}
		req.Header.Add("x-tva-sa-id", api_key)
		req.Header.Add("x-tva-sa-secret", api_secret)

		res, _ := client.Do(req)
		defer res.Body.Close()

		body, err := ioutil.ReadAll(res.Body)
		err = json.Unmarshal(body, &presignedUrlresponse)
		//err = json.Unmarshal(body, &presignedUrlresponse)
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

		fmt.Println("uploading video to theta")
		maxSize := int64(1024000000) // allow only 1GB of file size
		err = r.ParseMultipartForm(maxSize)

		if err != nil {
			log.Println(err)
			fmt.Fprintf(w, "Image too large. Max Size: %v", maxSize)
			return
		}

		file, _, err := r.FormFile("video_file")
		if err != nil {
			log.Println(err)
			fmt.Fprintf(w, "Could not get uploaded file")
			return
		}
		defer file.Close()

		// upload video to presigned url
		data = url.Values{}
		client = &http.Client{}
		req, _ = http.NewRequest("PUT", uploadUrl, file)

		req.Header.Add("Content-Type", "application/octet-stream")

		res, _ = client.Do(req)
		defer res.Body.Close()
		//fmt.Println(res)

		// transcode video using an upload
		data = url.Values{}
		client = &http.Client{}
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

		res, _ = client.Do(req)
		defer res.Body.Close()

		//fmt.Println(res.Body)

		err = json.NewDecoder(res.Body).Decode(&transcodeVideoResponse)

		// check progress of video transcode
		for _, videos := range transcodeVideoResponse.Body.Videos {
			//fmt.Println(len(transcodeVideoResponse.Body.Videos))
			fmt.Println("transcoding video...")
			if len(transcodeVideoResponse.Body.Videos) == 1 {
				videoId = videos.ID
				progress = videos.Progress
				state = videos.State
				playbackURI = videos.PlaybackURI
				fmt.Println(progress, state, playbackURI, videoId)
			}
		}
		t.Execute(w, progress)

		time.Sleep(5 * time.Second)

		fmt.Println("monitoring video transcoding status")
		client = &http.Client{}
		req, _ = http.NewRequest("GET", "https://api.thetavideoapi.com/video/"+videoId, nil)

		req.Header.Add("x-tva-sa-id", api_key)
		req.Header.Add("x-tva-sa-secret", api_secret)

		res, _ = client.Do(req)
		defer res.Body.Close()

		body, err = ioutil.ReadAll(res.Body)
		err = json.Unmarshal(body, &transcodeVideoResponse)

		for _, videos := range transcodeVideoResponse.Body.Videos {
			progress = videos.Progress
			playbackURI = videos.PlaybackURI
			state = videos.State
			break
		}

		for state != "success" || state != "failed" {

			client := &http.Client{}
			req, _ := http.NewRequest("GET", "https://api.thetavideoapi.com/video/"+videoId, nil)

			req.Header.Add("x-tva-sa-id", api_key)
			req.Header.Add("x-tva-sa-secret", api_secret)

			res, _ := client.Do(req)

			body, err = ioutil.ReadAll(res.Body)
			err = json.Unmarshal(body, &transcodeVideoResponse)

			for _, videos := range transcodeVideoResponse.Body.Videos {
				newVideo = videos
				progress = videos.Progress
				playbackURI = videos.PlaybackURI
				state = videos.State
				fmt.Println(progress)
				break
			}
			if state == "success" {
				fmt.Println("video successfully transcoded")
				fmt.Println("video playback url: " + playbackURI)

				//add newVideo to uploadedVideos slice
				uploadedVideos = append(uploadedVideos, newVideo)

				templ, err := template.ParseFiles("./src/videos.html")
				if err != nil {
					fmt.Println(err)
				}
				err = templ.Execute(w, uploadedVideos)
				if err != nil {
					fmt.Println(err)
				}
				break
			}
			time.Sleep(5 * time.Second)

		}

		//fmt.Println(body)

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
		playbackURI = r.PostForm.Get("playbackURI")
		fmt.Println(playbackURI)
		t.Execute(w, playbackURI)
		/*
			fmt.Println("grabbing requested video " + je + "from cdn")
			client = &http.Client{}
			req, _ = http.NewRequest("GET", "https://api.thetavideoapi.com/video/"+videoId, nil)

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
		templ.Execute(w, uploadedVideos)
	} else {
		fmt.Println("no post requests allowed")
	}

}

func main() {
	//http.Handle("/", http.FileServer(http.Dir("./src/")))
	apiID = flag.String("api-id", "hello", "startup")
	apiSecret = flag.String("api-secret", "hello", "startup")
	flag.Parse()

	fmt.Println("api-id: ", *apiID)
	fmt.Println("api-secret", *apiSecret)

	// upload video
	http.HandleFunc("/", rootHandler)
	http.HandleFunc("/upload", videoUploadHandler)
	http.HandleFunc("/playVideo", playVideoHandler)
	http.HandleFunc("/videos", listVideosHandler)

	//watch video
	http.ListenAndServe(":8001", nil)
}
