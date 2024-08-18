
/* A function that confirm the data from BDS and add the data into a table.
Appends buttons preview and delete. Copy data into detailModal */

$('#confirmPerson').click(function () {

    let row;
    //check radio selected button
    let selectedTypePerson = $('input[type=radio][name=groupSearchByNationality]:checked');
    if (selectedTypePerson.attr('id') === "bgNationality") {
        //get the values from the form
        var personImage = $('#imagePersonId').prop('src');
        var personNames = $('#personNames').val();
        var personIdegn = $('#personIdegn').val();
        var personAge = $('#personAge').val();
        var personSex = $('#personSex option:selected').text();
        var dateBirdth = $('#dateBirthDay').val()
        var personNationality = $('#personNationality option:selected').text();
        var personPermAddress = $('#personPermAddress').val();
        var personPresentAddress = $('#personPresentAddress').val();
        var personSId = $('#personIdegn').attr('sid');
        var personPnr = $('#personIdegn').attr('pnr');
        var typeP = $('#personIdegn').attr('typep');

        //append all values into row
        row = $('<tr sid=' + personSId + ' pnr=' + personPnr + ' typeP=' + typeP + '>');
        row.append($('<td class="text-center">').html("<img class='img-table'  src=" + personImage + ">"));
        row.append($('<td>' + personNames + '</td>'));
        row.append($('<td>').text(personIdegn).attr('egn', personIdegn).attr('enc', ''));
        row.append($('<td>').text(personAge));
        row.append($('<td>').text(personSex));
        row.append($('<td>').text(personNationality));
        row.append($('<td><span>ПОСТОЯНЕН АДРЕС:&nbsp</span>' + personPermAddress + '<br><span>НАСТОЯЩ АДРЕС:&nbsp</span>' + personPresentAddress + '</td>'));
        row.append($('<td>').text(""));

    } else
        if (selectedTypePerson.attr('id') === "fgNationality") {
            var personImage = $('#imagePersonId').prop('src');
            var fgnNameLatin = $('#fgnNameLatin').val();
            var fgnNameCirilic = $('#fgnNameCirilic').val();
            var personIdegn = $('#personIdegn').val();
            var personIdenc = $('#personIdenc').val();
            var typeDocFgn = $('#typeDocFgn option:selected').text();
            var numDocFgn = $('#numDocFgn').val();
            var issueDateDocFgn = $('#issueDateDocFgn').val();
            var exDateDocFgn = $('#exDateDocFgn').val();
            var personSex = $('#personSex option:selected').text();
            var dateBirdth = $('#dateBirthDay').val();
            var personAge = $('#personAge').val();
            var nationalityFgn = $('#personNationality option:selected').text();
            // var birthPlaceFgn = $('#birthPlaceFgn').val();
            var personPermAddress = $('#personPermAddress').val();
            var personPresentAddress = $('#personPresentAddress').val();
            var personSId = $('#personIdegn').attr('sid');
            var personPnr = $('#personIdegn').attr('pnr');
            var typeP = $('#personIdegn').attr('typep');

            //append all values into row
            row = $('<tr sid=' + personSId + ' pnr=' + personPnr + ' typeP=' + typeP + '>');
            row.append($('<td class="text-center">').html("<img class='img-table'  src=" + personImage + ">"));
            row.append($('<td><span>ИМЕНА НА ЛАТИНИЦА:&nbsp' + fgnNameLatin + '</span><br><span>ИМЕНА НА КИРИЛИЦА:&nbsp</span>' + fgnNameCirilic + '</td>'));
            row.append($('<td><span>ЕГН:&nbsp</span>' + personIdegn + '<br><span>ЕНЧ:&nbsp</span>' + personIdenc + '</td>').attr('egn', personIdegn).attr('enc', personIdenc));
            row.append($('<td>').text(personAge));
            row.append($('<td>').text(personSex));
            row.append($('<td>').text(nationalityFgn));
            row.append($('<td><span>ПОСТОЯНЕН АДРЕС:&nbsp</span>' + personPermAddress + '<br><span>НАСТОЯЩ АДРЕС:&nbsp</span>' + personPresentAddress + '</td>'));
            row.append($('<td>').text(""));
        } else
            if (selectedTypePerson.attr('id') === "fgWithoutID") {
                var personSId = $('#personIdegn').attr('sid');
                var personPnr = $('#personIdegn').attr('pnr');
                var personImage = $('#imagePersonId').prop('src');
                var fgnNameLatin = $('#fgnNameLatin').val().toUpperCase();
                var fgnNameCirilic = $('#fgnNameCirilic').val().toUpperCase();
                var typeDocFgn = $('#typeDocFgn option:selected').text();
                var numDocFgn = $('#numDocFgn').val();
                var issueDateDocFgn = $('#issueDateDocFgn').val();
                var exDateDocFgn = $('#exDateDocFgn').val();
                var personSex = $('#personSex option:selected').text();
                var dateBirdth = $('#dateBirthDay').val();
                var personAge = $('#personAge').val();
                var nationalityFgn = $('#personNationality option:selected').text();
                var typeP = -1;
                //go to table and get all sids; find min sid and add new little one
                if (personSId === undefined) {
                    let newSid = [];
                    $.each($('#personTable').find('tr[sid]'), function () {
                        newSid.push($(this).attr('sid') * 1);
                    })
                    let minSid = Math.min.apply(Math, newSid);
                    if (minSid < 0) {
                        personSId = minSid - 1;
                    } else {
                        personSId = -1;
                    }
                    personPnr = 1;
                }
                row = $('<tr sid=' + personSId + ' pnr=' + personPnr + ' typeP=' + typeP + '>');
                row.append($('<td class="text-center">').html("<img class='img-table'  src=" + personImage + ">"));
                row.append($('<td><span>ИМЕНА НА ЛАТИНИЦА:&nbsp</span>' + fgnNameLatin + '<br><span>ИМЕНА НА КИРИЛИЦА:&nbsp</span>' + fgnNameCirilic + '</td>'));
                row.append($('<td></td>').attr('egn', '').attr('enc', ''));
                row.append($('<td>').text(personAge));
                row.append($('<td>').text(personSex));
                row.append($('<td>').text(nationalityFgn));
                row.append($('<td></td>'));
                row.append($('<td>').text(""));
                let data = {
                    "TYPE_OBJECT": "2",
                    "sid_o": personSId,
                    "pnr_o": personPnr,
                    "pol": $('#personSex').val(),
                    "pol_txt": personSex,
                    "dat_vav": "03.11.2023",
                    "mrk_akt": "Y",
                    "operation": 1,
                    "graj": $('#personNationality option:selected').val(),
                    "nacBel": $('#personNationality option:selected').val(),
                    "vidDok": $('#typeDocFgn option:selected').val(),
                    "nacPasp": numDocFgn,
                    "datIzd": issueDateDocFgn,
                    "datVal": exDateDocFgn,
                    "imena": fgnNameLatin,
                    "datRaj": dateBirdth,
                    "imek": fgnNameCirilic
                }
                if (personSId < 0) {
                    personStorage.addPerson(data);
                    personChanged.addChangedPerson(data);
                }
            } else {
                return;
            }

    //addDataForPerson(); //in saveData.js

    //open the acordion when data is added
    $('#dataPerson').addClass('show');



    //justify content cells to center
    const actionCell = $('<td>').addClass('text-center');

    //append preview button
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


    var divContent = `
            <div>
                <img class="img-thumbnail card-img-left" id="_imagePersonId" src="${personImage}">
                    </div>
                    <div class="card-body">
                        <div class="row my-2 person-bg">
                            <div class="form-group col-md-12">
                                <label for="_personNames">Имена</label>
                                <input type="text" class="form-control" id="_personNames" value="${personNames}" readonly>
                            </div>
                        </div>


                        <div class="row my-2 person-cuz person-noid">
                            <div class="form-group col-md-12">
                                <label for="_fgnNameLatin">Имена на латиница</label>
                                <input type="text" class="form-control person-base" id="_fgnNameLatin" value="${fgnNameLatin}" readonly>
                            </div>
                        </div>
                        <div class="row mb-2 person-cuz person-noid">
                            <div class="form-group col-md-12">
                                <label for="_fgnNameCirilic">Имена на кирилица</label>
                                <input type="text" class="form-control person-base" id="_fgnNameCirilic" value="${fgnNameCirilic}" readonly>
                            </div>
                        </div>

                        <div class="row mb-2">
                            <div class="form-group col-md-6 person-bg person-cuz column-6">
                                <label for="_personIdegn">ЕГН</label>
                                <input type="text" class="form-control person-base" id="_personIdegn" value="${personIdegn}"
                                    readonly>
                            </div>

                            <div class="form-group col-md-6 person-cuz">
                                <label for="_personIdenc">ЕНЧ</label>
                                <input type="text" class="form-control person-base" id="_personIdenc" value="${personIdenc}"
                                    readonly>
                            </div>
                        </div>
                        <div class="row mb-2 person-bg person-cuz person-noid">
                            <div class="form-group col-md-6">
                                <label for="_personSex">Пол</label>
                                <select type="text" class="form-select person-base" id="_personSex" value="${$('#personSex').val()}" 
                                    use-hiera="pol" disabled>
                                    </select>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="_personNationality">Гражданство</label>
                                <select type="text" class="form-select person-base" id="_personNationality"
                                    use-hiera="grajdanstvo" value="${$('#personNationality').val()}" disabled>
                                    </select>
                            </div>
                        </div>
                        <div class="row mb-2 person-bg person-cuz person-noid">
                            <div class="form-group col-md-6">
                                <label>Дата на раждане</label>
                                <div class="input-group date onlydate">
                                    <input type="text" class="form-control person-base" id="_dateBirthDay" value="${dateBirdth}" readonly>
                                    <div class="input-group-addon">
                                        <span class="input-group-text bg-light d-block"><i
                                                class="fa fa-calendar date-button"></i> </span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="_personAge">Години</label>
                                <input type="text" class="form-control person-base" id="_personAge" value="${personAge}" readonly>
                                <input type="hidden" id="personAgeDuringEvent" value="" data-type-dtip="1" readonly>
                            </div>  
                        </div>

                        <div class="row mb-2 person-cuz person-noid">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Вид документ</label>
                                    <select class="form-select person-base" id="_typeDocFgn"  value="${$('#typeDocFgn').val()}" use-hiera="vid_lichen_dok" required disabled>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="_numDocFgn">Номер на документ</label>
                                <input type="text" class="form-control person-base" id="_numDocFgn" value="${numDocFgn}" readonly>
                            </div>
                        </div>
                        <div class="row mb-2 person-cuz person-noid">
                            <div class="form-group col-md-6 contentOverModal">
                                <label>Дата на издаване</label>
                                <div class="input-group date onlydate">
                                    <input type="text" class="form-control person-base" id="_issueDateDocFgn" value="${issueDateDocFgn}" readonly>
                                    <div class="input-group-addon">
                                        <span class="input-group-text bg-light d-block"><i
                                                class="fa fa-calendar date-button"></i> </span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group col-md-6 contentOverModal person-cuz person-noid">
                                <label>Срок на валидност</label>
                                <div class="input-group date onlydate">
                                    <input type="text" class="form-control person-base" id="_exDateDocFgn" value="${exDateDocFgn}" readonly>
                                    <div class="input-group-addon">
                                        <span class="input-group-text bg-light d-block"><i
                                                class="fa fa-calendar date-button"></i> </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row mb-2 person-bg person-cuz">
                            <div class="form-group col-md-12">
                                <label for="_personPermAddress">Постоянен адрес</label>
                                <input type="text" class="form-control" type_address="5030"
                                    id="_personPermAddress" value="${personPermAddress}" readonly>
                            </div>
                        </div>
                        <div class="row my-2 person-bg person-cuz">
                            <label for="_personPresentAddress">Настоящ адрес</label>
                            <div class="form-group col-md-12">
                                <input type="text" class="form-control" type_address="18726"
                                    id="_personPresentAddress" value="${personPresentAddress}" readonly>
                            </div>
                        </div>
                    </div>
            `;

    //open modal when is clicked on the previewbutton 
    previewButton.click(function () {


        //add identification attribute
        $('#addMoreDetails').attr('sid', personSId);
        $('#addMoreDetails').attr('pnr', personPnr);
        $('#addMoreDetails').attr('typep', typeP); //tupe person - 1 (BG), 2 (CUZ), -1 (CUZ without identifier)

        //get person role for event is any
        var selectedStatPerson = $(this).parents('tr').find('td:nth-child(8)').attr('type-person-role');
        if (selectedStatPerson !== undefined) {
            $('#addMoreDetails').find('[name=radioSelectPerson][type-person-role=' + selectedStatPerson + ']').click();
        }
        //this will remove - type peron role "child" is deprecated
        // if (personAge === undefined || personAge > 17) {
        //     $('#inputChild').parent().hide();
        // } else {
        //     $('#inputChild').parent().show();
        // }
        //copy data from modalConfirmPerson

        $('#addMoreDetails').find('.main-data-fieldset').html(divContent);

        //load data come from server
        let getSelectedPerson = personChanged.getChanged(personSId);
        if (getSelectedPerson === undefined) {
            getSelectedPerson = personStorage.getPerson(personSId);
        }

        $('.error-required').addClass('hidden');
        //here need to set incomming server data for person
        //////START Set data
        //set nicknames

        if (getSelectedPerson.hasOwnProperty('nicknames')) {
            //clear nicknames fields
            $('#personNicknames > .container-rows > div').find('input.add-row').val('');
            $('#personNicknames > .container-rows > div').not(':first').remove();
            let nickNames = getSelectedPerson.nicknames;
            if (!Array.isArray(nickNames)) {
                nickNames = [nickNames];
            }

            //remove unused priakors - need to make a function
            //check for added sids and empty field
            // $('#personNicknames > div').not(':first').remove();
            // let firstFieldAddBtn = ;


            //test function natasha

            var containerRows = $('#personNicknames .container-rows');
            const label = $("<label>Прякор/Псевдоним</label>");
            containerRows.empty();
            containerRows.append(label);
            nickNames.forEach(function (value) {

                const row = $('<div class="row mb-1 divClone"></div>');
                const inputCol = $('<div class="form-group col-md-8"></div>');
                const input = $('<input type="text" readonly class="form-control mt-1 add-row">');
                const buttonCol = $('<div class="form-group d-flex align-items-center col-md-1"></div>');
                const minusButton = $('<i class="fas fa-minus-square btn-minus"></i>');
                minusButton.attr({
                    'data-bs-toogle': 'tooltip',
                    'data-bs-placement': 'right',
                    'title': "Премахни"
                });
                input.val(value.priakor);
                input.attr('sid_o', value.sid_o)
                    .attr('pnr_d', value.pnr_d)
                    .attr('cod_t', value.cod_t);

                inputCol.append(input);
                row.append(inputCol);
                row.append(buttonCol);
                buttonCol.append(minusButton);
                //enable tooltip
                minusButton.tooltip();
                containerRows.append(row);

            });

            $('.btn-minus').on('click', function () {
                //how to remove from server request?
                $(this).closest('.divClone').remove();
                $('.tooltip').removeClass('show');
            });

        } else {
            $('#personNicknames > .container-rows > div').find('input.add-row').val('');
            $('#personNicknames > .container-rows > div').find('input.add-row').removeAttr('sid_o pnr_d cod_t readonly');
            $('#personNicknames > .container-rows > div').find('.btn-minus').parent().remove();
            $('#personNicknames > .container-rows > div').not(':first').remove();
        }


        //set communicationPoint
        if (getSelectedPerson.hasOwnProperty('personSlovesnoList')) {
            //clear comunication points fields

            $('#displayItemsCommunications').empty();

            let points = getSelectedPerson.personSlovesnoList;
            if (!Array.isArray(points)) {
                points = [points];
            }
            let pointFields = "";

            let communicationPointHiera = JSON.parse(localStorage.getItem('tochki_na_komunikacia'));
            $.each(points, function () {

                if (this.sid_o * 1 === $('#addMoreDetails').attr('sid') * 1) {
                    let point = this;
                    let pointName = findTextByCodFromStorage(communicationPointHiera.hiera, point.stoinost);
                    pointFields += `<div class="added-item" data-id="${point.stoinost}">
                    ${pointName} - ${point.opisanie}
                    <input type="hidden" class="person-other person-slovesno" cod_z="${point.stoinost}" value="${point.opisanie}" pnr_d="${point.pnr_d}" readonly="">
                </div>`;
                }
            });
            $('#displayItemsCommunications').html(pointFields);
            $.each($('#displayItemsCommunications div'), function (ind, item) {
                $(item).append($('<span><i class="fas fa-times delete-option" data-bs-toogle="tooltip" data-bs-placement ="right" title="Премахни"></i></span>&nbsp;').click(function () {
                    // need to analisy - if have data in hidden field for pnr_d need to chanche operation in json - person_db_changed
                    $(item).remove();
                    $('.tooltip').removeClass('show');
                })
                )
                $('.delete-option').tooltip();

            });
        } else {
            $('#displayItemsCommunications').empty();
        }

        //nalojeni merki
        if (getSelectedPerson.hasOwnProperty('measureList')) {
            let measures = getSelectedPerson.measureList;
            let displayDiv = $('#displayImposedActions');
            displayDiv.empty();
            if (!Array.isArray(measures)) {
                measures = [measures];
            }
            $.each(measures, function () {
                let infinity = false;
                var selectedItemId = this.measure_code;
                var selectedItem = findTextByCodFromStorage(JSON.parse(localStorage.getItem('nalojeni_merki')).hiera, selectedItemId);
                var selectedDateStart = this.start_date;
                var selectedDateEnd = this.end_date;
                if (selectedDateEnd === undefined) {
                    infinity = true;
                }
                var noteInputText = this.description;

                if (selectedItem && selectedDateStart && noteInputText) {
                    var itemDiv = $(`<div class="added-item" data-id = ${selectedItemId}></div>`);

                    itemDiv.html(`${selectedItem}  &nbsp  ${selectedDateStart}  &nbsp  ${infinity === false ? selectedDateEnd : "Безсрочна"}   &nbsp  ${noteInputText}`);

                    itemDiv.append(`<input type="hidden" class="person-other person-measure" sid_f=${this.sid_f} pnr_f="${this.pnr_f}" measure_code="${selectedItemId}" start_date="${this.start_date}" end_date="${infinity === false ? selectedDateEnd : null}" description="${this.description}" infinity=${infinity} readonly=""></input>`);



                    itemDiv.append(
                        $('<span><i class="fas fa-times delete-option" data-bs-toogle="tooltip" data-bs-placement="right" title="Премахни"></i></span>&nbsp;').click(function () {
                            itemDiv.remove();
                            $('.tooltip').removeClass('show');
                        })
                    );
                    displayDiv.append(itemDiv);
                    $('.delete-option').tooltip();
                }
            });
        }

        //provedeni besedi
        if (getSelectedPerson.hasOwnProperty('conversationList')) {
            let conversations = getSelectedPerson.conversationList;
            if (!Array.isArray(conversations)) {
                conversations = [conversations];
            }
            let conversationFields = '';
            $.each(conversations, function () {
                let conversation = this;
                //id=displayDateConv
                conversationFields += `<div class="added-item" data-id="${conversation.sid_f}">
                    ${conversation.date} - ${conversation.officer_name}
                    <input type="hidden" class="person-other person-conversation" pnr_f="${conversation.pnr_f}" pnr_d="${conversation.pnr_d}" conv-date="${conversation.date}" conv-officer="${conversation.officer_name}" readonly="">
                </div>`;
            });
            $('#displayDateConv').html(conversationFields);
            $.each($('#displayDateConv div'), function (ind, item) {
                $(item).append($('<span><i class="fas fa-times delete-option" data-bs-toogle="tooltip" data-bs-placement ="right" title="Премахни"></i></span>&nbsp;').click(function () {
                    $(item).remove();
                    $('.tooltip').removeClass('show');
                })
                )
                $('.delete-option').tooltip();

            });
        } else {
            $('#displayDateConv').empty();
        }

        //clear address personCurrAddress


        clearTreeAndRelatedInputs('addressCurrentPerson');


        //set address personCurrAddress
        $.each(getSelectedPerson.addresses, function () {
            if (this.fdv.rol_o * 1 === 18725) {
                setPersonCurrAddress(this);
                $('#personCurrNom').val($.trim(this.nomer));
                $('#personCurrVhod').val($.trim(this.vhod));
                $('#personCurrEtaj').val(this.fadDop !== null ? $.trim(this.fadDop.etaj) : '');
                $('#personCurrApart').val(this.fadDop !== null ? $.trim(this.fadDop.apart) : '');
                $('#personCurrAdrOpis').val(this.fadDop !== null ? $.trim(this.fadDop.opisanie) : '');
            }
        })
        //clear selected data befor thath for dop data
        $.each($('#addMoreDetails').find('[data-type-dtip]'), function () {

            if ($(this)[0].tagName === 'BUTTON') {
                $(this).parent().trigger('clearDropdownMultiselect');
            }
            if ($(this)[0].tagName === 'SELECT') {
                $(this).find('option:nth-child(1)').prop('selected', true);
            }
            if ($(this)[0].tagName === 'INPUT') {
                $(this).val('');
            }

        })
        //set dop data
        if (getSelectedPerson.hasOwnProperty('fdv') && getSelectedPerson.fdv.hasOwnProperty('fdvOpList')) {
            let dopItem = getSelectedPerson.fdv.fdvOpList;
            if (!Array.isArray(dopItem)) {
                dopItem = [dopItem];
            }
            $.each(dopItem, function () {
                let setByDTip = $('#addMoreDetails').find('[data-type-dtip=' + this.dtip + ']');
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
                } else {
                    console.log('Dtip: ' + this.dtip + ' - is not found!')
                }
            })
        }
        //set fdvD data
        if (getSelectedPerson.hasOwnProperty('fdv') && getSelectedPerson.fdv.hasOwnProperty('fdvDList')) {
            let fdvDItem = getSelectedPerson.fdv.fdvDList;
            if (!Array.isArray(fdvDItem)) {
                fdvDItem = [fdvDItem];
            }

            $.each(fdvDItem, function (indx, fdvD) {
                if (fdvD.dtip === 37) {
                    $('#orderHandlingDate input').val(fdvD.dat);
                }
                if (fdvD.dtip === 38) {
                    $('#warningProtocolDate input').val(fdvD.dat);
                }
            })
        }

        //////END Set data
        $('#addMoreDetails').modal('show');
        if ($('#addMoreDetails').find('[data-type-dtip="1"]').val() !== undefined) {
            //FOR NOW CHANGE THIS AGE IS BEFORE HAVE EVENT_DB SESSION KEY
            
            console.log('AGE DURING EVENT IS SET!!!!!')
            console.log($('#evenDate').val());
        }
        $('#addMoreDetails #_personAge').val(getAgeFromBirthDay($('#_dateBirthDay').val()));
        $('#personAgeDuringEvent').val($('#addMoreDetails #_personAge').val());
        $('#_dateBirthDay').parent().on('dp.change', function () {
            $('#addMoreDetails #_personAge').val(getAgeFromBirthDay($('#_dateBirthDay').val()));
            $('#personAgeDuringEvent').val($('#addMoreDetails #_personAge').val());
        })

    });


    let isFromServer = sessionStorage.getItem('event_db') === null ? false : true;
    if (!isFromServer) {
        //append delete button
        const deleteButton = $('<a>').attr({
            'type': 'button',
            'data-bs-toogle': 'tooltip',
            'data-bs-placement': 'right',
            'title': 'Премахни'
        });
        const deleteSpanButton = $('<span>').addClass('fa-stack delete-button');
        const deleteIconButton = $('<i>').addClass('fa fa-square fa-stack-2x');
        const deleteIconWrapButton = $('<i>').addClass('fas fa-times fa-stack-1x fa-inverse');

        deleteButton.append(deleteSpanButton);
        deleteSpanButton.append(deleteIconButton);
        deleteSpanButton.append(deleteIconWrapButton);
        //enable tooltip after the button is created
        deleteButton.tooltip();

        //delete item when is clicked on the delete button
        deleteButton.click(function () {
            personStorage.removePerson(personSId);
            row.remove();
            $('.tooltip').removeClass('show');
            $('#personTable.table-records').trigger('removeError');
        });

        actionCell.append(previewButton, deleteButton);
    } else {
        $('#divForSearchPerson').removeClass('p-5').addClass('p-2');
        $('#searchPersonForm').hide();
        actionCell.append(previewButton);
    }

    row.append(actionCell);
    $('#dataPerson-table-body').append(row);
    $('#modalConfirmPerson').modal('hide');

});

