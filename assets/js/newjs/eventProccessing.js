$(document).ready(function () {

    $('#saveData').on('click', function () {

        //not going next logic before fixed the required errors
        if (requiredFields('divForCreateForm')) {

            var formId = 'divForCreateForm';

            focusOnError(formId);
            return false;


        }
        //test for collecting Data for ins/upd
        collectViolanceAlertData();

    });
});


function collectViolanceAlertData() {
    //proveri logikata!!!!
    // if (sessionStorage.getItem('persons_db_changed') === null){
    // $('#searchEventNumber').val('661103'); // remove
    // $('#goSearchEvent').click(); // remove
    // return;
    // } else
    if (sessionStorage.getItem('persons_db_changed') === null || JSON.parse(sessionStorage.getItem('persons_db_changed')).length < 2) {
        console.log('Nedostatachno danni!!!');
        return;
    }
    let personList = JSON.parse(sessionStorage.getItem('persons_db_changed'));
    $.each(personList, function () {
        if (this.sid_o < 0) {
            delete this.sid_o;
            this.operation = 1;
        }
    })

    let objToSave = {}
    objToSave['personList'] = personList;
    let todayDate = new Date();
    const PODSIST = 34000;
    const DATE_NOW = (todayDate.getDate() < 10 ? '0' + todayDate.getDate() : todayDate.getDate()) + '.' + (todayDate.getMonth() + 1 < 10 ? '0' + (todayDate.getMonth() + 1) : todayDate.getMonth() + 1) + '.' + todayDate.getFullYear();
    const TIME_NOW = ((todayDate.getHours()) < 10 ? '0' + (todayDate.getHours()) : + todayDate.getHours()) +
        ':' + ((todayDate.getMinutes()) < 10 ? '0' + (todayDate.getMinutes()) : + todayDate.getMinutes()) +
        ':' + ((todayDate.getSeconds()) < 10 ? '0' + (todayDate.getSeconds()) : + todayDate.getSeconds());
    let ddList = [];
    let ddOpList = [];
    let fdvOpList = [];
    let fdvDLst = [];
    let fdv = {
        "sid_f": 0,
        "pnr_f": 0,
        "fact": 8244, // proveren i potvarden signa
        "cod_t": $('#eventNumber').attr('type-obj') * 1,
        "sid_o": 0,
        "pnr_o": 0,
        "rol_o": $('#eventNumber').attr('vid-doc-type-rol') * 1, // 8207 dokladna zapiska. nqma 7215 doklad v sys_r
        "mrk_akt": "Y",
        "podsist": PODSIST,
        "dat": DATE_NOW,
        "cas": TIME_NOW,
        "operation": 1
    }

    //     let fdvOpItemTMP = function(){ 
    //         return{
    //         "sid_f": 0,
    //         "pnr_f": 0,
    //         "pnr_d": 0,
    //         "cod_t": $('#eventNumber').attr('type-obj') * 1,
    //         "dtip": 0,
    //         "stoinost": 0,
    //         "opisanie": "",
    //         "mrk_akt": "Y",
    // "dat_vav": DATE_NOW,
    //         "operation": 1
    //     }
    // }
    //     // //ima mnojestvenost

    //     //fdvOpList.push(fdvOpItem);
    //     //fdv['fdvOpList'] = fdvOpList;

    let fdvDItemTMP = function () {
        return {
            "sid_f": 0,
            "pnr_f": 0,
            "pnr_d": 0,
            "cod_t": 0,
            "dtip": 0,
            "mrk_akt": "Y",
            "dat": "",
            "cas": "",
            "operation": 1
        }

    }

    let ddItem = {
        "sid_o": 0,
        "pnr_o": 0,
        "vid_dk": 0,
        "vid_dd": $('#eventNumber').attr('vid-doc-type') * 1,
        "reg_nom": $('#eventNumber').val(),
        "pod_reg": $('#docPodl').find('span').attr('cod_z') * 1,
        "otnosno": $('#eventDescr').val(),
        "mrk_akt": "Y",
        "dat_reg": $('#evenDate').val(),
        // "dat_vav": DATE_NOW, // momenta datata na dokumenta shte se zapisva tuk. trqbva da se izmesti posle
        "operation": 1
    }



    //ima poleta, koito neznam kade da sloja : ids in violence_alert.html -> eventPodl, eventTime, eventPlace, eventFrom, evenReceivingTime, служители посетили сигнала
    // docEventNumber, docType, docEventDate, фаилове: fileInput
    let ddOpItemTMP = function () {
        return {
            "sid_o": 0,
            "pnr_o": 0,
            "pnr_d": 0,
            "dtip": 0,
            "stoinost": 0,
            "mrk_akt": "Y",
            "dat_vav": DATE_NOW,
            "opisanie": "",
            "operation": 1
        }
    }

    //opisanie na eventa
    if ($('#eventDescr').val().trim() !== '') {
        let event_ddOpItem = new ddOpItemTMP();
        event_ddOpItem.dtip = $('#eventDescr').attr('data-type-dtip') * 1;
        event_ddOpItem.stoinost = $('#eventDescr').attr('type-dtip-stoinost') * 1;
        event_ddOpItem.opisanie = $.trim($('#eventDescr').val());
        ddOpList.push(event_ddOpItem);
    }
    //podelenie na izvarshvane
    if ($('#eventPodl').find('button span').attr('cod_z') !== undefined) {
        let event_ddOpItem = new ddOpItemTMP();
        event_ddOpItem.dtip = $('#eventPodl').find('button').attr('data-type-dtip') * 1;
        event_ddOpItem.stoinost = $('#eventPodl').find('button span').attr('cod_z') * 1;
        ddOpList.push(event_ddOpItem)
    }
    //nachin na postypvane na signala
    if ($('#eventFrom option:selected').attr('cod_z') !== undefined) {
        let event_ddOpItem = new ddOpItemTMP();
        event_ddOpItem.dtip = $('#eventFrom').attr('data-type-dtip') * 1;
        event_ddOpItem.stoinost = $('#eventFrom option:selected').attr('cod_z') * 1;
        ddOpList.push(event_ddOpItem)
    }
    //slijiteli posetili signala
    $.each($('#attendedSluj').find('input'), function () {
        if ($(this).val() !== null && ($.trim($(this).val()).length > 0)) {
            let attended_sluj = new ddOpItemTMP();
            attended_sluj.dtip = $('#attendedSluj').attr('data-type-dtip') * 1;
            attended_sluj.stoinost = $('#attendedSluj').attr('type-dtip-stoinost') * 1;
            attended_sluj.opisanie = $.trim($(this).val());
            ddOpList.push(attended_sluj);
        }
    });

    //for time incident, signal incomming
    $.each($('input[dtip]'), function () {
        if ($(this).val() !== '') {
            let setTime = new fdvDItemTMP();
            let splitedTime = $(this).val().split(' ');
            setTime.cod_t = $('#eventNumber').attr('type-obj') * 1
            setTime.dtip = $(this).attr('dtip') * 1;
            setTime.dat = splitedTime[0];
            setTime.cas = splitedTime[1];
            fdvDLst.push(setTime);
        }
    });
    if (fdvDLst.length > 0) {
        fdv['fdvDLst'] = fdvDLst;
    }


    if (ddOpList.length > 0) {
        ddItem['ddOpList'] = ddOpList;
    }
    ddItem['fdv'] = fdv;
    ddList.push(ddItem);
    objToSave['ddList'] = ddList;

    let employeeList = [];
    //obraotka na slujitelite. da ne se povtarqt s edin i sashti sid!


    let slujInfo = sessionStorage.getItem("id_token");
    let details;
    if (slujInfo) {
        details = parseJWT(slujInfo);
    }


    let employee = {
        "operation": 1,
        "sid_o": details.user.sidO * 1,
        "pnr_o": details.user.pnrO * 1,
        "sid_sl": details.user.sidSl * 1,
        "egn": details.user.egn,
        "ime": details.user.name,
        "prezime": details.user.middleName,
        "familno": details.user.surname,
        "tip_sl": 287, // ot kade da go vzema
        "podl_loc": details.user.subdivisionCode,
        "rdvr": 513,
        "dljn": details.user.position,
        "podl_sl": details.user.subdivisionCode,
        "mrk_akt": details.user.mrkAkt,

    };

    //need to check employeeList from server.
    //if employ sid is exist don't push in array!!!
    employeeList.push(employee);
    objToSave['employeeList'] = employeeList


    let fdvAdrEvent = {
        "sid_f": 0,
        "pnr_f": 0,
        "fact": 8248, //adres na mestoizvarshvane
        "cod_t": 17,
        "sid_o": 0,
        "pnr_o": 0,
        "rol_o": 7580, //mqsto na izvarshvane
        "mrk_akt": "Y",
        "podsist": PODSIST,
        "dat": DATE_NOW,
        "cas": TIME_NOW,
        "operation": 1
    };

    //.event-other, .event-document
    let fdvAdrOpItem = {
        "sid_f": 0,
        "pnr_f": 0,
        "pnr_d": 0,
        "cod_t": 17,
        "dtip": $('#eventPlace').attr('data-type-dtip') * 1,
        "stoinost": $('#eventPlace').find('option:selected').attr('cod_z') !== undefined ?
            $('#eventPlace').find('option:selected').attr('cod_z') * 1 : 0,
        "opisanie": "",
        "mrk_akt": "Y",
        "dat_vav": DATE_NOW,
        "operation": 1
    }
    fdvAdrEvent["fdvOpList"] = [fdvAdrOpItem];

    let fadDopAdrEvent = {
        "sid_f": 0,
        "pnr_f": 0,
        "pod_adr": 0,//from eknm!
        "vid_adr": $('#eventAddress').find('button').attr('type_address') * 1,
        "etaj": $('#eventEtaj').val(),
        "apart": $('#eventApart').val(),
        "mrk_akt": "Y",
        "opisanie": $.trim($('#eventAdrOpis').val()),
        "operation": 1
    }

    let addressEvent = {
        "sid_o": 0,
        "pnr_o": 0,
        "eknm": $('#eventAddress').find('span').attr('cod_z') * 1,
        "kod_ul": $('#eventUlica').find('span').attr('cod_z') !== undefined ?
            $('#eventUlica').find('span').attr('cod_z') * 1 : 0,
        "nomer": $('#eventNom').val(),
        "vhod": $('#eventVhod').val(),
        "mrk_akt": "Y",
        "dat_vav": (todayDate.getDate() < 10 ? '0' + todayDate.getDate() : todayDate.getDate()) + '.' + (todayDate.getMonth() + 1 < 10 ? '0' + (todayDate.getMonth() + 1) : todayDate.getMonth() + 1) + '.' + todayDate.getFullYear(),
        "operation": 1
    }

    addressEvent["fdv"] = fdvAdrEvent;
    addressEvent['fadDop'] = fadDopAdrEvent;


    objToSave['address'] = addressEvent;
    objToSave['operation'] = 1;
    console.log('Object To Send for Save:')
    console.log(objToSave);
    //v objToSave ima oshte edin masiv ot obekti : ddtList, koito prilicha na ddList
    //todo add ajac post method for insert;
    //after response go to 
    let url = URL_TO_USE + '/insert-signal';
    // sessionStorage.removeItem('persons_db_changed'); // remove
    // sessionStorage.removeItem('persons_db'); // remove


    $.ajax({
        type: 'POST',
        url: url,
        contentType: 'application/json',
        data: JSON.stringify(objToSave),
        timeout: 9000,
        success: function (data, textStatus, xhr) {
            console.log(xhr.status);
            console.log("signal insert response");
            console.log(data);
            sessionStorage.removeItem('persons_db_changed');
            sessionStorage.removeItem('persons_db');

            // getDataForInsUpd(); //in saveData
            //if success
            createModal('success', 'Успешен запис!', false, false);

            //close all accordion items
            $('.accordion-button').addClass('collapsed');
            //$('.accordion-button').css("background-color", '');
            $('.accordion-collapse').removeClass("show");

            //function save loaded data
            loadEventData(data);

        },
        error: function (jqxhr, textStatus, errorThrown) {
            console.log("signal insert response error");
            console.log(jqxhr.status);
            console.log(errorThrown.toString());

            console.log("jqxhr.responseJSON");
            console.log(jqxhr.responseJSON);

            if (jqxhr.status === 400) {
                //alert("ВНИМАНИЕ", jqxhr.responseText);
                createModal("error", "Грешка:" + jqxhr.responseText, false, false);

                console.log("responseJSON");
                console.log(jqxhr.responseJSON);
                return;
            }
            //alert("ВНИМАНИЕ", "ГРЕШКА - " + jqxhr.status + " - " + jqxhr.responseText);
            createModal("error", "Грешка - " + jqxhr.status + " - " + jqxhr.responseText, false, false);

        }
    });

    //$('#searchEventNumber').val('661103'); // remove
    //$('#goSearchEvent').click(); // remove
}

