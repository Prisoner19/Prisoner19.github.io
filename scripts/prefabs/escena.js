var texto_escena;
var buttons;
var id;

var Escena = function(game, frame)
{  
    Phaser.Sprite.call(this, game, 650, 380, 'logo', frame);
    
    this.texto_escena = new Relato(this.game, 100, 100, this);

    game.add.existing(this);
};

Escena.prototype = Object.create(Phaser.Sprite.prototype);  
Escena.prototype.constructor = Escena;

Escena.prototype.cargar_escena = function(id)
{
    this.id = id;
    this.texto_escena.set_texto(datos_json.Escenas[this.id].texto);
    this.verificar_mecanica();
};

Escena.prototype.mostrar_botones = function() 
{
    this.buttons = [];
		
    for (var i = 0; i < datos_json.Escenas[this.id].botones.length; i++)	
    { 
        this.buttons.push(new Boton(this.game, 100, 200+i*50, 'button', datos_json.Escenas[this.id].botones[i].texto, this.on_click, this, 2, 1, 0));
        this.buttons[i].name = datos_json.Escenas[this.id].botones[i].destino;
    }
};

Escena.prototype.update = function() 
{
    if(this.game.input.activePointer.isDown == true)
    {
        this.texto_escena.terminar_mostrar();
    }
};

Escena.prototype.on_click = function(button)
{
    for(var i = this.buttons.length-1; i >= 0; i--)
    {
        this.buttons[i].destroy();
    }

    this.cargar_escena(button.name);
};

Escena.prototype.verificar_mecanica = function()
{
    if(datos_json.Escenas[this.id].mecanica != null)
    {
        switch(datos_json.Escenas[this.id].mecanica.tipo)
        {
            case "panel": this.crear_panel(); break;
        
        
        
        }
    }
};

Escena.prototype.crear_panel = function()
{
    console.log("creando panel");
    var pan = new Panel(this.game, 100, 100, datos_json.Escenas[this.id].mecanica.clave);
};
