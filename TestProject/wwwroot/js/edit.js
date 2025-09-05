




$(document).on("click", ".edit-btn", function () {
	var row = $(this).closest("tr");
	row.find(".edit-btn , .delete-btn").hide();
	row.find(".save-btn, .cancel-btn").show();

	row.find("td.name, td.date, td.isMarried, td.phoneNumber, td.salary").each(function () {
		var text = $(this).text().trim();
		$(this).data("original", text);
		$(this).html('<input type="text" class="form-control-sm" value="' + text + '">');
	});
});


$(document).on("click", ".cancel-btn", function () {
	var row = $(this).closest("tr");
	row.find("td.name, td.date, td.isMarried, td.phoneNumber, td.salary").each(function () {
		var originalVal = $(this).data("original");
		$(this).text(originalVal);
	});
	row.find(".save-btn, .cancel-btn").hide();
	row.find(".edit-btn, .delete-btn").show();
});


$(document).on("click", ".save-btn", function () {
	var row = $(this).closest("tr");
	var id = row.data("id");

	var name = row.find("td.name input").val();
	var date = row.find("td.date input").val();
	var isMarried = row.find("td.isMarried input").val();
	var phoneNumber = row.find("td.phoneNumber input").val();
	var salary = row.find("td.salary input").val();

	row.find("td input").removeClass("is-invalid");
	row.find(".invalid-feedback").remove();

	var isValid = true;

	if (!name) {
		isValid = false;
		row.find("td.name input")
			.addClass("is-invalid")
			.after('<div class="invalid-feedback">Name is mandatory</div>');
	}


	if (!/^\d{2}.\d{2}.\d{4}$/.test(date)) {
		isValid = false;
		row.find("td.date input")
			.addClass("is-invalid")
			.after('<div class="invalid-feedback">Invalid data format (DD.MM.YYYY)</div>');
	}


	if (!/^(Yes|No)$/i.test(isMarried)) {
		isValid = false;
		row.find("td.isMarried input")
			.addClass("is-invalid")
			.after('<div class="invalid-feedback">Yes or No</div>');
	}


	if (!/^\+?\d{10,15}$/.test(phoneNumber)) {
		isValid = false;
		row.find("td.phoneNumber input")
			.addClass("is-invalid")
			.after('<div class="invalid-feedback">Invalid Phone Number</div>');
	}

	if (salary === "") {
		isValid = false;
		row.find("td.salary input")
			.addClass("is-invalid")
			.after('<div class="invalid-feedback">Invalid Salary</div>');
	}

	if (!isValid) return;




	$.ajax({
		url: '/UploadCsv/Update',
		type: 'POST',

		data: { id: id, name: name, date: date, isMarried: isMarried, phoneNumber: phoneNumber, salary: salary },
		success: function () {

			row.find("td.name").text(name);
			row.find("td.date").text(date);
			row.find("td.isMarried").text(isMarried);
			row.find("td.phoneNumber").text(phoneNumber);
			row.find("td.salary").text(salary);

			row.find(".save-btn, .cancel-btn").hide();
			row.find(".edit-btn, .delete-btn").show();
		},
		error: function () {
			alert("Помилка оновлення!");
		}
	});
});
