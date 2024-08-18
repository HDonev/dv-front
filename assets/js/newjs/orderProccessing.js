
const podelenia = JSON.parse(localStorage.getItem("podelenia"));
const rayonen_okrujen_sud = JSON.parse(localStorage.getItem('rayonen_okrujen_sud'));
$('#saveData').on('click', function () {
    //not going next logic before fixed the required errors
    if (requiredFields('divForCreateForm')) {

        var formId = 'divForCreateForm';

        focusOnError(formId);
        return false;

    }
    collectOrderIssuedData();
})


function collectOrderIssuedData() {
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


    let fdv = {
        "sid_f": 0,
        "pnr_f": 0,
        "fact": 8245, //sluchai na domashno nasilie
        "cod_t": $('#orderNum').attr('type-obj') * 1,
        "sid_o": 0,
        "pnr_o": 0,
        "rol_o": $('[name=typeOrder]:checked').attr('vid-doc-type-rol') * 1,
        "mrk_akt": "Y",
        "podsist": PODSIST,
        "dat": DATE_NOW,
        "cas": TIME_NOW,
        "operation": 1
    }
    let vid_dd = $('[name=typeOrder]:checked').val() * 1

    if (vid_dd === 18902 && $('[name="yesNo"]').filter('[value="Yes"]').is(":checked") && $('.text-ImmDoc').attr('sid_f') === undefined) {
        $('#divAdditionalOptions').children('.error-required').removeClass('hidden');
        focusOnError('divImmDocument');
        return false;
    }
    let ddItem = {
        "sid_o": 0,
        "pnr_o": 0,
        "vid_dk": 0,
        "vid_dd": vid_dd,
        "reg_nom": $('#podlRegNum').val(),
        "dat_reg": $('#podlOrderDate').val(),
        "pod_reg": $('#podlForOrder').find('span').attr('cod_z') * 1,
        "otnosno": $('#orderDescr').val(),
        "mrk_akt": "Y",
        "dat_vav": DATE_NOW,
        "operation": 1
    }

    let ddOrder = {
        "sid_o": 0,
        "zapoved_nomer": $('#orderNum').val(),
        "zapoved_date": $('#orderDate').val(),
        "reshenie_nomer": ddItem.vid_dd === 18902 ? $('#judgeNum').val() : null,
        "reshenie_date": ddItem.vid_dd === 18902 ? $('#judgeDate').val() : null,
        "delo_nom": $('#civilCaseNum').val(),
        "delo_date": $('#civilCaseDate').val(),
        "podl": $('#regCourtForCivilCase').find('span').attr('cod_z') * 1,
        "zapoved_start_date": $('#protectOrderStartDate').val(),
        "zapoved_end_date": $('#protectOrderEndDate').val(),
        "eu_order": $('#euProtectOrder').val(),
        "operation": 1
    }
    ddItem.ddOrder = ddOrder;
    ddItem['fdv'] = fdv;
    ddList.push(ddItem);
    objToSave['ddList'] = ddList;
    objToSave.instantDefenceOrderSidF = ddItem.vid_dd === 18902 ? $('.text-ImmDoc').attr('sid_f') * 1 : null;

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

    employeeList.push(employee);
    objToSave['employeeList'] = employeeList

    objToSave['operation'] = 1;
    console.log('Object To Send for Save:')
    console.log(objToSave);
    //v objToSave ima oshte edin masiv ot obekti : ddtList, koito prilicha na ddList
    //todo add ajac post method for insert;
    //after response go to 
    let url = URL_TO_USE + "/insert-dv"
    // sessionStorage.removeItem('persons_db_changed'); // remove
    // sessionStorage.removeItem('persons_db'); // remove
    if (checkAccessTokenExpiration()) {
        createModal("error", 'Вашата сесия е изтекла!', true, function () {
            sessionStorage.clear();
            window.location = "/";
        });
    }
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

            createModal('success', 'Успешен запис!', false, false);
            loadOrderData(data);

        },
        error: function (jqxhr, textStatus, errorThrown) {
            console.log("signal insert response error");
            console.log(jqxhr.status);
            console.log(errorThrown.toString());

            console.log("jqxhr.responseJSON");
            console.log(jqxhr.responseJSON);

            if (jqxhr.status === 400) {
                alert("ВНИМАНИЕ", jqxhr.responseText);

                console.log("responseJSON");
                console.log(jqxhr.responseJSON);
                return;
            }
            alert("ВНИМАНИЕ", "ГРЕШКА - " + jqxhr.status + " - " + jqxhr.responseText);
        }
    });

    $('#searchEventNumber').val('661103'); // remove
    $('#goSearchEvent').click(); // remove
}

