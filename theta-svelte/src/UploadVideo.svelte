<svelte:options tag="upload-video" />

<script>
    //import GUN from 'gun'
    //import 'gun/sea'
    //import 'gun/axe'
    //import { onMount } from 'svelte';
    
    console.log("we're doing it")
    /*
    var testButton = document.getElementById("testButton")
    testButton.addEventListener("click", event => {
        getUploadStatus()
    })
    */
    export let newUploadedVideo;
    //export const db = GUN();
    var videoUpload;

    var file
    var fileLength
    var videoID = ""
    var timeoutID
    var formData = new FormData()
    var loadingSpinnerActive = false
    var buttonDiv
    var loadingSpinnerDiv
    var loadingSpinner
    var thumbnail
    var videoName
    var uploadForm
    var buttonElement
    var file
    var progressBar
    var progressBarDiv
    var progressBarActive = false
    var buttonActive = true
    
    var videoUpload
    var videoFile
    var thumbnailUpload
    var thumbnailFile
    //console.log(file)
    // set file variables
    /*
    document.getElementById("file").onchange = function(e) {
        //e.preventDefault()
        file = (e.target).files[0];
        reader.readAsArrayBuffer(file);
        fileLength = (e.target).files.length
        console.log(file.name, fileLength)
        console.log(file)

        reader.onload = function(evt) {
            //new Blob([fileAsArray], {type: "image/jpg"}
            formData.append("video_file", file)
            //formData.append("video_file", new Blob([evt.target.result], {type: "video"}))
        }
        //rest of your code...
    }
    */
    console.log(newUploadedVideo)
    async function uploadFormData() {
        let response = await fetch("http://localhost:8001/upload", {
            method: "POST",
            //jsonData: content.join(''),
            body: formData
        })
        //console.log(response.status)
        //console.log(response.statusText)
        let result = await response.text();
        videoID = result
        console.log(videoID)
        return
    }

    function submitForm(event) {
        //var file = document.getElementById("file").files[0]
        //event.preventDefault()
        videoFile = videoUpload.files[0]
        thumbnailFile = thumbnailUpload.files[0]

        //reader.readAsArrayBuffer(file);
        fileLength = videoUpload.files.length
        console.log(videoFile.name, fileLength)
        console.log(videoFile)
        formData.append("videoFile", videoFile)
        formData.append("thumbnailFile", thumbnailFile)
        formData.append("videoName", videoName.value)
        formData.append("fileName", videoFile.name)

        console.log(fileLength)
        if (fileLength == 0) {
            alert("no file selected")
            console.log("no file selected")
            return
        }

        uploadFormData()
        
        //removeButton()
        buttonActive = false
        //addLoadingSpinner()
        loadingSpinnerActive = true
        //addProgressBar()
        //var loadingSpinnerDiv = document.getElementById("loadingSpinnerDiv")
        //var loadingSpinner = document.getElementById("loadingSpinner")
        getUploadStatus()
    }

    async function getUploadStatus() {
        const response = await fetch("http://localhost:8001/getUploadStatus/" + videoID);
        const status = await response.status
        const data = await response.text();

        console.log(status)
        console.log(data)
        if (status == 200) {
            if (loadingSpinnerActive == true) {
                loadingSpinnerActive = false
                progressBarActive = true
            }
            //var progressBarDiv = document.getElementById("progressBarDiv")
            //var progressBar = document.getElementById("progressBar")

            progressBar.innerHTML = data
            progressBar.style.width = data + "%"
            if (data == 100) {
                console.log(data)
                progressBar.innerHTML = data
                progressBar.style.width = data + "%"

                //remove progress bar
                progressBarActive = false
                //add button back
                buttonActive = true
                console.log("video has been uploaded and is ready to play!")
                alert("video has been uploaded and is ready to play!")

                clearTimeout(timeoutID)
                window.location = "/videos"
                return
            } else {
                timeoutID = setTimeout(getUploadStatus, 1000)
            }
        } else if (status == 404) {
            //loadingSpinnerRemoved = false
            timeoutID = setTimeout(getUploadStatus, 1000)
        } else if (status == 501) {
            console.log("error transcoding video. Please refresh page and try again.")
            alert("error transcoding video. Please refresh page and try again.")
        }

    }
    function createThumbnail(event) {
        if (thumbnail != null) {
            thumbnail.remove()
        }
        var file = event.target.files[0];
        var fileReader = new FileReader();
        if (file.type.match('image')) {
            fileReader.onload = function () {
            var img = document.createElement('img');
            img.src = fileReader.result;
            thumbnail.appendChild(img);
            img.id = "thumbnailImg"
            img.className = "has-mask h-36 object-center"
            };
            fileReader.readAsDataURL(file);
        } else {
            fileReader.onload = function () {
            var blob = new Blob([fileReader.result], { type: file.type });
            var url = URL.createObjectURL(blob);
            var video = document.createElement('video');
            var timeupdate = function () {
                if (snapImage()) {
                    video.removeEventListener('timeupdate', timeupdate);
                    video.pause();
                }
            };
            video.addEventListener('loadeddata', function () {
                if (snapImage()) {
                    video.removeEventListener('timeupdate', timeupdate);
                }
            });
            var snapImage = function () {
                var canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
                var image = canvas.toDataURL();
                var success = image.length > 100000;
                if (success) {
                    var img = document.createElement('img');
                    img.src = image;
                    img.id = "thumbnailImg"
                    img.className = "has-mask h-36 object-center"
                    //document.getElementById("thumbnail").appendChild(img);
                    thumbnail.appendChild(img)
                    URL.revokeObjectURL(url);
                }
                return success;
            };
            video.addEventListener('timeupdate', timeupdate);
            video.preload = 'metadata';
            video.src = url;
            // Load video in Safari / IE11
            video.muted = true;
            video.playsInline = true;
            };
            fileReader.readAsArrayBuffer(file);
        }
    }
