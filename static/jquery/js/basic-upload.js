$(function() {

	// open the file explorer window
	$("#js-upload-photos").click(() => {
		$("#fileupload").click();
	});

	//////////////////////////////
	// upload without progress bar
	//////////////////////////////
	
	// $("#fileupload").fileupload({
	// 	dataType: "json",
	// 	done: (e, data) => {
	// 		console.log(data);
	// 		if (data.result.is_valid) {
	// 			$("#gallery tbody").append(
	// 				"<tr><td><a href='" + data.result.url + "'>" + data.result.name + "</a></td></tr>"
	// 			)
	// 		}
	// 	}
	// })
		
	//////////////////////////////
	// upload with progress bar
	//////////////////////////////
	
	$("#fileupload").fileupload({
		dataType: 'json',
		sequentialUploads: true, // upload files one by one
		start: (e) => {	// when the uploading starts show the modal
			$("#modal-progress").modal("show");
		},
		stop: (e) => {	// when the uploading completes hide the modal
			$("#modal-progress").modal("hide");
		},
		progressall: (e, data) => { // update the progress bar
			var progress = parseInt(data.loaded / data.total * 100, 10);
			var strProgress = progress + '%';
			$(".progress-bar").css({"width": strProgress});
			$(".progress-bar").text(strProgress);
		},
		done: (e, data) => {
			if (data.result.is_valid) {
				$("#gallery tbody").prepend(
					"<tr><td><a href='" + data.result.url + "'>" + data.result.name + "</a></td></tr>"
				)
			}
		}
	})

})
