var load_state =
{
    preload: function ()
    {
        game.stage.backgroundColor = "#B0B7BB";
        game.load.spritesheet('button', 'resources/graphics/spritesheet.png', 333, 36); 
        game.load.text('game_data', 'resources/json/escenas.json');
        game.load.audio('zombie', "resources/sounds/zombie.ogg");
		game.load.image('panel', "resources/graphics/password_panel.jpg");
        game.load.image('logo', "resources/graphics/logo.png");
    },
    
    create: function ()
    {
        game.state.start('menu');
    }
};