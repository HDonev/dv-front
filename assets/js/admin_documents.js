
//category items
var data = [
    { "cod_z": "1", "ime_z": "УКАЗАТЕЛИ" },
    { "cod_z": "2", "ime_z": "ЗАКОНИ" },
    { "cod_z": "3", "ime_z": "КОДЕКСИ" },
    { "cod_z": "4", "ime_z": "НАРЕДБИ" },
    { "cod_z": "5", "ime_z": "КОНВЕНЦИИ" },
    { "cod_z": "6", "ime_z": "СОЦИАЛНИ УСЛУГИ" },
    { "cod_z": "7", "ime_z": "КООРДИНАТОРИ" },
    { "cod_z": "8", "ime_z": "МЕТОДИЧЕСКИ У-Я" },
    { "cod_z": "9", "ime_z": "РАЗПОРЕД. ПИСМА" },
    { "cod_z": "10", "ime_z": "РЕШЕНИЯ ЕС" },
    { "cod_z": "11", "ime_z": "ПРИЛОЖЕНИЯ" },
    { "cod_z": "12", "ime_z": "МОЛБА ПО ЗЗДН" },
    { "cod_z": "13", "ime_z": "ДЕКЛАР. ПО ЗЗДН" },
    { "cod_z": "14", "ime_z": "ДРУГИ" },
   
    
];


    var categoryItems = '';
    var selectOptions = '';

    var searchCategory = [];

    //populate select option categories
    $.each(data, function (key, value) {
        categoryItems += '<li><a class="shadow rounded-2 p-2 m-2" href="#' + value.cod_z + '">' + value.ime_z + '<i class="p-2 fas fa-angle-double-right"></i></a>';
        selectOptions += '<option value="' + value.cod_z + '">' + value.ime_z + '</option>'
        searchCategory.push(value.cod_z);
    });

    getDocument(searchCategory);

    $('.categoryItems').html(categoryItems);
    $('#docCategorySelect').html('<option value="">Избери</option>' + selectOptions);


    //ajax call get document by category
    function getDocument(category) {
        $.each(category, function () {
            $.ajax({
                url: URL_TO_USE + '/get-all-documents?category=' + this,
                type: 'GET',
                success: function (response) {
                   
                    $.each(response, function () {
                        retriveFiles(this);
                        
                    });
                   
                },
                error: function (err) {
                    console.error('ERROR', err);
                }
            });
        });
    }


    //change content nav based on selected item
    $('#navDocuments a').click(function (e) {
        e.preventDefault();
        const targetId = $(this).attr('href').substring(1);
        $('.content .category-content').removeClass('visible').addClass('hidden');
        $('#' + targetId).removeClass('hidden').addClass('visible');


        $('#navDocuments a').removeClass('active-nav');
        $(this).addClass('active-nav');

    });

    //click outside unselect the nav items
    $('#navDocuments a').on('focusout', function (e) {
        $(this).removeClass('active-nav');

    });


//create ajax: POST for file
function saveDataIntoDb() {
    
    var selectedCategory = $('#docCategorySelect').val();

    //required to select category before upload file
    if (selectedCategory === '') {
        $('.error-messageFiles').text("Моля избери категория документ преди да добавиш файл!");
        $(this).val('');
    }
    else {
        $('.error-messageFiles').text("");
    }

    //get uploaded file
    const file = $('#formUploadDocument')[0].file.files[0];

    //check for existed file in table
    if (ckeckForExistedFile(file, selectedCategory)) {
        createModal("error", "Файл със същото име вече е добавен.", false, false);
        $('#navDocuments a[href="#' + selectedCategory + '"]').click();
        $('#docCategorySelect').val("");
        
        return false;
    }
    //if file  append it to object FormData
    if (file) {
        var formId = $("#formUploadDocument")[0];
        var formData = new FormData(formId);
        formData.append('file', file);
        formData.append('category', selectedCategory);

        //url POST
        const uploadUrl = URL_TO_USE + '/upload-document';

        //ajax call
        $.ajax({
            url: uploadUrl,
            method: 'POST',
            data: formData,
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (result) {
                retriveFiles(result);
                //when file is uploaded show in related category and then mark and open it
                $('#navDocuments a[href="#' + result.category + '"]').click();
               
            },
            error: function (err) {
                console.log(err);
                createModal("error","Грешка. Опитайте по-късно.",false,false);
            }
        });
    }
}


