
// setTimeout(function () {

//     //addresses 
//     var jsonOptionsEknm = JSON.parse(localStorage.getItem('eknm')).hiera.row;
//     setupDropdownWithTreeStructure("personCurrEknm", jsonOptionsEknm, "singleselect");
//     setupDropdownWithTreeStructure("eventAddress", jsonOptionsEknm, "singleselect");
//     setupDropdownWithTreeStructure("searchAddress", jsonOptionsEknm, "singleselect");


//     //podelenia
//     var podeleniaJsonDada = JSON.parse(localStorage.getItem('podelenia')).hiera.row;
//     setupDropdownWithTreeStructure("eventPodl", podeleniaJsonDada, "singleselect");
//     setupDropdownWithTreeStructure("docPodl", podeleniaJsonDada, "singleselect");
//     setupDropdownWithTreeStructure("eventPlacePodl", podeleniaJsonDada, "singleselect");
//     setupDropdownWithTreeStructure("podlReg", podeleniaJsonDada, "singleselect");
//     setupDropdownWithTreeStructure("podlForOrder", podeleniaJsonDada, "singleselect");


//     //courts
//     var courtsJsonDada = JSON.parse(localStorage.getItem('rayonen_okrujen_sud')).hiera.row;
//     setupDropdownWithTreeStructure("regCourtForOrder", courtsJsonDada, "singleselect");
//     setupDropdownWithTreeStructure("regCourtForJudgment", courtsJsonDada, "singleselect");
//     setupDropdownWithTreeStructure("regCourtForCivilCase", courtsJsonDada, "singleselect");
//     setupDropdownWithTreeStructure("orderJudgment", courtsJsonDada, "singleselect");




//     /* A function that implement different trees */
//     function setupDropdownWithTreeStructure(dropdownId, data, treeType) {
//         if (!Array.isArray(data)) {
//             data = [data];
//         }
//         var dropdownButton = $("#" + dropdownId + " .dropdown-input");
//         var dropdownMenu = $("#" + dropdownId + " .dropdown-menu .option-tree ul");
//         var inputId = $("#" + dropdownId + " .dropdown-menu .option-tree input");
//         dropdownButton.empty();

//         // set the initial text
//         dropdownButton.html('<span>Избери</span>');
//         dropdownButton.append($('<input type="hidden" value="" readonly>'));

//         //array where is stored selected items
//         var selectedOptions = [];

//         // a function that populate dynamic tree
//         function createOptionTree(parent, options, index) {
//             $.each(options, function (i, option) {
//                 var optionId = option.cod_z;
//                 var optionText = option.ime_z;

//                 var li = '<li class="style-li">';
//                 li += '<span cod_z="' + optionId + '" class="m-2">' + optionText + '</span>';
//                 li += '</li>';
//                 li = $(li);
//                 // if there are any children
//                 if (option.hasOwnProperty('row')) {
//                     if (!Array.isArray(option.row)) {
//                         option.row = [option.row];
//                     }
//                 }
//                 //if there are any children
//                 if (option.row && option.row.length > 0) {
//                     var ul = $('<ul style="display:none" class="ulnode">');
//                     var button = '<i class="fas fa-plus-square"></i>';
//                     li.addClass('node');
//                     li.prepend(button);
//                     li.append(ul);
//                     // create the suboptions
//                     createOptionTree(ul, option.row);
//                 } else {
//                     li.addClass('leaf');
//                 }
//                 parent.append(li);

//                 // --------------
//                 // if (option.hasOwnProperty('row')) {
//                 //     if (!Array.isArray(option.row)) {
//                 //         option.row = [option.row];
//                 //     }
//                 //     var ul = $('<ul style="display:none">');
//                 //     var button = '<i class="fas fa-plus-square"></i>';
//                 //     li.prepend(button);
//                 //     li.append(ul);
//                 //     // create the suboptions
//                 //     createOptionTree(ul, option.row);
//                 // }
//                 // parent.append(li);
//                 // ----------------------

//             });
//         }

//         createOptionTree(dropdownMenu, data);

//         dropdownMenu.on('click', 'i', function (event) {
//             event.stopPropagation();
//             var ul = $(this).siblings('ul');
//             ul.slideToggle();
//             var icon = $(this);
//             icon.toggleClass('fa-plus-square fa-minus-square');
//         });