</script>

<main>
<div class="bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600 relative">
        

    <div
      class="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover relative items-center">

      <div class="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
        <div class="text-center">
            <h2 class="mt-5 text-3xl font-bold text-gray-900">
               Upload Video
            </h2>
            <p class="mt-2 text-sm text-gray-400">Upload video to theta video api</p>
         </div>
        <iframe title="" name="frame" style="display:none"></iframe>
        <form bind:this={uploadForm} class="mt-8 space-y-3" target="frame">
            <div class="grid grid-cols-1 space-y-2">
               <!-- svelte-ignore a11y-label-has-associated-control -->
                <label for="videoName" class="text-sm font-bold text-gray-500 tracking-wide">Video Name<label>
                <input bind:this={videoName} name="videoName" class="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    type="text">
            </div>

            <div class="grid grid-cols-1 space-y-2">
                <label for="file" class="text-sm font-bold text-gray-500 tracking-wide">Thumbnail</label>
                <input bind:this={thumbnailUpload} type="file" name="thumbnailFile">
            </div>
            <div class="grid grid-cols-1 space-y-2">

                <label for="file" class="text-sm font-bold text-gray-500 tracking-wide">Video File</label>
                <div class="flex items-center justify-center w-full">
                    <label class="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                        <div class="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
                        <div bind:this={thumbnail} class="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">

                        </div>
                        <p class="pointer-none text-gray-500 "><span class="text-sm">Drag and drop</span> files here
                            <br />
                            or <a href="_blank" id="" class="text-blue-600 hover:underline">select a file</a> from your
                            computer
                        </p>
                        </div>
                        <input bind:this={videoUpload} on:change={createThumbnail} type="file" name="video_file" class="hidden">
                    </label>
                </div>
            </div>
            <p class="text-sm text-gray-300">
                <span>File type: mp4</span>
            </p>
            {#if loadingSpinnerActive} 
                <div bind:this={loadingSpinnerDiv} class="flex items-center justify-center">
                    <div bind:this={loadingSpinner} class="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                </div>
            {/if}
            {#if progressBarActive}
                <div bind:this={progressBarDiv} class="w-full bg-gray-200 rounded-full">
                    <div bind:this={progressBar} class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"></div>
                </div>
            {/if}
            {#if buttonActive}
                <div bind:this={buttonDiv}>
                    <button bind:this={buttonElement}
                        on:click={submitForm}
                        class="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                        font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300">
                        Upload
                    </button>
                </div>
            {/if}
        </form>
      </div>
   </div>
</div>
</main>

<style>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    .has-mask {
      position: absolute;
      clip: rect(10px, 150px, 130px, 10px);
   }
</style>