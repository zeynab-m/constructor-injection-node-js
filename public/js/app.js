$(function(){
    var selector = "a[href=" + "'" +  window.location.pathname  + "']";
    $(selector).addClass('active');
    $(selector).closest('ul').addClass('in');
    $(selector).parents('li').addClass('active open');
    
})