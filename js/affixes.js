(function($, global) {
	
	var affixToSlot = {}; // created via function
	var slotToAffix = {
		'Amulet' : ['ele', 'dmg', 'chc', 'chd', 'aoe', 'as', 'life', 'loh', 'cdr', 'rcr', 'sock'],
		'Belt'   : ['life', 'gen', 'lpfs'],
		'Boots'  : ['spend', 'move'],
		'Bracers': ['chc', 'ele', 'loh'],
		'Chest'  : ['life', 'sock', 'erud'],
		'Gloves' : ['chc', 'chd', 'aoe', 'as', 'loh', 'cdr', 'rcr'],
		'Helm'   : ['chc', 'life', 'loh', 'spend', 'sock', 'apoc'],
		'Pants'  : ['gen', 'sock'],
		'Ring'   : ['dmg', 'chc', 'chd', 'as', 'life', 'loh', 'cdr', 'rcr', 'sock'],
		'Shoulder':['aoe', 'life', 'cdr', 'rcr', 'spend'],
		'Shield' : ['chc', 'life', 'sock', 'edmg', 'erud', 'block', 'bleed'],
		'Source' : ['chc', 'life', 'sock', 'edmg', 'apoc', 'bleed', 'spend', 'cdr', 'rcr', 'life', 'loh', 'as', 'aoe', 'chc', 'dmg'],
		'Quiver' : ['chc', 'life', 'sock', 'edmg', 'bleed', 'spend', 'cdr', 'rcr', 'life', 'loh', 'as', 'aoe', 'chc', 'hgen'],
		'Mojo'   : ['chc', 'life', 'sock', 'edmg', 'mgen', 'bleed', 'spend', 'cdr', 'rcr', 'life', 'loh', 'as', 'aoe', 'chc', 'dmg'],
		'1-Hander':['dmg', 'chc', 'aoe', 'as', 'life', 'loh', 'cdr', 'rcr', 'sock', 'bleed', 'pdmg'],
		'2-Hander':['dmg', 'chc', 'aoe', 'as', 'life', 'loh', 'cdr', 'rcr', 'sock', 'bleed', 'pdmg']
	};

	var secToSlot = {};
	var slotToSec = {
		'Amulet' : ['rdcie', 'rrdmg', 'rmdmg'],
		'Belt'   : ['pick', 'lvlr', 'freez', 'dura'],
		'Boots'  : ['pick', 'lvlr', 'immo', 'dura'],
		'Bracers': ['rrdmg', 'rmdmg', 'pick', 'stun', 'dura'],
		'Chest'  : ['rrdmg', 'rmdmg', 'pick', 'knock', 'dura', 'lvlr'],
		'Gloves' : ['pick', 'stun', 'dura'],
		'Helm'   : ['rdcie', 'pick', 'lvlr', 'fear', 'dura', 'maxs'],
		'Pants'  : ['lvlr', 'dura'],
		'Ring'   : ['rdcie'],
		'Shoulder':['pick', 'lvlr', 'chill', 'dura'],
		'Shield' : ['rdcie', 'rrdmg', 'rmdmg', 'blind', 'chill', 'freeze', 'immo', 'slow', 'stun', 'fear', 'knock', 'dura'],
		'Source' : ['blind', 'chill', 'freeze', 'immo', 'slow', 'stun', 'fear', 'knock', 'dura', 'maxap'],
		'Quiver' : ['blind', 'chill', 'freeze', 'immo', 'slow', 'stun', 'fear', 'knock', 'dura', 'maxd'],
		'Mojo'   : ['blind', 'chill', 'freeze', 'immo', 'slow', 'stun', 'fear', 'knock', 'dura', 'maxm'],
		'1-Hander':['lvlr', 'chill', 'freeze', 'immo', 'slow', 'stun', 'fear', 'knock', 'dura', 'maxap', 'maxf'],
		'2-Hander':['lvlr', 'chill', 'freeze', 'immo', 'slow', 'stun', 'fear', 'knock', 'dura', 'maxf']
	};

	var primaryAffixLabels = {
		'dmg' : 'Damage',
		'chc' : 'Critical Hit Chance Increased by %',
		'chd' : 'Critical Hit Damage Increased by %',
		'ele' : '[Element] Skills deal % more damage',
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
		'edmg': 'Increased Damage Against Elites',
		'erud': 'Reduced damage from Elites',
		'apoc': 'Critical Hits grant X Arcane Power',
		'block':'% Chance to Block',
		'bleed':'% Chance to Inflict Bleed for X Weapon Damage over Y Seconds',
		'hgen': 'Increases Hatred Regeneration by X per second',
		'mgen': 'Increases Mana Regeneration by X per second',
		'pdmg': '% Damage',
		'lpfs': 'Life per Fury Spent'
	};

	var secondaryAffixLabels = {
		'rdcie' : 'Reduced duration of control impairing effects',
		'rrdmg' : 'Reduces damage from ranged attacks by %',
		'rmdmg' : 'Reduces damage from melee attacks by %',
		'pick'  : 'Increases Gold and Health Pickup by X yards',
		'lvlr'  : 'Level Requirement Reduced by X',
		'blind' : '% Chance to Blind on hit',
		'chill' : '% Chance to Chill on hit',
		'freez' : '% Chance to Freeze on hit',
		'slow' 	: '% Chance to Slow on hit',
		'stun' 	: '% Chance to Stun on hit',
		'fear' 	: '% Chance to Fear on hit',
		'knock' : '% Chance to Knockback on hit',
		'dura'  : 'Ignores Durability Loss',
		'maxap'  : 'Maximum Arcane Power',
		'maxd'  : 'Maximum Discipline',
		'maxm'  : 'Maximum Mana',
		'maxf'  : 'Maximum Fury',
		'maxs'  : 'Maximum Spirit',
	};

	var $affixList = null;
	var $secList = null;
	var $slotList = null;

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
		$('.affix-list > a').removeClass('active');
		removeSlotHighlights();
	}

	function onAffixMouseenter() {
		$(this).addClass('active');
		highlightSlotsFor($(this).attr('data-affix'));
	}

	function onSecMouseleave() {
		$('.sec-list > a').removeClass('active');
		removeSlotHighlights();
	}

	function onSecMouseenter() {
		$(this).addClass('active');
		highlightSlotsForSec($(this).attr('data-sec'));
	}

	function onSlotMouseleave() {
		$('.slot-list > a').removeClass('active');
		removeAffixHighlights();
		removeSecHighlights();
	}

	function onSlotMouseenter() {
		$(this).addClass('active');
		highlightAffixesFor($(this).attr('data-slot'));
		highlightSecsFor($(this).attr('data-slot'));
	}

	function onDeadLink(event) {
		event.preventDefault ? event.preventDefault() : event.returnValue = false;
		return false;
	}


	function addEvents() {
		$('.slot-list > a').on('mouseenter', onSlotMouseenter).on('click', onDeadLink);
		$('.slot-list > a').on('mouseleave', onSlotMouseleave).on('click', onDeadLink);
		$('.affix-list > a').on('mouseenter', onAffixMouseenter).on('click', onDeadLink);
		$('.affix-list > a').on('mouseleave', onAffixMouseleave).on('click', onDeadLink);
		$('.sec-list > a').on('mouseenter', onSecMouseenter).on('click', onDeadLink);
		$('.sec-list > a').on('mouseleave', onSecMouseleave).on('click', onDeadLink);
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