//         dropdownMenu.on('click', 'span', function (event) {
//             $(this).addClass('selected-option-drpdown')
//             //$(this).siblings('i').trigger('click');
//         });

//         //implementation of different logic based on typeTree
//         dropdownMenu.on('click', 'li', function (event) {
//             var selectedItem = $(this);
//             var optionText = selectedItem.children('span').text();
//             var optionId = selectedItem.children("span").attr('cod_z');
//             //     var hasChildren = selectedItem.find('ul').length > 0;

//             //     // prevent selecting parent nodes
//             //     if (hasChildren && selectedItem.hasClass('selected-option')) {

//             //         return;
//             //     }
//             //the logic of "multiselect" tree
//             if (treeType === "multiselect") {
//                 event.stopPropagation();
//                 if (!hasChildren) {

//                     //toggle between selection state of the item
//                     //if selected item is not selected, add it to array and colored it
//                     var span = selectedItem.find('span');

//                     span.toggleClass("selected-option");
//                     if (span.hasClass('selected-option')) {

//                         selectedOptions.push({ cod_z: optionId, ime_z: optionText });

//                     }

//                     //if selected option is already selected, remove it from the array and uncolred it
//                     else {
//                         var index = selectedOptions.findIndex(function (opt) {
//                             return opt.cod_z === optionId;
//                         });
//                         if (index !== -1) {
//                             selectedOptions.splice(index, 1);
//                         }
//                     }
//                     //update the text of the dropdown button with selected options
//                     updateDropdownButton();


//                 }

//             }
//             //the logic of "singleselect" tree
//             else if (treeType === "singleselect") {
//                 event.stopPropagation();

//                 //         // prevent selecting parent nodes
//                 //         if (hasChildren && selectedItem.hasClass('selected-option')) {

//                 //             return;
//                 //         }

//                 //         if (!hasChildren) {
//                 $('.selected-option-drpdown').removeClass('selected-option-drpdown');
//                 selectedItem.children('span').addClass('selected-option-drpdown');

//                 //get selected option
//                 selectedOptions = [optionId];

//                 //append it into dropdown button
//                 $(dropdownButton).children('span').remove();

//                 var spanToAppend = '<span class="form-span-single-select" cod_z="' + optionId + '">' + optionText + '</span>';
//                 dropdownButton.prepend(spanToAppend);
//                 $(dropdownButton).children('input').val(optionId).trigger('change');
//                 dropdownButton.removeClass('show');
//                 $('#' + dropdownId + '.dropdown').find('.dropdown-menu').removeClass('show');

//                 //         }
//             }

//         });


//         // A function that update dropdown button, based on selected values
//         function updateDropdownButton() {

//             dropdownButton.empty();

//             //if is multiselect option
//             //append items as span inside  button
//             if (selectedOptions.length > 0) {

//                 //get all all selected items and display it with delete button
//                 var optionsHtml = selectedOptions.map(function (option) {
//                     return '<span class="form-span" cod_z="' + option.cod_z + '">' + option.ime_z + '<button class="btn delete-option">X</button></span>&nbsp;';
//                 });

//                 dropdownButton.append(optionsHtml);

//                 //if delete-button is clicked
//                 //remove item from dropdown button
//                 $(".delete-option").click(function () {
//                     var id = $(this).closest("span").attr("cod_z");
//                     var index = selectedOptions.findIndex(function (option) {
//                         return option.cod_z === id;
//                     });
//                     if (index !== -1) {
//                         selectedOptions.splice(index, 1);
//                     }
//                     //remove color of the selected item
//                     $("#" + dropdownId + " span[cod_z='" + id + "']").removeClass("selected-option-drpdown");

//                     //update the button
//                     updateDropdownButton();
//                 });
//             }

//             //if is empty
//             else {
//                 dropdownButton.text("Избери");
//             }

//         }


//         $(dropdownButton).children('input').on("change", function () {
//             //get changed val
//             let searchForVal = $(this).val();
//             // console.log('searchForVal' + searchForVal);
//             //get hiera 
//             let useHieraForOperation = $(this).parent().attr('use-hiera');
//             // console.log('useHieraForOperation' + useHieraForOperation);

