    //apply to all tables
    var tables = document.querySelectorAll(".table-sortable");
  
   tables.forEach(function(table) {
      var headers = table.querySelectorAll("th");
  
      // found each table and related headers 
      headers.forEach(function(header, index) {
        header.addEventListener('click', function() {
          sortTable(table, index);
        });
      });
    });
  
    //function sorting
    function sortTable(table, colIndex) {
      var rows, switching, needSwitch, direction, count = 0;

      switching = true;
      //by default
      direction = "asc"; 

      //check if the icon exist and toggle sorting direction
      if(table.querySelector("th:nth-child(" + (colIndex + 1) + ") i")){
        if (table.querySelector("th:nth-child(" + (colIndex + 1) + ") i").classList.contains('fa-sort-up')) {
            direction = "desc";
          }
      }
      
  //find all table header cells
      var header = table.querySelectorAll("th");
      for (var h = 0; h < header.length; h++) {
        //remove the sorting class for all icons in the headers
        var icon=header[h].querySelector('i');
        if(icon){
            header[h].querySelector('i').classList.remove('fa-sort-up', 'fa-sort-down');

        }
      }
      //set the sorting icon for the current column header
      var curentIcon=table.querySelector("th:nth-child(" + (colIndex + 1) + ") i");
      
      if(curentIcon){
        header[colIndex].querySelector('i').classList.add(direction === "asc" ? 'fa-sort-up' : 'fa-sort-down');

      }
  
      //populate the sorting
      while (switching) {
        switching = false;
        rows = table.rows;
  
        for (var i = 1; i < rows.length - 1; i++) {
          needSwitch = false;
          var x = rows[i].getElementsByTagName("td")[colIndex];
          var y = rows[i + 1].getElementsByTagName("td")[colIndex];
  
          if (direction === "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              needSwitch = true;
              break;
            }
          } else if (direction === "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              needSwitch = true;
              break;
            }
          }
        }
        if (needSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          count++;
        } else {
          if (count === 0 && direction === "asc") {
            direction = "desc";
            switching = true;
          }
        }
      }
    }
