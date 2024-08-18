//validation symbols
$('input').on('input', function () {
    var inputName = $(this).attr('name');
    var inputValue = $(this).val();
    var regex;
    var errrorMessage = $(this).siblings('.error-validation');

    switch (inputName) {
        case 'onlyLetters':
            regex = /^[\p{L}]+$/u;
            errrorMessage.text("Моля въведи само букви!");
            break;
        case 'onlyNumbers':
            regex = /^\d+$/;
            errrorMessage.text("Моля въведи само цифри!");
            break;
        default:
            regex = /./;
            errrorMessage.text("");
            break;
    }

    if (!regex.test(inputValue)) {

        errrorMessage.css('display', 'block');
        $(this).val($(this).val().replace(regex, ''));
    }
    else {
        errrorMessage.css('display', 'none');
    }
});

//function validation ENCH
function validationENCH(ench) {
    //specific weigts for every digit in the ENCH
    var weights = [21, 19, 17, 13, 11, 9, 7, 3, 1];
    var sum = 0;

    //iterate over first 9 number and sum weights depends entered number to calculate expected sum
    for (var i = 0; i < 9; i++) {
        sum += parseInt(ench.charAt(i)) * weights[i];
    }
    //calculate remainder divided by 10 for ENCH
    var remainder = sum % 10;
    var expectedSum;

    // expected sum based on  remainder
    if (remainder < 10) {
        expectedSum = remainder;
    }
    else {
        expectedSum = 0;
    }
    //compare the sum with last digit of the ENCH
    return parseInt(ench.charAt(9)) === remainder;
}

//function validation EGN
function validationEGN(egn) {
    //specific weigts for every digit in the EGN
    var weights = [2, 4, 8, 5, 10, 9, 7, 3, 6];
    var sum = 0;

    //iterate over first 9 number and sum weights depends entered number to calculate expected sum
    for (var i = 0; i < 9; i++) {
        sum += parseInt(egn.charAt(i)) * weights[i];
    }
    //calculate remainder divided by 11 for EGN
    var remainder = sum % 11;
    var expectedSum;

    // expected sum based on  remainder
    if (remainder < 10) {
        expectedSum = remainder;
    }
    else {
        expectedSum = 0;
    }
    //compare the sum with last digit of the EGN
    return parseInt(egn.charAt(9)) === expectedSum;

}

