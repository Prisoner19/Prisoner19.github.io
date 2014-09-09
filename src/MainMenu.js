
BasicGame.MainMenu = function (game) {

};

BasicGame.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)
        
        var path = "assets/graphics/" + BasicGame.screen + "/";
        
		this.add.sprite(0,0,'bg');
        this.add.sprite(0,0,'tuto');
		
		//Aligning HUD to view edges
		//Align to left top edge

        
	},

	update: function () {

		//	Do some nice funky main menu effect here
	},

	iniciar_juego: function (pointer) 
    {
		//	And start the actual game
		this.state.start('Game');
	},
};
