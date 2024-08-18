
    //mark selected nav-item when is active
    $('#main_nav a').each(function () {
        if ($(this).prop('href') == window.location.href) {
            $(this).closest('li').addClass('active-navlink');
        }
    });

    /* A function that search query parameter in url,which is 'source',
    and then when it find, add class .active to div with id which is same as source name */
    function getQuery(name) {
        const urlParameter = new URLSearchParams(window.location.search);
        return urlParameter.get(name);
    }

    function markaNavBar(sourcePage) {
        var navbarItem =$('#main_nav li#' +sourcePage);
        if(navbarItem.length>0){
            navbarItem.addClass("active-navlink");
            
        }
    }
    var sourcePage = getQuery('source');
    markaNavBar(sourcePage);

