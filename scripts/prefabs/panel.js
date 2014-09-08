var numeros_clave;
var string_clave;
var indice_clave;

var audio_zombies;
var timer_zombies;

var Panel = function(game, x, y, clave, frame) 
{  
    Phaser.Sprite.call(this, game, x, y, 'panel', frame);
    
    string_clave = clave;
    this.descomponer_clave();
    
    game.input.keyboard.addCallbacks(this, this.check_key_down);
    
    game.add.existing(this);
};

Panel.prototype = Object.create(Phaser.Sprite.prototype);  
Panel.prototype.constructor = Panel;

Panel.prototype.update = function() 
{
    
};

Panel.prototype.descomponer_clave = function()
{
    var i;
    
    this.numeros_clave = [];
    indice_clave = 0;
    
    for(i = 0; i < 4; i++)
    {
        this.numeros_clave.push(parseInt(string_clave.charAt(i)));
        console.log(this.numeros_clave[i]);
    }
};

Panel.prototype.check_key_down = function(e)
{
    console.log(e.keyCode);
    if(indice_clave <= this.numeros_clave.length)
    {
        if(e.keyCode - 48 == this.numeros_clave[indice_clave] || e.keyCode - 96 == this.numeros_clave[indice_clave] )
        {
            console.log("success");
            indice_clave += 1;
        }
    }
};