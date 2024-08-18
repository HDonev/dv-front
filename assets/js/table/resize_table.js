var startX, startWidth, handle, table, pressed = false;
        

        // mousedown on resizable columns
        $(document).on('mousedown', '.table-resizable .resize-bar', function(event) {
            let index = $(this).parent().index();
            handle = $(this).parents('table').find('th').eq(index);
            pressed = true;
            startX = event.pageX;
            startWidth = handle.width();
            table = handle.closest('.table-resizable').addClass('resizing');
        });

        // mousemove on document
        $(document).on('mousemove', function(event) {
            if (pressed) {
                handle.width(startWidth + (event.pageX - startX));
            }
        });

        // mouseup on document
        $(document).on('mouseup', function() {
            if (pressed) {
                table.removeClass('resizing');
                pressed = false;
            }
        });

        // reset column width (unchanged)
        $('.table-resizable thead').on('dblclick', function() {
            $(this).find('th').css('width', '');
        });
