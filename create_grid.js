



$(document).ready(function () {
    $('#radio_selection').change(function () {
        selected_ = $("input[name='draw_selection']:checked").attr('id');
        if (selected_ == "terrain_selection") {
            $("td").removeAttr('onclick');
            $("td").unbind('click');
            $("td").on("click", changeColor);
        } else if (selected_ == "npc_selection") {
            $("td").removeAttr('onclick');
            $("td").unbind('click');
            $("td").on("click", changeBorderNpc);
        } else {
            $("td").removeAttr('onclick');
            $("td").unbind('click');
            $("td").on("click", changeBorderConnection);
        }
    });
});

function generateGrid(rows, cols) {
    var grid = "<table id=\"grid\">";
    for (row = 1; row <= rows; row++) {
        grid += "<tr>";
        for (col = 1; col <= cols; col++) {
            var cell = "<td> </td>";
            grid += cell;
        }
        grid += "</tr>";
    }
    $("#tableContainer").empty();
    $("#tableContainer").append(grid);
    return grid;
}

function changeColor() {
    const $this = $(this);
    if ($this.hasClass("clicked")) {
        $this.removeClass("clicked");
    } else {
        $this.addClass("clicked");
    }
}

function changeBorderNpc() {
    const $this = $(this);
    if ($this.hasClass("npc-place-clicked")) {
        $this.removeClass("npc-place-clicked");
        $this.text("");
    } else {
        $this.text("npc");
        $this.addClass("npc-place-clicked");
    }
}

function changeBorderConnection() {
    const $this = $(this);
    if ($this.hasClass("connection-clicked")) {
        $this.removeClass("connection-clicked");
    } else {
        $this.addClass("connection-clicked");
    }
}

function makeCsv() {
    let zip = new JSZip();

    let name = $("input#Name").val();
    let terrain_filename = name + "_terrain.csv";
    let npc_filename = name + "_npcs.csv";
    let connection_filename = name + "_connections.csv";

    let folder = zip.folder(name);

    let terrain_array = createArrayFromTable("clicked");
    let npc_array = createArrayFromTable("npc-place-clicked");
    let connection_array = createArrayFromTable("connection-clicked");

    let terrain_csv = exportCsv(terrain_array);
    let npc_csv = exportCsv(npc_array);
    let connection_csv = exportCsv(connection_array);

    folder.file(terrain_filename, terrain_csv);
    folder.file(npc_filename, npc_csv);
    folder.file(connection_filename, connection_csv);
    zip.generateAsync({ type: "blob" })
        .then(function (content) {
            // see FileSaver.js
            saveAs(content, name + ".zip");
        });
}

function createArrayFromTable(class_filter) {
    let tableArray = [];

    $("table#grid tr").each(function () {
        let arrayOfThisRow = [];
        let tableData = $(this).find('td');
        if (tableData.length > 0) {
            tableData.each(function () {
                if ($(this).hasClass(class_filter)) {
                    arrayOfThisRow.push(1);
                } else {
                    arrayOfThisRow.push(0);
                }
            });
            tableArray.push(arrayOfThisRow);
        }
    });
    return tableArray;
}

function exportCsv(array) {
    let csvContent = array.map(e => e.join(",")).join("\n");
    return csvContent;
}