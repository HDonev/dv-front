
//filter data into table
$("#searchInput").keyup(function(){
var value=$(this).val().toLowerCase();
$("tbody tr").filter(function(){
$(this).toggle($(this).text().toLowerCase().indexOf(value)>-1)
});

if (value==""){
    $("#searchInput").attr("placeholder","Търси")
}

});