//             $('[dependant-on=' + dropdownId + ']').each(function () {
//                 if ($(this).attr('use-hiera') !== undefined) {
//                     useHieraForOperation = $(this).attr('use-hiera');
//                 } else {
//                     $(this).attr('use-hiera', useHieraForOperation);
//                     $(this).attr('use-hiera-isadded', '');
//                 }

//                 //ako e eknm ierarhiqta
//                 if (useHieraForOperation === 'eknm') {
//                     let hieraEknm = JSON.parse(localStorage.getItem(useHieraForOperation));
//                     //  hieraEknm = hieraEknm.hiera;
//                     //za oblast
//                     if ($(this).attr('id').indexOf('Obl') > -1) {
//                         let findItem = jsonTraversFromCurrenPos(hieraEknm, searchForVal, 2)
//                         //find value 2 level up from searchForVal
//                         $(this).val(findItem.ime_z);
//                         $(this).attr('cod_z', findItem.cod_z);
//                     }
//                     //za obshtina
//                     if ($(this).attr('id').indexOf('Obs') > -1) {
//                         let findItem = jsonTraversFromCurrenPos(hieraEknm, searchForVal, 1)
//                         //find value 1 level up from searchForVal
//                         $(this).val(findItem.ime_z);
//                         $(this).attr('cod_z', findItem.cod_z);
//                     }

//                 } else
//                     //ako ierarhiqta e za ulici
//                     if (useHieraForOperation === "ulici_hie") {

//                         //ulici
//                         let $selectedTag = $(this);
//                         ulGetHiera(searchForVal).then(function (data) {
//                             let hieraUl = [];
//                             $.each(data.hiera.row, function () {
//                                 if (this.valid === 0) {
//                                     hieraUl.push(this);
//                                 }
//                             });
//                             $selectedTag.find('span.form-span-single-select').removeClass('form-span-single-select').text('Избери').removeAttr('cod_z');
//                             $selectedTag.find('input[type="hidden"]').val('');
//                             $selectedTag.parent().find('.option-tree').children('ul').html('');
//                             $selectedTag.parent().find('.option-tree').children('input').val('').trigger('keyup');
//                             //ulici
//                             setupDropdownWithTreeStructure($($selectedTag).parent().attr('id'), hieraUl, 'singleselect');
//                         });
//                     } else {
//                         //ako e druga
//                         let hiera = JSON.parse(localStorage.getItem(useHieraForOperation));
//                         let findItem = jsonTraversFromCurrenPos(hiera, searchForVal, 1);
//                         if (findItem === undefined) {
//                             findItem = jsonTraversFromCurrenPos(hiera, searchForVal, 0);
//                         }
//                         $(this).val(findItem.ime_z);
//                         $(this).attr('cod_z', findItem.cod_z);

//                     }

//                 // console.log('Hiera is not defined!!!')

//                 //dekodirane i slagane na coda

//                 //ako e dobavena ierarhiqta samo za obrabotka na poleto posle
//                 //sashtata se maha!
//                 if ($(this).attr('use-hiera-isadded') !== undefined) {
//                     $(this).removeAttr('use-hiera');
//                     $(this).removeAttr('use-hiera-isadded');
//                 }


//             });
//             // console.log('Input is changed!!!');
//             // console.log($('[dependant-on=' + dropdownId + ']'));
//         })


//         //search function
//         function debounce(func, delay) {

//             let timeOutId;
//             return function () {
//                 const context = this;
//                 const args = arguments;
//                 clearTimeout(timeOutId);
//                 timeOutId = setTimeout(() => {
//                     func.apply(context, args);

//                 }, delay);
//             };
//         }

//         //logic for the search
//         const debouncesFilter = debounce(function () {
//             var value = $(this).val().toLowerCase();
//             var node = dropdownMenu.find('li');
//             var nodeleaf = dropdownMenu.find('li.leaf');

//             if (value.length >= 3) {
//                 $(dropdownMenu).find('.toShow,.toHide').removeClass('toShow').removeClass('toHide');
//                 nodeleaf.each(function () {
//                     let findedTxt = $(this).text().toLowerCase().indexOf(value) > -1;
//                     // $(this).toggle(findedTxt);
//                     if (findedTxt) {
//                         $(this).addClass('toShow');
//                         $(this).removeClass('toHide');

