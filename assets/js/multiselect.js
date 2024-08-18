
//type act
var jsonDatatypeActs = JSON.parse(localStorage.getItem('vid_nasilie')).hiera.row;
drawingDropdownMenuBasedOnId("dropdownTypeActVict", jsonDatatypeActs);

//refer to institution
var jsonDataReferToInstitution = JSON.parse(localStorage.getItem('nasochavene_kam_institucia')).hiera.row;
drawingDropdownMenuBasedOnId("refToInstitutionVict", jsonDataReferToInstitution);

// //habbits 
// var jsonDataHabits = JSON.parse(localStorage.getItem('navici_i_naclonnosti')).hiera.row;
// drawingDropdownMenuBasedOnId("dropdownForHabits", jsonDataHabits);

//habbits victim
var jsonDataHabitsVict = JSON.parse(localStorage.getItem('navici_i_naclonnosti_vict')).hiera.row;
drawingDropdownMenuBasedOnId("dropdownForHabitsVict", jsonDataHabitsVict);


//habbits perpetrator
var jsonDataHabitsPerp = JSON.parse(localStorage.getItem('navici_i_naclonnosti_perp')).hiera.row;
drawingDropdownMenuBasedOnId("dropdownForHabitsPerp", jsonDataHabitsPerp);


//dependencies
var jsonDataDepend = JSON.parse(localStorage.getItem('zavisimosti')).hiera.row;
drawingDropdownMenuBasedOnId("dropdownDependencies", jsonDataDepend);

// //place of event
// var jsonDataEventPlace = JSON.parse(localStorage.getItem('mqsto_na_incidenta')).hiera.row;
// drawingDropdownMenuBasedOnId("dropdowEventPlace", jsonDataEventPlace);

//injury of victim
var jsonDataInjuryVict = JSON.parse(localStorage.getItem('naranqvaniq_na_postradalia')).hiera.row;
drawingDropdownMenuBasedOnId("dropdownInjuryVict", jsonDataInjuryVict);

//how injury the vicitm
var jsonDataHowInjuryVict = JSON.parse(localStorage.getItem('nachin_na_naranqvane')).hiera.row;
drawingDropdownMenuBasedOnId("dropdownHowInjuryVict", jsonDataHowInjuryVict);

//characteristic of victim
var jsonDataCharacteristOfVictim = JSON.parse(localStorage.getItem('haracteristiki_na_postradaliq')).hiera.row;
drawingDropdownMenuBasedOnId("dropdownCharactVict", jsonDataCharacteristOfVictim);

//characteristic of perpetrator
var jsonDataCharacteristOfPerp = JSON.parse(localStorage.getItem('haracteristiki_na_izvarshitelq')).hiera.row;
drawingDropdownMenuBasedOnId("dropdownCharactPerp", jsonDataCharacteristOfPerp);


// //violated actions
// var jsonDataImposedActions = JSON.parse(localStorage.getItem('nalojeni_merki')).hiera.row;
// drawingDropdownMenuBasedOnId("dropdownViolatedAction", jsonDataImposedActions);


//relations to victim and perpetrator
var jsonDataRealationToVictim = JSON.parse(localStorage.getItem('otnoshenie_s_liceto')).hiera.row;
// drawingDropdownMenuBasedOnId("relationToVictChild", jsonDataRealationToVictim);
drawingDropdownMenuBasedOnId("relationToPerp", jsonDataRealationToVictim);