async function loadOrderData(data) {
    clearAllOrderData();
    $('#dataPerson > div.container-fluid.main-container.p-5').addClass('hidden');
    sessionStorage.setItem('persons_db', JSON.stringify(data.personList));
    sessionStorage.setItem('persons_db_changed', JSON.stringify(data.personList));
    $('#dataPerson-table-body').empty();


    sessionStorage.setItem("event_db", JSON.stringify(data));
    // }
    //TODO if() //proverka za nomer, data i t.n.
    //obrabotka chast na dokumenti
    let docEvents = data.ddList;
    if (!Array.isArray(docEvents)) {
        docEvents = [docEvents];
    }
    $.each(docEvents, function (idx, item) {
        //if docs found then decode data and add in event docs data - fileListTable

        //add data for evenData - most data will be from ddList
        //optimizirai!!! pnr_f !== 1
        //nqma da e taka. ako ima masiv ot dok, kak da se poznae, koi e vodeshtiq dok
        if (item.fdv.fact * 1 === 8245 //sluchai na domashno nasilie
            && item.fdv.cod_t * 1 === 39 //delovoden dokument
            && (item.fdv.rol_o * 1 === 8205 || item.fdv.rol_o * 1 === 8206)) { //8205 nezabavna //8506 - postoqnna
            $('[name="typeOrder"]').filter('[value="' + item.vid_dd + '"]').prop("checked", true);
            $('[name="typeOrder"]').prop("disabled", true);
            $('#podlRegNum').val(item.reg_nom).attr('readonly', true);
            $('#podlOrderDate').val(item.dat_vav !== undefined ? item.dat_vav : '').prop("disabled", true);
            $('#podlForOrder .option-tree').find('span[cod_z=' + item.pod_reg + ']').click();
            $('#podlForOrder').find('.btn-multiselect').prop("disabled", true);
            $('#orderDescr').val(item.otnosno)

            if (item.hasOwnProperty('ddOrder')) {
                let ddOrder = item.ddOrder;
                $('#orderNum').val(ddOrder.zapoved_nomer).attr('readonly', true);
                $('#orderDate').val(ddOrder.zapoved_date !== undefined ? ddOrder.zapoved_date : '').prop("disabled", true);
                $('#judgeNum').val(ddOrder.reshenie_nomer);
                $('#judgeDate').val(ddOrder.reshenie_date !== undefined ? ddOrder.zapoved_date : '');
                $('#civilCaseNum').val(ddOrder.delo_nom !== undefined ? ddOrder.delo_nom : '').attr('readonly', true);
                $('#civilCaseDate').val(ddOrder.delo_date !== undefined ? ddOrder.delo_date : '').prop("disabled", true);
                $('#regCourtForCivilCase .option-tree').find('span[cod_z=' + ddOrder.podl + ']').click();
                $('#regCourtForCivilCase').find('.btn-multiselect').prop("disabled", true);
                $('#protectOrderStartDate').val(ddOrder.zapoved_start_date !== undefined ? ddOrder.zapoved_start_date : '').attr('disabled', true);
                $('#protectOrderEndDate').val(ddOrder.zapoved_end_date !== undefined ? ddOrder.zapoved_end_date : '');
                $('#euProtectOrder option[value="' + ddOrder.eu_order + '"]').prop('selected', true)
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
    //obrabotka na  brakingOrder
    if (data.hasOwnProperty('breakOrderList')) {
        let breakOrderList = data.breakOrderList;

        if (!Array.isArray(breakOrderList)) {
            breakOrderList = [breakOrderList];
        }
        $('#breakingOrderData').parent().removeClass('hidden');
        $.each(breakOrderList, async function (idx, item) {

            let brakingOrderBody = $('#breakingOrdertableBody');
            let row;
            row = $(`<tr sid_f=` + item.sidF + ` class="text-center">`);
            if (item.person.TYPE_OBJECT === "1") {
                row.append($(`<td>${item.person.ime} ${item.person.prezime} ${item.person.familno}</td>`));
                row.append($(`<td>${item.person.egn}</td>`));
            } else if (item.person.TYPE_OBJECT === "2") {
                row.append($(`<td>${item.person.imena}</td>`));
                let identifier;
                if (item.person.enc !== undefined) {
                    identifier = item.person.enc
                };
                if (item.person.enc === undefined && item.person.egn !== undefined) {
                    identifier = item.person.egn;
                }
                row.append($(`<td>${identifier}</td>`));
            }
            let dP;
            $.each(item.ddList, function (idx, dd) {
                if (dd.vid_dd === 19296) {
                    dP = dd;
                }
            });
            if (dP !== undefined) {
                row.append($(`<td>${dP.ddDp.date_event}</td>`));
                row.append($(`<td>${dP.reg_nom}</td>`));
                row.append($(`<td>${findTextByCodFromStorage(podelenia.hiera, dP.pod_reg)}</td>`));
                //trqbva da se smeni s izteglena ierarhia a ne da vika grida
                row.append($(`<td>${findTextByCodFromStorage(JSON.parse(localStorage.getItem("narushena_zapoved")).hiera, dP.ddDp.nk)}</td>`));
            }
            //append preview button
            const previewButton = $('<a>').attr({
                'type': 'button',
                "data-bs-toogle": "tooltip",
                "data-bs-placement": "left",
                "title": "Виж"
            });
            const previewSpanButton = $('<span>').addClass('fa-stack detail-button');
            const previewIconButton = $('<i>').addClass('fa fa-square fa-stack-2x');
            const previewIiconWrapButton = $('<i>').addClass('fa fa-search-plus fa-stack-1x fa-inverse');

            previewButton.append(previewSpanButton);
            previewSpanButton.append(previewIconButton);
            previewSpanButton.append(previewIiconWrapButton);
            previewButton.tooltip();
            previewButton.click(function () {
                let sid_f = $(this).parent().parent().attr('sid_f') * 1;
                let order = JSON.parse(sessionStorage.getItem("event_db"));
                let order_data;
                let arrest_data;
                let dp_data;
                if (order.hasOwnProperty("breakOrderList")) {
                    let breakOrderList = order.breakOrderList;
                    if (!Array.isArray(breakOrderList)) {
                        breakOrderList = [breakOrderList];
                    }
                    $.each(breakOrderList, function (idx, breakingOrder) {
                        if (breakingOrder.sidF === sid_f) {
                            $.each(breakingOrder.ddList, async function (idx, dd) {
                                if (dd.vid_dd === 18902 || dd.vid_dd === 18903) {
                                    let person;
                                    $.each(JSON.parse(sessionStorage.getItem('persons_db')), function (idx, personStorage) {
                                        if (personStorage.sid_o === breakingOrder.person.sid_o) {
                                            person = personStorage;
                                            return false;
                                        }
                                    })
                                    if (person !== undefined) {

                                        let person_imena;
                                        let egn;
                                        let age;

                                        if (person.TYPE_OBJECT === "1") {
                                            person_imena = person.ime + ' ' + person.prezime + ' ' + person.familno;
                                            egn = person.egn;
                                            //TODO da se vzima ot propertito na liceto a ne da se izchislqva
                                            age = getAgeFromEgn(person.egn);
                                        } else if (person.TYPE_OBJECT === "2") {
                                            person_imena = person.imena;

                                            if (person.enc !== undefined) {
                                                egn = person.enc
                                            };
                                            if (person.enc === undefined && person.egn !== undefined) {
                                                egn = person.egn;
                                            }
                                            //TODO da se vzima ot propertito na liceto a ne da se izchislqva
                                            age = getAgeFromBirthDay(person.dat_raj);
                                        }
                                        order_data = `
                                        <h3 class="text-center p-5">Данни за нарушена заповед</h3>
                                        <div id="orderData"class="row px-3 py-2" >
                                            <div class="form-group col-md-3">
                                                <label>Заповед номер</label>
                                                <input type="text" class="form-control mt-1"  value="${dd.ddOrder.zapoved_nomer}" readonly>
                                            </div>
                                            <div class="form-group col-md-3">
                                                <label>От Дата</label>
                                                <input  type="text" class="form-control" value="${dd.ddOrder.zapoved_date}" readonly>
                                            </div>
                                            <div class="form-group col-md-3">
                                                <label>Районен съд</label>
                                                <input id="ordJudg" type="text" class="form-control"  value="${findTextByCodFromStorage(rayonen_okrujen_sud.hiera, dd.ddOrder.podl)}" readonly>
                                            </div>
                                            <div class="form-group col-md-3">
                                                <label >Окръжен съд</label>
                                                <input type="text" class="form-control" value="${jsonTraversFromCurrenPos(rayonen_okrujen_sud, dd.ddOrder.podl, 1).ime_z}" readonly>
                                            </div>
                                        </div>
                                        <div id = "ordPersonData" class= "row px-3 mx-0 py-2">
                                        <fieldset class="border rounded-2 pb-3">
                                            <legend class="h4">Данни за лицата</legend>
                                            <ul class="list-group col-md-12">
                                                <div id="divForPersons">
                                                    <li class="list-group-item" >ИМЕНА: <span class="form-span-reference">${person_imena}</span></li>
                                                    <li class="list-group-item" >ЕГН/ЛНЧ: <span class="form-span-reference">${egn}</span></li>
                                                    <li class="list-group-item">РОЛЯ: <span class="form-span-reference">${findTextByCodFromStorage(JSON.parse(localStorage.getItem("person_role")).hiera, person.fdv.rol_o)}</span></li>
                                                    <li class="list-group-item">ГОДИНИ: <span class="form-span-reference">${age}</span></li>
                                                    <li class="list-group-item">ПОЛ: <span class="form-span-reference">${person.pol_txt}</span></li>
                                                    <li class="list-group-item hidden" id="personPermanentAdr"><span>ПОСТОЯНЕН АДРЕС:&nbsp;</span><span class="form-span-reference"></span></li>
                                                    <li class="list-group-item hidden" id="personStatictAdr"><span>НАСТОЯЩ АДРЕС:&nbsp;</span><span class="form-span-reference"></span></li>
                                                    <li class="list-group-item" id="measuresPerson">
                                                        <label class="pb-1">НАЛОЖЕНИ МЕРКИ:</label>
                                                        <div class="border p-2">
                                                        </div>
                                                    </li>
                                                </div>
                                            </ul>
                                        </fieldset>
                                        </div >`;
                                        for (address of person.addresses) {
                                            if (address.fdv.rol_o === 5030) {
                                                await convertAddressToText(address).then((address) => {
                                                    $('#personPermanentAdr').removeClass('hidden');
                                                    $('#personPermanentAdr > span.form-span-reference').text(address);

                                                });
                                            }
                                            if (address.fdv.rol_o === 18726) {
                                                await convertAddressToText(address).then((address) => {
                                                    $('#personStatictAdr').removeClass('hidden');
                                                    $('#personStatictAdr > span.form-span-reference').text(address);
                                                });
                                            }
                                        }
                                        $.each(person.measureList, async function (indx, measure) {
                                            //TODO DA SE PRECODIRA IME_Z OR COD_Z NA MIARKATA
                                            $('#measuresPerson > div').append(`<div class="form-span mx-1 my-2">${findTextByCodFromStorage(JSON.parse(localStorage.getItem('nalojeni_merki')).hiera, measure.measure_code)}</div>`);
                                        });
                                    }
                                }
                                if (dd.vid_dd === 17184) {
                                    arrest_data = `<div id="ordArrestData" class="row px-3 mx-0 py-2">
                                        <fieldset class="border rounded-2 pb-3">
                                            <legend class="h4">Данни за задържане</legend>
                                            <ul class="list-group col-md-12">
                                                <div id="divForArrets">
                                                    <li class="list-group-item" >ЗАПОВЕД ЗА ЗАДЪРЖАНЕ НОМЕР: <span class="form-span-reference">${dd.reg_nom}</span></li>
                                                    <li class="list-group-item" >ОТ ДАТА: <span class="form-span-reference">${dd.dat_reg}</span>
                                                    </li>
                                                    <li class="list-group-item" id="arrDevision">ПОДЕЛЕНИЕ: <span class="form-span-reference">${findTextByCodFromStorage(podelenia.hiera, dd.pod_reg)}</span>
                                                    </li>
                                                    <li class="list-group-item">ОБЛАСТНА ДИРЕКЦИЯ: <span class="form-span-reference">${jsonTraversFromCurrenPos(podelenia, dd.pod_reg, 1).ime_z}</span></li>
                                                    <li class="list-group-item">ОПИСАНИЕ: <span class="form-span-reference">${dd.otnosno}</span></li>
                                                </div>
                                            </ul>
                                        </fieldset>
                                    </div>`;
                                }
                                if (dd.vid_dd === 19296) {
                                    dp_data = `<div id="ordDPData" class="row px-3 mx-0 py-2">
                                            <fieldset class="border rounded-2 pb-3">
                                                <legend class="h4">Данни за досъдебно производство</legend>
                                                <ul class="list-group col-md-12">
                                                    <div id="divForDp">
                                                        <li class="list-group-item">ДОСЪДЕБНО ПРОИЗВОДСТВО НОМЕР: <span class="form-span-reference">${dd.reg_nom}</span></li>
                                                        <li class="list-group-item">ОТ ДАТА: <span class="form-span-reference">${dd.dat_reg}</span>
                                                        </li>
                                                        <li class="list-group-item">ПОДЕЛЕНИЕ: <span class="form-span-reference">${findTextByCodFromStorage(podelenia.hiera, dd.pod_reg)}</span>
                                                        </li>
                                                        <li class="list-group-item">ОБЛАСТНА ДИРЕКЦИЯ: <span class="form-span-reference">${jsonTraversFromCurrenPos(podelenia, dd.pod_reg, 1).ime_z}</span></li>
                                                        <li class="list-group-item">ОПИСАНИЕ: <span class="form-span-reference">${dd.otnosno}</span></li>
                                                    </div>
                                                </ul>
                                            </fieldset>
                                        </div>`;
                                }
                            });
                            $('#detailOrder').html(order_data);
                            if (arrest_data !== undefined) {
                                $('#detailOrder').append(arrest_data);
                            }
                            if (dp_data !== undefined) {
                                $('#detailOrder').append(dp_data);
                            }
                            $('#breakingOrderModal').modal('show');
                        }
                    });
                }
            });
            let actionCell = $('<td>').addClass('text-center');
            actionCell.append(previewButton)
            row.append(actionCell);
            brakingOrderBody.append(row);
        });


    }

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
        $('#kosService').parent().attr('show-for-stat', 'perpetrator');
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
        createTD += `<td cod_z=${item.podl_loc}>${findTextByCodFromStorage(podelenia.hiera, item.podl_loc)}</td>`;
        createTD += `<td cod_z=${item.rdvr}>${findTextByCodFromStorage(podelenia.hiera, item.rdvr)}</td>`;
        createTD += `<td cod_z=${item.podl_sl}>${findTextByCodFromStorage(podelenia.hiera, item.podl_sl)}</td>`;
        createTD += `<td cod_z=${item.dljn}>${await decodeByOsiTablAndVal('slujitel', item.dljn)}</td>`;
        createTR += createTD;
        createTR += `</tr>`;
        tableBodyToFill.append(createTR);
    });

    // //obrabotka na chast adres na sabitieto
    // //?? shte se slagat li nqkade sidovete na adresa -
    // let eventAddress = data.address;
    // if (eventAddress.fdv.fact * 1 === 8248 && // adres na izvarshvane;
    //     eventAddress.fdv.cod_t * 1 === 17 && //adres v Balgariq
    //     eventAddress.fdv.rol_o * 1 === 7580) {  //adres na izvarshvane
    //     //$('#eventPlaceDescr') - adresa na sabitieto  - fdv - fdvOpList masiv

    //     let addresses = data.address;
    //     if (!Array.isArray(addresses)) {
    //         addresses = [addresses];
    //     }
    //     $.each(addresses, function () {
    //         setEventAddress(this);
    //         $('#eventNom').val($.trim(this.nomer));
    //         $('#eventVhod').val($.trim(this.vhod));
    //         if (this.hasOwnProperty('fadDop')) {
    //             $('#eventEtaj').val(this.fadDop !== null ? $.trim(this.fadDop.etaj) : '');
    //             $('#eventApart').val(this.fadDop !== null ? $.trim(this.fadDop.apart) : '');
    //             $('#eventAdrOpis').val(this.fadDop !== null ? $.trim(this.fadDop.opisanie) : '');
    //         }
    //     });
    // }

    if ($('#divForCreateForm').hasClass('readReference')) {
        readONlyForm('divForCreateForm');
    }
    if ($('#radioConstDoc').is(':checked') && data.hasOwnProperty('instantDefenceOrderSidF')) {
        let sid_f = data.instantDefenceOrderSidF;
        getRegnomBySidF(sid_f);
        $('.text-ImmDoc').attr('sid_f', sid_f);
        $('[name="yesNo"]').filter('[value="Yes"]').prop("checked", true);
        $('#divAdditionalOptions').show();
        $('[name="yesNo"]').prop('disabled', true);
        $('#divImmDocument').show();
        //    let reg_nom= getRegnomBySidF(data.instantDefenceOrderSidF);
    }

    if ($('#radioImmediateDoc').is(':checked') && data.hasOwnProperty('permanentDefenceOrderSidF')) {
        let sid_f = data.permanentDefenceOrderSidF;
        getRegnomBySidF(sid_f);
        $('.text-ImmDoc').attr('sid_f', sid_f);
        $('[name="yesNo"]').filter('[value="Yes"]').prop("checked", true);
        $('#divAdditionalOptions').show();
        $('[name="yesNo"]').prop('disabled', true);
        $('#divImmDocument').show();
        //    let reg_nom= getRegnomBySidF(data.instantDefenceOrderSidF);
    }
    $('#docData').parent().removeClass('hidden')

}

function appendRetrievedEventIntoTable(data) {
    if (data) {
        $("#divForTableResultOrders").removeClass("hidden");

        var idRecords = data.ddList[0].ddOrder.zapoved_nomer;
        var dateRecords = data.ddList[0].ddOrder.zapoved_date;
        var podlReg = findTextByCodFromStorage(rayonen_okrujen_sud.hiera, data.ddList[0].ddOrder.podl);

        //added into row sid_f - this is hidden
        const row = $('<tr sid_f="' + data.ddList[0].fdv.sid_f + '">');

        //append row
        row.append($('<td>').text(idRecords));
        row.append($('<td>').text(dateRecords));
        row.append($('<td>').text(podlReg));

        //column action buttons
        const actionCell = $('<td>').addClass('text-center');


        const previewButton = $('<a>').attr({
            'type': 'button',
            'data-bs-toogle': 'tooltip',
            'data-bs-placement': 'left',
            'title': 'Детайли'
        });

        const previewSpanButton = $('<span>').addClass('fa-stack detail-button');
        const previewIconButton = $('<i>').addClass('fa fa-square fa-stack-2x');
        const previewIiconWrapButton = $('<i>').addClass('fa fa-search-plus fa-stack-1x fa-inverse');

        previewButton.append(previewSpanButton);
        previewSpanButton.append(previewIconButton);
        previewSpanButton.append(previewIiconWrapButton);

        //enable tooltip after button is created
        previewButton.tooltip();
        previewButton.on("click", function () {
            $("#divForEditForm").addClass("hidden");
            $("#divForTableResultOrders").addClass("hidden");
            $("#divForCreateForm").removeClass("hidden");

            //this function is saved data from post response
            loadOrderData(data);


        });

        //edit button
        const editButton = $('<a>').attr({
            'type': 'button',
            "data-bs-toogle": "tooltip",
            "data-bs-placement": "left",
            "title": "Промени"
        });
        const editSpanButton = $('<span>').addClass('fa-stack edit-button');
        const editIconButton = $('<i>').addClass('fa fa-square fa-stack-2x');
        const editIconWrapButton = $('<i>').addClass('fas fa-edit fa-stack-1x fa-inverse');

        editButton.append(editSpanButton);
        editSpanButton.append(editIconButton);
        editSpanButton.append(editIconWrapButton);

        editButton.tooltip();
        //if click edit get data
        editButton.on("click", function () {
            $("#divForEditForm").addClass("hidden");
            $("#divForTableResultOrders").addClass("hidden");
            $("#divForCreateForm").removeClass("hidden");

            //this function is saved data from post response
            loadOrderData(data);


        });

        //delete button
        const deleteButton = $('<a>').attr({
            'type': 'button',
            "data-bs-toogle": "tooltip",
            "data-bs-placement": "right",
            "title": "Изтрий"
        });
        const deleteSpanButton = $('<span>').addClass('fa-stack delete-button');
        const deleteIconButton = $('<i>').addClass('fa fa-square fa-stack-2x');
        const deleteIconWrapButton = $('<i>').addClass('fas fa-trash fa-stack-1x fa-inverse');

        deleteButton.append(deleteSpanButton);
        deleteSpanButton.append(deleteIconButton);
        deleteSpanButton.append(deleteIconWrapButton);

        deleteButton.tooltip();
        //if click delete remove data
        deleteButton.on("click", function () {
            //function for delete
        });

        row.append(actionCell);

        //different logic for displayed button actions
        //if is table reference
        if ($('table').hasClass('table-reference')) {
            actionCell.append(previewButton);

        }
        else {
            //if is not admin append only edit buttons
            actionCell.append(editButton);


            //if is admin append edit and delete buttons
            let token = sessionStorage.getItem("access_token");
            if (token) {
                isAuthenticated = true;
                let access = parseJWT(token);
                $("#user_name").text(access.sub);
                var scopes = access.roles;

                //if is admin
                if (scopes.includes('DNADM')) {

                    //table action buttons preview and delete
                    actionCell.append(editButton, deleteButton);

                }
            }
        }


        $('#alertsTable tbody').append(row);

    }

}


function ckeckForExistedOrder() {
    var exist = false;

    $("#alertsTable tbody tr").each(function () {

        var idRecords = $('#searchDocOrderNumber').val();
        var dateRecords = $('#dateDocOrder').val();
        var podlReg = $('#regCourtForJudgment').find('.form-span-single-select').text();

        var rowIdRecords = $(this).find('td:eq(0)').text();
        var rowDateRecords = $(this).find('td:eq(1)').text();
        var getOnlyYear = rowDateRecords.substr(6);
        var rowPodlReg = $(this).find('td:eq(2)').text();

        if (idRecords === rowIdRecords && dateRecords === getOnlyYear && podlReg === rowPodlReg) {
            exist = true;
            return false;
        }
    });
    return exist;
}

function appendOrderToModal(data) {
    $.each(data.ddList, async function (idx, dd) {
        if (dd.vid_dd === 18903 || dd.vid_dd === 18902) {
            $('#оrderDetails').html(`
                    <div class="form-group col-md-3">
                        <label>Заповед номер</label>
                        <input type="text" sid_f=${dd.fdv.sid_f} id="modalOrderNumber" class="form-control"  value='${dd.ddOrder.zapoved_nomer}' readonly>
                    </div>
                    <div class="form-group col-md-3">
                        <label>От Дата</label>
                        <input type="text" class="form-control" value='${dd.ddOrder.zapoved_date}' readonly>
                    </div>
                    <div class="form-group col-md-3">
                        <label>Районен </label>
                        <input type="text" class="form-control" value='${findTextByCodFromStorage(rayonen_okrujen_sud.hiera, dd.ddOrder.podl)}' readonly>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="courtOrdJudg">Окръжен съд</label>
                        <input type="text" class="form-control" value="${jsonTraversFromCurrenPos(rayonen_okrujen_sud, dd.ddOrder.podl, 1).ime_z}" readonly>
                    </div>`
            );
            $.each(data.personList, async function (indx, person) {
                let order_modal = $(`<ul class="list-group col-md-12">`);
                let imena;
                let egn;
                let age;
                let person_role_txt;
                let address;
                if (person.TYPE_OBJECT === "1") {
                    imena = person.ime + ' ' + person.prezime + ' ' + person.familno;
                    egn = person.egn;
                    //TODO da se vzima ot propertito na liceto a ne da se izchislqva
                    age = getAgeFromEgn(person.egn);
                } else if (person.TYPE_OBJECT === "2") {
                    imena = person.imena;
                    if (breakingOrder.person.enc !== undefined) {
                        egn = person.enc
                    };
                    if (breakingOrder.person.enc === undefined && brakingOrder.person.egn !== undefined) {
                        egn = person.egn;
                    }
                    //TODO da se vzima ot propertito na liceto a ne da se izchislqva
                    age = getAgeFromBirthDay(person.dat_raj);
                }
                person_role_txt = findTextByCodFromStorage(JSON.parse(localStorage.getItem("person_role")).hiera, person.fdv.rol_o);
                let perm_adr;
                let static_adr;
                let real_adr;

                for (address of person.addresses) {
                    if (address.fdv.rol_o === 5030) {
                        perm_adr = address
                    }
                    if (address.fdv.rol_o === 18726) {
                        static_adr = address
                    }
                    if (address.fdv.rol_o === 18725) {
                        real_adr = address
                    }
                }

                order_modal.append(`<li class="list-group-item" >ИМЕНА: <span class="form-span-reference">${imena}</span></li>`);
                order_modal.append(`<li class="list-group-item" >ЕГН/ЛНЧ: <span class="form-span-reference">${egn}</span></li>`);
                order_modal.append(`<li class="list-group-item" >РОЛЯ: <span class="form-span-reference">${person_role_txt}</span></li>`);
                order_modal.append(`<li class="list-group-item" >ГОДИНИ: <span class="form-span-reference">${age}</span></li>`);
                order_modal.append(`<li class="list-group-item" >ПОЛ: <span class="form-span-reference">${person.pol_txt}</span></li>`);
                if (perm_adr !== undefined) {
                    order_modal.append(`<li class="list-group-item" >ПОСТОЯНЕН АДРЕС: <span class="form-span-reference">${await convertAddressToText(perm_adr)}</span></li>`);
                }
                if (static_adr !== undefined) {
                    order_modal.append(`<li class="list-group-item" >НАСТОЯЩ АДРЕС: <span class="form-span-reference">${await convertAddressToText(static_adr)}</span></li>`);
                }
                if (real_adr !== undefined) {
                    order_modal.append(`<li class="list-group-item" >АДРЕС НА МЕСТОПРЕБИВАВАНЕ: <span class="form-span-reference">${await convertAddressToText(real_adr)}</span></li>`);
                }

                if (person.fdv.rol_o === 7989) {
                    let measures = $(`<div>`);
                    $.each(person.measureList, function (ind, measure) {
                        //TODO DA SE PRECODIRA IME_Z OR COD_Z NA MIARKATA
                        measures.append(`<div class="form-span mx-1 my-2">${findTextByCodFromStorage(JSON.parse(localStorage.getItem('nalojeni_merki')).hiera, measure.measure_code)}</div>`);
                    })
                    order_modal.append(`<li class="list-group-item" ><label class="pb-1">НАЛОЖЕНИ МЕРКИ:</label><div class="border p-2">${measures.html()}`)
                }
                order_modal.append(`<hr>`);
                $('#orderPersons').append(order_modal);
            });
            $('#detailImmOrder').show();
            $('.dropdown').removeClass("contentOverModal");
            $('.modal-body').addClass("modalBodyScroll");
        }
    });
}


async function convertAddressToText(address) {
    let json_eknmData = JSON.parse(localStorage.getItem('eknm'));
    let eknm_txt = findTextByCodFromStorage(json_eknmData.hiera, address.eknm);
    let kod_ul_txt;
    if (address.kod_ul !== undefined) {
        kod_ul_txt = findTextByCodFromStorage(await ulDecodeCod(address.kod_ul), address.kod_ul);
    } else {
        kod_ul_txt = '';
    };

    let adrTxt = [];
    adrTxt.push(eknm_txt)
    adrTxt.push(kod_ul_txt);
    if (address.nomer !== undefined && address.nomer !== "") {
        adrTxt.push(address.nomer !== undefined ? 'БЛ./№ ' + address.nomer : '');
    }
    if (address.vhod !== undefined && address.vhod !== "") {
        adrTxt.push(address.vhod !== undefined ? 'ВХ.' + address.vhod : '');
    }
    if (address.fadDop !== undefined) {
        adrTxt.push((address.fadDop.etaj !== undefined && address.fadDop.etaj !== '') ? 'ЕТ.' + address.fadDop.etaj : '');
        adrTxt.push((address.fadDop.apart !== undefined && address.fadDop.apart !== '') ? 'АП.' + address.fadDop.apart : '');
    }
    let adrFullTxt = adrTxt.filter(function (v) { return v != '' })
    adrFullTxt.join(', ')
    return adrFullTxt;
}



