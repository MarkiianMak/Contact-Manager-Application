function sortTable(columnIndex, isNumeric = false) {
	const table = document.querySelector("table");
	const tbody = table.tBodies[0];
	const rows = Array.from(tbody.rows);

	rows.sort((a, b) => {
		const cellA = a.cells[columnIndex].innerText.trim();
		const cellB = b.cells[columnIndex].innerText.trim();

		if (isNumeric) return Number(cellA) - Number(cellB);
		return cellA.localeCompare(cellB);
	});

	rows.forEach(row => tbody.appendChild(row));
}

