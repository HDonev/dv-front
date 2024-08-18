/* A function that uploads a local file into a table.
   Appends buttons preview and delete.  */


$('#fileInput').on('change', function () {

    var selectedOption = $('#docType option:selected').val();

    if (selectedOption === '') {
        $('.error-messageFiles').text("Моля избери тип документ преди да добавиш файл!");
        $(this).val('');
    }
    else {
        $('.error-messageFiles').text("");
        const sidF = $('#tableBody >tr').attr('sid_f');
        const fileInput = $('#fileInput')[0];
        const file = fileInput.files[0];
        const fileName = file.name;
        const typeDocument = $('#docType option:selected').val();


        var formData = new FormData();
        formData.append('file', file);
        formData.append('documentKind', typeDocument);
        formData.append("sidF", sidF);


        //url POST
        const uploadUrl = URL_TO_USE + '/upload-document-dv';
        //ajax call
        $.ajax({
            url: uploadUrl,
            method: 'POST',
            data: formData,
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (result, textStatus, xhr) {
                if (xhr.status === 200 && result != undefined) {
                    processingAppendFileIntoTable(result);
                }
            },
            error: function (err) {
                console.log(err);
                createModal("error", "Грешка. Опитайте по-късно.", false, false);
            }
        });

    }


});


function loadUploadedFiles(uploadedDocuments) {
    if (!Array.isArray(uploadedDocuments)) {
        uploadedDocuments = [uploadedDocuments];
    }
    $.each(uploadedDocuments, function () { processingAppendFileIntoTable(this) });
}


//ajax call:DELETE
function deleteUploadedFile(doc_url) {
    $.ajax({
        url: doc_url,
        type: 'DELETE',
        success: function (data, textStatus, xhr) {
            if (xhr.status === 204) {
                console.log(xhr.status)
            }
        },
        error: function (err) {
            console.error('ERROR', err);
        }
    });
}
function processingAppendFileIntoTable(result) {


    const row = $('<tr sid_f="' + result.sid_f + ' pdr_d="' + result.pnr_d + '">');
    row.append($('<td>').text(result.file_name));
    row.append($(`<td>${findTextByCodFromStorage(JSON.parse(localStorage.getItem($('#docType').attr('use-hiera'))).hiera, result.document_kind)}</td>`));
    const actionCell = $('<td>').addClass('text-center');


    //append preview button
    const previewButton = $('<a href="' + result.uri_txt + '">').attr('type', 'button');
    const previewSpanButton = $('<span>').addClass('fa-stack detail-button');
    const previewIconButton = $('<i>').addClass('fa fa-square fa-stack-2x');
    //const previewIiconWrapButton = $('<i>').addClass('fa fa-search-plus fa-stack-1x fa-inverse');
    let previewIiconWrapButton = '';
    //if file is .pdf append icon preview, else append icon download
    if (result.content_type === 'application/pdf') {
        previewIiconWrapButton = $('<i>').addClass('fas fa-search-plus fa-stack-1x fa-inverse');
        previewButton.prop("target", "_blank");
        previewSpanButton.attr({
            "data-bs-toogle": "tootip",
            "data-bs-placement": "left",
            "title": "Виж"
        });

    } else {
        previewIiconWrapButton = $('<i>').addClass('fas fa-download fa-stack-1x fa-inverse');
        previewSpanButton.attr({
            "data-bs-toogle": "tooltip",
            "data-bs-placement": "left",
            "title": "Свали"
        });
    }
    previewButton.append(previewSpanButton);
    previewSpanButton.append(previewIconButton);
    previewSpanButton.append(previewIiconWrapButton);
    previewSpanButton.tooltip();

    //open new window and preview document when is clicked on the previewbutton 
    // previewButton.click(function () {
    //     window.open(URL.createObjectURL(result, '_blank'));
    // });




    //append delete button
    const deleteButton = $('<a>').attr({
        'type': 'button',
        'data-bs-toogle':'tooltip',
        'data-bs-placement': 'right',
        'title':'Изтрий',
        'del_url': result.uri_txt
    });
    const deleteSpanButton = $('<span>').addClass('fa-stack delete-button');
    const deleteIconButton = $('<i>').addClass('fa fa-square fa-stack-2x');
    const deleteIconWrapButton = $('<i>').addClass('fas fa-times fa-stack-1x fa-inverse');

    deleteButton.append(deleteSpanButton);
    deleteSpanButton.append(deleteIconButton);
    deleteSpanButton.append(deleteIconWrapButton);

    deleteButton.tooltip();

    //delete item when is clicked on the delete button
    deleteButton.click(function () {
        let del_url = $(this).attr('del_url');
        createModal("error", "Този файл ще бъде изтрит. Желате ли да продължите?", true, function () {
            deleteUploadedFile(del_url);
            row.remove();
        });
    });

    actionCell.append(previewButton, deleteButton);
    row.append(actionCell);

    $('#fileListTable tbody').append(row);

    fileInput.value = '';
    $('#docUploadNumber').val("");
    $('#docType').val("");
    $('#docUploadDate').val("");

}