//validation of required fields
function requiredFields(formId) {

    var hasError = false;
    $('#' + formId + ' [required], #' + formId + ' [aria-required="true"]').removeClass('error-required');
    $(' .error-required').addClass('hidden');

    //if find [required] or [aria-required="true"] and the fields are empty show message
    $('#' + formId + ' [required], #' + formId + ' [aria-required="true"]').each(function () {

        if ($(this).hasClass('btn-multiselect')) {
            if ($(this).parents().hasClass('modal')) {
                if ($(this).is(':visible')) {
                    if ($(this).children('input').length < 1 || $(this).children('input').val() === "") {
                        $(this).siblings('.error-required').removeClass('hidden');
                        hasError = true;
                    }
                }
            }
            else {
                if ($(this).children('input').length < 1 || $(this).children('input').val() === "") {
                    $(this).siblings('.error-required').removeClass('hidden');
                    hasError = true;
                }
            }
        }

        //if  date is required
        else if ($(this).parent().hasClass('date')) {

            if ($(this).parents().hasClass('modal')) {
                if ($(this).is(':visible')) {
                    if ($(this).val().trim() === "") {
                        $(this).parent().siblings('.error-required').removeClass('hidden');
                        hasError = true;
                    }
                }
            }
            else {
                if ($(this).val().trim() === "") {
                    $(this).parent().siblings('.error-required').removeClass('hidden');
                    hasError = true;
                }

            }

        }
        //if table is required
        else if ($(this).is('table')) {

            //required at least two records
            if ($(this).find('tbody tr').length < 2) {
                $(this).siblings('.error-required').removeClass('hidden');
                hasError = true;

            }
            //required the role to be filled
            else {
                var isRoleColumnEmpty = false;
                var hasVictim = false;
                var hasPerpetrator = false;

                //loop trough table and find empty column
                $(this).find("tbody tr").each(function () {
                    var roleColumn = $(this).find('td:eq(7)');

                    if (roleColumn.text().trim() === "") {
                        isRoleColumnEmpty = true;
                        hasError = true;

                    }
                    else {
                        if (roleColumn.text().trim() === "Пострадал") {
                            hasVictim = true;

                        }
                        else if (roleColumn.text().trim() === "Извършител") {
                            hasPerpetrator = true;

                        }
                    }
                });
                //if is empty show error
                if (isRoleColumnEmpty) {
                    $(this).siblings('.error-required').removeClass('hidden');
                    $(this).siblings('.error-required').html('Добави роля на лицата');
                    hasError = true;
                }
                else if (!hasVictim || !hasPerpetrator) {
                    $(this).siblings('.error-required').removeClass('hidden');
                    $(this).siblings('.error-required').html('В таблицата трябва да има поне един извършител и един потърпевш.');
                    hasError = true;

                }
                else {
                    $(this).siblings('.error-required').addClass('hidden');
                }
            }


        }
        else {
            var value = $(this).val();

            //if required values are inside accordion, open all accordion-buttons
            if ($(this).parents().hasClass('accordion-item')) {


                if (!value || value.trim() === '') {
                    //$('.accordion-collapse').addClass('show');
                    //$('.accordion-button').css("background-color", ' #b7bfd7');

                    
                    $(this).siblings('.error-required').removeClass('hidden');
                    hasError = true;
                }



                //for all other cases                
            } else if ($(this).is(':visible')) {

                if (!value || value.trim() === '') {

                    $(this).siblings('.error-required').removeClass('hidden');
                    hasError = true;

                }
            }
        }

    });



    //if errors are fixed remove class .error-required
    $('#' + formId + ' [required], #' + formId + ' [aria-required="true"]').on('input change', function () {
        $(this).siblings('.error-required').addClass('hidden');

    });

    //if error is on multiselect dropdown, remove class .error-required
    $('#' + formId + ' .dropdown-menu input[type="checkbox"]').on('change', function () {

        if ($(this).is(':checked')) {
            $(this).parents('.dropdown-menu').siblings('button').siblings('.error-required').addClass('hidden');
            hasError = false;
        }

        //if ($(this).children('input').length < 1 || $(this).children('input').val() === "") {
        //    $(this).siblings('.error-required').removeClass('hidden');
        //    hasError = true;
        //}

    });

    //if error is on date input, remove class .error-required
    $('#' + formId + ' [required], #' + formId + ' [aria-required="true"]').parent().on('dp.change', function () {
        $(this).siblings('.error-required').addClass('hidden');
    }).on('input change', function () {
        $(this).siblings('.error-required').addClass('hidden');

    });


    //if error is on table, trigger custom event and remove class .error-required
    // this event is trigger on #confirmPerson button - file detail_person.js
    $('.table-records').on("removeError", function () {
        if ($('.table-records tbody tr').length > 2) {
            $('.table-records').siblings('.error-required').addClass('hidden');
        } else {
            $('.table-records').siblings('.error-required').removeClass('hidden');
        }

        if ($('.table-records tbody tr').find('td:eq(0)').text() === "") {
            $('.table-records').siblings('.error-required').addClass('hidden');
        } else {
            $('.table-records').siblings('.error-required').removeClass('hidden');
        }
    });

    return hasError;

}


function focusOnError(formId) {
    
    let findedFirstError;

    if ($('#'+formId).find(".accordion").length>0) {

        $('#' + formId + ' .accordion-button').addClass('collapsed').attr('aria-expanded', false);
        $('#' + formId + ' .accordion-collapse').removeClass("show");
        //$('#' + formId + ' .accordion-button').css("background-color", "");


        $('#' + formId + ' .accordion-item').each(function () {
           

            if ($(this).find(".error-required:not(.hidden)").length > 0) {


                findedFirstError = $(this).find(".error-required:not(.hidden)").get(0);
                var accordionButton = $(this).find('.accordion-button');
                    accordionButton.removeClass('collapsed').attr('aria-expanded', true);
                    $(this).find('.accordion-collapse').addClass('show')
                
                $(findedFirstError)[0].scrollIntoView({ behavior: "smooth", block: "center" });
                return false;
            }
            
        });

    }
    else if ($('#'+formId).hasClass('modal')) {

        if ($(".modal-content").find(".error-required:not(.hidden)").length > 0) {

            findedFirstError = $('.modal-content').find(".error-required:not(.hidden)").get(0);
            $(findedFirstError)[0].scrollIntoView();
            return false;
        }
        
    }
}

