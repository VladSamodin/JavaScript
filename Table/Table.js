window.addEventListener("load", function() {
    var changeColor = function(e) {
        var target = e.target || e.srcElement;
        //if (target.tagName === "td") {
        target.classList.toggle("blue_cell");
        target.classList.toggle("green_cell");
        //}
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
