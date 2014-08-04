
var datos_json;
var gui_text;

var cadena_total;
var total_lenght;

var ID_escena_actual;
var indice_actual = 0;

var cadena_mostrada = false;

var play_state =
{
    create: function ()
    {
        var style = this.crear_estilo(14, "candara", "#ffffff");

        var x = game.world.width/2;
        var y = game.world.height/2;

        gui_text = this.game.add.text(100, 100, "", style);
        
        datos_json = JSON.parse(game.cache.getText('game_data'));
        
		console.log(datos_json);
        this.cargar_escena("1-1-1");
        
    },

    crear_estilo: function (tam_fuente, nom_fuente, hex_color)
    {
        var estilo = {font: ""+tam_fuente + "px " + nom_fuente, fill: hex_color};
        return estilo;
    },
    
    update: function()
    {
        if(game.input.activePointer.isDown == true && cadena_mostrada == false)
        {
            indice_actual = total_lenght;
            gui_text.content = cadena_total.substring(0, Math.round(indice_actual));
        }
        
        if(indice_actual < total_lenght)
        {
            indice_actual += 0.3;
            gui_text.content = cadena_total.substring(0, Math.round(indice_actual));
        }
        else if(cadena_mostrada == false)
        {
            cadena_mostrada = true;
            this.mostrar_botones();
        }
    },
    
    cargar_escena: function (id_escena)
    {
        cadena_total = datos_json.Escenas[id_escena].texto;
        total_lenght = cadena_total.length; 
        indice_actual = 0;
        cadena_mostrada = false;
        ID_escena_actual = id_escena;
        console.log(ID_escena_actual);
	},
    
    mostrar_botones: function()
    {
        this.buttons = [];
		
		for (var i = 0; i < datos_json.Escenas[ID_escena_actual].botones.length; i++)	
        { 
			this.buttons.push(new LabelButton(this.game, 100, 200+i*50, 'button', datos_json.Escenas[ID_escena_actual].botones[i].texto, this.on_click, this, 2, 1, 0));
			this.buttons[i].name = datos_json.Escenas[ID_escena_actual].botones[i].destino;
		}
    },
	
	on_click: function(button)
    {
		console.log(button);
		cadena_total = "";
		total_lenght = 0;
		gui_text.destroy;
        
        for(var i = this.buttons.length-1; i >= 0; i--)
        {
            this.buttons[i].destroy();
        }

		this.cargar_escena(button.name);
	}
};