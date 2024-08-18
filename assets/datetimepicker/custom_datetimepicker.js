
$(document).ready(function(){
    //datepicker only date
  $('.onlydate').datetimepicker({
        icons: {
            next:"fas fa-chevron-right",
            previous:"fas fa-chevron-left",
            time:"far fa-clock",
            up:"fas fa-angle-up",
            down:"fas fa-angle-down",
            date:"far fa-calendar-alt",
            clear:"fas fa-trash-alt",
            close:"fas fa-times",
            today:"fas fa-home"
            
        },
        debug:true,
        format: "DD.MM.YYYY",
        locale:'bg',
        toolbarPlacement:'top',
        showTodayButton:true,
        
       
    
    });

    //datepicker time and date
    $('.datetime').datetimepicker({
    
        sideBySide:true,
        icons: {
            next:"fas fa-chevron-right",
            previous:"fas fa-chevron-left",
            time:"fas fa-clock",
            up:"fas fa-angle-up",
            down:"fas fa-angle-down",
            date:"far fa-calendar-alt",
            clear:"fas fa-trash-alt",
            close:"fas fa-times",
            today:"fas fa-home"
            
        },
        debug:true,
        format: "DD.MM.YYYY HH:mm",
        locale:'bg',
        toolbarPlacement:'top',
        showTodayButton:true,
       
    
    });

    //datepicker only year
    $('.year').datetimepicker({
        sideBySide:true,
        icons: {
            next:"fas fa-chevron-right",
            previous:"fas fa-chevron-left",
            time:"fas fa-clock",
            up:"fas fa-angle-up",
            down:"fas fa-angle-down",
            date:"far fa-calendar-alt",
            clear:"fas fa-trash-alt",
            close:"fas fa-times",
            today:"fas fa-home"
            
        },
        debug:true,
        format: "YYYY",
        locale:'bg',
        toolbarPlacement:'top',
        
    });


    $('.date').focusout(function(){
        $(this).datetimepicker('hide');

    });

//    $('#addMoreDetails').on('show.bs.modal', function () {
//
//        $(this).datetimepicker({
//
//            icons: {
//                next: "fas fa-chevron-right",
//                previous: "fas fa-chevron-left",
//                time: "fas fa-clock",
//                up: "fas fa-angle-up",
//                down: "fas fa-angle-down",
//                date: "far fa-calendar-alt",
//                clear: "fas fa-trash-alt",
//                close: "fas fa-times",
//                today: "fas fa-home"
//
//            },
//            debug: true,
//            format: "DD.MM.YYYY",
//            locale: 'bg',
//            toolbarPlacement: 'top',
//            showTodayButton: true,
//        });
//
//
//    });
//   

});






