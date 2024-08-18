function createPaginationForTable(table) {
    var tableRows = table.find('tbody tr');
    

    //show pagination after 5 records
    if (tableRows.length <= 5) {
      return; 
    }

    //dymamic appended div container for pagination info
    var wrappingPaginationDiv = $('<div class="pagination-container d-flex"></div>');
    var paginationInfo = $('<div class="pagination-info"></div>');
    var divForPreferedRow=$('<div class="d-flex records-per-page"></div>');
    var divForSelect= $('<div class="w-auto"></div');
    var selectPerPageRecords = $('<select class="form-select"><option value="5">5</option><option value="10">10</option><option value="15">15</option><option value="20">20</option></select>');
    var divPaginationNavigation = $('<div class="pagination-controls ms-auto"></div>');
    var infoTexShowPreferedRow=$('<div class="pagination-info">Покажи</div>');
    var infoPreferedRowPerPage= $('<div class="pagination-info p-2">реда на страница</div>');
    var searchInput=$('<div class="ms-auto"><input id="searchInput" class="form-control" placeholder="Търси"></div>')

    //divs for preffered rows and search input
    divForPreferedRow.append(infoTexShowPreferedRow);
    divForPreferedRow.append(divForSelect);
    divForSelect.append(selectPerPageRecords);
    divForPreferedRow.append(infoPreferedRowPerPage);
    divForPreferedRow.append(searchInput);

    //divs for showed records
    wrappingPaginationDiv.append(paginationInfo);
    wrappingPaginationDiv.append(divPaginationNavigation);

    //insert div before table
    table.before(divForPreferedRow);
    //insert div after table
    table.after(wrappingPaginationDiv);

    //get selected number of preferred records
    var recordsPerPage = parseInt(selectPerPageRecords.val());
    var currentPage = 1;

    //display items per page - initial is 5
    function displayTablePage(page) {
      var startIndex = (page - 1) * recordsPerPage;
      var endIndex = Math.min(startIndex + recordsPerPage, tableRows.length);

      tableRows.hide().slice(startIndex, endIndex).show();
    }

    //update pagination depend number of records
    function updatePagination() {
      var totalPages = Math.ceil(tableRows.length / recordsPerPage);
    
      //add dynamic pagination buttons
      var paginationHtml = '<ul class="pagination d-flex justify-content-end">';
      paginationHtml += '<li class="page-item previous-button"><a class="page-link" href="#">Предишна</a></li>';
      for (var i = 1; i <= totalPages; i++) {
        paginationHtml += '<li class="page-item number"><a class="page-link" href="#">' + i + '</a></li>';
      }
      paginationHtml += '<li class="page-item next-button"><a class="page-link" href="#">Следваща</a></li>';
      paginationHtml += '</ul>';

      divPaginationNavigation.html(paginationHtml);

      //add class .active to current page number
      $('.page-item.number').eq(currentPage - 1).addClass('active');
    }

    //update info about how many records are showed
    function updatePageInfo() {
      var startIndex = (currentPage - 1) * recordsPerPage + 1;
      var endIndex = Math.min(startIndex + recordsPerPage - 1, tableRows.length);
      var totalRecords = tableRows.length;

      paginationInfo.html('Показани ' + startIndex + ' до ' + endIndex + ' от общо ' + totalRecords + ' реда');
    }

    //go to concrete page by number clicking
    function goToPage(page) {
      currentPage = page;
      displayTablePage(currentPage);
      updatePagination();
      updatePageInfo();
    }

    //select event for change preferred records per page
   selectPerPageRecords.on('change', function() {
      recordsPerPage = parseInt($(this).val());
      currentPage = 1;
      displayTablePage(currentPage);
      updatePagination();
      updatePageInfo();
    });

    //click on the numbers
    $(document).on('click', '.page-item.number', function() {
      goToPage(parseInt($(this).text()));
    });

    //click on the previous button
    $(document).on('click', '.page-item.previous-button', function() {
      if (currentPage > 1) {
        goToPage(currentPage - 1);
      }
    });

    //click on next-button button
    $(document).on('click', '.page-item.next-button', function() {
      var totalPages = Math.ceil(tableRows.length / recordsPerPage);
      if (currentPage < totalPages) {
        goToPage(currentPage + 1);
      }
    });

    displayTablePage(currentPage);
    updatePagination();
    updatePageInfo();
  }

  //this logic of pagination is appear if the table has class .table-pagination and the records are more than 5 
  $('.table-pagination').each(function() {
    createPaginationForTable($(this));
  });