//Event for close modal confirmPerson
$('#modalConfirmPerson').on('hidden.bs.modal', function () {
    //slagam timeout za da zabavi chisteneto na formata
    //izpolzwa se za premahvane na person v masiva, koito se namira v sessionStorage
    setTimeout(() => {
        $('#personTable.table-records').trigger('removeError');
        clearSearchPerson();
    }, 50);

});

/* A function that add status of person(victim, perpetrator or child) into table
 when is filled and saved. */

$('#confirmInformation').click(function () {
    const PODSIST = 34000;
    //not going next logic before fixed the errors
    if (requiredFields('addMoreDetails')) {
        var formId = 'addMoreDetails';

        focusOnError(formId);
        return false;

    }

    //dummy get data and add to list - personList

    var personStatus = $("input[name='radioSelectPerson']:checked").val();
    if (personStatus) {
        $('#dataPerson tbody tr[sid=' + $('#addMoreDetails').attr('sid') + '] td:nth-child(8)')
            .attr('type-person-role', $('[name=radioSelectPerson]:checked').attr('type-person-role'))
            .text(personStatus);
        // let personObject = findAddedPersonDataInStorage($('#addMoreDetails').attr('sid'), $('#addMoreDetails').attr('pnr'));
        // // console.log('when hide addMore... person');

        // personObject["personAddresses"] = personObject["personAddresses"].concat(addDataForAddresses(['address-curr']));

        // //start check logic from here - Jivko
        // console.log(personObject);
        // $('#addMoreDetails').modal('hide');



        let todayDate = new Date();
        const DATE_NOW = (todayDate.getDate() < 10 ? '0' + todayDate.getDate() : todayDate.getDate()) + '.' + (todayDate.getMonth() + 1 < 10 ? '0' + (todayDate.getMonth() + 1) : todayDate.getMonth() + 1) + '.' + todayDate.getFullYear();
        const TIME_NOW = ((todayDate.getHours()) < 10 ? '0' + (todayDate.getHours()) : + todayDate.getHours()) +
            ':' + ((todayDate.getMinutes()) < 10 ? '0' + (todayDate.getMinutes()) : + todayDate.getMinutes()) +
            ':' + ((todayDate.getSeconds()) < 10 ? '0' + (todayDate.getSeconds()) : + todayDate.getSeconds());
        let changedPerson = personChanged.getChanged($('#addMoreDetails').attr('sid'));
        if (changedPerson === undefined) {
            changedPerson = personStorage.getPerson($('#addMoreDetails').attr('sid'));
        }
        if ($('#addMoreDetails').attr('typep') * 1 === -1) {//chuj bez identifikator
            //get data for person from addmoreDetails!
            changedPerson.datIzd = $('#_issueDateDocFgn').val();
            changedPerson.datRaj = $('#_dateBirthDay').val();
            changedPerson.datVal = $('#_exDateDocFgn').val();
            changedPerson.dat_vav = (todayDate.getDate() < 10 ? '0' + todayDate.getDate() : todayDate.getDate()) + '.' + (todayDate.getMonth() + 1 < 10 ? '0' + (todayDate.getMonth() + 1) : todayDate.getMonth() + 1) + '.' + todayDate.getFullYear();
            changedPerson.graj = $('#_personNationality option:selected').attr('cod_z') !== undefined ? $('#_personNationality option:selected').attr('cod_z') * 1 : 0;
            changedPerson.imena = $('#_fgnNameLatin').val();
            changedPerson.imek = $('#_fgnNameCirilic').val();
            changedPerson.nacBel = changedPerson.graj;
            changedPerson.nacPasp = $('#_numDocFgn').val();
            changedPerson.pol = $('#_personSex option:selected').attr('cod_z') * 1;
            changedPerson.pol_txt = $('#_personSex option:selected').text();
            changedPerson.vidDok = $('#_typeDocFgn option:selected').attr('cod_z') !== undefined ? $('#_typeDocFgn option:selected').attr('cod_z') * 1 : 0;
            let row = $('#dataPerson-table-body tr[sid="' + $('#addMoreDetails').attr('sid') + '"]');
            let tdArr = row.find('td');
            $(tdArr.get(1)).html('<span>ИМЕНА НА ЛАТИНИЦА:&nbsp</span>' + changedPerson.imena.toUpperCase() + '<br><span>ИМЕНА НА КИРИЛИЦА:&nbsp</span>' + changedPerson.imek.toUpperCase());
            // $(tdArr.get(3)).html($('#_personAge').val());
            $(tdArr.get(3)).html($('#personAgeDuringEvent').val());
            $(tdArr.get(4)).html(changedPerson.pol_txt);
            $(tdArr.get(5)).html($('#_personNationality option:selected').text());
            $(tdArr.get(7)).html(personStatus);
            // personStorage.removePerson($('#addMoreDetails').attr('sid'));
            // personStorage.addPerson(changedPerson);
            personChanged.removeChanged($('#addMoreDetails').attr('sid'));
            personChanged.addChangedPerson(changedPerson);
        }
        //changedPerson.operation = '?'
        //8244 - proveren i potvarden signal
        let fdvLice = {
            "sid_f": 0,
            "pnr_f": 0,
            "fact": 8244,
            "cod_t": changedPerson.TYPE_OBJECT * 1,
            "sid_o": changedPerson.sid_o * 1,
            "pnr_o": changedPerson.pnr_o * 1,
            "rol_o": $("input[name='radioSelectPerson']:checked").attr('type-person-role') * 1,
            "mrk_akt": "Y",
            "podsist": PODSIST,
            "dat": DATE_NOW,
            "cas": TIME_NOW,
            "operation": 1
        };
        let fdvOpList = [];
        let fdvOpTMP = function () {
            return {
                "sid_f": 0,
                "pnr_f": 0,
                "pnr_d": 0,
                "cod_t": changedPerson.TYPE_OBJECT * 1,
                "dtip": 0,
                "stoinost": 0,
                "opisanie": "",
                "mrk_akt": "Y",
                "dat_vav": DATE_NOW,
                "operation": 1
            };
        };
        //add data in json for lice adresa za prizovavane
        //6248 - mestojiveene
        //17 - adres
        if ($('#addMoreDetails #personCurrEknm').find('span').attr('cod_z') !== undefined) {
            let fdvAdrPrizovavane = {
                "sid_f": 0,
                "pnr_f": 0,
                "fact": 6248,
                "cod_t": 17,
                "sid_o": 0,
                "pnr_o": 0,
                "rol_o": $('#addMoreDetails #personCurrAddress').attr('type_address') * 1,
                "mrk_akt": "Y",
                "podsist": PODSIST,
                "dat": DATE_NOW,
                "cas": TIME_NOW,
                "operation": 1
            };
            let addressPrizovavane = {
                "sid_o": 0,
                "pnr_o": 0,
                "eknm": $('#addMoreDetails #personCurrEknm').find('span').attr('cod_z') * 1,
                "kod_ul": $('#addMoreDetails #personCurrUlica').find('span').attr('cod_z') !== undefined ?
                    $('#addMoreDetails #personCurrUlica').find('span').attr('cod_z') * 1 : 0,
                "nomer": $.trim($('#addMoreDetails #personCurrNom').val()),
                "vhod": $.trim($('#addMoreDetails #personCurrVhod').val()),
                "mrk_akt": "Y",
                "dat_vav": DATE_NOW,
                "operation": 1
            };
            let addressFadDop = {
                "sid_f": 0,
                "pnr_f": 0,
                "pod_adr": 0,//from eknm!
                "vid_adr": $('#addMoreDetails #personCurrAddress').attr('type_address') * 1,
                "etaj": $.trim($('#addMoreDetails #personCurrEtaj').val()),
                "apart": $.trim($('#addMoreDetails #personCurrApart').val()),
                "mrk_akt": "Y",
                "opisanie": $.trim($('#addMoreDetails #personCurrAdrOpis').val()),
                "operation": 1
            };

            addressPrizovavane["fdv"] = fdvAdrPrizovavane;
            addressPrizovavane["fadDop"] = addressFadDop;

            if (changedPerson.hasOwnProperty('addresses')) {
                let addressesArr = changedPerson.addresses;
                if (!Array.isArray(addressesArr)) {
                    addressesArr = [addressesArr];
                }
                // if found in arr then remove
                let removeIndex;
                $.each(addressesArr, function (idx, item) {
                    if (item.fdv.rol_o === 18725) {
                        removeIndex = idx;
                        return;
                    }
                });
                if (removeIndex !== undefined) {
                    addressesArr.splice(removeIndex, 1);
                }

                addressesArr.push(addressPrizovavane);
                delete changedPerson['addresses'];
                changedPerson['addresses'] = addressesArr;
            } else {
                changedPerson['addresses'] = [addressPrizovavane];
            }
        }


        //add data in json for lice current facts
        $.each($('#addMoreDetails').find('[data-type-dtip]'), function () {

            let fdvOp;
            //special for ageDuringTheEvent
            if ($(this).attr('data-type-dtip') * 1 === 1) {
                fdvOp = new fdvOpTMP();
                fdvOp.dtip = '1';
                fdvOp.stoinost = ($(this).val() * 1) + '';
                fdvOpList.push(fdvOp);
            }

            if ($(this).is(':visible')) {
                let dtipNum = $(this).attr('data-type-dtip'); // dtip number
                let stoinostNum = null;
                let opisanie = null;
                switch ($(this).get(0).nodeName.toLowerCase()) { // html element
                    case "button":
                        $.each($(this).find('span'), function () {
                            if ($(this).attr('cod_z') !== undefined) {
                                fdvOp = new fdvOpTMP();
                                stoinostNum = $(this).attr('cod_z') * 1;
                                fdvOp.dtip = dtipNum;
                                fdvOp.stoinost = stoinostNum;
                                fdvOp.opisanie = opisanie;
                                fdvOpList.push(fdvOp);
                            }
                        });
                        break;
                    case "select":
                        if ($(this).find('option:selected').attr('cod_z') !== undefined) {
                            fdvOp = new fdvOpTMP();
                            stoinostNum = $(this).find('option:selected').attr('cod_z') * 1;
                            fdvOp.dtip = dtipNum;
                            fdvOp.stoinost = stoinostNum;
                            fdvOp.opisanie = opisanie;
                            fdvOpList.push(fdvOp);
                        }
                        break;
                    case "input":
                        if ($(this).val() !== undefined && ($.trim($(this).val())).length > 0) {
                            fdvOp = new fdvOpTMP();
                            stoinostNum = $(this).attr('type-dtip-stoinost') * 1;
                            opisanie = $(this).val();
                            fdvOp.dtip = dtipNum;
                            fdvOp.stoinost = stoinostNum;
                            fdvOp.opisanie = opisanie;
                            fdvOpList.push(fdvOp);
                        }
                        break;
                    default:
                        break;
                }

            }
        });
        if (fdvOpList.length > 0) {
            fdvLice["fdvOpList"] = fdvOpList;
        }
        let fdvDList = []
        let fdvDTMP = function () {
            return {
                "sid_f": 0,
                "pnr_f": 0,
                "pnr_d": 0,
                "cod_t": changedPerson.TYPE_OBJECT * 1,
                "dtip": 0,
                "dat": 0,
                "cas": "",
                "mrk_akt": "Y",
                "operation": 1
            };
        };
        if ($('#warningProtocolDate').parent().is(':visible')) {
            let warningProtocol = new fdvDTMP();
            warningProtocol.dtip = $('#warningProtocolDate input').attr('dtip') * 1;
            warningProtocol.dat = $('#warningProtocolDate input').val();
            fdvDList.push(warningProtocol)
        }
        if ($('#orderHandlingDate').parent().is(':visible')) {
            let orderHandling = new fdvDTMP();
            orderHandling.dtip = $('#orderHandlingDate input').attr('dtip') * 1;
            orderHandling.dat = $('#orderHandlingDate input').val();
            fdvDList.push(orderHandling)
        }
        if (fdvDList.length > 0) {
            fdvLice["fdvDList"] = fdvDList;
        }




        changedPerson["fdv"] = fdvLice;

        //add data in json for nicknames
        let nickNames = [];
        let nickNameTmp = function () {
            return {
                "sid_o": 0,
                "pnr_d": 0,
                "cod_t": changedPerson.TYPE_OBJECT * 1,
                "priakor": "",
                "dat_vav": DATE_NOW,
                "mrk_akt": "Y",
                "operation": 1
            };
        };

        $.each($('#addMoreDetails #personNicknames').find('input'), function () {
            let nickName = new nickNameTmp();
            //check for new priakors by sid and pnrd
            if ($(this).attr('sid_o') === undefined && $(this).attr('pnr_d') === undefined) {
                if ($(this).val() !== null && ($.trim($(this).val()).length > 0)) {
                    nickName.sid_o = changedPerson.sid_o * 1;
                    nickName.priakor = $(this).val();
                    nickNames.push(nickName);
                }
            } 
            // else {
            //     nickName.sid_o = changedPerson.sid_o * 1;
            //     nickName.pnr_d = changedPerson.pnr_d * 1;
            //     nickName.priakor = changedPerson.priakor;
            //     nickName.dat_vav = changedPerson.dat_vav;
            //     nickName.mrk_akt = changedPerson.mrk_akt;
            //     nickName.operation = 0;
            //     nickNames.push(nickName);
            // }
        });
        if (changedPerson.hasOwnProperty('nicknames')) {
            if (nickNames.length > 0) {
                $.each(nickNames, function () {
                    changedPerson.nicknames.push(this);
                });
            }
        } else {
            if (nickNames.length > 0) {
                changedPerson["nicknames"] = nickNames;
            }
        }
        //add data in json for slovesno
        let personSlovesnoList = [];
        let slovesnoTMP = function () {
            //dtipa tova li e!
            return {
                "sid_o": 0,
                "pnr_o": 0,
                "pnr_d": 0,
                "cod_t": changedPerson.TYPE_OBJECT * 1,
                "dtip": 1, // moje da ima problemi s dtip -a; dtip 1 e slojen za vazrast po vreme na sabitieto/incidenta
                "dtip_txt": "",
                "stoinost": 0,
                "opisanie": "",
                "dat_vav": DATE_NOW,
                "mrk_akt": "Y",
                "operation": 1
            };
        };
        $.each($('#addMoreDetails #displayItemsCommunications').find('input'), function () {
            let slovesno = new slovesnoTMP();
            if ($(this).attr('pnr_d') === undefined) {
                slovesno.sid_o = changedPerson.sid_o * 1;
                slovesno.pnr_o = changedPerson.pnr_o * 1;
                slovesno.stoinost = $(this).attr('cod_z') * 1;
                slovesno.opisanie = $(this).attr('value') + '';
                personSlovesnoList.push(slovesno);
            } 
            // else {
            //     slovesno.sid_o = changedPerson.sid_o * 1;
            //     slovesno.pnr_o = changedPerson.pnr_o * 1;
            //     slovesno.pnr_d = changedPerson.pnr_d * 1;
            //     slovesno.stoinost = changedPerson.stoinost * 1;
            //     slovesno.opisanie = changedPerson.opisanie;
            //     slovesno.dat_vav = changedPerson.dat_vav;
            //     slovesno.mrk_akt = changedPerson.mrk_akt;
            //     slovesno.operation = 0;
            //     personSlovesnoList.push(slovesno);
            // }
        });
    
        if (changedPerson.hasOwnProperty('personSlovesnoList')) {
            if (personSlovesnoList.length > 0) {
                $.each(personSlovesnoList, function () {
                    changedPerson.personSlovesnoList.push(this);
                });
            }
        } else {
            if (personSlovesnoList.length > 0) {
                changedPerson["personSlovesnoList"] = personSlovesnoList;
            }
        }


        //add data in json for converations - besedi in person

        let conversationList = [];
        let conversationTMP = function () {
            return {
                "sid_f": 0,
                "pnr_f": 0,
                "pnr_d": 0,
                "date": "",
                "officer_name": "",
                "operation": 1
            };
        };
        $.each($('#addMoreDetails #displayDateConv').find('input'), function () {
            let conversation = new conversationTMP();
            conversation.date = $(this).attr('conv-date');
            conversation.officer_name = $(this).attr('conv-officer') + '';
            conversationList.push(conversation);
        });
        if (conversationList.length > 0) {
            changedPerson["conversationList"] = conversationList;
        }


        let measureList = [];
        let measureTMP = function () {
            return {
                "sid_f": 0,
                "pnr_f": 0,
                "measure_code": 0,
                "start_date": "",
                "description": "",
                "operation": 1
            }
        };


        $.each($('#addMoreDetails #displayImposedActions').find('input'), function () {
            if ($(this).parents('.form-group').is(':visible')) {
                let measure = new measureTMP();
                measure.sid_f = $(this).attr('sid_f') * 1;
                measure.pnr_f = $(this).attr('pnr_f') * 1;
                measure.measure_code = $(this).attr('measure_code') * 1;
                measure.start_date = $(this).attr('start_date');
                if ($(this).attr('infinity') === "false") {
                    measure.end_date = $(this).attr('end_date');
                }

                measure.description = $(this).attr('description');
                measureList.push(measure);
            }
        });

        if (measureList.length > 0) {
            changedPerson["measureList"] = measureList;
        }


        personChanged.removeChanged($('#addMoreDetails').attr('sid'));
        personChanged.addChangedPerson(changedPerson);
        console.log(changedPerson);
        //sessionStorage.setItem('personList',changedPerson);
        $('#addMoreDetails').modal('hide');


    }
    else {
        createModal("error", "Избери роля!", false, false);
    }

});



