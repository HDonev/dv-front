


//    /* A function that switch create or edit event*/
function createOrEdit() {

    $("#createButton").click(function () {
        $('#sectionCreateOrEdit').addClass("hidden");
        $("#divForCreateForm").removeClass("hidden");
        $('.title-edit-or-create').text("Регистриране");
        clearAllEventData();
    });

    $("#editButton").click(function () {
        $('#sectionCreateOrEdit').addClass("hidden");
        $("#divForEditForm").removeClass("hidden");
        $('.title-edit-or-create').text("Редактиране");
    });

    $('#btnBackCreate').click(function () {
        $('#sectionCreateOrEdit').removeClass("hidden");
        $("#divForCreateForm").addClass("hidden");
        $('.title-edit-or-create').text("Регистриране / Редактиране");
    });

    $('#btnBackEdit').click(function () {

        $('#sectionCreateOrEdit').removeClass("hidden");
        $("#divForEditForm").addClass("hidden");
        $('.title-edit-or-create').text("Регистриране / Редактиране");
    });
}
createOrEdit();

// button back go to edit form
$('#btnBackCreate').click(function () {
    $("#divForEditForm").removeClass("hidden");
    $("#divForCreateForm").addClass("hidden");
    $('#alertsTable tbody').empty();
});


/* А function that add new row */
$('.insertRow').on('click', function () {
    containerRows = $(this).closest('.divButton').prev('.container-rows');
    const row = $('<div class="row mb-1 divClone"></div>');
    const inputColName = $('<div class="form-group name col-md-4"></div>');
    const inputColPhone = $('<div class="form-group phone col-md-4"></div>');
    //const inputColPosition = $('<div class="form-group position col-md-3"></div>');

    const inputName = $('<input type="text" class="form-control name mt-1 add-row">');
    const inputPhone = $('<input type="text" class="form-control phone mt-1 add-row">');
    //const inputPosition = $('<input type="text" class="form-control position mt-1 add-row">');
    const buttonCol = $('<div class="form-group d-flex align-items-center col-md-1"></div>');
    const minusButton = $('<i class="fas fa-minus-square btn-minus"></i>');
    minusButton.attr({
        'data-bs-toogle': 'tooltip',
        'data-bs-placement': 'right',
        'title': "Премахни"
    });
    buttonCol.append(minusButton);
    

    if (containerRows.hasClass('controlEmployee')) {
        inputName.empty();
        inputPhone.empty();
        //inputPosition.empty();
        inputColName.append(inputName);
        inputColPhone.append(inputPhone);
        //inputColPosition.append(inputPosition);

        row.append(inputColName);
        row.append(inputColPhone);
        //row.append(inputColPosition);
        
        if (containerRows.find('.divClone1').length > 0) {
            row.append(buttonCol);
            minusButton.tooltip();
        }
       

    } else {

        inputName.empty();
        inputColName.append(inputName);
        row.append(inputColName);
        inputColName.removeClass("col-md-3");
        inputColName.addClass("col-md-8");

        if (containerRows.find('.divClone').length > 0) {
           
            row.append(buttonCol);
            minusButton.tooltip();
        }

    }

    containerRows.append(row);
    $('.btn-minus').on('click', function () {
        $(this).closest('.divClone').remove();
        $(this).closest('.divClone1').remove();
        $('.tooltip').removeClass('show');
           
        
    });

});

/* А function that change radio buttons based on nationality */
$('input[type=radio][name=groupSearchByNationality]').change(function () {

    if (this.id == 'bgNationality') {
        $('#bgID').prop('checked', true);
        $('#typeIdentity').show();
        $('#searchPerson').show();
        $('#divForfrID').hide();
        $('#addPersonWihoutID').hide();

    }
    else if (this.id == 'fgNationality') {
        $('#bgID').prop('checked', false);
        $('#divForfrID').show();
        $('#searchPerson').show();
        $('#typeIdentity').show();
        $('#addPersonWihoutID').hide();

    }
    else if (this.id == 'fgWithoutID') {
        $('#typeIdentity').hide();
        $('#searchPerson').hide();
        $('#addPersonWihoutID').show();

    }

});

//this id is on clear button
//$("#clearAllEditForm").click(function () {
//
//    $('#alertsTable tbody').empty();
//    clearEditFormEvent('divForEditForm');
//});



//clear edit search form
function clearEditFormEvent(formId) {
    clearTreeAndRelatedInputs(formId);
    $.each($('#' + formId + ' input'), function () {
        $(this).val("");
    });

}




//confirm protected order
$('#confirmProtectedOrder').click(function () {
    $('#divViolatedOrder').show();
});



//enable tooltip bootstrap 
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toogle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {

    return new bootstrap.Tooltip(tooltipTriggerEl)
})



//testing function, which make all value selectors readonly
function readONlyForm(formId) {

    //$("#searchPersonForm").remove();
    //$("#divForSearchPerson").removeClass("p-5").addClass("p-2");

    $('#' + formId).each(function () {
        $('input').attr("readonly", "true");
        $('select').prop("disabled", "true");
        $('.btn-multiselect').prop("disabled", "true").css("background-color", "transperent");
        $('#fileInput').prop("disabled", "true");
        $('textarea').prop("readonly", true);
        $('.delete-option').remove();
        $('.delete-button').remove();
        $('.insertRow').prop("disabled", "true");
        //this is for the test
        $('#saveOrder').remove();


    });

    $('.modal').each(function () {
        $(this).on("show.bs.modal", function () {
            $(this).find('.btn-minus').remove();
            $('input').attr("readonly", "true");
            $('select').prop("disabled", "true");
            $('.btn-multiselect').prop("disabled", "true");
            $('textarea').prop("readonly", true);
            $('.add-data-button').remove();
            $('.insertRow').remove();
            $('.btn-success').remove();
            $('.delete-option').remove();
            //$('input[name="radioSelectPerson"]').prop("disabled", true);
            $("*").filter(function () {
                return $(this).text() === "Избери";
            }).each(function () {

                $(this).text("Няма данни");
            });
        })

    });


}


//adding margin to all searching input

$('.option-tree').find('input').addClass('mb-2');

