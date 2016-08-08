

// function myFunction(p1, p2) {
//     return p1 * p2;              // The function returns the product of p1 and p2
// }

function player_has_beer(player, npc){
	// 2 Children : Nodes 
	if (player.drinks >= 1) {

		switch (npc.name){
			case 'GIRL1':
				npc.speak('player_has_beer')
				npc.quest_complete = true
				player.drinks -= 1
				player.phone_numbers += 1
				update_stats(player)
				player.mixologist = false

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


function player_have_money(player, npc){
	// 2 actions
	if (player.money > 7){

		if (player.drinks > 1){
			// For right now he can only have one drink 
			console.log("You already have a drink!")
		} else {
			npc.speak('intro')
			player.drinks += 1
			player.money = player.money - 7
			update_stats(player)
			return 'GIVE THE MAN A DRINK!'
		}; 

		
	}else {
		return "DUDE, your Broke!"
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
	if (player.mixologist == true){
		npc.speak('intrig');
		player.phone_numbers += 1
		npc.quest_complete = true
		player.drinks -= 1
		player.mixologist = false
		update_stats(player)
	}else{
		npc.speak('player_has_beer')

	};
};


function walk_tree(player, npc){
	console.log('QUEST COMPLETE', npc.quest_complete)
	if (npc.quest_complete == true){
		npc.speak('quest_complete')
	}else{
		result = which_npc(player, npc)
	}
	return result
};


function update_stats(player){

	document.getElementById('_money').innerHTML = String(player.money)
	document.getElementById('_numbers').innerHTML = String(player.phone_numbers)
	document.getElementById('_drink').innerHTML = String(player.drinks)

};




/// Npc identifying swtch 

function which_npc(player, npc){
	switch (npc.name){
		case 'BARTENDER':
			player_have_money(player, npc)
			break;

		case 'GIRL1':
			player_has_beer(player, npc)
			break;

		case 'PRISS':
			player_has_beer(player, npc)
			break;

		case 'WALLFLOWER':
			is_wallflower(player, npc)
			break; 
		}

	};
 