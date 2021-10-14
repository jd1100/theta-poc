<script lang="ts">
	//inputElement = document.querySelector('input[type="file"]')
	//let pond = FilePond.create( inputElement )
	const formData = new FormData()
	let pond;
	let name = "videoUpload"
	import ProgressBar from '@okrad/svelte-progressbar';
	import FilePond, { registerPlugin } from 'svelte-filepond';
	import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
	import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

	registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)
	async function handleAddFile(err, fileItem) {
		formData.append("videoUpload", fileItem)
		let apiResponse = await fetch("http://localhost:8001/apiUploadFile", {
			method: "POST",
			headers: {
				"Content-Type": "video/mp4"
			},
			body: formData
		});
		
		/*
		let apiResult = await apiResponse.json();
		console.log(apiResult)
		var uploadId = apiResult.uploadId
		var uploadUrl = apiResult.uploadUrl

		console.log(uploadId, uploadUrl)
		console.log("file added", fileItem)
		
		// upload video to preassigned url
		let uploadResponse = await fetch(uploadUrl, {
			method: "PUT",
			headers: {
				"Content-Type": "application/Octet-Stream"
			},
			body: fileItem
			
		});
		
		// null response
		let uploadResult = await uploadResponse.json();
		console.log(uploadResult)
		
		var transcodeBody = {
			SourceUploadID: uploadId,
			PlaybackPolicy: "public"
		}

		let transcodeResponse = await fetch("https://api.thetavideoapi.com/video", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(transcodeBody)
		});
		let transcodeResult = await transcodeResponse.json();
		console.log(transcodeResult)

		var video
		var videoId
		var state
		var progress
		var playbackUri
		var uploadProgress
		for (video in transcodeResult.Body.Videos){
			console.log(video)
			videoId = video.ID
			progress = video.Progress
			state = video.State
			playbackUri = video.PlaybackURI
			//fmt.Println(len(transcodeVideoResponse.Body.Videos))
		}
		uploadProgress = progress
		console.log(videoId, progress, state, playbackUri)
		*/

		// check upload progress
		/*let transcodeResponse = await fetch("https://api.thetavideoapi.com/video/" + videoId, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(transcodeBody)
		});
		let transcodeResult = await transcodeResponse.json();
		console.log(transcodeResult)
		*/
		

	}
	async function handleInit() {
		//
		console.log("wuernkvvkenrv")
		//getApiInfo()
	}
	
</script>

<main>
	<div class="app">

	<FilePond bind:this={pond} {name}
		server="http://localhost:8001/api2"
		allowMultiple={false}
		oninit={handleInit}
		onaddfile={handleAddFile}
	/>

	<!--<ProgressBar series={uploadProgress}/>-->
		
	</div>
</main>

<style global>
	@import 'filepond/dist/filepond.css';
	@import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
</style>