//                     } else {
//                         $(this).addClass('toHide');
//                         $(this).removeClass('toShow');

//                     }
//                 });
//                 $('.toHide').hide();
//                 $(dropdownMenu).find('.node,.ulnode').hide();
//                 $('.toShow').each(function () {
//                     $(this).parents('ul.ulnode').addClass('toShow');
//                     $(this).parents('li.node').addClass('toShow');
//                 })
//                 $('.node.toShow').children('i').removeClass('fa-plus-square').addClass('fa-minus-square');
//                 $('.toShow').show();
//             }
//             else {
//                 $(dropdownMenu).find('.toShow,.toHide').removeClass('toShow').removeClass('toHide');
//                 $(node).children('i').removeClass('fa-minus-square').addClass('fa-plus-square');
//                 node.show();
//                 $(dropdownMenu).find('.ulnode').hide();

//             }
//         }, 100);

//         inputId.on('keyup', debouncesFilter);
//     }

// }, 300);


// function clearTreeAndRelatedInputs(fieldsedId) {
//     $('#' + fieldsedId + ' .option-tree .selected-option-drpdown.leaf').removeClass('selected-option-drpdown');
//     $('#' + fieldsedId + " .dropdown-menu .option-tree ul .node").removeClass('toShow').removeClass('toHide');;
//     $('#' + fieldsedId + " .dropdown-menu .option-tree ul .leaf").removeClass('toShow').removeClass('toHide');
//     $('#' + fieldsedId + " .dropdown-menu .option-tree ul li i.fa-minus-square").removeClass('fa-minus-square').addClass('fa-plus-square')
//     $('#' + fieldsedId + " .dropdown-menu .option-tree ul li").show()
//     $('#' + fieldsedId + " .dropdown-menu .option-tree ul.ulnode").hide()
//     $('#' + fieldsedId + ' button').find('span.form-span-single-select').removeClass('form-span-single-select').text('Избери').removeAttr('cod_z');
//     $('#' + fieldsedId + ' button').find('input[type="hidden"]').val('');
//     $('#' + fieldsedId).find('input').val("").removeAttr('cod_z');
//     $('#' + fieldsedId).find('select').val("");
//     $('#' + fieldsedId).find('textarea').val("");

// }





















































