$(document).ready(function () {
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

    // $.each($('[use-hiera],[dependant-on]'), function (i, e) {
    //     // console.log('use-hiera: ' + $(e).attr('use-hiera'));
    //     // console.log('dependant-on: ' + $(e).attr('dependant-on'));
    //     if ($(e).attr('dependant-on') !== undefined && $(e).attr('dependant-on').length > 0) {
    //         if ($(e).attr('use-hiera') !== undefined && $(e).attr('use-hiera').length > 0) {
    //             $('#' + $(e).attr('dependant-on')).children('button').on('click', function () {

    //             })
    //         }
    //     }
    // });



    //load data from server about violanse alert
    $('#goSearchEvent').on('click', function () {

        //if required
        if (requiredFields("divForEditForm")) {
            return false;
        }

        //if exist show message
        if (ckeckForExistedEvent()) {
            //clear values from edit form
            createModal("error", "Сигнал със същия номер е добавен в таблицата!", false, false);
            clearEditFormEvent('divForEditForm');
            return false;
        }

        clearAllEventData();
        $('#alertsTable tbody').empty();


        //url for searching event

        // let urlSearchEvent = URL_TO_USE + '/get-signal-by-sid?sid=' + $('#eventNumber').val(); //TODO GIF URL FOR SEARCH REG_NOM
        let urlSearchEvent = URL_TO_USE + '/get-signal-by-regnom?regnom=' + $('#editEventNumber').val() + '&year=' + $('#editEvenDate').val() + '&podl=' + $('#podlReg > button > span').attr('cod_z');

        // window.app_spinner.show();
        $.ajax({
            url: urlSearchEvent, //uncomment for test 
            // url: "../assets/server_json/server_signal_incomming.json", //uncomment for load event data from json
            dataType: 'json',
            success: function (data, textStatus, xhr) {
                //if success
                if (xhr.status === 200) {
                    appendRetrievedEventIntoTable(data);
                    clearEditFormEvent('divForEditForm');
                }
                else if (xhr.status === 204) {
                    //if does not exist 
                    $('#divForTableResultEvents').addClass("hidden");
                    createModal("error", "Такъв сигнал не съществува. Искате ли да добавите нов?", true, function () {
                        $("#divForEditForm").addClass("hidden");
                        $("#divForCreateForm").removeClass("hidden");
                        $('#divForSearchPerson').removeClass('p-2').addClass('p-5');
                        $('#searchPersonForm').show();
                        clearAllEventData();
                        //tuk trqbva da se zatvorqt vsicki acordioni i da se pokaje samo tozi za licata!
                        $('#eventNumber').val($('#editEventNumber').val());
                        $('#docPodl .option-tree').find('span[cod_z="'+$('#podlReg').find('input').val()+'"]').click();
                        clearEditFormEvent('divForEditForm');
                    });
                }
                //loadEventData(data);
            },
            error: function (err) {
                createModal("error", "Възникна грешка. Опитайте по-късно.", false, false)
                // window.app_spinner.hide();
                console.log(err);
            }
        });
        //$("#divForEditForm").addClass("hidden");
        //$("#divForCreateForm").removeClass("hidden");


        // $('#dataPerson').addClass('show');  
    });

    $.each($('#modalConfirmPerson').find('button[data-bs-dismiss="modal"]'), function () {
        $(this).on('click', function (event) {
            console.log($('#modalConfirmPerson #personIdegn').attr('sid'));
            personStorage.removePerson($('#modalConfirmPerson #personIdegn').attr('sid'));
        })
    })

    //add events
    $('#dateBirthDay').parent().on('dp.change', function () {
        $('#modalConfirmPerson #personAge').val(getAgeFromBirthDay($('#dateBirthDay').val()));
    })

});


