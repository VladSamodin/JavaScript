window.addEventListener("load", function() {
    var changeColor = function(e) {
        var target = e.target || e.srcElement;
        if (target.tagName === "TD") {
            if (target.classList.contains("blue_cell")) {
                target.classList.remove("blue_cell");
                target.classList.add("green_cell");
            }
            else {
                target.classList.remove("green_cell");
                target.classList.add("blue_cell");
            }
        }
    }

    var table = document.createElement('table');
    var row = document.createElement('tr');
    var i, cell;
    cell = document.createElement('td');
    cell.classList.add("blue_cell");
    row.appendChild(cell);
    for (i = 0; i < 8; i++) {
        row.appendChild(cell.cloneNode(false));
    }
    table.appendChild(row);
    for (i = 0; i < 8; i++) {
        table.appendChild(row.cloneNode(true));
    }
    document.getElementsByTagName('body')[0].appendChild(table);

    table.addEventListener("click", changeColor);

});
