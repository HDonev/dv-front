$(document).ajaxStart(function () {
    window.app_spinner.show();

});
$(document).ajaxComplete(function () {
    window.app_spinner.hide();
});
//get loged user details
getLogedUserDetails();


/*A function that show content victim, perpetration or child based on radio buttons*/
$('input[type="radio"]').change(function () {

    var id = $(this).data('id');
    $('.person-stat').hide();
    $('.person-stat[show-for="' + id + '"]').show();

    let findedElement = $('.person-stat[show-for-stat]');
    $.each(findedElement, function () {
        if ($.inArray(id, $(this).attr('show-for-stat').replace(/\s+/g, '').split(',')) > -1) {
            $(this).show();
        }
    })
});
/* А function that add related Immediate order to Constant order */
function connectingImmediateDoc() {
    $('input[name="typeOrder"]').change(function () {
        if ($(this).val() === '18902') {
            $('#divAdditionalOptions').show();
            $('#judgeNum').attr('aria-required', true);
            $('#judgeDate').attr('aria-required', true);
            $('#protectOrderEndDate').attr('aria-required', true);
            $('#protectOrderEndDate').removeAttr('disabled');
        }
        else {
            $('#divAdditionalOptions').hide();
            $('#divImmDocument').hide();
            $('#judgeNum').removeAttr('aria-required');
            $('#judgeDate').removeAttr('aria-required');
            $('#protectOrderEndDate').removeAttr('aria-required');
            $('#protectOrderEndDate').attr('disabled',true);
        }
    });

    $('input[name="yesNo"]').change(function () {
        if ($(this).val() === 'Yes') {
            $('#addImmediateDoc').modal('show');
            $('#divForSearchImmDoc').show();
            $('#confirmImmDoc').hide();
            $('#clearResult').hide();
        }
        else {
            $('#divAdditionalOptions').children('.error-required').addClass('hidden');
            $('#divImmDocument').hide();
            $('#detailImmOrder').hide();

        }

    });

    $('#btnImmDoc').click(function () {
        if (requiredFields('divForSearchImmDoc')) {
            return false;
        }
        let number = $('#idImmDoc').val();
        let date = $('#searchImmDocDate').val()
        let judg = $('#orderJudgment > button > span').attr('cod_z');
        clearEditFormEvent('divForSearchImmDoc');
        $('#orderPersons >ul').remove()
        getOrderByNumYearAndJudge(number, date, judg, "btnImmDoc");
    });

    $('#clearResult').click(function () {
        $('#detailImmOrder').hide();
        $('.dropdown').addClass("contentOverModal");
        $('.modal-body').removeClass("modalBodyScroll");
        clearEditFormEvent('detailImmOrder');
        $('#orderPersons >ul').remove()
        $('#confirmImmDoc').hide();
        $('#clearResult').hide();

    });

    $('#confirmImmDoc').click(function () {
        let order_number = $('#modalOrderNumber').val();
        let sid_f = $('#modalOrderNumber').attr('sid_f');
        $('#addImmediateDoc').attr('sid_f', sid_f);
        $('#divImmDocument').show();
        $('.text-ImmDoc').attr('sid_f', sid_f)
        $('.text-ImmDoc').text(order_number);
    });

    $('.detail-immDoc').click(function () {
        let sid_f = $('.text-ImmDoc').attr('sid_f');
        if ($('#addImmediateDoc').attr('sid_f') === undefined && sid_f !== undefined) {
            getOrderBySidF(sid_f);
        }
        $('#addImmediateDoc').modal('show');
        $('#divForSearchImmDoc').hide();
        $('#confirmImmDoc').hide();
        $('#clearResult').hide();
    });

}
connectingImmediateDoc();


$('#goSearchOrder').on('click', function () {

    //if required
    if (requiredFields("divForEditForm")) {
        return false;
    }
    //if exist show message
    if (ckeckForExistedOrder()) {
        //clear values from edit form
        createModal("error", "Сигнал със същия номер е добавен в таблицата!", false, false);
        clearEditFormEvent('divForEditForm');
        return false;
    }
    let order_number = $('#searchDocOrderNumber').val();
    let order_year = $('#dateDocOrder').val();
    let judg = + $('#regCourtForJudgment > button > span').attr('cod_z');
    clearAllOrderData();
    getOrderByNumYearAndJudge(order_number, order_year, judg, "goSearchOrder");
    clearEditFormEvent('divForEditForm');
    clearTreeAndRelatedInputs('detailImmOrder')
    $('#alertsTable tbody').empty();
});


$.each($('#modalConfirmPerson').find('button[data-bs-dismiss="modal"]'), function () {
    $(this).on('click', function (event) {
        console.log($('#modalConfirmPerson #personIdegn').attr('sid'));
        personStorage.removePerson($('#modalConfirmPerson #personIdegn').attr('sid'));
    })
});

//add events
$('#dateBirthDay').parent().on('dp.change', function () {
    $('#modalConfirmPerson #personAge').val(getAgeFromBirthDay($('#dateBirthDay').val()));
});