//load person data
function loadPersonData() {

    var inputPersonID = $('#egn_ench').val();
    var regex = /^\d{10}$/;
    var isValid = false;
    if (regex.test(inputPersonID)) {
        if (!validationEGN(inputPersonID) && !validationENCH(inputPersonID)) {
            createModal('error', 'Невалидно ЕГН/ЕНЧ.', false, false);
            isValid = false;
        }
    } else {
        createModal('error', 'Дължината на ЕГН/ЕНЧ не отговаря', false, false);
        isValid = false;
    }

    $.each($('#modalConfirmPerson').find('.readable'), function () {
        $(this).removeClass('readable');
        $(this).prop('readonly', true);
    });
    $.each($('#modalConfirmPerson').find('.enableble'), function () {
        $(this).removeClass('enableble');
        $(this).prop('disabled', true);
    });

    $('#modalConfirmPerson').find('h5:first').text('Потвърди лицето');
    // .on('click', function(){
    //     personStorage.removePerson($('#modalConfirmPerson #personIdegn').attr('sid'));
    // })

    // $('#dateBirthDay').parent().off('dp.change');
    //check for valid searching parameters
    let processingPersonByParameters = checkForSearchingParameters();
    if (processingPersonByParameters !== undefined && processingPersonByParameters.length === 3) { // lice s identifikator
        let typePerson = processingPersonByParameters[0] * 1;
        let typeIdentifier = processingPersonByParameters[1] * 1;
        let identifier = processingPersonByParameters[2];
        let isPersonSearched = false;
        // need to check for person in localStorage before send ajax request!
        // if(sessionStorage.getItem('persons_db') !== null){
        //     personStorage.isExist()
        // }
        //url for searching person
        let urlSearchPerson = URL_TO_USE + '/get-person-by-identifier?identifier=' + identifier + '&typeIdentifier=' + typeIdentifier + '&typePerson=' + typePerson;
        // let urlSearchPerson = 'http://10.252.14.24:9090/domestic-violence/get-person-by-identifier?identifier=' + ident + '&typeIdentifier=' + typeIdentifier + '&typePerson=' + typePerson;
        $.ajax({
            url: urlSearchPerson, //uncomment for test BDS
            // url: "../assets/server_json/server_lice_incomming.json", //uncomment for load person data from json
            dataType: 'json',
            success: function (data) {

                //     processingPersonDecode(data).then((res) => {
                //         console.log(res)
                //         // setBasePersonData(typePerson, res);
                // });
                if (data !== undefined) {
                    let showConfurm = true;
                    setBasePersonData(typePerson, data, showConfurm);
                } else {
                    createModal("error", "Лицето, което търсите не е намерено!", false, false);
                }
            }
        })
    } else if (processingPersonByParameters !== undefined && processingPersonByParameters[0] * 1 === -1) { //lice bez identifikator
        isValid = true;
        $('#modalConfirmPerson').find('.person-bg').hide();
        $('#modalConfirmPerson').find('.person-cuz').hide();
        $('#modalConfirmPerson').find('.person-noid').show();
        $('#imagePersonId').attr('src', "../assets/img/no_image.jpg");
        var myModal = new bootstrap.Modal(document.getElementById('modalConfirmPerson'));
        myModal.show();
        $('#modalConfirmPerson').find('h5:first').text('Въвеждане на чужденец без идентификатор');
        $.each($('#modalConfirmPerson').find('[readonly]'), function () {
            if ($(this).attr('id') !== 'personAge') {
                if ($(this).is(':visible')) {
                    $(this).addClass('readable');
                    $(this).removeAttr('readonly');
                }
            }
        });
        $.each($('#modalConfirmPerson').find('[disabled]'), function () {
            if ($(this).is(':visible')) {
                $(this).addClass('enableble');
                $(this).removeAttr('disabled');
            }
        });
    }
}
//za personProcessing.js
function checkForSearchingParameters() {
    let identifier = $('#egn_ench').val();
    let typePerson, typeIdentifier;
    $.each($('#searchPersonForm').find('.form-check :checked'), function (idx, item) {
        switch ($(item).attr('name')) {
            case "groupSearchByNationality":
                if ($(item).attr('id') === "bgNationality") {
                    typePerson = "1";
                }
                if ($(item).attr('id') === "fgNationality") {
                    typePerson = "2";

                }
                if ($(item).attr('id') === "fgWithoutID") {
                    typePerson = "-1";
                };

                break;
            case "groupSearchById":
                if ($(item).attr('id') === "bgID") {

                    typeIdentifier = "1";
                }
                if ($(item).attr('id') === "fgID") {
                    typeIdentifier = "0";
                }
                break;
            default:
                createModal("error", "Грешни идентификатори за търсене!", false, false);
                break;
        }
    });
    let processingPersonByParameters = [];
    if (typePerson === '-1') { // withotid
        createModal("error", "Моля попълни формата внимателно!", false, false);
        // $('#fgnNameLatin').focusout(function(){
        //     $('#fgnNameCirilic').removeAttr('readable').attr('readonly','');
        //     $('#personSex').removeAttr('enableble').attr('disabled','');
        //     $('#typeDocFgn').removeAttr('enableble').attr('disabled','');
        //     $('#numDocFgn').removeAttr('readable').attr('readonly','');
        //     $('#issueDateDocFgn').removeAttr('readable').attr('readonly','');
        //     $('#exDateDocFgn').removeAttr('readable').attr('readonly','');
        //     console.log('check for lice!!!!!');
        //     if($('#fgnNameLatin').val().length > 6 && $('#personNationality option:selected').attr('cod_z') !== undefined && $('#dateBirthDay').val() !== ''){
        //         let channgedDate = $('#dateBirthDay').val();

        //         let urlSearchFgWithoutID = URL_TO_USE + '/request-foreigner?name='+$('#fgnNameLatin').val()+'&birthDate='+channgedDate+'&nationality='+$('#personNationality option:selected').attr('cod_z') *1;

        //         $.ajax({
        //             url: urlSearchFgWithoutID, //uncomment for test 
        //             // url: "../assets/server_json/server_signal_incomming.json", //uncomment for load event data from json
        //             dataType: 'json',
        //             success: function (data) {
        //                console.log(data)
        //                if (!Array.isArray(data)) {
        //                 data = [data];
        //                }
        //                $.each(data, function(){
        //                 console.log(this.person)
        //                })

        //             },
        //             error: function (err) {
        //                 // window.app_spinner.hide();
        //                 console.log(err);
        //             }
        //         });
        //     } else {
        //         return;
        //     }
        // })

        if (checkForAddedPersons(typePerson, typeIdentifier, identifier)) {
            createModal("error", "Лицето вече е добавено към събитието!", false, false);
            return;
        }

        processingPersonByParameters.push(typePerson);
        return processingPersonByParameters;
    } else {
        if ($('#searchPersonForm').find('.form-check :checked').length < 2 || identifier === '') {
            createModal("error", "Непълни данни за търсене на лице!", false, false);
            return;
        }

        //check for added Persens in table
        if (checkForAddedPersons(typePerson, typeIdentifier, identifier)) {
            createModal("error", "Лицето вече е добавено към събитието!", false, false);
            return;

        }
        processingPersonByParameters.push(typePerson, typeIdentifier, identifier);
        return processingPersonByParameters;
    }
}
//za personProcessing.js
//check is person added in table
function checkForAddedPersons(typePerson, typeIdentifier, identifier) {
    //neew to implement by EGN/ENCH in table
    let personIsAdded = false;
    if ($('#dataPerson-table-body > tr > td:nth-child(3)').length > 0) {
        $('#dataPerson-table-body > tr ').each(function () {
            if ($(this).attr('typep') * 1 === typePerson * 1 && typePerson * 1 === 1 && typeIdentifier * 1 === 1) { //bg s egn
                if ($(this).children('td:nth-child(3)').attr('egn') + '' === identifier + '') {
                    personIsAdded = true;
                    return;
                }
            }
            if ($(this).attr('typep') * 1 === typePerson * 1 && typePerson * 1 === 2) { //cuz
                if (typeIdentifier * 1 === 1) { //s egn
                    if ($(this).children('td:nth-child(3)').attr('egn') + '' === identifier + '') {
                        personIsAdded = true;
                        return;
                    }
                } else if (typeIdentifier * 1 === 0) {//s enc
                    if ($(this).children('td:nth-child(3)').attr('enc') + '' === identifier + '') {
                        personIsAdded = true;
                        return;
                    }
                }
            }
        })
    } else {
        $('#dataPerson-table-body > tr ').each(function () {
            //imena
            let imena_check = $(this).children('td:nth-child(2)').children('span').remove().html();
            imena_check = imena_check.split('<br>');
            console.log('TUK TRQBVA DA E PROVERKATA ZA LICA. TARSI PO TOZI STRING! v violence_alert.js') // remove this row!!!!!!
            console.log(imena_check);
        })
    }
    return personIsAdded;
}


