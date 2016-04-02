

/// Create the Grid that will serve as the spine of our Game 
Crafty.c('Grid', {
	init: function(){
		this.attr({
			w: Game.map_grid.tile.width,
			h: Game.map_grid.tile.height
		});
	},

	/// Fins location of object 
	at: function(x, y){
		// Translate pixal location to grid locations 
		if (x === undefined && y === undefined)
		{
			return {x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height}
		}
		else{ // Translate grid to pixals 
			this.attr({
				x: x * Game.map_grid.tile.width,
				y: y * Game.map_grid.tile.height
			});
			return this; 
		}
	},


}); // End of Grid Component 


// A Zone comlonent 
Crafty.c("Zone", {
	init: function() {
		this.requires('2D, Canvas, Grid');
	},	

	zone_space: {x:0, y:0, w:0, h:0},

	zone: function(x,y,w,h){

		this.zone_space = {
		x: x * Game.map_grid.tile.width,
		y: y * Game.map_grid.tile.height,
		w : w * Game.map_grid.tile.height,
		h : h * Game.map_grid.tile.height}
		
		return this.zone_space
	},

	TextFeatures: null,

	displayText: function(text) {

		this.TextFeatures = Crafty.e('2D, DOM, Text, KeyBoard')
		.origin("center")
		.attr({x: 192,
			y: 192})
		.text(text)
		// .bind("KeyDown", function(e){
		// 	console.log('key press ')
		// 	if(e.key == 89){
		// 		this.text('')
		// 		console.log('Yes')

		// 	}else if (e.key == 78){
		// 		this.text('')
		// 		console.log('No')				
		// 	}
		// });
	
	},

});

// Generic Actor Entity 
Crafty.c('Actor', {
	init: function() {
		this.requires('2D, Canvas, Grid');
	},

	displayText: function(text_x, text_y, text) {
		ActorTextFeatures = Crafty.e('2D, DOM, Text, KeyBoard')
		.attr({x: text_x,
			y: text_y})
		.text(text)
		.bind("KeyDown", function(e){
			if(e.key == 89 ||
				e.key == 38 ||
				e.key == 39 ||
				e.key == 40){
				ActorTextFeatures.text("")
			}
		});

	},
});



// Player Controlled Charater
Crafty.c('PlayerCharacter', {
	init: function(){
		this.requires('Actor, Fourway, spr_player, SpriteAnimation, Collision, KeyBoard')
		.fourway(2)
		.stopOnSolids()
		.reel('UP', 500, 0, 0, 3)
		.reel('RIGHT', 500, 0, 1, 3)
		.reel('DOWN', 500, 0, 2, 3)
		.reel('LEFT', 500, 0, 3, 3)
		.bind("KeyDown", function(e){
			if(e.key == 88){
				//console.log("A CLICK OF THE X")

				for (i = 0; i < this.npc_list.length; i++){
					current_npc = this.npc_list[i]

					if (this.intersect(current_npc.x - 16, current_npc.y -16 , current_npc.w + 32, current_npc.h + 32) == true){
						// console.log("SPEAK");
						// console.log(current_npc.name);
						console.log(walk_tree(this,current_npc))
					} 
				}

			}

		});

		// Watch for a change of a direction and switch the animation 
		var animation_speed = 4;
		this.bind('NewDirection', function(data){
			if(data.x >0){
				this.animate('RIGHT', -1);
			}else if (data.x < 0){
				this.animate('LEFT', -1);
			}else if (data.y > 0) {
				this.animate('DOWN', -1)
			}else if (data.y < 0){
				this.animate('UP', -1)
			}else{
				this.pauseAnimation(); 
			}
		});

		// Check if in mixologist zone 
		this.bind("EnterFrame", function(eventData){
			// Check if player is in the mix zone
			if (this.intersect(mix_zone.zone_space.x, mix_zone.zone_space.y, mix_zone.zone_space.w, mix_zone.zone_space.h)){
				console.log(true)
				if (mix_zone.TextFeatures === null){
					mix_zone.displayText("Make a Custom Drink?")

					this.bind("KeyDown", mix_callback = function(e){
						console.log('key press ')
						if(e.key == 89){
							mix_zone.TextFeatures.text('')
							console.log('Yes')
							this.mixologist = true;
							this.unbind("KeyDown", mix_callback)
						}else if (e.key == 78){
							mix_zone.TextFeatures.text('')
							console.log('No')				
						}
					});

				};
			} else if (mix_zone.TextFeatures != null){
				mix_zone.TextFeatures.destroy();
				mix_zone.TextFeatures = null;
			}
		});

	},
	
	/// Variable Zoo 
	has_beer: false,
	money: 50,
	phone_numbers: 0,
	/// Indicates if player has made a custon drink
	mixologist: false,




	stopOnSolids: function() {
		this.onHit('Solid', this.stopMovement);
		return this;
	},

	// // Stops the movement
	stopMovement: function() {
		this._speed = 0;
		if (this._movement) {
			this.x -= this._movement.x;
			this.y -= this._movement.y;
	 	}
	},

}); /// End of Actor Object