$('#addMoreDetails').on('hidden.bs.modal', function () {
    $('#addMoreDetails .modal-body').find('.contentOverModalRem').removeClass('contentOverModalRem').addClass("contentOverModal");
    $('#addMoreDetails .modal-body').removeClass("modalBodyScroll");
    $('#addMoreDetails').removeAttr('sid');
    $('#addMoreDetails').removeAttr('pnr');
    $('#addMoreDetails').removeAttr('typep');
    $("input[name='radioSelectPerson']").prop("checked", false);
    $('.person-stat').hide();

});



$('#addMoreDetails').on('show.bs.modal', function () {

    $('input[name="radioSelectPerson"]').change(function () {
        $('#addMoreDetails .modal-body').find('.contentOverModal').removeClass('contentOverModal').addClass("contentOverModalRem");
        $('#addMoreDetails .modal-body').addClass("modalBodyScroll");
        $('#addMoreDetails .modal-body').scrollTop(0);

    });
    let findedIdForPopulate = [];
    $.each($('.main-data-fieldset').find('select'), function () {
        findedIdForPopulate.push($(this).attr('id'));
    })

    $.each(findedIdForPopulate, function (i, v) {
        populateSelect.loadDefault(v);
        $('#' + v).val($('#' + v).attr('value'));
    })
    if ($('#addMoreDetails').attr('typep') * 1 === 1) {

        $('#addMoreDetails').find('.person-cuz').hide();
        $('#addMoreDetails').find('.person-noid').hide();
        $('#addMoreDetails').find('.person-bg').show();
        $('#addMoreDetails').find('.person-bg').removeClass('col-md-6');
        $.each($('#addMoreDetails').find('.readable'), function () {
            $(this).removeClass('readable');
            $(this).prop('readonly', true);
        });
        $.each($('#addMoreDetails').find('.enableble'), function () {
            $(this).removeClass('enableble');
            $(this).prop('disabled', true);
        });
    }
    if ($('#addMoreDetails').attr('typep') * 1 === 2) {

        $('#addMoreDetails').find('.person-bg').hide();
        $('#addMoreDetails').find('.person-noid').hide();
        $('#addMoreDetails').find('.person-cuz').show();
        $('#addMoreDetails').find('.column-6').addClass('col-md-6');
        $.each($('#addMoreDetails').find('.readable'), function () {
            $(this).removeClass('readable');
            $(this).prop('readonly', true);
        });
        $.each($('#addMoreDetails').find('.enableble'), function () {
            $(this).removeClass('enableble');
            $(this).prop('disabled', true);
        });
    }
    if ($('#addMoreDetails').attr('typep') * 1 === -1) {

        $('#addMoreDetails').find('.person-cuz').hide();
        $('#addMoreDetails').find('.person-bg').hide();
        $('#addMoreDetails').find('.person-noid').show();

        $.each($('#addMoreDetails').find('[readonly]'), function () {
            if ($(this).attr('id') !== '_personAge') {

                $(this).addClass('readable');
                $(this).removeAttr('readonly');

            }
        });
        $.each($('#addMoreDetails').find('[disabled]'), function () {

            $(this).addClass('enableble');
            $(this).removeAttr('disabled');

        });

        $('#addMoreDetails .onlydate').datetimepicker({

            icons: {
                next: "fas fa-chevron-right",
                previous: "fas fa-chevron-left",
                time: "fas fa-clock",
                up: "fas fa-angle-up",
                down: "fas fa-angle-down",
                date: "far fa-calendar-alt",
                clear: "fas fa-trash-alt",
                close: "fas fa-times",
                today: "fas fa-home"

            },
            debug: true,
            format: "DD.MM.YYYY",
            locale: 'bg',
            toolbarPlacement: 'top',
            showTodayButton: true,
        });
        let changedPerson = personChanged.getChanged($('#addMoreDetails').attr('sid'));
        if ($('#addMoreDetails').attr('typep') * 1 === -1) {//chuj bez identifikator
            //get data for person from addmoreDetails!
            $('#_issueDateDocFgn').val(changedPerson.datIzd);
            $('#_dateBirthDay').val(changedPerson.datRaj);
            $('#_exDateDocFgn').val(changedPerson.datVal);
            $('#_personNationality option[cod_z="' + changedPerson.graj + '"]').prop('selected', true);
            $('#_fgnNameLatin').val(changedPerson.imena);
            $('#_fgnNameCirilic').val(changedPerson.imek);
            $('#_numDocFgn').val(changedPerson.nacPasp);
            $('#_personSex option[cod_z="' + changedPerson.pol + '"]').prop('selected', true);
            $('#_typeDocFgn option[cod_z="' + changedPerson.vidDok + '"]').prop('selected', true);


        }



    }

});