//za common.js
function getLogedUserDetails() {
    let slujInfo = sessionStorage.getItem("id_token");
    if (slujInfo) {
        isAuthenticated = true;
        let details = parseJWT(slujInfo);
        $('#slujName').val(details.user.name + " " + details.user.surname);
        $('#slujName').attr('slujCode', details.user.sidSl);
        $('#slujName').attr('slujLSid', details.user.sidO);
        $('#slujName').attr('slujLPnr', details.user.pnrO);
        $('#slujPodl').val(details.user.subdivisionTxt);
        $('#slujPodl').attr('podlCode', details.user.subdivisionCode);
    }
}
function clearDropDown(target) {
    $(target + ' .option-tree .selected-option.leaf').removeClass('selected-option');
    $(target + " .dropdown-menu .option-tree ul .node").removeClass('toShow').removeClass('toHide');;
    $(target + " .dropdown-menu .option-tree ul .leaf").removeClass('toShow').removeClass('toHide');
    $(target + " .dropdown-menu .option-tree ul li i.fa-minus-square").removeClass('fa-minus-square').addClass('fa-plus-square')
    $(target + " .dropdown-menu .option-tree ul li").show()
    $(target + " .dropdown-menu .option-tree ul.ulnode").hide()
    $(target + ' button').find('span.form-span-single-select').removeClass('form-span-single-select').text('Избери').removeAttr('cod_z');
    $(target + ' button').find('input[type="hidden"]').val('');
}



