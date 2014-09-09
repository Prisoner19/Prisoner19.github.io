
BasicGame.Preloader = function (game) {

	this.texto_progress = null;
};

BasicGame.Preloader.prototype = {

	preload: function () 
    {
		//this.background = this.add.sprite(0, 0, 'preloaderBackground');
		//this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

		
		//this.load.setPreloadSprite(this.preloadBar);
		
        var path = "assets/graphics/" + BasicGame.screen + "/";
        
        var obj_tuto = this.add.sprite(0,0,'tuto');
        obj_tuto.anchor.setTo(0.5,0.5);
        obj_tuto.x = this.game.width/2;
        obj_tuto.y = this.game.height/2;
        
        var posY_texto;
        var tam_fuente;
        
        var width_player = 0;
        var height_player = 0;
        var width_medidor = 0;
        var height_medidor = 0;
         
        this.load.image('fondo', path + "background.png");
        this.load.image('barra', path + "barra.png");
        this.load.image('barra_fondo',path + "barra_fondo.png");
        this.load.image('score_card', path + "score_card.png");
        
        switch(BasicGame.screen)
        {
            case "small":
                posY_texto = 300;
                tam_fuente = 15;
                height_medidor = 158;
                width_medidor = 9;
                height_player = 311;
                width_player = 117;
                break;
            case "normal": 
                posY_texto = 440;
                tam_fuente = 25;
                height_medidor = 236;
                width_medidor = 12;
                height_player = 468;
                width_player = 176;
                break;
            case "large": 
                posY_texto = 650;
                tam_fuente = 25;
                height_medidor = 355;
                width_medidor = 19;
                height_player = 705;
                width_player = 265;
                break;
            case "xlarge": 
                posY_texto = 860;
                tam_fuente = 30;
                height_medidor = 473;
                width_medidor = 25;
                height_player = 941;
                width_player = 354;
                break;
            case "xxlarge": 
                posY_texto = 1300;
                tam_fuente = 45;
                height_medidor = 716;
                width_medidor = 38;
                height_player = 1425;
                width_player = 536;
                break;
        }
        
        var style = { font: tam_fuente+"px Arial", fill: "#fff", align: "center" };
        this.texto_progress = this.add.text(0, 0, "Loading 0%", style);
        this.texto_progress.anchor.setTo(0.5,0.5);
        this.texto_progress.x = this.game.width/2;
        this.texto_progress.y = posY_texto;
        
        this.load.spritesheet('medidor', path + "spht_medidor.png", width_medidor, height_medidor);
        this.load.spritesheet('player', path + "spht_player.png", width_player, height_player);
    },
    
    loadUpdate: function()
    {
        this.texto_progress.setText("Loading " + this.load.progress + "%");
    },

	create: function () 
    {
        /*
        var dispositivo = new Phaser.Device();
        
		if(dispositivo.desktop == true)
        {
            this.input.keyboard.addCallbacks(this, this.iniciar_juego);
        }
        else
        {
            this.input.onTap.add(this.iniciar_juego, this);
        }*/
        this.input.onTap.add(this.iniciar_juego, this);
        this.texto_progress.setText("Loading 100%");
	},

	update: function () {
        
	},
        
    iniciar_juego: function () 
    {
		if(this.load.progress == 100)
        {
            this.scale.startFullScreen(true);
            //this.state.start('Game');
        }
	}
};
