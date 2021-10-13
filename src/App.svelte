<script lang="ts">
	let pond;
	let name = "filepond"
	import FilePond, { registerPlugin } from 'svelte-filepond';
	import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
	import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

	function handleAddFile() {
		console.log("file added")
	}
	function handleInit() {
		console.log("started plugin")
	}
</script>

<main>
	<div class="app">

		<FilePond bind:this={pond} {name}
			server="/api"
			allowMultiple={true}
			oninit={handleInit}
			onaddfile={handleAddFile}/>
		
	</div>
</main>

<style global>
	@import 'filepond/dist/filepond.css';
	@import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
</style>