function clearAllEventData() {
    sessionStorage.removeItem('event_db');
    sessionStorage.removeItem('persons_db');
    sessionStorage.removeItem('persons_db_changed');

    // $('input[type=radio][name=groupSearchByNationality]').prop('checked', false);
    // $('input[type=radio][name=groupSearchById]').prop('checked', false);
    $('#bgNationality').prop('checked', true).trigger('change');
    $('#egn_ench').val('');
    $('#dataPerson-table-body').empty();
    $('#eventNumber').val('').attr('readonly', false);
    $('#evenDate').val('').prop("disabled", false);
    $('#docPodl').find('.btn-multiselect').prop("disabled", false);

    clearDropDown('#docPodl');
    $('#docEventODMVR').val('').removeAttr('cod_z');
    clearTreeAndRelatedInputs('eventAddress');
    $('#eventObl').val('').removeAttr('cod_z');
    $('#eventObs').val('').removeAttr('cod_z');
    // $('#eventUlica').empty();
    // $('#eventUlica').append('<option value="" disabled="" selected="">Избери</option>');

    $('#eventNom').val('');
    $('#eventVhod').val('');
    $('#eventEtaj').val('');
    $('#eventApart').val('');
    $('#eventAdrOpis').val('');


    $('#eventDescr').val('');
    clearTreeAndRelatedInputs('eventPodl');
    $('#eventODMVR').val('').removeAttr('cod_z');
    $('#eventTime').val('');
    $('#eventPlace option:nth-child(1)').prop('selected', true);
    $('#eventFrom option:nth-child(1)').prop('selected', true);
    $('#evenReceivingTime').val('');
    $('#evenData').find('input.add-row').val('')
        .removeAttr('sid_o pnr_d cod_t readonly')
        .closest('.divClone')
        .find('.btn-minus').parent().remove();
    $('#evenData').find('.divClone').not(':first').remove();
    $('#docData').parent().addClass('hidden');
    $('#docType option:nth-child(1)').prop('selected', true);
    $('#docEventDate').val('');
    $('#fileList').empty();
    $('#dataSluj-table-body').empty();


    // $('#eventAdrOpis').val('');
    // $('#eventAdrOpis').val('');
    // $('#eventAdrOpis').val('');
    // $('#eventAdrOpis').val('');
    // $('#eventAdrOpis').val('');




}

/////If need this!!! se return data from server!!!
//function to convert date and chas from backEdn to frontEnd and vice versa
// const dateCProcessing = {
//     loadDate: function (dateStr, casStr) {
//         //from dateStr ->"2023-11-20" to "20.11.2023"
//         //casStr 14:16:00
//         let returnDate = {};
//         if (dateStr.substring(4, 5) === dateStr.substring(7, 8)) {
//             returnDate['date'] = dateStr.substring(8, 10) + '.'
//                 + dateStr.substring(5, 7) + '.'
//                 + dateStr.substring(0, 4);
//             if (casStr !== undefined) {
//                 returnDate['cas'] = casStr.substring(0, 5);
//             }
//         } else {
//             returnDate['date'] = "Date format is wrong!";
//         }

