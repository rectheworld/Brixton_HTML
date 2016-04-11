

// function myFunction(p1, p2) {
//     return p1 * p2;              // The function returns the product of p1 and p2
// }

function player_has_beer(player, npc){
	// 2 Children : Nodes 
	if (player.has_beer) {

		switch (npc.name){
			case 'GIRL1':
				npc.speak('player_has_beer')
				npc.quest_complete = true
				player.has_beer = false
				player.phone_numbers += 1
				update_stats(player)
				break;
			case 'PRISS':
				player_is_mixologist(player, npc)
				break;
		}

	} else {
		npc.speak('intro')
		return "I am talking to a girl"
	};
};


function is_bartender(player, npc){
	// 1 Action 1 Node
	if (npc.name == 'BARTENDER'){
		return player_have_money(player, npc)
	} else {
		return is_girl(player, npc)
	};
};

function player_have_money(player, npc){
	// 2 actions
	if (player.money > 7){

		if (player.has_beer == true){
			// For right now he can only have one drink 
			console.log("You already have a drink!")
		} else {
			npc.speak('intro')
			player.has_beer = true
			player.money = player.money - 7
			update_stats(player)
			return 'GIVE THE MAN A DRINK!'
		}; 

		
	}else {
		return "DUDE, your Broke!"
	};
};

function is_girl(player, npc){
	// 2 nodes: 2 actions
	if (npc.name == "GIRL1"){
		return player_has_beer(player, npc)
	}else{
		return is_priss(player, npc)
	};
};

function is_priss(player, npc){
	// 2 nodes: 2 actions
	if (npc.name == "PRISS"){
		return player_has_beer(player, npc)
	}else{
		return is_wallflower(player, npc)
	};
};

function is_wallflower(player, npc){
	// 2 nodes: 2 actions
	if (npc.name == "WALLFLOWER"){
		num_visitsed = npc.speak(null)

		if (num_visitsed == 5){
			npc.quest_complete = true
			player.phone_numbers += 1
			update_stats(player)			
		}
	}else{
		return "He is speaking to other girls"
	};
};


function player_is_mixologist(player, npc){
	// 2 nodes: 2 actions
	console.log('HERE')
	console.log(player.mixologist)
	if (player.mixologist == true){
		npc.speak('intrig');
		player.phone_numbers += 1
		player.has_beer = true
		update_stats(player)
	}else{
		npc.speak('player_has_beer')
	};
};


function walk_tree(player, npc){
	result = is_bartender(player, npc)
	return result
};


function update_stats(player){
	document.getElementById('_money').innerHTML = String(player.money)
	document.getElementById('_numbers').innerHTML = String(player.phone_numbers)
	if (player.has_beer == true){
		drink_val = 1
	}else{
		drink_val = 0
	}

	document.getElementById('_drink').innerHTML = String(drink_val)
};


