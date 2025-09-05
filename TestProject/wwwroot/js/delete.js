let rowToDelete;
let idToDelete;


$(document).on("click", ".delete-btn", function () {
	rowToDelete = $(this).closest("tr");
	idToDelete = rowToDelete.data("id");
});

$(document).on("click", ".save-changes-btn", function () {
	if (!rowToDelete) return;
	$.ajax({
		url: '/UploadCsv/Delete',
		type: 'POST',
		data: { id: idToDelete },
		success: function (response) {
			if (response.success) {
				rowToDelete.fadeOut(500, function () {
					$(this).remove();
				});
			} else {
				alert("Помилка видалення");
			}
			rowToDelete = null;
			idToDelete = null;
		},
		error: function () {
			alert("Помилка оновлення!");
		}
	});
});