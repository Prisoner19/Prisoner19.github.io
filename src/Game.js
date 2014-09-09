
BasicGame.Game = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;	//	the tween manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
    
    this.barra = null;
    this.medidor = null;
    this.fondo = null;
    this.player = null;
    this.timer_counter = null;
    this.texto_timer = null;
    this.obj_timer = null;
    this.obj_score_card = null;
    
    this.has_finished = false;
    this.has_started = false;
    this.has_shown_score = false;
    
    this.centroX = 0;
    this.centroY = 0;
    
    this.posY_timer = 0;
    this.tam_fuente = 0;

};

BasicGame.Game.prototype = {

	create: function () {
        
        this.set_orientation_events();
        
		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        this.centroX = this.game.width/2;
        this.centroY = this.game.height/2;
        
        this.fondo = this.game.add.sprite(0,0,'fondo');
        this.fondo.anchor.setTo(0.5,0.5);
        this.fondo.x = this.centroX;
        this.fondo.y = this.centroY;
        
        var barra_fondo = this.game.add.sprite(0,0,'barra_fondo');
        barra_fondo.anchor.setTo(0.5, 0.5);
        barra_fondo.x = this.game.width * 6/7;
        barra_fondo.y = this.centroY;
        
        this.barra = this.game.add.sprite(320,148,'barra');
        this.barra.anchor.setTo(0.5, 0.5);
        this.barra.x = this.game.width * 6/7;
        this.barra.y = this.centroY;
        
        this.medidor = new Medidor(this.game, 0, 0, this.barra);  
        
        this.barra.bringToTop();
                               
        this.player = this.game.add.sprite(75,0,'player',0);
        this.player.anchor.setTo(0.5,0.5);
        this.player.x = this.game.width * 3/7;
        this.player.y = this.centroY;
        
        this.player.animations.add('pose0',[0],2,false);
        this.player.animations.add('pose1',[0,1],2,true);
        this.player.animations.add('pose2',[1,2],2,true);
        this.player.animations.add('pose3',[2,3],2,true);
        this.player.animations.add('pose4',[3,4],2,true);
        this.player.animations.add('pose_final',[5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21],15,false);
        
        this.player.animations.play('pose0');
        
        /* 
        var dispositivo = new Phaser.Device();
        
        if(dispositivo.desktop == true)
        {
            this.input.keyboard.addCallbacks(this, this.check_key_down);
        }
        else
        {
            this.input.onTap.add(this.tappear, this);
        }
        */
        
        this.input.onTap.add(this.tappear, this);
        this.input.keyboard.addCallbacks(this, this.check_key_down);
        
        this.player.events.onAnimationComplete.add(this.esperar_fin, this);
        
        this.obj_score_card = this.game.add.sprite(0,-1000,'score_card');
        this.obj_score_card.anchor.setTo(0.5,0.5);
        this.obj_score_card.x = this.game.width/2;
        this.obj_score_card.bringToTop();
        
        this.verificar_resolucion();
        
        var style = { font: this.tam_fuente + "px Roboto", fill: "#000", align: "center" };
        this.texto_timer = this.game.add.text(this.centroX - this.fondo.width/2 + 60, this.centroY - this.fondo.height/2 + 40, "0.00", style);
        this.texto_timer.anchor.setTo(0.5,0.5);
        
        this.timer_counter = 0;
        this.has_finished = false;
        this.has_started = false;
        this.has_shown_score = false;
        
        this.obj_timer = this.game.time.create(true);
        this.obj_timer.add(1000, this.mostrar_score, this);  
        document.getElementById("like-box").style.display = 'block';
	},

	update: function () 
    {
        if(this.medidor.has_finished_medidor == false)
        {
            if(this.has_started == true)
            {
                this.timer_counter += (this.game.time.elapsed/1000);
                this.texto_timer.setText(""+this.timer_counter.toFixed(2));
            }
            this.set_animacion();
        }
	},
    
    verificar_resolucion: function()
    {
        switch(BasicGame.screen)
        {
            case "small":
                this.posY_timer = 90;
                this.tam_fuente = 13;
                break;
            case "normal": 
                this.posY_timer = 100;
                this.tam_fuente = 20;
                break;
            case "large": 
                this.posY_timer = 150;
                this.tam_fuente = 25;
                break;
            case "xlarge": 
                this.posY_timer = 200;
                this.tam_fuente = 30;
                break;
            case "xxlarge": 
                this.posY_timer = 300;
                this.tam_fuente = 45;
                break;
        }
    },

    tappear: function()
    {
        if(this.has_started == false)
        {
            this.has_started = true;
        }
        
        if(this.has_finished == false)
        {
            this.medidor.subir_posicion();
        }
        
        if(this.has_shown_score == true)
        {
            this.medidor.resetear();
            this.state.start('Game');
        }
    },
    
    check_key_down: function(e)
    {
        /*
        if(this.has_started == false)
        {
            this.has_started = true;
        }
        
        if(this.has_finished == false)
        {
            this.medidor.subir_posicion();
        }
        
        if(this.has_shown_score == true)
        {
            //this.medidor.resetear();
            //this.state.start('Game');
            this.fbShare('http://leapgs.com');
        }
        */
        
        if(e.keyCode == 49)
        {
            this.fbShare('http://leapgs.com');
        }
        else if(e.keyCode == 50)
        {
            this.fbShare('http://leapgs.com/pruebafbibc');
        }
        else if(e.keyCode == 51)
        {
            var opts = 
            {
                message    : 'LOL.',
                //link       : 'https://www.facebook.com/ricardo.joju', /* esta URL tiene metatags openGraph */
                link       : 'https://www.google.com',
                /* Si el anterior link no tienes los metatags OpenGraph (datos por defecto). */
                name       : 'El mas feliz!',
                description: 'En el mirador.',
                picture    : 'http://leapgs.com/labs/el-mas-feliz.jpg'
            };

            this.fbPost(opts, function(id){
                if(id){
                  console.log('> Success - Post ID: ' + id);
                } else {
                  console.log('> Posting error occured');
                }
            });
        }
    },
    
    set_animacion: function()
    {
        var nom_anim = this.player.animations.currentAnim.name;
        
        if(this.medidor.y <= this.barra.y - this.barra.height/2 + this.barra.height/20)
        {
            this.player.animations.play('pose_final');
        }
        else if((this.medidor.y <= this.barra.y - this.barra.height * 1/4))
        {
            if(nom_anim != "pose4")
            {
                this.player.animations.play('pose4');
            }
        }
        else if((this.medidor.y <= this.barra.y))
        {
            if(nom_anim != "pose3")
            {
                this.player.animations.play('pose3');
            }
        }
        else if((this.medidor.y <= this.barra.y + this.barra.height * 1/4))
        {
            if(nom_anim != "pose2")
            {
                this.player.animations.play('pose2');
            }
        }
        else if((this.medidor.y <= this.barra.y + this.barra.height/2))
        {
            if(nom_anim != "pose1")
            {
                this.player.animations.play('pose1');
            }
        }
    },
    
    esperar_fin: function()
    {
        if(this.player.animations.currentAnim.name == "pose_final")
        {
            this.mostrar_score();
        }
    },
    
    mostrar_score: function()
    {
        var tween_score = this.game.add.tween(this.obj_score_card).to( { y: this.game.height/2 }, 800, Phaser.Easing.Quadratic.InOut, true);
        
        tween_score.onComplete.add(this.esperar_reiniciar, this);
        
        this.game.add.tween(this.texto_timer).to( { y: this.posY_timer, x: this.obj_score_card.x }, 800, Phaser.Easing.Quadratic.InOut, true);
        this.game.add.tween(this.texto_timer.scale).to( { y: 2, x:2 }, 800, Phaser.Easing.Quadratic.InOut, true);
    },
    
    esperar_reiniciar: function()
    {
        this.has_shown_score = true;
    },
    
	quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		this.state.start('MainMenu');

	},
    
    fbShare: function(url)
    {
        console.log('Compartiendo...');
        /*
        var params = {
            method: 'feed',
            link: 'http://leapgs.com/pruebafbibc/',
            picture: 'http://leapgs.com/pruebafbibc/icons/logo.jpg',
            name: 'Ice Bucket Challenge',
            caption: 'I completed the Ice Bucket Challenge in ' + this.timer_counter + ' seconds'
        };
        */
        var params = {
            method: 'share',
            href: url
        };
     
        FB.ui(params, function(response)
        {
            if(response)
            {
                console.log('Compartido!');
            } 
            else
            { 
            console.log('No compartió.');
            }
        });
    },
    
    fbPost: function(opts, callback)
    {
        FB.login(function(response){
            if (response.authResponse){
            FB.api('/me/feed', 'post', opts, function(response){
                if (!response || response.error){
                callback();
                } else {
                callback(response.id);
                }
            });
            } else {
            console.log('Not logged in');
            }
        }, {scope : 'publish_actions'});
    },
    
    set_orientation_events: function()
    {
        if(this.game.device.desktop == false)
        {
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
        }
    },

    enterIncorrectOrientation: function () {
        console.log("entrar");
        BasicGame.orientated = false;
        document.getElementById('orientation').style.display = 'block';
    },

    leaveIncorrectOrientation: function () {
        console.log("salir");
        BasicGame.orientated = true;
        document.getElementById('orientation').style.display = 'none';
		this.scaleStage();
    },
    
    scaleStage:function(){

        console.log("scaling the shit out of you");
        
        if (this.game.device.desktop)
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; 
        }
        else
        {
            this.scale.scaleMode = Phaser.ScaleManager.NO_BORDER;
            this.scale.forceOrientation(false, true);
            this.scale.hasResized.add(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            this.scale.setScreenSize(true);
        }
        
        this.scale.minWidth = BasicGame.gameWidth/2;
        this.scale.minHeight = BasicGame.gameHeight/2;
        this.scale.maxWidth = BasicGame.gameWidth;
        this.scale.maxHeight = BasicGame.gameHeight;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setScreenSize(true);
        
		if(this.scale.scaleMode==Phaser.ScaleManager.NO_BORDER)
        {
			BasicGame.viewX = (this.scale.width/2 - window.innerWidth/2)*this.scale.scaleFactor.x;
			BasicGame.viewY = (this.scale.height/2 - window.innerHeight/2 - 1)*this.scale.scaleFactor.y;
			BasicGame.viewWidth = BasicGame.gameWidth-BasicGame.viewX;
			BasicGame.viewHeight = BasicGame.gameHeight-BasicGame.viewY;
		}
        else
        {
			BasicGame.viewX = 0;
			BasicGame.viewY = 0;
			BasicGame.viewWidth = BasicGame.gameWidth;
			BasicGame.viewHeight = BasicGame.gameHeight;
		}
	
		document.getElementById("game").style.width = window.innerWidth+"px";
		document.getElementById("game").style.height = (window.innerHeight-1) + "px";//The css for body includes 1px top margin, I believe this is the cause for this -1
		document.getElementById("game").style.overflow = "hidden";
    }
};
