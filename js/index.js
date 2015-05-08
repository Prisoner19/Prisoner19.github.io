 $("#login-button").click(function(event){
		 event.preventDefault();
	 
	 $('form').fadeOut(500);
	 $('.wrapper').addClass('form-success');
     setTimeout(function(){document.getElementById("welcome").innerHTML = "Bienvenido, Gonzalo."; 
                          setTimeout(function(){window.location.href ='menu.html'},500)},500);
});