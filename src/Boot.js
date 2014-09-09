BasicGame = {

    /* Here we've just got some global level vars that persist regardless of State swaps */
    score: 0,

    /* If the music in your game needs to play through-out a few State swaps, then you could reference it here */
    music: null,

    /* Your game can check BasicGame.orientated in internal loops to know if it should pause or not */
    orientated: false

};


BasicGame.Boot = function (game) {
};


BasicGame.Boot.prototype = {

    preload: function () {

        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
        //this.load.image('preloaderBackground', 'images/preloader_background.jpg');
        //this.load.image('preloaderBar', 'images/preloadr_bar.png');
        this.stage.backgroundColor = "#acbfbf";
        
        var path = "assets/graphics/" + BasicGame.screen + "/";
        
        this.load.image('tuto', path +"tuto.png");
    },

    create: function () {

        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;
        
		this.scaleStage();
        this.state.start('Preloader');

    },
    
    scaleStage:function()
    {
        console.log(BasicGame.screen);
        
        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT; 
        
        if (this.game.device.desktop == false)
        {
            this.scale.forceOrientation(false, true);
            this.scale.hasResized.add(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            this.scale.setScreenSize(true);
        }
        
        this.scale.minWidth = BasicGame.gameWidth/2;
        this.scale.minHeight = BasicGame.gameHeight/2;
        this.scale.maxWidth = window.innerWidth;
        this.scale.maxHeight = window.innerHeight;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setScreenSize(true);
       
        console.log("Max Height: " + this.scale.maxHeight);
        console.log("Max Width: " + this.scale.maxWidth);
        
        console.log("Game Height: " + BasicGame.gameHeight);
        console.log("Game Width: " + BasicGame.gameWidth);
        
        console.log("Window Height: " + window.innerHeight);
        console.log("Window Width: " + window.innerWidth);
        
        console.log("Total Window Height: " + window.screen.availHeight);
        console.log("Total Window Width: " + window.screen.availWidth);
        
        console.log("Super Total Window Height: " + window.screen.height);
        console.log("Super Total Window Width: " + window.screen.width);
        
		if(this.game.device.desktop == false)
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
        document.getElementById("like-box").style.display = 'none';
        document.getElementById("tweet-box").style.display = 'none';
    },

    gameResized: function (width, height) {

        //  This could be handy if you need to do any extra processing if the game resizes.
        //  A resize could happen if for example swapping orientation on a device.

    },

    enterIncorrectOrientation: function () {

        BasicGame.orientated = false;
        document.getElementById('orientation').style.display = 'block';
    },

    leaveIncorrectOrientation: function () {

        BasicGame.orientated = true;
        document.getElementById('orientation').style.display = 'none';
		this.scaleStage();
    }

};