//------------------------------------------------------------------old------------------------------------------------------
setTimeout(function () {

    //addresses 
    var jsonOptionsEknm = JSON.parse(localStorage.getItem('eknm')).hiera.row;
    setupDropdownWithTreeStructure("personCurrEknm", jsonOptionsEknm, "singleselect");
    setupDropdownWithTreeStructure("eventAddress", jsonOptionsEknm, "singleselect");
    setupDropdownWithTreeStructure("searchAddress", jsonOptionsEknm, "singleselect");


    //podelenia
    var podeleniaJsonDada = JSON.parse(localStorage.getItem('podelenia')).hiera.row;
    setupDropdownWithTreeStructure("eventPodl", podeleniaJsonDada, "singleselect");
    setupDropdownWithTreeStructure("docPodl", podeleniaJsonDada, "singleselect");
    setupDropdownWithTreeStructure("eventPlacePodl", podeleniaJsonDada, "singleselect");
    setupDropdownWithTreeStructure("podlReg", podeleniaJsonDada, "singleselect");
    setupDropdownWithTreeStructure("podlForOrder", podeleniaJsonDada, "singleselect");


    //courts
    var courtsJsonDada = JSON.parse(localStorage.getItem('rayonen_okrujen_sud')).hiera.row;
    setupDropdownWithTreeStructure("regCourtForOrder", courtsJsonDada, "singleselect");
    setupDropdownWithTreeStructure("regCourtForJudgment", courtsJsonDada, "singleselect");
    setupDropdownWithTreeStructure("regCourtForCivilCase", courtsJsonDada, "singleselect");
    setupDropdownWithTreeStructure("orderJudgment", courtsJsonDada, "singleselect");


    /* A function that implement different trees */
    function setupDropdownWithTreeStructure(dropdownId, data, treeType) {
        if (!Array.isArray(data)) {
            data = [data];
        }
        var dropdownButton = $("#" + dropdownId + " .dropdown-input");

        //return true or false for check is hiera node selectable
        let isNodeSelectable = dropdownButton.attr('node-selectable') != undefined;

        var dropdownMenu = $("#" + dropdownId + " .dropdown-menu .option-tree ul");
        var inputId = $("#" + dropdownId + " .dropdown-menu .option-tree input");
        dropdownButton.empty();

        // set the initial text
        dropdownButton.html('<span>Избери</span>');
        dropdownButton.append($('<input type="hidden" value="" readonly>'));

        //array where is stored selected items
        var selectedOptions = [];

        // a function that populate dynamic tree
        function createOptionTree(parent, options, index) {
            $.each(options, function (i, option) {
                var optionId = option.cod_z;
                var optionText = option.ime_z;

                var li = '<li class="style-li">';
                li += '<span cod_z="' + optionId + '">' + optionText + '</span>';
                li += '</li>';
                li = $(li);
                // if there are any children
                if (option.hasOwnProperty('row')) {
                    if (!Array.isArray(option.row)) {
                        option.row = [option.row];
                    }
                }
                //if there are any children
                if (option.row && option.row.length > 0) {
                    var ul = $('<ul style="display:none" class="ulnode">');
                    var button = '<i class="fas fa-plus-square"></i>';
                    li.addClass('node');
                    li.prepend(button);
                    li.append(ul);
                    // create the suboptions
                    createOptionTree(ul, option.row);
                } else {
                    li.addClass('leaf');
                }
                parent.append(li);
            });
        }

        createOptionTree(dropdownMenu, data);

        dropdownMenu.on('click', 'i', function (event) {
            event.stopPropagation();
            var ul = $(this).siblings('ul');
            ul.slideToggle();
            var icon = $(this);
            icon.toggleClass('fa-plus-square fa-minus-square');
        });

        dropdownMenu.on('click', 'span', function (event) {
            if (!isNodeSelectable) {
                $(this).siblings('i').trigger('click');
            } else {
                $(this).addClass('selected-option-drpdown');
            }

        });

        //implementation of different logic based on typeTree
        dropdownMenu.on('click', 'li', function (event) {
            var selectedItem = $(this);
            var optionText = selectedItem.children('span').text();
            var optionId = selectedItem.children("span").attr('cod_z');
            var hasChildren = selectedItem.find('ul').length > 0;

            // prevent selecting parent nodes
            //                if (hasChildren && selectedItem.hasClass('selected-option')) {
            //
            //                    return;
            //                }
            //CHECK!!!!!!!!!!!!WHEN USE IT!!!!!!!!!the logic of "multiselect" tree
            // if (treeType === "multiselect") {
            //     event.stopPropagation();
            //     if (!hasChildren) {

            //         //toggle between selection state of the item
            //         //if selected item is not selected, add it to array and colored it
            //         var span = selectedItem.find('span');

            //         span.toggleClass("selected-option");
            //         if (span.hasClass('selected-option')) {

            //             selectedOptions.push({ cod_z: optionId, ime_z: optionText });

            //         }

            //         //if selected option is already selected, remove it from the array and uncolred it
            //         else {
            //             var index = selectedOptions.findIndex(function (opt) {
            //                 return opt.cod_z === optionId;
            //             });
            //             if (index !== -1) {
            //                 selectedOptions.splice(index, 1);
            //             }
            //         }
            //         //update the text of the dropdown button with selected options
            //         updateDropdownButton();


            //     }

            // }else 
            //the logic of "singleselect" tree
            
            if (treeType === "singleselect") {
                event.stopPropagation();
                
                if (!isNodeSelectable) {
                    // prevent selecting parent nodes
                    if (hasChildren && selectedItem.hasClass('selected-option')) {

                        return;
                    }

                    if (!hasChildren) {
                        $('.selected-option').removeClass('selected-option');
                        selectedItem.addClass('selected-option');

                        //get selected option
                        selectedOptions = [optionId];

                        //append it into dropdown button
                        $(dropdownButton).children('span').remove();

                        var spanToAppend = '<span class="form-span-single-select" cod_z="' + optionId + '">' + optionText + '</span>';
                        dropdownButton.prepend(spanToAppend);
                        $(dropdownButton).children('input').val(optionId).trigger('change');
                        dropdownButton.removeClass('show');
                        $('#' + dropdownId + '.dropdown').find('.dropdown-menu').removeClass('show');

                    }
                } else {
                    $('.selected-option-drpdown').removeClass('selected-option-drpdown');
                    selectedItem.children('span').addClass('selected-option-drpdown');

                    //get selected option
                    selectedOptions = [optionId];

                    //append it into dropdown button
                    $(dropdownButton).children('span').remove();

                    var spanToAppend = '<span class="form-span-single-select" cod_z="' + optionId + '">' + optionText + '</span>';
                    dropdownButton.prepend(spanToAppend);
                    $(dropdownButton).children('input').val(optionId).trigger('change');
                    dropdownButton.removeClass('show');
                    $('#' + dropdownId + '.dropdown').find('.dropdown-menu').removeClass('show');
                }
            }
            

        });


        // A function that update dropdown button, based on selected values
        // function updateDropdownButton() {

        //     dropdownButton.empty();

        //     //if is multiselect option
        //     //append items as span inside  button
        //     if (selectedOptions.length > 0) {

        //         //get all all selected items and display it with delete button
        //         var optionsHtml = selectedOptions.map(function (option) {
        //             return '<span class="form-span" cod_z="' + option.cod_z + '">' + option.ime_z + '<button class="btn delete-option">X</button></span>&nbsp;';
        //         });

        //         dropdownButton.append(optionsHtml);

        //         //if delete-button is clicked
        //         //remove item from dropdown button
        //         $(".delete-option").click(function () {
        //             var id = $(this).closest("span").attr("cod_z");
        //             var index = selectedOptions.findIndex(function (option) {
        //                 return option.cod_z === id;
        //             });
        //             if (index !== -1) {
        //                 selectedOptions.splice(index, 1);
        //             }
        //             //remove color of the selected item
        //             if (!isNodeSelectable) {
        //                 $("#" + dropdownId + " span[cod_z='" + id + "']").removeClass("selected-option");
        //             } else {
        //                 $("#" + dropdownId + " span[cod_z='" + id + "']").removeClass("selected-option-drpdown");
        //             }
        //             //update the button
        //             updateDropdownButton();
        //         });
        //     }

        //     //if is empty
        //     else {
        //         dropdownButton.text("Избери");
        //     }

        // }


        $(dropdownButton).children('input').on("change", function () {
            //get changed val
            let searchForVal = $(this).val();
            //get hiera 
            let useHieraForOperation = $(this).parent().attr('use-hiera');

            $('[dependant-on=' + dropdownId + ']').each(function () {
                if ($(this).attr('use-hiera') !== undefined) {
                    useHieraForOperation = $(this).attr('use-hiera');
                } else {
                    $(this).attr('use-hiera', useHieraForOperation);
                    $(this).attr('use-hiera-isadded', '');
                }

                //ako e eknm ierarhiqta
                if (useHieraForOperation === 'eknm') {
                    let hieraEknm = JSON.parse(localStorage.getItem(useHieraForOperation));
                    //  hieraEknm = hieraEknm.hiera;
                    //za oblast
                    if ($(this).attr('id').indexOf('Obl') > -1) {
                        let findItem = jsonTraversFromCurrenPos(hieraEknm, searchForVal, 2)
                        //find value 2 level up from searchForVal
                        $(this).val(findItem.ime_z);
                        $(this).attr('cod_z', findItem.cod_z);
                    }
                    //za obshtina
                    if ($(this).attr('id').indexOf('Obs') > -1) {
                        let findItem = jsonTraversFromCurrenPos(hieraEknm, searchForVal, 1)
                        //find value 1 level up from searchForVal
                        $(this).val(findItem.ime_z);
                        $(this).attr('cod_z', findItem.cod_z);
                    }
                } else
                    //ako ierarhiqta e za ulici
                    if (useHieraForOperation === "ulici_hie") {

                        //ulici
                        let $selectedTag = $(this);
                        ulGetHiera(searchForVal).then(function (data) {
                            let hieraUl = [];
                            $.each(data.hiera.row, function () {
                                if (this.valid === 0) {
                                    hieraUl.push(this);
                                }
                            });
                            $selectedTag.find('span.form-span-single-select').removeClass('form-span-single-select').text('Избери').removeAttr('cod_z');
                            $selectedTag.find('input[type="hidden"]').val('');
                            $selectedTag.parent().find('.option-tree').children('ul').html('');
                            $selectedTag.parent().find('.option-tree').children('input').val('').trigger('keyup');
                            //ulici
                            setupDropdownWithTreeStructure($($selectedTag).parent().attr('id'), hieraUl, 'singleselect');
                        });
                    } else {
                        //ako e druga
                        let hiera = JSON.parse(localStorage.getItem(useHieraForOperation));
                        let findItem = jsonTraversFromCurrenPos(hiera, searchForVal, 1);
                        if (findItem === undefined) {
                            findItem = jsonTraversFromCurrenPos(hiera, searchForVal, 0);
                        }
                        $(this).val(findItem.ime_z);
                        $(this).attr('cod_z', findItem.cod_z);

                    }

                //dekodirane i slagane na coda

                //ako e dobavena ierarhiqta samo za obrabotka na poleto posle
                //sashtata se maha!
                if ($(this).attr('use-hiera-isadded') !== undefined) {
                    $(this).removeAttr('use-hiera');
                    $(this).removeAttr('use-hiera-isadded');
                }
            });
        })


        //search function
        function debounce(func, delay) {

            let timeOutId;
            return function () {
                const context = this;
                const args = arguments;
                clearTimeout(timeOutId);
                timeOutId = setTimeout(() => {
                    func.apply(context, args);

                }, delay);
            };
        }

        //logic for the search
        const debouncesFilter = debounce(function () {
            var value = $(this).val().toLowerCase();
            var node = dropdownMenu.find('li');
            var nodeleaf = dropdownMenu.find('li.leaf');

            if (value.length >= 3) {
                $(dropdownMenu).find('.toShow,.toHide').removeClass('toShow').removeClass('toHide');
                nodeleaf.each(function () {
                    let findedTxt = $(this).text().toLowerCase().indexOf(value) > -1;
                    // $(this).toggle(findedTxt);
                    if (findedTxt) {
                        $(this).addClass('toShow');
                        $(this).removeClass('toHide');

                    } else {
                        $(this).addClass('toHide');
                        $(this).removeClass('toShow');

                    }
                });
                $('.toHide').hide();
                $(dropdownMenu).find('.node,.ulnode').hide();
                $('.toShow').each(function () {
                    $(this).parents('ul.ulnode').addClass('toShow');
                    $(this).parents('li.node').addClass('toShow');
                })
                $('.node.toShow').children('i').removeClass('fa-plus-square').addClass('fa-minus-square');
                $('.toShow').show();
            }
            else {
                $(dropdownMenu).find('.toShow,.toHide').removeClass('toShow').removeClass('toHide');
                $(node).children('i').removeClass('fa-minus-square').addClass('fa-plus-square');
                node.show();
                $(dropdownMenu).find('.ulnode').hide();

            }
        }, 100);

        inputId.on('keyup', debouncesFilter);
    }

}, 300);