Crafty.c("Girl1", {
	init: function() {
		this.requires('Actor, spr_girl1, Solid')
	},

	name: 'GIRL1',
	quest_complete: false,
	speakables: {'intro': 'This drink is gross',
				'thanks': 'Thank you, your a nice guy, here is my number'},

	speak: function(speakable_key){
		text = this.speakables[speakable_key]
		text_x = this.x - 32;
		text_y = this.y - 32;
		this.displayText(text_x, text_y, text)
	},
})


Crafty.c("Priss", {
	init: function() {
		this.requires('Actor, spr_priss, Solid')
	},

	name: 'PRISS',
	quest_complete: false,
	speakables: {'intro': 'Oh.... hey.',
				'intrig': 'You really know your drinks, here is my number'},

	speak: function(speakable_key){
		text = this.speakables[speakable_key]
		text_x = this.x - 32;
		text_y = this.y - 32;
		this.displayText(text_x, text_y, text)
	},
})

Crafty.c("Bartender", {
	init: function() {
		this.requires('Actor, spr_bartender, Solid')
	},

	name:"BARTENDER",

	speakables: {'intro': 'Have a Drink!'},

	speak: function(speakable_key){
		text = this.speakables[speakable_key]
		text_x = this.x - 32;
		text_y = this.y;
		this.displayText(text_x, text_y, text)
	},
})




/// Create Floor Component 
Crafty.c('Floor', {
	init: function() {
		this.requires('Actor, spr_floor'); 
	},
});//End of Floor Object 


function create_table(x, y) {
	Crafty.e('Table').at(x,y);
	Crafty.e('Table_Col').at(x,y);
};


/// Table Component
Crafty.c('Table', {
	init: function() {
		this.requires('Actor, spr_table');
	},
});//End of Components Object 

Crafty.c('Table_Col', {
	init: function() {
		this.requires('Actor, spr_table_col, Solid'); 
	},
});//End of Components Object 


function create_bar(x,y) {
	Crafty.e("Bar").at(x,y);
	Crafty.e("Bar_Col").at(x,y)
	Crafty.e("Bar_Left").at(x, y - 1 )
	// The bar is seven squares long 
	//Crafty.e("Bar_Right").at(x + 6, y - 1)
};

Crafty.c("Bar", {
	init: function() {
		this.requires('Actor, spr_bar_face')
	},
});

Crafty.c("Bar_Col", {
	init: function() {
		this.requires('Actor, spr_bar_col, Solid')
	},
});

Crafty.c("Bar_Left", {
	init: function() {
		this.requires('Actor, spr_bar_left, Solid')
	},
});

Crafty.c("Bar_Right", {
	init: function() {
		this.requires('Actor, spr_bar_right, Solid')
	},
});

/// DJ table Component
Crafty.c('DJ_Booth', {
	init: function() {
		this.requires('Actor, spr_dj_booth, Solid'); 
	},
});//End of Components Object 

/// Exit Door Component
Crafty.c('Exit', {
	init: function() {
		this.requires('Actor, spr_exit'); 
	},
});//End of Components Object 

/// Bathrooms Component
Crafty.c('Mens_BR', {
	init: function() {
		this.requires('Actor, spr_mens'); 
	},
});//End of Components Object 

/// Bathrooms Component
Crafty.c('Womens_BR', {
	init: function() {
		this.requires('Actor, spr_womens'); 
	},
});//End of Components Object 







/// Collision detection Code http://buildnewgames.com/introduction-to-crafty/

/// Register a stop-motion function to be called
//when this entity hits and entity with the "SOLID" components



