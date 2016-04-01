

// function myFunction(p1, p2) {
//     return p1 * p2;              // The function returns the product of p1 and p2
// }

function player_has_beer(player, npc){
	// 2 Children : Nodes 
	if (player.has_beer) {
		return "QUEST COMPLETE"
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
	if (player.has_money){
		player.has_beer = true
		return 'GIVE THE MAN A DRINK!'
	}else {
		return "DUDE, your Broke!"
	};
};

function is_girl(player, npc){
	// 2 nodes: 2 actions
	if (npc.name == "GIRL1"){
		return player_has_beer(player, npc)
	}else{
		return "He is speaking to other girls"
	};
};

function walk_tree(player, npc){
	result = is_bartender(player, npc)
	return result
}