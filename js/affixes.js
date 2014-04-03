(function($, global) {
	
	var affixToSlot = {}; // created via function
	var slotToAffix = {
		'Amulet' 		     : ['pri', 'vit', 'ar', 'lps', 'arm', 'ele', 'dmg', 'chc', 'chd', 'aoe', 'as', 'life', 'cdr', 'rcr', 'sock'],
		'Belt'   		     : ['pri', 'vit', 'lps', 'ar', 'arm', 'life', 'gen'],
		'Mighty Belt'	     : ['pri', 'vit', 'ar', 'lps', 'arm', 'life', 'gen', 'lpfs'],
		'Boots'  		     : ['pri', 'vit', 'ar', 'lps', 'arm', 'move', 'spend'],
		'Bracers'		     : ['ele', 'pri', 'vit', 'ar', 'lps', 'arm', 'chc', 'loh'],
		'Chest'  		     : ['pri', 'vit', 'ar', 'lps', 'arm', 'life', 'sock', 'spend'],
		'Cloak'  		     : ['pri', 'vit', 'ar', 'lps', 'arm', 'life', 'sock', 'hgen', 'spend'],
		'Gloves' 		     : ['pri', 'vit', 'ar', 'lps', 'arm', 'chc', 'chd', 'aoe', 'as', 'loh', 'cdr', 'rcr'],
		'Helm'   		     : ['pri', 'vit', 'ar', 'lps', 'arm', 'chc', 'life', 'loh', 'spend', 'sock'],
		'Wizard Hat'         : ['pri', 'vit', 'ar', 'lps', 'arm', 'chc', 'life', 'loh', 'spend', 'sock', 'apoc'],
		'Spirit Stone'       : ['pri', 'vit', 'ar', 'lps', 'arm', 'chc', 'life', 'loh', 'spend', 'sock', 'lpss', 'sgen'],
		'Pants'  		     : ['pri', 'vit', 'ar', 'lps', 'arm', 'gen', 'sock'],
		'Ring'   		     : ['pri', 'vit', 'ar', 'lps', 'arm', 'dmg', 'chc', 'chd', 'as', 'life', 'loh', 'aoe', 'cdr', 'rcr', 'sock'],
		'Shoulder'		     : ['pri', 'vit', 'ar', 'lps', 'arm', 'aoe', 'life', 'cdr', 'rcr', 'spend'],
		'Shield' 		     : ['pri', 'vit', 'ar', 'lps', 'arm', 'chc', 'life', 'sock', 'block', 'bleed'],
		'Crusader Shield'    : ['pri', 'vit', 'ar', 'lps', 'arm', 'chc', 'life', 'sock', 'block', 'bleed'],
		'Source' 		     : ['pri', 'vit', 'ar', 'lps', 'chc', 'life', 'sock', 'edmg', 'apoc', 'bleed', 'spend', 'cdr', 'rcr', 'life', 'loh', 'as', 'aoe', 'chc', 'dmg'],
		'Quiver' 		     : ['pri', 'vit', 'lps', 'chc', 'life', 'sock', 'bleed', 'spend', 'cdr', 'rcr', 'life', 'as', 'aoe', 'chc', 'hgen'],
		'Mojo'   		     : ['pri', 'vit', 'lps', 'chc', 'life', 'sock', 'mgen', 'bleed', 'spend', 'cdr', 'rcr', 'life', 'loh', 'as', 'aoe', 'chc', 'dmg'],
		'One-Hander'	     : ['ldmg', 'pri', 'vit', 'lps', 'dmg', 'aoe', 'as', 'loh', 'cdr', 'rcr', 'sock', 'bleed', 'pdmg'],
		'Ceremonial Knife'   : ['ldmg', 'pri', 'vit', 'lps', 'dmg', 'aoe', 'as', 'loh', 'cdr', 'rcr', 'sock', 'bleed', 'pdmg', 'mgen'],
		'Flail (1H)'         : ['ldmg', 'pri', 'vit', 'lps', 'dmg', 'aoe', 'as', 'loh', 'cdr', 'rcr', 'sock', 'bleed', 'pdmg'],
		'Wand'               : ['ldmg', 'pri', 'vit', 'lps', 'dmg', 'aoe', 'as', 'loh', 'cdr', 'rcr', 'sock', 'bleed', 'pdmg', 'apgen'],
		'Mighty Weapon (1H)' : ['ldmg', 'pri', 'vit', 'lps', 'dmg', 'aoe', 'as', 'loh', 'cdr', 'rcr', 'sock', 'bleed', 'pdmg'],
		'Fist Weapon'	     : ['ldmg', 'pri', 'vit', 'lps', 'dmg', 'aoe', 'as', 'loh', 'cdr', 'rcr', 'sock', 'bleed', 'pdmg', 'sgen'],
		'Hand Crossbow'	     : ['ldmg', 'pri', 'vit', 'lps', 'dmg', 'aoe', 'as', 'loh', 'cdr', 'rcr', 'sock', 'bleed', 'pdmg', 'hgen'],
		'Two-Hander'	     : ['ldmg', 'pri', 'vit', 'lps', 'dmg', 'aoe', 'as', 'cdr', 'rcr', 'sock', 'bleed', 'pdmg'],
		'Daibo'		         : ['ldmg', 'pri', 'vit', 'lps', 'dmg', 'aoe', 'as', 'cdr', 'rcr', 'sock', 'bleed', 'pdmg', 'sgen'],
		'Flail (2H)'         : ['ldmg', 'pri', 'vit', 'lps', 'dmg', 'aoe', 'as', 'cdr', 'rcr', 'sock', 'bleed', 'pdmg'],
		'Mighty Weapon (2H)' : ['ldmg', 'pri', 'vit', 'lps', 'dmg', 'aoe', 'as', 'cdr', 'rcr', 'sock', 'bleed', 'pdmg'],
	};

	var secToSlot = {};
	var slotToSec = {
		'Amulet' 		     : ['res', 'xp', 'glob', 'lpk', 'rdcie', 'rrdmg', 'rmdmg', 'gold', 'thorn', 'blind'],
		'Belt'   		     : ['res', 'lpk', 'thorn', 'xp', 'pick', 'freez', 'dura', 'lvlr'],
		'Mighty Belt'	     : ['res', 'xp', 'thorn', 'lpk', 'pick', 'lvlr', 'freez', 'dura'],
		'Boots'  		     : ['res', 'gold', 'thorn', 'xp', 'glob', 'immo', 'dura', 'pick', 'lvlr'],
		'Bracers'		     : ['res', 'rrdmg', 'rmdmg', 'gold', 'thorn', 'xp', 'pick', 'knock', 'dura', 'lvlr'],
		'Chest'  		     : ['res', 'rrdmg', 'rmdmg', 'lpk', 'gold', 'thorn', 'xp', 'pick', 'dura', 'glob', 'lvlr'],
		'Cloak'  		     : ['res', 'rrdmg', 'rmdmg', 'lpk', 'gold', 'thorn', 'xp', 'pick', 'dura', 'glob', 'lvlr', 'maxd'],
		'Gloves' 		     : ['res', 'gold', 'thorn', 'xp', 'lvlr', 'pick', 'stun', 'dura'],
		'Helm'   		     : ['res', 'gold', 'thorn', 'xp', 'pick', 'rdcie', 'fear', 'dura', 'lvlr'],
		'Wizard Hat'         : ['res', 'gold', 'thorn', 'xp', 'pick', 'rdcie', 'fear', 'dura', 'lvlr', 'maxap'],
		'Spirit Stone'       : ['res', 'gold', 'thorn', 'xp', 'pick', 'rdcie', 'fear', 'dura', 'lvlr', 'maxs'],
		'Pants'  		     : ['res', 'lpk', 'gold', 'thorn', 'xp', 'pick', 'show', 'dura', 'lvlr'],
		'Ring'   		     : ['res', 'lpk', 'gold', 'thorn', 'xp', 'rdcie', 'glob'],
		'Shoulder'		     : ['res', 'thorn', 'xp', 'glob', 'pick', 'lvlr', 'chill', 'dura'],
		'Shield' 		     : ['res', 'gold', 'thorn', 'xp', 'rdcie', 'rrdmg', 'rmdmg', 'blind', 'chill', 'freez', 'immo', 'slow', 'stun', 'fear', 'knock', 'dura', 'glob'],
		'Crusader Shield'    : ['res', 'gold', 'thorn', 'xp', 'rdcie', 'rrdmg', 'rmdmg', 'blind', 'chill', 'freez', 'immo', 'slow', 'stun', 'fear', 'knock', 'dura', 'glob'],
		'Source' 		     : ['xp', 'glob', 'lpk', 'blind', 'chill', 'freez', 'immo', 'slow', 'stun', 'fear', 'knock', 'dura', 'maxap'],
		'Quiver' 		     : ['gold', 'thorn', 'xp', 'glob', 'blind', 'chill', 'freez', 'immo', 'slow', 'stun', 'fear', 'knock', 'dura', 'maxd', 'lvlr'],
		'Mojo'   		     : ['xp', 'glob', 'lpk', 'blind', 'chill', 'freez', 'immo', 'slow', 'stun', 'fear', 'knock', 'dura', 'maxm'],
		'One-Hander'	     : ['xp', 'lpk', 'lvlr', 'chill', 'freez', 'blind', 'immo', 'slow', 'stun', 'fear', 'knock', 'dura'],
		'Ceremonial Knife'   : ['xp', 'lpk', 'lvlr', 'chill', 'freez', 'blind', 'immo', 'slow', 'stun', 'fear', 'knock', 'dura'],
		'Flail (1H)'         : ['xp', 'lpk', 'lvlr', 'chill', 'freez', 'blind', 'immo', 'slow', 'stun', 'fear', 'knock', 'dura'],
		'Wand'               : ['xp', 'lpk', 'lvlr', 'chill', 'freez', 'blind', 'immo', 'slow', 'stun', 'fear', 'knock', 'dura'],
		'Mighty Weapon (1H)' : ['xp', 'lpk', 'lvlr', 'chill', 'freez', 'blind', 'immo', 'slow', 'stun', 'fear', 'knock', 'dura'],
		'Fist Weapon'	     : ['xp', 'lpk', 'lvlr', 'chill', 'freez', 'blind', 'immo', 'slow', 'stun', 'fear', 'knock', 'dura'],
		'Hand Crossbow'	     : ['xp', 'lpk', 'lvlr', 'chill', 'freez', 'blind', 'immo', 'slow', 'stun', 'fear', 'knock', 'dura'],
		'Two-Hander'	     : ['xp', 'lpk', 'lvlr', 'chill', 'freez', 'blind', 'immo', 'slow', 'stun', 'fear', 'knock', 'dura'],
		'Daibo'		         : ['xp', 'lpk', 'lvlr', 'chill', 'freez', 'blind', 'immo', 'slow', 'stun', 'fear', 'knock', 'dura'],
		'Flail (2H)'         : ['xp', 'lpk', 'lvlr', 'chill', 'freez', 'blind', 'immo', 'slow', 'stun', 'fear', 'knock', 'dura'],
		'Mighty Weapon (2H)' : ['xp', 'lpk', 'lvlr', 'chill', 'freez', 'blind', 'immo', 'slow', 'stun', 'fear', 'knock', 'dura'],
	};   

	var primaryAffixLabels = {
		'dmg'  : '+X-Y Damage',
		'ldmg' : '+X-Y [Elemental] Damage',
		'pdmg' : '% Damage',
		'ele'  : '[Element] Skills deal % more damage',
		'pri'  : 'Primary Attribute (Str, Dex, or Int)',
		'vit'  : 'Vitality',
		'as'   : 'Attack Speed Increased by %',
		'ar'   : 'X All Resistances',
		'life' : 'Life %',
		'arm'  : 'Armor',
		'chd'  : 'Critical Hit Damage Increased by %',
		'lps'  : 'Regenerates X Life per Second',
		'chc'  : 'Critical Hit Chance Increased by %',
		'aoe'  : 'Chance to Deal % area damage on Hit',
		'loh'  : 'Life per Hit',
		'cdr'  : 'Reduces Cooldown of all Skills by %',
		'rcr'  : 'Reduces all Resource Costs by %',
		'move' : '% Movement Speed',
		'gen'  : 'Increases [signature skill] damage by %',
		'spend': 'Increases [spender] damage by %',
		'sock' : 'Sockets',
		'edmg' : 'Increases Damage Against Elites by %',
		'erud' : 'Reduced damage from Elites',
		'apoc' : 'Critical Hits grant X Arcane Power',
		'block': '% Chance to Block',
		'bleed': '% Chance to Inflict Bleed for X Weapon Damage over Y Seconds',
		'hgen' : 'Increases Hatred Regeneration by X per second',
		'mgen' : 'Increases Mana Regeneration by X per second',
		'sgen' : 'Increases Spirit Regeneration by X per second',
		//'wgen' : 'Increases Wrath Regeneration by X per second',
		//'fgen' : 'Increases Fury Generation by X per second',
		'lpfs' : 'Life per Fury Spent',
		'lpss' : 'Life per Spirit Spent',
	};

	var secondaryAffixLabels = {
		'res'   : 'X [Type] Resistance',
		'rrdmg' : 'Reduces damage from ranged attacks by %',
		'rmdmg' : 'Reduces damage from melee attacks by %',
		'lpk'   : 'Life per Kill',
		'gold'  : '% Extra Gold from Monsters',
		'maxap' : 'Maximum Arcane Power',
		'maxd'  : 'Maximum Discipline',
		'maxm'  : 'Maximum Mana',
		'maxf'  : 'Maximum Fury',
		'maxs'  : 'Maximum Spirit',
		'thorn' : 'Ranged and melee attackers take X damage per hit',
		'xp'    : 'Monster kills grant +X experience',
		'pick'  : 'Increases Gold and Health Pickup by X yards',
		'rdcie' : 'Reduced duration of control impairing effects',
		'blind' : '% Chance to Blind on hit',
		'chill' : '% Chance to Chill on hit',
		'freez' : '% Chance to Freeze on hit',
		'slow' 	: '% Chance to Slow on hit',
		'stun' 	: '% Chance to Stun on hit',
		'fear' 	: '% Chance to Fear on hit',
		'knock' : '% Chance to Knockback on hit',
		'immo'  : '% Chance to Immobilize on hit',
		'dura'  : 'Ignores Durability Loss',
		'glob'  : 'Health globes and potions grant +X life',
		'lvlr'  : 'Level Requirement Reduced by X',
	};

	var $affixList = null;
	var $secList = null;
	var $slotList = null;
	var locked = false;

	//
	// List display functions
	// 
	
	function addAllAffixesToDisplay() {
		$.each(primaryAffixLabels, function(key, val) {
			var $aff = $('<a>')
				.addClass('list-group-item')
				.attr('href', '#')
				.attr('data-affix', key)
				.text(val);
			$affixList.append($aff);
		});
	}

	function addAllSlotsToDisplay() {
		$.each(slotToAffix, function(key, val) {
			var $slot = $('<a>')
				.addClass('list-group-item')
				.attr('data-slot', key)
				.attr('href', '#')
				.text(key);
			$slotList.append($slot);
		});
	}

	function addAllSecsToDisplay() {
		$.each(secondaryAffixLabels, function(key, val) {
			var $aff = $('<a>')
				.addClass('list-group-item')
				.attr('href', '#')
				.attr('data-sec', key)
				.text(val);
			$secList.append($aff);
		});
	}

	// 
	// Lookup creation
	// 
	
	function createSecToSlotLookup() {
		$.each(slotToSec, function(slot, secList) {
			$.each(secList, function(i, aff) {
				if(!secToSlot[aff]) { secToSlot[aff] = []; }
				secToSlot[aff].push(slot);
			});
		});
	}

	function createAffixToSlotLookup() {
		$.each(slotToAffix, function(slot, affList) {
			$.each(affList, function(i, aff) {
				if(!affixToSlot[aff]) { affixToSlot[aff] = []; }
				affixToSlot[aff].push(slot);
			});
		});
	}

	//
	// Highlight functions
	// 

	function removeAffixHighlights() {
		$('.affix-list > a').removeClass("list-group-item-info");
	}
	function highlightAffixesFor(slot) {
		removeAffixHighlights();
		if(slotToAffix[slot]) {
			$.each(slotToAffix[slot], function(i, aff) {
				$('.affix-list > a[data-affix="'+aff+'"]').addClass('list-group-item-info');
			});
		}
	}

	function removeSecHighlights() {
		$('.sec-list > a').removeClass("list-group-item-info");
	}
	function highlightSecsFor(slot) {
		removeSecHighlights();
		if(slotToSec[slot]) {
			$.each(slotToSec[slot], function(i, aff) {
				$('.sec-list > a[data-sec="'+aff+'"]').addClass('list-group-item-info');
			});
		}
	}

	function removeSlotHighlights() {
		$('.slot-list > a').removeClass("list-group-item-info");
	}
	function highlightSlotsFor(affix) {
		removeSlotHighlights();
		if(affixToSlot[affix]) {
			$.each(affixToSlot[affix], function(i, slot) {
				$('.slot-list > a[data-slot="'+slot+'"]').addClass('list-group-item-info');
			});
		}
	}

	function highlightSlotsForSec(affix) {
		removeSlotHighlights();
		if(secToSlot[affix]) {
			$.each(secToSlot[affix], function(i, slot) {
				$('.slot-list > a[data-slot="'+slot+'"]').addClass('list-group-item-info');
			});
		}
	}

	//
	// mouse events
	// 
	
	function onAffixMouseleave() {
		if(locked) return;
		$('.affix-list > a').removeClass('active');
		removeSlotHighlights();
	}

	function onAffixMouseenter() {
		if(locked) return;
		$(this).addClass('active');
		highlightSlotsFor($(this).attr('data-affix'));
	}

	function onSecMouseleave() {
		if(locked) return;
		$('.sec-list > a').removeClass('active');
		removeSlotHighlights();
	}

	function onSecMouseenter() {
		if(locked) return;
		$(this).addClass('active');
		highlightSlotsForSec($(this).attr('data-sec'));
	}

	function onSlotMouseleave() {
		if(locked) return;
		$('.slot-list > a').removeClass('active');
		removeAffixHighlights();
		removeSecHighlights();
	}

	function onSlotMouseenter() {
		if(locked) return;
		$(this).addClass('active');
		highlightAffixesFor($(this).attr('data-slot'));
		highlightSecsFor($(this).attr('data-slot'));
	}

	function lockSelection(event) {
		if(locked == this) {
			locked = false;
			$(this).mouseleave();
		} else {
			var last = locked;
			locked = false;
			$(last).mouseleave();
			$(this).mouseenter();
			locked = this;
		}
		console.log("locked = " + locked);
		// do not activate anchor
		event.preventDefault ? event.preventDefault() : event.returnValue = false;
		return false;
	}

	function addEvents() {
		$('.slot-list > a').on('mouseenter', onSlotMouseenter)
			.on('click', lockSelection)
			.on('mouseleave', onSlotMouseleave);
		$('.affix-list > a').on('mouseenter', onAffixMouseenter)
			.on('click', lockSelection)
			.on('mouseleave', onAffixMouseleave);
		$('.sec-list > a').on('mouseenter', onSecMouseenter)
			.on('click', lockSelection)
			.on('mouseleave', onSecMouseleave);
	}
	function onLoad() {
		$slotList = $('.slot-list');
		$affixList = $('.affix-list');
		$secList = $('.sec-list');

		createAffixToSlotLookup();
		createSecToSlotLookup();

		addAllSlotsToDisplay();
		addAllAffixesToDisplay();
		addAllSecsToDisplay();

		addEvents();
	}

	$(global.document).ready(function() {
		onLoad();
	});

})(jQuery, window);