function clearTreeAndRelatedInputs(fieldsedId) {
    $('#' + fieldsedId + ' .option-tree .selected-option.leaf').removeClass('selected-option');
    $('#' + fieldsedId + ' .option-tree .selected-option-drpdown.leaf').removeClass('selected-option-drpdown');
    $('#' + fieldsedId + " .dropdown-menu .option-tree ul .node").removeClass('toShow').removeClass('toHide');;
    $('#' + fieldsedId + " .dropdown-menu .option-tree ul .leaf").removeClass('toShow').removeClass('toHide');
    $('#' + fieldsedId + " .dropdown-menu .option-tree ul li i.fa-minus-square").removeClass('fa-minus-square').addClass('fa-plus-square')
    $('#' + fieldsedId + " .dropdown-menu .option-tree ul li").show()
    $('#' + fieldsedId + " .dropdown-menu .option-tree ul.ulnode").hide()
    $('#' + fieldsedId + ' button').find('span.form-span-single-select').removeClass('form-span-single-select').text('Избери').removeAttr('cod_z');
    $('#' + fieldsedId + ' button').find('input[type="hidden"]').val('');
    $('#' + fieldsedId).find('input').val("").removeAttr('cod_z');
    $('#' + fieldsedId).find('select').val("");
    $('#' + fieldsedId).find('textarea').val("");

}






//---------------------------------------------------------------------------------------------------------------------------