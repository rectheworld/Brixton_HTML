
/// Loading Scene 
/// Really this is a placeholder for later 

Crafty.scene('Loading', function(){
	/// Show some Loading Text 
	Crafty.e('2D, DOM, Text')
		.text('The Party is Loading')
		.attr({x: 0, y: Game.height()/2 - 24, w:Game.width()})

	// Load all the graphics here 
	Crafty.load([
		/// list of paths to geaphics ( Should really put evrything int oa spritesheet )
		'assets/spritesheet1.png',
		'assets/bar_spritesheet.png',
		'assets/textbox.png'
		], function(){
	    // Once the images are loaded...

	    // Define the individual sprites in the image
	    // Each one (spr_tree, etc.) becomes a component
	    // These components' names are prefixed with "spr_"
	    //  to remind us that they simply cause the entity
	    //  to be drawn with a certain sprite


	    // Define the PC's sprite to be the first sprite in the third row of the
	    //  animation sprite map
	    Crafty.sprite(32, 'assets/spritesheet1.png', {
	      spr_player:  [0,2],
	      spr_floor: [0,4],
	      spr_table: [1,4],
	      spr_mens: [2,4],
	      spr_womens:[2,5],
	      spr_bartender:[3,5],
	      spr_girl1:[3,4]
	    });

	    Crafty.sprite(32, 16, 'assets/spritesheet1.png', {
	    	spr_table_col: [1,10],
	    });

	    Crafty.sprite(32, 64, 'assets/spritesheet1.png', {
		  spr_dj_booth: [3,0],
	      spr_exit: [3,1],
	     });

	   	Crafty.sprite(224, 32, 'assets/bar_spritesheet.png', {
		  spr_bar_face: [0,1],
	     });

	   	Crafty.sprite(32, 32, 'assets/bar_spritesheet.png', {
		  spr_bar_left: [0,0],
		  spr_bar_right: [6,0],
		  spr_priss: [2,3],
		  spr_wallflower: [3,3]
	     });

	   	Crafty.sprite(224, 16, 'assets/bar_spritesheet.png', {
		  spr_bar_col: [0,4],
	     });

	   	Crafty.sprite(544, 96, 'assets/textbox.png', {
		  spr_txt_box: [0,0],
	     });

	    Crafty.scene('Main');
		}); 

});




/// Lets Create a Scene for the main game play bit 

MAIN = Crafty.scene('Main', function(){

	/// Set up for the grid 
	this.occupied = new Array(Game.map_grid.width);
	for (var i =0; i < Game.map_grid.width; i++){
		this.occupied[i] = new Array(Game.map_grid.height);
		for (var y = 0; y < Game.map_grid.height; y ++){
			this.occupied[i][y] = false;
		}
	}

	/// Draw the Floor 
	for(var x = 0; x < Game.map_grid.width; x++){
		for (var y =0; y < Game.map_grid.height; y++){
			Crafty.e('Floor').at(x,y)

		}
	}

	/// Replace certain cells with tables 
	create_table(13,4)
	create_table(13,6)
	create_table(13,8)

	Crafty.e('DJ_Booth').at(3,8)
	Crafty.e('Exit').at(0,4)

	Crafty.e('Mens_BR').at(12,0)
	Crafty.e('Womens_BR').at(13,0)

	// Create Bar 
	create_bar(3,1)

	/// Place character 
	this.player = Crafty.e('PlayerCharacter').at(7,5); 


	// Place npcs 
	this.bartender = Crafty.e('Bartender').at(5,0)
	this.girl1 = Crafty.e('Girl1').at(7,7)
	this.priss = Crafty.e('Priss').at(3,2)
	this.wallflower = Crafty.e('Wallflower').at(14,4)


	this.player.npc_list = [this.bartender, this.girl1, this.priss, this.wallflower] 

	// Moxologist zones 
	mix_zone = Crafty.e('Zone')
	mix_zone.zone(7,0,1,1)

	// Create Gloabals
	create_globals()
	



	// Initlize Stats
	document.getElementById('_time').innerHTML = "10:00"
	document.getElementById('_money').innerHTML = "$ 50"
	document.getElementById('_numbers').innerHTML = "0"
	document.getElementById('_drink').innerHTML = "0"
});