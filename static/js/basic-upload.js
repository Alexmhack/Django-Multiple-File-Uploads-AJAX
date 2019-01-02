$(function() {

	// open the file explorer window
	$("#js-upload-photos").click(() => {
		$("#fileupload").click();
	});

	$("#fileupload").fileupload({
		dataType: "json",
		done: (e, data) => {
			console.log(data);
			if (data.result.is_valid) {
				$("#gallery tbody").append(
					"<tr><td><a href='" + data.result.url + "'>" + data.result.name + "</a></td></tr>"
				)
			}
		}
	})
		
})