function clearAllOrderData() {
    // ------------- clear session storage-------------------
    sessionStorage.removeItem('event_db');
    sessionStorage.removeItem('persons_db');
    sessionStorage.removeItem('persons_db_changed');

    // ------------- clear person data-------------------
    // $('input[type=radio][name=groupSearchByNationality]').prop('checked', false);
    // $('input[type=radio][name=groupSearchById]').prop('checked', false);
    $('#bgNationality').prop('checked', true).trigger('change');
    $('#egn_ench').val('');
    $('#dataPerson-table-body').empty();
    $('#dataPerson > div.container-fluid.main-container.p-5').removeClass('hidden');
    $('#kosService').parent().attr('show-for-stat', '');
    $('#searchPersonForm').show();

    // ------------- clear order data-------------------
    $('#divAdditionalOptions').hide();
    $.each($('[name="yesNo"]'), function () {
        $(this).removeAttr('disabled');
    });
    $('#divImmDocument').hide();
    $('.text-ImmDoc').text('');
    $('.text-ImmDoc').removeAttr('sid_f')
    $('[name="typeOrder"]').removeAttr("disabled");
    $('#podlRegNum').val('');
    $('#podlRegNum').removeAttr("readonly");
    $('#podlOrderDate').val('');
    $('#podlOrderDate').removeAttr("disabled");
    clearTreeAndRelatedInputs('podlForOrder');
    $('#podlForOrder').find('.btn-multiselect').removeAttr('disabled');
    $('#orderODMVR').val('').removeAttr('cod_z');
    $('#orderNum').val('');
    $('#orderNum').removeAttr("readonly");
    $('#orderDate').val('');
    $('#orderDate').removeAttr("disabled");
    $('#judgeNum').val('');
    $('#judgeNum').removeAttr("readonly");
    $('#judgeDate').val('');
    $('#judgeDate').removeAttr("disabled");
    $('#civilCaseNum').val('');
    $('#civilCaseNum').removeAttr("readonly");
    $('#civilCaseDate').val('');
    $('#civilCaseDate').removeAttr("disabled");
    clearTreeAndRelatedInputs('regCourtForCivilCase');
    $('#regCourtForCivilCase').find('.btn-multiselect').removeAttr('disabled');
    $('#distCourtForCivilCase').val('').removeAttr('cod_z');
    $('#protectOrderStartDate').val('');
    $('#protectOrderStartDate').removeAttr("disabled");
    $('#protectOrderEndDate').val('');
    $('#euProtectOrder > option[value=""]').prop('selected', true)
    $('#orderDescr').val('')
    $('#breakingOrdertableBody').empty()
    $('#breakingOrderData').parent().addClass('hidden')
    $('#docData').parent().addClass('hidden')
    $('#dataSluj-table-body').empty();
    $('#addImmediateDoc').removeAttr('sid_f');
    $('#оrderDetails').html('');
    $('#orderPersons').html('');
}


function getOrderByNumYearAndJudge(order_number, order_year, judg, button) {
    let urlSearchEvent = URL_TO_USE + `/order-number?orderNumber=${order_number}&orderYear=${order_year}&podl=${judg}`;
    if (checkAccessTokenExpiration()) {
        createModal("error", 'Вашата сесия е изтекла!', true, function () {
            sessionStorage.clear();
            window.location = "/";
        });
    }
    $.ajax({
        url: urlSearchEvent,
        dataType: 'json',
        success: function (data, textStatus, xhr) {
            if (xhr.status === 200) {
                if (button === "goSearchOrder") {
                    appendRetrievedEventIntoTable(data)
                } else {
                    appendOrderToModal(data);
                    $('#confirmImmDoc').show();
                    $('#clearResult').show();
                }
            } else if (xhr.status === 204) {
                if (button === "goSearchOrder") {
                    clearTreeAndRelatedInputs("divForEditForm")
                    createModal("error", "Такава заповед не съществува. Искате ли да добавите нова?", true, function () {
                        $("#divForTableResultOrders").addClass("hidden");
                        $("#divForEditForm").addClass("hidden");
                        $("#divForCreateForm").removeClass("hidden");
                        $("#orderNum").val(order_number);
                        $('#regCourtForCivilCase .option-tree').find('span[cod_z=' + judg + ']').click();
                    });
                } else {
                    clearTreeAndRelatedInputs("divForSearchImmDoc")
                    createModal("error", "Такава Заповед не съществува!!! ", false, false);
                }
            }
            //}
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function getRegnomBySidF(sidF) {
    let urlSearchEvent = URL_TO_USE + `/get-order-number-by-sidf?sid_f=${sidF}`;
    if (checkAccessTokenExpiration()) {
        createModal("error", 'Вашата сесия е изтекла!', true, function () {
            sessionStorage.clear();
            window.location = "/";
        });
    }
    fetch(urlSearchEvent).then((result) => {
        return result.text();
    }).then((data) => {
        $('.text-ImmDoc').text(data);
    }).catch((err) => {
        console.log(err);
    });
}


function getOrderBySidF(sidF) {
    let urlSearchEvent = URL_TO_USE + `/get-dv-by-sid?sid_dv=${sidF}`;
    if (checkAccessTokenExpiration()) {
        createModal("error", 'Вашата сесия е изтекла!', true, function () {
            sessionStorage.clear();
            window.location = "/";
        });
    }
    $.ajax({
        url: urlSearchEvent,
        dataType: 'json',
        success: function (data, textStatus, xhr) {
            if (xhr.status === 200) {
                appendOrderToModal(data);
                $('#addImmediateDoc').attr('sid_f', sidF);
            } else if (xhr.status === 204) {
                createModal("error", "Грешка опитайте по-късно!!! ", false, false);
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}