function drawingDropdownMenuBasedOnId(dropdownId, options) {
    var selectedOptions = [];
    var dropdownButton = $("#" + dropdownId + " .form-select");
    var dropdownMenu = $("#" + dropdownId + " .dropdown-menu");
    if ($(dropdownButton).attr('use-hiera') === undefined){
        dropdownButton.empty();
        dropdownButton.text("Избери");
        console.log('Hiera in '+dropdownId+' is not defined!')
        return;
    }
    
    dropdownButton.on('click', function () {
        if ($(dropdownMenu).find('input:checked').length === 0) {
            selectedOptions = [];
        }
    })
    dropdownButton.empty();
    dropdownButton.text("Избери");

    drowDropDownMenu(dropdownMenu, options);

    $("#" + dropdownId).on('clearDropdownMultiselect', function (event) {
        $("#" + dropdownId + " .option-checkbox").prop("checked", false);
        changeItemInViewElement();
        // console.log(event);
        // var dropppp = $(this)
        // console.log($(dropppp));
        // console.log("in custom event");
    })

    function drowDropDownMenu(dropdownMenu, options) {

        //loop trough each option from json and draw data
        $.each(options, function (i, option) {
            var checkbox = $('<input type="checkbox" class="form-check-input option-checkbox" value="' + option.cod_z + '">');
            var checkboxLabel = $('<label class="form-check form-label">' + option.ime_z + '</label>');
            checkboxLabel.prepend(checkbox);
            dropdownMenu.append(checkboxLabel);

            //add click event on label or checkbox in dropdown
            checkboxLabel.on('click', function (event) {
                event.stopPropagation();
            });

        });
        addEventForCheckBox(dropdownMenu);
    }



    function addEventForCheckBox(dropdownMenu) {
        //     const myEvent = new Event("clearDropdownMultiselect");
        //     document.addEventListener('clearDropdownMultiselect', (dropdownId) => {
        //     dropdownId.
        // });
        //if checkboxes are checked or unchecked
        // let checkboxs = checkedItem; //dropdownMenu.find('input');        
        let checkedItem = dropdownMenu.find('input');
        $.each(checkedItem, function (idx, checkboxx) {
            let checkbox = $(checkboxx);
            checkbox.change(function (event) {
                event.stopPropagation();
                changeItemInViewElement(checkbox);
                // dropdownMenu.siblings('button').empty();


            });
        })
    }


    function changeItemInViewElement(checkbox) {
        dropdownMenu.siblings('button').empty();
        if (checkbox === undefined) {
            selectedOptions = [];
        } else {
            if ($(checkbox).is(':checked')) {
                selectedOptions.push({ id: $(checkbox).attr('value') * 1, text: $(checkbox).parent().text() });
            } else {
                selectedOptions.splice(selectedOptions.findIndex(({ id }) => id === $(checkbox).attr('value') * 1), 1);
            }
        }


        //var checkedItem = dropdownMenu.find('input:checked');
        if (selectedOptions.length === 0) {
            $(dropdownButton).text("Избери");
        } else {

            var optionsHtml = selectedOptions.map(function (option) {
                
                return '<span class="form-span" cod_z="' + option.id + '">' + option.text + '<i class="fas fa-times delete-option" data-bs-toogle="tooltip" data-bs-placement="top" title="Премахни"></i></span><input type="hidden" value="' + option.id + '" readonly="">&nbsp;';
                
            });
            $(dropdownButton).append(optionsHtml);
            //enable tooltip after button is created
            $('.delete-option').tooltip();

            $("#" + dropdownId + " .delete-option").click(function (event) {
                $('.tooltip').removeClass('show');
                event.stopPropagation();
                $(dropdownButton).dropdown('hide');
                //selectedOptions.splice(selectedOptions.findIndex(({ id }) => id === $(this).parent().attr("cod_z") * 1), 1);
                // Uncheck the checkbox when the item is removed
                $("#" + dropdownId + " .option-checkbox[value='" + $(this).parent().attr("cod_z") * 1 + "']").prop("checked", false);
                $(dropdownButton).find('span[cod_z="' + $(this).parent().attr("cod_z") * 1 + '"]').remove();
                $(dropdownButton).find('input[value="' + $(this).parent().attr("cod_z") * 1 + '"]').remove();
                changeItemInViewElement($("#" + dropdownId + " .option-checkbox[value='" + $(this).parent().attr("cod_z") * 1 + "']"));
            });
        }

    }
}