$('#adminDocuments').change(function () {
    saveDataIntoDb();
    $(this).val('');
});



//function retrieve saved files and set it into table
function retriveFiles(fileData) {
    
    var fileName = fileData.fileName;
    const row = $('<tr docId = "' + fileData.id + '">');
    row.append($('<td>').text(fileName));
    const actionCell = $('<td>').addClass('text-center');
    const previewButton = $('<a href="'+ fileData.uri_txt+'">').attr('type', 'button');
    const previewSpanButton = $('<span>').addClass('fa-stack detail-button');
    const previewIconButton = $('<i>').addClass('fa fa-square fa-stack-2x');
    let previewIiconWrapButton='';


    //if file is .pdf append icon preview, else append icon download
    if(fileData.contentType==='application/pdf'){
        previewIiconWrapButton = $('<i>').addClass('fas fa-search-plus fa-stack-1x fa-inverse');
        previewButton.prop("target", "_blank");
        previewSpanButton.attr({
            "data-bs-toogle": "tootip",
            "data-bs-placement": "left",
            "title":"Виж"
        });

    }else{
        previewIiconWrapButton = $('<i>').addClass('fas fa-download fa-stack-1x fa-inverse');
        previewSpanButton.attr({
            "data-bs-toogle": "tooltip",
            "data-bs-placement": "left",
            "title":"Свали"
        });
    }
    previewSpanButton.tooltip();
    previewButton.append(previewSpanButton);
    previewSpanButton.append(previewIconButton);
    previewSpanButton.append(previewIiconWrapButton);

    
  
    //append delete button
    const deleteButton = $('<a>').attr({
        'type': 'button',
        'data-bs-toogle':'tooltip',
        'data-bs-placement': 'right',
        'title':'Изтрий'
    });
    const deleteSpanButton = $('<span>').addClass('fa-stack delete-button');
    const deleteIconButton = $('<i>').addClass('fa fa-square fa-stack-2x');
    const deleteIconWrapButton = $('<i>').addClass('fas fa-trash fa-stack-1x fa-inverse');

    deleteButton.append(deleteSpanButton);
    deleteSpanButton.append(deleteIconButton);
    deleteSpanButton.append(deleteIconWrapButton);
    
    deleteButton.tooltip();

    //delete item when is clicked on the delete button
    deleteButton.click(function () {
        let docId = $(this).parent().parent().attr('docId');
        createModal("error", "Този файл ще бъде изтрит. Искаш ли да продължиш?", true, function () {
            deleteFile(docId);
            row.remove();
        });

    });


    //if html page is admin, add delete button, else add only preview button
    if($('table thead tr th.onlyAdmin').hasClass('onlyAdmin')){
        actionCell.append(previewButton, deleteButton);
       
    }
    else{
        actionCell.append(previewButton);
    }
    row.append(actionCell);
    const tableBody = $('#' + fileData.category + ' table tbody');
    tableBody.append(row);

  }


  //ajax call:DELETE
function deleteFile(docid){
    $.ajax({
        url: URL_TO_USE +'/delete-document-by-id?id='+docid,
        type: 'DELETE',
        success: function () {
            // console.log('successfully');
        },
        error: function (err) {
            console.error('ERROR', err);
        }
    });
}



function ckeckForExistedFile(file, category) {
    var exist = false;
    
    $("#" + category + " table tbody tr").each(function () {
        var file = $('#formUploadDocument')[0].file.files[0];
        var fileName=file.name;
        var rowFileName = $(this).find('td:eq(0)').text();
        if (fileName === rowFileName) {
                exist = true;
                return false;
            }
       
    });
    return exist;
}





