function appendRetrievedEventIntoTable(data) {
    
    if (data) {
        $("#divForTableResultEvents").removeClass("hidden");
        $('#docData').parent().removeClass('hidden');

        //those variables are for event
        var idRecords = data.ddList[0].reg_nom;
        var dateRecords = data.ddList[0].dat_vav;
        var podlHiera = JSON.parse(localStorage.getItem('podelenia'));
        var podlReg = findTextByCodFromStorage(podlHiera.hiera, data.ddList[0].pod_reg);
        var podlLvlUp = jsonTraversFromCurrenPos(podlHiera, data.ddList[0].pod_reg, 1);
        var podlLvlUpTxt = podlLvlUp.ime_z;

        //added into row sid_f - this is hidden
        const row = $('<tr sid_f="' + data.ddList[0].fdv.sid_f + '">');

        //append row
        row.append($('<td>').text(idRecords));
        row.append($('<td>').text(dateRecords));
        row.append($('<td>').text(podlReg));
        row.append($('<td>').text(podlLvlUpTxt));

        //column action buttons
        const actionCell = $('<td>').addClass('text-center');


        //edit button
        const editButton = $('<a>').attr({
            'type': 'button',
            'data-bs-toogle': 'tooltip',
            'data-bs-placement':'left',
            'title': 'Промени',
            
        });
        
        
        const editSpanButton = $('<span>').addClass('fa-stack edit-button');
        const editIconButton = $('<i>').addClass('fa fa-square fa-stack-2x');
        const editIconWrapButton = $('<i>').addClass('fas fa-edit fa-stack-1x fa-inverse');

        editButton.append(editSpanButton);
        editSpanButton.append(editIconButton);
        editSpanButton.append(editIconWrapButton);

        //enable tooltip after the button is created
        editButton.tooltip();


        //if edit button click get data
        editButton.on("click", function () {
        //this function is saved data from post response
        loadEventData(data);
        //redirect to create form
        $("#divForEditForm").addClass("hidden");
        $("#divForTableResultEvents").addClass("hidden");
        $("#divForCreateForm").removeClass("hidden");
        });

        //delete button
        const deleteButton = $('<a>').attr({
            'type':'button',
            'data-bs-toogle': 'tooltip',
            'data-bs-placement': 'right',
            'title': 'Изтрий'
        });
        const deleteSpanButton = $('<span>').addClass('fa-stack delete-button');
        const deleteIconButton = $('<i>').addClass('fa fa-square fa-stack-2x');
        const deleteIconWrapButton = $('<i>').addClass('fas fa-trash fa-stack-1x fa-inverse');

        deleteButton.append(deleteSpanButton);
        deleteSpanButton.append(deleteIconButton);
        deleteSpanButton.append(deleteIconWrapButton);
        
        //enable tooltip after the button is created
        deleteButton.tooltip();

        //if click delete remove data
        deleteButton.on("click", function () {
            //function  delete events
            let sidToDelete = $(this).parents('tr').attr('sid_f') * 1;
            createModal("error", "Този запис ще бъде изтрит безвъзвратно от базата данни. Искаш ли да продължиш?", true, function () {
                //the logic for delete event
                let url = URL_TO_USE + '/delete-signal-by-sid?sidF='+sidToDelete;
                console.log(url)
                $.ajax({
                    type: 'DELETE',
                    url: url,
                    timeout: 3000,
                    success: function (data, textStatus, xhr) {
                        console.log("signal delete response");
                        sessionStorage.removeItem('persons_db_changed');
                        sessionStorage.removeItem('persons_db');
                        $('#tableBody').empty();
                        $('#divForTableResultEvents').hide();
                        createModal('success', 'Данните са изтрити успешно!', false, false);
                        //remove table!
                    },
                    error: function (jqxhr, textStatus, errorThrown) {
                        console.log("signal delete response error");
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
                        createModal("error", "Грешка - " + jqxhr.status + " - " + jqxhr.responseText, false, false);
            
                    }
                });

            });
        });

        row.append(actionCell);

        //if is not admin draw only edit button
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

                //draw  buttons preview and delete
                actionCell.append(editButton, deleteButton);

            }
        }

        $('#alertsTable tbody').append(row);

    }
    
}

 
function ckeckForExistedEvent() {
    var exist = false;

    $("#alertsTable tbody tr").each(function () {

        var idRecords = $('#editEventNumber').val();
        var dateRecords = $('#editEvenDate').val();
        var podlReg = $('#podlReg').find('.form-span-single-select').text();

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


