$(document).ready(function(){
    $('#search_flight').click(function(){
        var depart = $('#departure option:selected').val();
        var des = $('#destination option:selected').val();
        var start_date = $('#start_date').val();
        window.location='/ketquatimchuyenbay.ejs/depart/'+depart+'/des/'+des+'/date/'+start_date
    })
})