//         return returnDate;
//     },
//     saveDate: function (dateCasStr) {
//         let returnDate = {};
//         let splitedTimeVars = dateCasStr.split(' ');
//         if (splitedTimeVars.length > 0 && splitedTimeVars.length < 3) {
//             returnDate['date'] = splitedTimeVars[0].substring(6, 10) + '-'
//                 + splitedTimeVars[0].substring(3, 5) + '-'
//                 + splitedTimeVars[0].substring(0, 2);
//             if (splitedTimeVars.lenth === 2) {
//                 returnDate['cas'] = splitedTimeVars[1] + ':00';
//             }
//         } else {
//             returnDate['date'] = "Date-Cas format is wrong!";
//         }
//         return returnDate
//     }
// }


// const processingDecode = async (person) => {
//     //base data
//     return new Promise((resolve, reject) => {
//         if (person.photo === undefined || person.photo === "") {
//             person.photo = "../assets/img/no_image.jpg";
//         }
//         if (person.TYPE_OBJECT * 1 === 1) { //bg
//             person["fullName"] = person.ime + ' ' + person.prezime + ' ' + person.familno;
//             person.pol_txt = findTextByCodFromStorage(JSON.parse(localStorage.getItem('pol')).hiera, getPolFromEgn(person.egn));
//             person["graj"] = 6067;
//             person["graj_txt"] = findTextByCodFromStorage(JSON.parse(localStorage.getItem('grajdanstvo')).hiera, 6067);
//         } else { //chujdenec
//             person["fullName"] = person.imek;
//             person.pol_txt = findTextByCodFromStorage(localStorage.getItem('pol').hiera, person.pol * 1);
//             person["graj_txt"] = findTextByCodFromStorage(JSON.parse(localStorage.getItem('grajdanstvo')).hiera, person.graj);
//             person["nacBel_txt"] = findTextByCodFromStorage(JSON.parse(localStorage.getItem('grajdanstvo')).hiera, person.nacBel);;
//             person["vidDok_txt"] = '_HIERA IS NOT SET';
//         }
//         if (person.hasOwnProperty('fdv')) {
//             let fdv = person.fdv;
//             //decode fdv if needed
//             // fdv.rol_o -- rolq na liceto
//             if (fdv.hasOwnProperty('fdvOpList')) {
//                 let fdvOpList = fdv.fdvOpList;
//                 if (!Array.isArray(fdvOpList)) {
//                     fdvOpList = [fdvOpList];
//                 }
//                 $.each(fdvOpList, async function () {
//                     let fdvOpObject = this;
//                     //decode fdvOpObject if needed
//                     fdvOpObject["dtip_txt"] = '_DEKODIRAN DTIP_LICE_MOMENT';
//                     fdvOpObject["stoinost_txt"] = '_DEKODIRANA STOINOST_LICE_MOMENT';
//                 });
//             }

//         }
//         //slovesno
//         if (person.hasOwnProperty('personSlovesnoList')) {
//             let personSlovesnoList = person.personSlovesnoList;
//             if (!Array.isArray(personSlovesnoList)) {
//                 personSlovesnoList = [personSlovesnoList];
//             }
//             $.each(personSlovesnoList, async function () {
//                 let personSlovesnoObject = this;
//                 //decode personSlovesnoObject if needed
//                 if (!personSlovesnoObject.hasOwnProperty('dtip_txt')) {
//                     personSlovesnoObject["dtip_txt"] = '_DEKODIRAN DTIP_SLOVESNO';
//                 }
//                 personSlovesnoObject["stoinost_txt"] = '_DEKODIRANA STOINOST_SLOVESNO';
//             });

//         }
//         //adresi
//         let promises = [];
//         if (person.hasOwnProperty('addresses')) {
//             let addresses = person.addresses;
//             if (!Array.isArray(addresses)) {
//                 addresses = [addresses];
//             }
//             let addressesArray = [];

//             $.each(addresses, function () {
//                 promises.push(addressProccessing(this).then(data => addressesArray.push(data)));
//             });
//             Promise.all(promises).then(() => {
//                 delete person.addresses;
//                 person['addresses'] = addressesArray;
//             });


//         }

//         Promise.all(promises).then(() => {
//             resolve(addChangePersonInStorage(person));
//         });
//     });
// };





