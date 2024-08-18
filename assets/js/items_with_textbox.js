
function setupSelectWithTextBox(openBtnId, displayId, modalType, data) {

    var displayDiv = $(`#${displayId}`);

    //template modal
    $(`#${openBtnId}`).click(function () {
        var modal = $(`
                <div class="modal modal-data" tabindex="-1" role="dialog">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Нов запис</h5>
                                <button type="button" class="btn-close btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                               ${dynamicModalBody(modalType, data)} 
                               </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-light border" data-bs-dismiss="modal">Затвори</button>
                                <button type="button" id="addItemBtn-${openBtnId}" class="btn btn-success">Потвърди</button>
                            </div>
                        </div>
                    </div>
                </div>

            `);


        function dynamicModalBody(modalBodyType, data) {

            if (modalBodyType == "selectWithTextbox") {

                var selectBody = '<label>Точки за комуникации</label><select id="select-' + openBtnId + '" class="form-control form-select py-2">';
                var input = '<input type="text" id="input-' + openBtnId + '" class="form-control py-2 mt-2" placeholder="Въведи">';
                selectBody += '<option value="" disabled selected>Избери</option>';

                $.each(data, function (index, data) {
                    selectBody += '<option value="' + data.cod_z + '">' + data.ime_z + '</option>';
                });
                selectBody += '</select>';
                return selectBody + input;
            }

            else if (modalBodyType === "dateWithTextBox") {

                var wrapDate = '<label>Дата на проведената беседа</label><div class="input-group mb-1 date onlydate">';
                var inputDate = '<input type="text" class="form-control" id="date-' + openBtnId + '">';
                var wrapButton = '<div class="input-group-addon"><span class="input-group-text bg-light d-block"><i class="fa fa-calendar date-button"></i></span></div>';

                inputDate += wrapButton;
                wrapDate += inputDate;
                wrapDate += '</div>';

                var employeeInput =
                    '<div class="mt-2"><label>Служител провел беседата</label><input type="text" id="eInput-' + openBtnId + '"  class="form-control py-2"></div>';

                //var noteInput =
                //    '<div class="mt-2"><label>Допълнителна бележка</label><input type="text" id="nInput-' + openBtnId + '" class="form-control py-2"></div>';
                return wrapDate + employeeInput;
            }
            else if (modalBodyType === "selectWithTwoDates") {

                var selectBody = '<label>Мерки по ЗЗДН</label><select id="select-' + openBtnId + '" class="form-control form-select py-2">';
                selectBody += '<option value="" disabled selected>Избери</option>';
                $.each(data, function (index, data) {
                    selectBody += '<option value="' + data.cod_z + '">' + data.ime_z + '</option>';
                });
                selectBody += '</select>';

                var wrapDateStart = '<label class="mt-2">Начална дата</label><div class="input-group mb-2 date onlydate">';
                var wrapDateEnd = '<label>Крайна дата</label><div class="input-group mb-1 date onlydate">';

                var inputDateStart = '<input type="text" class="form-control" id="dateStart-' + openBtnId + '">';
                var inputDateEnd = '<input type="text" class="form-control" id="dateEnd-' + openBtnId + '">';

                var wrapButtonStart = '<div class="input-group-addon"><span class="input-group-text bg-light d-block"><i class="fa fa-calendar date-button"></i></span></div>';
                var wrapButtonEnd = '<div class="input-group-addon"><span class="input-group-text bg-light d-block"><i class="fa fa-calendar date-button"></i></span></div>';

                inputDateStart += wrapButtonStart;
                wrapDateStart += inputDateStart;
                wrapDateStart += '</div>';

                inputDateEnd += wrapButtonEnd;
                wrapDateEnd += inputDateEnd;
                wrapDateEnd += '</div>';

                var noteInput =
                    '<div class="mt-2"><label>Допълнителна бележка</label><textarea placeholder="Кратко описание на наложената мярка" type="text" id="nInput-' + openBtnId + '" class="form-control py-2"></textarea></div>';
                return selectBody + wrapDateStart + wrapDateEnd + noteInput;
            }
        }

        //find the specific 'add button' based on Id and display the items with delete button
        modal.find(`#addItemBtn-${openBtnId}`).click(function () {

            //if modal contain select with one input filed
            if (modalType === 'selectWithTextbox') {
                var selectedItem = modal.find(`#select-${openBtnId}`).find(":selected").text();
                var selectedItemId = modal.find(`#select-${openBtnId}`).find(":selected").val();

                var inputText = modal.find(`#input-${openBtnId}`).val();

                //if has values
                if (selectedItem && inputText) {

                    //get the values from modal
                    var itemDiv = $(`<div class="added-item" data-id = ${selectedItemId}></div>`);
                    itemDiv.html(selectedItem + " - " + inputText);
                    itemDiv.append(`<input type="hidden" class="person-other person-slovesno" cod_z=${selectedItemId} value="${inputText}" readonly>`);


                    //append delete button
                    itemDiv.append(
                        $('<span><i class="fas fa-times delete-option" data-bs-toogle="tooltip" data-bs-placement="right" title="Премахни"></i></span>&nbsp;').click(function () {

                            itemDiv.remove();
                            //hide tooltip
                            $('.tooltip').removeClass('show');
                        })
                    );


                    displayDiv.append(itemDiv);

                    //enable tooltip after the button is created
                    $('.delete-option').tooltip();


                    //hide the modal when is appended
                    modal.modal("hide");
                    modal.find(`#input-${openBtnId}`).val("");
                }

            }
            //if modal contain datetimepicker and two inputs
            else if (modalType === "dateWithTextBox") {
                var date = modal.find(`#date-${openBtnId}`).val();
                // var selectedDateEnd = modal.find(`#dateEnd-${openBtnId}`).val();

                var employeeInputText = modal.find(`#eInput-${openBtnId}`).val();
                //var noteInputText = modal.find(`#nInput-${openBtnId}`).val();

                if (date && employeeInputText) {
                    //get the values from modal


                    var itemDiv = $(`<div class="added-item" data-id = ${selectedItemId}></div>`);

                    itemDiv.html(date + " - " + employeeInputText);// + " - " + noteInputText);
                    itemDiv.append(`<input type="hidden" class="person-other person-conversation" pnr_f="0" pnr_d="0" conv-date="${date}" conv-officer="${employeeInputText}" readonly="">`);

                    //append delete button
                    itemDiv.append(
                        $('<span><i class="fas fa-times delete-option" data-bs-toogle="tooltip" data-bs-placement="right" title="Премахни"></i></span>&nbsp;').click(function () {
                            itemDiv.remove();
                            $('.tooltip').removeClass('show');
                        })
                    );
                    displayDiv.append(itemDiv);
                    $('.delete-option').tooltip();
                    //hide the modal when is appended
                    modal.modal("hide");
                    modal.find('.onlydate').val("");
                    modal.find(`#eInput-${openBtnId}`).val("");
                    // modal.find(`#nInput-${openBtnId}`).val("");


                }

            }
            else if (modalType === "selectWithTwoDates") {
                var selectedItem = modal.find(`#select-${openBtnId}`).find(":selected").text();
                var selectedItemId = modal.find(`#select-${openBtnId}`).find(":selected").val();
                var selectedDateStart = modal.find(`#dateStart-${openBtnId}`).val();
                var selectedDateEnd = modal.find(`#dateEnd-${openBtnId}`).val();
                var infinity= modal.find(`#dateEnd-${openBtnId}`).attr('infinity');
                var noteInputText = modal.find(`#nInput-${openBtnId}`).val();

                if (selectedItem && selectedDateStart && selectedDateEnd && noteInputText) {
                    //get the values from modal
                    var itemDiv = $(`<div class="added-item" data-id = ${selectedItemId}></div>`);
                    itemDiv.html(selectedItem + ' &nbsp ' + selectedDateStart + " &nbsp " + selectedDateEnd + " &nbsp " + noteInputText);

                    itemDiv.append(`<input type="hidden" class="person-other person-measure" sid_f=0 pnr_f=0 measure_code="${selectedItemId}" start_date="${selectedDateStart}" end_date="${infinity==="false" ? selectedDateEnd : null}" description="${noteInputText}" infinity="${infinity}" readonly=""></input>`);

                    //append delete button
                    itemDiv.append(
                        $('<span><i class="fas fa-times delete-option" data-bs-toogle="tooltip" data-bs-placement="right" title="Премахни"></i></span>&nbsp;').click(function () {
                            itemDiv.remove();
                            $('.tooltip').removeClass('show');
                        })
                    );
                    displayDiv.append(itemDiv);

                    $('.delete-option').tooltip();
                    //hide the modal when is appended
                    modal.modal("hide");
                    // modal.find('.onlydate').val("");
                    // modal.find(`#eInput-${openBtnId}`).val("");
                    // modal.find(`#nInput-${openBtnId}`).val("");


                }

            }

        });

        //initialize datetimepicker
        modal.on('shown.bs.modal', function () {
            $('.onlydate', modal).datetimepicker({

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

            $('#select-openModalForImposedActions').change(function () {

                if ($('#select-openModalForImposedActions').val() === "8161") {

                    $("#dateEnd-openModalForImposedActions").val('Безсрочна');
                    $("#dateEnd-openModalForImposedActions").attr('readonly', true);
                    $("#dateEnd-openModalForImposedActions").attr('infinity', true);
                }
                else {
                    $("#dateEnd-openModalForImposedActions").val('');
                    $("#dateEnd-openModalForImposedActions").attr('readonly', false);
                    $("#dateEnd-openModalForImposedActions").attr('infinity', false);
                }

            })
        });

        // remove the modal from the page when hidden
        modal.on('hidden.bs.modal', function () {
            modal.remove();
        });

        // add the modal to the body html page
        $("body").append(modal);
        modal.modal("show");
    });


}


//communication point for victim
var communicationPointData = JSON.parse(localStorage.getItem('tochki_na_komunikacia')).hiera.row;
setupSelectWithTextBox("openModalForAddingCommunications", "displayItemsCommunications", "selectWithTextbox", communicationPointData);

// //imposed actions
var jsonDataImposedActions = JSON.parse(localStorage.getItem('nalojeni_merki')).hiera.row;
setupSelectWithTextBox("openModalForImposedActions", "displayImposedActions", "selectWithTwoDates", jsonDataImposedActions);



//date conversation
setupSelectWithTextBox("openModalForDateConv", "displayDateConv", "dateWithTextBox");




