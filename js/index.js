 $("#login-button").click(function(event){
		 event.preventDefault();
	 
	 $('form').fadeOut(500);
	 $('.wrapper').addClass('form-success');
     setTimeout(function(){document.getElementById("welcome").innerHTML = "Bienvenido, Gonzalo."; 
                          setTimeout(function(){window.location.href ='menu.html'},500)},500);
});

 $("#logout-button").click(function(event){
     event.preventDefault();
	 document.getElementById("welcome-text-header").innerHTML = "Hasta pronto.";
     setTimeout(function(){window.location.href ='index.html'},500);
});