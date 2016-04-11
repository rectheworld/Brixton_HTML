
/// Create a Game Object
Game = {
	/// Define the Size of the grid 
	map_grid:{
		width: 17,
		height: 13,
		tile:{
			width: 32,
			height: 32
		}
	},

	width: function(){
		/// Returns the total width of the Game Screen
		/// Number of Tiles * The Width of Each Tile 
		return this.map_grid.width * this.map_grid.tile.width;
	},

	height: function(){
		/// Returns the total height of the game screen.
		/// Number of vertical tiles * the Width of each tile
		return this.map_grid.height * this.map_grid.tile.height;
	},

	tracker: {'phone_numbers': 0, 'money': 10, 'mixologist': false, 'has_beer':false, 'position_x': 7, 'position_y': 5},

	update_tracker: function(player){
		this.tracker = {'phone_numbers': player.phone_numbers, 'money': player.money, 'mixologist': player.mixologist, 'has_beer': player.has_beer}
	},

	/// Start the Game 
	start: function(){
		//// Start Crafty and set a background color 

		/// Sets the eleement to use as a stage
		// Takes height and Width of stages as parmeters 
		/// all load events will be ececuted
		Crafty.init(Game.width(), Game.height());

		/// Set a background color
		Crafty.background('rgb(125, 69, 5)');

		// Start Game Scene		
		Crafty.scene('Loading');
	}

};/// End of Game Braket 

/// 544 x 416