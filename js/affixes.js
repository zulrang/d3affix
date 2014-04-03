(function($, global) {
	
	var affixToSlot = {}; // created via function
	var slotToAffix = {
		'Amulet' 		: ['pri', 'vit', 'ar', 'lps', 'arm', 'ele', 'dmg', 'chc', 'chd', 'aoe', 'as', 'life', 'cdr', 'rcr', 'sock'],
		'Belt'   		: ['pri', 'vit', 'lps', 'arm', 'life', 'gen'],
		'Mighty Belt'	: ['pri', 'vit', 'ar', 'lps', 'arm', 'life', 'gen', 'lpfs'],
		'Boots'  		: ['pri', 'vit', 'ar', 'lps', 'arm', 'spend', 'move'],
		'Bracers'		: ['pri', 'vit', 'ar', 'lps', 'arm', 'chc', 'ele', 'loh'],
		'Chest'  		: ['pri', 'vit', 'ar', 'lps', 'arm', 'life', 'sock', 'erud'],
		'Cloak'  		: ['pri', 'vit', 'ar', 'lps', 'arm', 'life', 'sock', 'erud', 'hgen'],
		'Gloves' 		: ['pri', 'vit', 'ar', 'lps', 'arm', 'chc', 'chd', 'aoe', 'as', 'loh', 'cdr', 'rcr'],
		'Helm'   		: ['pri', 'vit', 'ar', 'lps', 'arm', 'chc', 'life', 'loh', 'spend', 'sock', 'apoc'],
		'Spirit Stone'  : ['pri', 'vit', 'ar', 'lps', 'arm', 'chc', 'life', 'loh', 'spend', 'sock', 'apoc', 'lpss', 'sgen'],
		'Pants'  		: ['pri', 'vit', 'ar', 'lps', 'arm', 'gen', 'sock'],
		'Ring'   		: ['pri', 'vit', 'ar', 'lps', 'arm', 'dmg', 'chc', 'chd', 'as', 'life', 'loh', 'cdr', 'rcr', 'sock'],
		'Shoulder'		: ['pri', 'vit', 'ar', 'lps', 'arm', 'aoe', 'life', 'cdr', 'rcr', 'spend'],
		'Shield' 		: ['pri', 'vit', 'ar', 'lps', 'arm', 'chc', 'life', 'sock', 'edmg', 'erud', 'block', 'bleed'],
		'Source' 		: ['pri', 'vit', 'ar', 'lps', 'chc', 'life', 'sock', 'edmg', 'apoc', 'bleed', 'spend', 'cdr', 'rcr', 'life', 'loh', 'as', 'aoe', 'chc', 'dmg'],
		'Quiver' 		: ['pri', 'vit', 'ar', 'lps', 'chc', 'life', 'sock', 'edmg', 'bleed', 'spend', 'cdr', 'rcr', 'life', 'as', 'aoe', 'chc', 'hgen'],
		'Mojo'   		: ['pri', 'vit', 'ar', 'lps', 'chc', 'life', 'sock', 'edmg', 'mgen', 'bleed', 'spend', 'cdr', 'rcr', 'life', 'loh', 'as', 'aoe', 'chc', 'dmg'],
		'1-Hander'		: ['pri', 'vit', 'ar', 'lps', 'dmg', 'aoe', 'as', 'life', 'loh', 'cdr', 'rcr', 'sock', 'bleed', 'pdmg', 'sgen'],
		'2-Hander'		: ['pri', 'vit', 'ar', 'lps', 'dmg', 'aoe', 'as', 'life', 'loh', 'cdr', 'rcr', 'sock', 'bleed', 'pdmg']
	};

	var secToSlot = {};
	var slotToSec = {
		'Amulet' 		: ['res', 'xp', 'glob', 'lpk', 'rdcie', 'rrdmg', 'rmdmg', 'gold', 'thorn', 'blind'],
		'Belt'   		: ['res', 'lpk', 'thorn', 'xp', 'pick', 'freez', 'dura', 'lvlr'],
		'Mighty Belt'	: ['res', 'xp', 'glob', 'lpk', 'pick', 'lvlr', 'freez', 'dura'],
		'Boots'  		: ['res', 'xp', 'glob', 'lpk', 'pick', 'lvlr', 'immo', 'dura'],
		'Bracers'		: ['res', 'xp', 'glob', 'lpk', 'rrdmg', 'rmdmg', 'pick', 'stun', 'dura'],
		'Chest'  		: ['res', 'xp', 'glob', 'lpk', 'rrdmg', 'rmdmg', 'pick', 'knock', 'dura', 'lvlr'],
		'Cloak'  		: ['res', 'xp', 'glob', 'lpk', 'rrdmg', 'rmdmg', 'pick', 'knock', 'dura', 'lvlr', 'maxd'],
		'Gloves' 		: ['res', 'xp', 'glob', 'lpk', 'pick', 'stun', 'dura'],
		'Helm'   		: ['res', 'xp', 'glob', 'lpk', 'rdcie', 'pick', 'lvlr', 'fear', 'dura', 'maxs'],
		'Spirit Stone'  : ['res', 'xp', 'glob', 'lpk', 'rdcie', 'pick', 'lvlr', 'fear', 'dura', 'maxs'],
		'Pants'  		: ['res', 'xp', 'glob', 'lpk', 'lvlr', 'dura'],
		'Ring'   		: ['res', 'xp', 'glob', 'lpk', 'rdcie'],
		'Shoulder'		: ['res', 'xp', 'glob', 'lpk', 'pick', 'lvlr', 'chill', 'dura'],
		'Shield' 		: ['res', 'xp', 'glob', 'lpk', 'rdcie', 'rrdmg', 'rmdmg', 'blind', 'chill', 'freeze', 'immo', 'slow', 'stun', 'fear', 'knock', 'dura'],
		'Source' 		: ['res', 'xp', 'glob', 'lpk', 'blind', 'chill', 'freeze', 'immo', 'slow', 'stun', 'fear', 'knock', 'dura', 'maxap'],
		'Quiver' 		: ['xp', 'glob', 'blind', 'chill', 'freeze', 'immo', 'slow', 'stun', 'fear', 'knock', 'dura', 'maxd', 'gold', 'thorn', 'lvlr', 'freez'],
		'Mojo'   		: ['res', 'xp', 'glob', 'lpk', 'blind', 'chill', 'freeze', 'immo', 'slow', 'stun', 'fear', 'knock', 'dura', 'maxm'],
		'1-Hander'		: ['res', 'xp', 'glob', 'lpk', 'lvlr', 'chill', 'freeze', 'immo', 'slow', 'stun', 'fear', 'knock', 'dura', 'maxap', 'maxf'],
		'2-Hander'		: ['res', 'xp', 'glob', 'lpk', 'lvlr', 'chill', 'freeze', 'immo', 'slow', 'stun', 'fear', 'knock', 'dura', 'maxf']
	};

	var primaryAffixLabels = {
		'dmg' : 'Damage',
		'ele' : '[Element] Skills deal % more damage',
		'pri' : 'Primary Attribute (Str, Dex, or Int)',
		'vit' : 'Vitality',
		'arm' : 'Armor',
		'lps' : 'X Life per Second',
		'chc' : 'Critical Hit Chance Increased by %',
		'chd' : 'Critical Hit Damage Increased by %',
		'aoe' : 'Chance to Deal % area damage on Hit',
		'as'  : 'Attack Speed %',
		'life': 'Life %',
		'loh' : 'Life per Hit',
		'cdr' : 'Reduces Cooldown of all Skills by %',
		'rcr' : 'Reduces all Resource Costs by %',
		'gen' : 'Increases [signature skill] damage by %',
		'spend':'Increases [spender] damage by %',
		'move': '% Movement Speed',
		'ele' : '[Element] Skills deal % more damage',
		'sock': 'Sockets',
		'edmg': 'Increases Damage Against Elites by %',
		'erud': 'Reduced damage from Elites',
		'apoc': 'Critical Hits grant X Arcane Power',
		'block':'% Chance to Block',
		'bleed':'% Chance to Inflict Bleed for X Weapon Damage over Y Seconds',
		'hgen': 'Increases Hatred Regeneration by X per second',
		'mgen': 'Increases Mana Regeneration by X per second',
		'sgen': 'Increases Spirit Regeneration by X per second',
		'pdmg': '% Damage',
		'lpfs': 'Life per Fury Spent',
		'lpss': 'Life per Spirit Spent',
		'ar'  : 'X All Resistances'
	};

	var secondaryAffixLabels = {
		'res'   : 'X [Type] Resistance',
		'lpk'   : 'Life per Kill',
		'thorn' : 'Ranged and melee attackers take X damage per hit',
		'xp'    : 'Monster kills grant +X experience',
		'pick'  : 'Increases Gold and Health Pickup by X yards',
		'blind' : '% Chance to Blind on hit',
		'chill' : '% Chance to Chill on hit',
		'freez' : '% Chance to Freeze on hit',
		'slow' 	: '% Chance to Slow on hit',
		'stun' 	: '% Chance to Stun on hit',
		'fear' 	: '% Chance to Fear on hit',
		'knock' : '% Chance to Knockback on hit',
		'lvlr'  : 'Level Requirement Reduced by X',
		'dura'  : 'Ignores Durability Loss',
		'rdcie' : 'Reduced duration of control impairing effects',
		'rrdmg' : 'Reduces damage from ranged attacks by %',
		'rmdmg' : 'Reduces damage from melee attacks by %',
		'gold'  : '% Extra Gold from Monsters',
		'maxap'  : 'Maximum Arcane Power',
		'maxd'  : 'Maximum Discipline',
		'maxm'  : 'Maximum Mana',
		'maxf'  : 'Maximum Fury',
		'maxs'  : 'Maximum Spirit',
		'glob'  : 'Health globes and potions grant +X life',
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