async function loadEventData(data) {
    //show all accordions
    $('#accordionId .accordion-item').removeClass('hidden');
    sessionStorage.setItem('persons_db', JSON.stringify(data.personList));
    sessionStorage.setItem('persons_db_changed', JSON.stringify(data.personList));
    $('#dataPerson-table-body').empty();

    // if (sessionStorage.getItem("event_db") === null) { //uncomment for load event data from json
    sessionStorage.setItem("event_db", JSON.stringify(data)); //uncomment for load event data from json
    // }
    //TODO if() //proverka za nomer, data i t.n.
    //obrabotka chast na dokumenti
    let docEvents = data.ddList;
    if (!Array.isArray(docEvents)) {
        docEvents = [docEvents];
    }
    $.each(docEvents, function (idx, item) {
        //if docs found then decode data and add in event docs data - fileListTable

        //add data for evenData
        //optimizirai!!! pnr_f !== 1
        //nqma da e taka. ako ima masiv ot dok, kak da se poznae, koi e vodeshtiq dok
        if (item.fdv.pnr_f * 1 === 1 && item.fdv.fact * 1 === 8244 //proveren signal
            && item.fdv.cod_t * 1 === 39 //delovoden dokument
            && item.fdv.rol_o * 1 === 8207) { //7215 - doklad; 8207dokladna zapiska !!! she ima ili tuk
            //$('#eventDescr') - v ddList - dd element na sabitieto  - fdv - fdvOpList
            $('#eventNumber').val(item.reg_nom).attr('readonly', true);
            $('#evenDate').val(item.dat_vav !== undefined ? item.dat_vav : '').prop("disabled", true);
            $('#docPodl .option-tree').find('span[cod_z=' + item.pod_reg + ']').click();
            $('#docPodl').find('.btn-multiselect').prop("disabled", true);
            $('#eventDescr').val($.trim(item.otnosno));
            $('#eventPodl').find('span[cod_z="' + item.pod_reg + '"]').click();
            if (item.hasOwnProperty('ddOpList')) {
                let docOpis = item.ddOpList;
                if (!Array.isArray(docOpis)) {
                    docOpis = [docOpis];
                }
                var containerRows = $('#attendedSluj .container-rows');
                const label = $("<label>Служител посетил сигнала</label>");
                containerRows.empty();
                containerRows.append(label);

                $.each(docOpis, function () {

                    let setByDTip = $('#evenData').find('[data-type-dtip=' + this.dtip + ']');
                    if (setByDTip.length > 0) {
                        if ($(setByDTip)[0].tagName === 'BUTTON') {
                            //$(this).empty().text('Избери');
                            $(setByDTip).parent().find('.form-check-input.option-checkbox[value=' + this.stoinost + ']').prop('checked', true).trigger('change');
                        }
                        if ($(setByDTip)[0].tagName === 'SELECT') {
                            $(setByDTip).find('option[cod_z="' + this.stoinost + '"]').prop('selected', true);
                        }
                        if ($(setByDTip)[0].tagName === 'INPUT') {
                            $(setByDTip).val(this.opisanie);
                        }
                        if ($(setByDTip)[0].tagName === 'DIV' && $(setByDTip).attr('type-dtip-stoinost') * 1 === this.stoinost * 1) {
                            let addData = this;
                            const row = $('<div class="row mb-1 divClone"></div>');
                            const inputCol = $('<div class="form-group col-md-8"></div>');
                            const input = $('<input type="text" readonly class="form-control mt-1 add-row">');
                            const buttonCol = $('<div class="form-group d-flex align-items-center col-md-1"></div>');
                            const minusButton = $('<i class="fas fa-minus-square btn-minus"></i>');
                            input.val(addData.opisanie);
                            input.attr('sid_o', addData.sid_o)
                                .attr('pnr_o', addData.pnr_o)
                                .attr('pnr_d', addData.pnr_d);

                            inputCol.append(input);
                            row.append(inputCol);
                            row.append(buttonCol);
                            buttonCol.append(minusButton);
                            containerRows.append(row);

                            // });

                            $('#attendedSluj .btn-minus').on('click', function () {
                                $(this).closest('.divClone').remove();
                            });

                            // $.each($(setByDTip).find('input'), function () {
                            //     if ($.trim($(this).val()) === '') {
                            //         $(this).val(addData.opisanie);
                            //         $(this).attr('sid_o', addData.sid_o);
                            //         $(this).attr('pnr_o', addData.pnr_o);
                            //         $(this).attr('pnr_d', addData.pnr_d);
                            //         $(this).parents('[data-type-dtip]').find('button').click();
                            //         return false;
                            //     }
                            // });

                        }
                    } else {
                        console.log('Dtip: ' + this.dtip + ' - is not found!')
                    }
                })

                $.each($('#evenData').find('input'), function () {
                    if ($.trim($(this).val()) === '') {
                        $(this).closest('.divClone').remove();
                    }
                })
            }

        }
        //add data for all docs in table
        //todo - data na dokumenta?
        // let $row = `<tr sid_doc=${item.sid_o} pnr_doc=${item.pnr_o} podl_reg=${item.pod_reg}>
        //     <td doc_t=${item.vid_dd}>${hiera_decode("#docType", item.vid_dd)}</td>
        //     <td doc_nom>${item.reg_nom}</td>
        //     <td doc_dat>${item.fdv.dat}</td>
        //     <td>Действия</td>
        // </tr>`;

        // $('#docsList').append($($row));
        // $('#docsList').on('click', 'tr', function (e) {
        //     let clickedRow = $(this);
        //     $('#docEventType option[value=' + $(clickedRow).find('td[doc_t]').attr('doc_t') + ']').attr('selected', true);
        //     $('#docEventNumber').val($(clickedRow).find('td[doc_nom]').text());
        //     //let theDate = new Date($(clickedRow).find('td[doc_dat]').text());
        //     $('#docEventDate').parent().data("DateTimePicker").date(new Date(dateCProcessing.saveDate($(clickedRow).find('td[doc_dat]').text()).date));
        //     $('#docEventPodl').find('span[cod_z="' + clickedRow.attr('podl_reg') + '"]').click();
        // })
    });

    //obrabotka na prikacheni dokumenti
    if (data.hasOwnProperty('uploadedDocumentList')) {
        loadUploadedFiles(data.uploadedDocumentList);
    }

    //obrabotka na chast lica
    let persons = data.personList;
    if (!Array.isArray(persons)) {
        persons = [persons];
    }

    //obrabotka na lica-adresi
    for (var person of persons) {
        await loadSrvPersonData(person).then(async function () {
            await loadAddresses(person).then(function () {
                $('#confirmPerson').click();
                clearSearchPerson();
                $('#dataPerson-table-body').find('tr[sid=' + person.sid_o + ']').find('td:nth-child(8)').attr('type-person-role', person.fdv.rol_o)
                    .text($('#addMoreDetails').find('[name=radioSelectPerson][type-person-role=' + person.fdv.rol_o + ']').val());
            });

        })
    }

    //obrabotka na chast slujiteli
    let slujEventHis = data.employeeList;
    if (!Array.isArray(slujEventHis)) {
        slujEventHis = [slujEventHis];
    }
    // if sluj found then decode and add data in sluj-table

    let tableBodyToFill = $('#dataSluj-table-body');
    $.each(slujEventHis, async function (idx, item) {
        let createTR = `<tr sid_o=${item.sid_o} pnr=${item.pnr_o}>`;
        let createTD = `<td>${item.ime} ${item.familno}</td>`;
        createTD += `<td cod_z=${item.tip_sl}>${await decodeByOsiTablAndVal('dljn', item.tip_sl)}</td>`;
        createTD += `<td cod_z=${item.podl_loc}>${await decodeByOsiTablAndVal('podl', item.podl_loc)}</td>`;
        createTD += `<td cod_z=${item.rdvr}>${await decodeByOsiTablAndVal('podl', item.rdvr)}</td>`;
        createTD += `<td cod_z=${item.podl_sl}>${await decodeByOsiTablAndVal('podl', item.podl_sl)}</td>`;
        createTD += `<td cod_z=${item.dljn}>${await decodeByOsiTablAndVal('slujitel', item.dljn)}</td>`;
        createTR += createTD;
        createTR += `</tr>`;
        tableBodyToFill.append(createTR);
    });

    //obrabotka na chast adres na sabitieto
    //?? shte se slagat li nqkade sidovete na adresa -
    let eventAddress = data.address;
    if (eventAddress.fdv.fact * 1 === 8248 && // adres na izvarshvane;
        eventAddress.fdv.cod_t * 1 === 17 && //adres v Balgariq
        eventAddress.fdv.rol_o * 1 === 7580) {  //adres na izvarshvane
        //$('#eventPlaceDescr') - adresa na sabitieto  - fdv - fdvOpList masiv

        let addresses = data.address;
        if (!Array.isArray(addresses)) {
            addresses = [addresses];
        }
        $.each(addresses, function () {
            setEventAddress(this);
            $('#eventNom').val($.trim(this.nomer));
            $('#eventVhod').val($.trim(this.vhod));
            $('#eventEtaj').val(this.fadDop !== null ? $.trim(this.fadDop.etaj) : '');
            $('#eventApart').val(this.fadDop !== null ? $.trim(this.fadDop.apart) : '');
            $('#eventAdrOpis').val(this.fadDop !== null ? $.trim(this.fadDop.opisanie) : '');
            if (this.fdv.hasOwnProperty('fdvOpList')) {
                let fdvOpList = this.fdv.fdvOpList;
                if (!Array.isArray(fdvOpList)) {
                    fdvOpList = [fdvOpList];
                }
                $.each(fdvOpList, function () {
                    let setByDTip = $('#evenData').find('[data-type-dtip=' + this.dtip + ']');
                    if ($(setByDTip)[0].tagName === 'BUTTON') {
                        //$(this).empty().text('Избери');
                        $(setByDTip).parent().find('.form-check-input.option-checkbox[value=' + this.stoinost + ']').prop('checked', true).trigger('change');
                    }
                    if ($(setByDTip)[0].tagName === 'SELECT') {
                        $(setByDTip).find('option[cod_z="' + this.stoinost + '"]').prop('selected', true);
                    }
                    if ($(setByDTip)[0].tagName === 'INPUT') {
                        $(setByDTip).val(this.opisanie);
                    }
                })
            }
        });
    }
    // window.app_spinner.hide();
}


