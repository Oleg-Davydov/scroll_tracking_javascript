<script>
	var bd = document.body;

	var y = window.innerHeight;  // height of the visible part of the page
	var s = bd.scrollTop;	// height of the top line of the visible part
	var pagey = bd.scrollHeight;	// full height of the page
	var currentscroll = Math.round((y+s)/pagey*100);	// current level of scroll

	var basescroll = Math.round(y/pagey*100);	// part of the page seen by user without scroll
	var maxscroll = basescroll;		// furthest level of scroll
	var currentbasescroll = basescroll;		// possible change of basescroll in case of window resize	
  
window.addEventListener('resize', scrollcheck);
window.addEventListener('scroll', scrollcheck);

function scrollcheck()
{
	y = window.innerHeight;
	s = bd.scrollTop;	
	pagey = bd.scrollHeight;
	
	currentscroll = Math.round((y+s)/pagey*100);	
	if(currentscroll > maxscroll) { maxscroll=currentscroll; }
	currentbasescroll = Math.round(y/pagey*100);
	if(basescroll > currentbasescroll) { basescroll = currentbasescroll; }	
}

window.addEventListener('beforeunload', pageexit);

function pageexit()
{
		scrollcheck();
	
		dataLayer.push({
		'basescroll': basescroll,
		'maxscroll': maxscroll,
		'event': 'pageexit',
		'event_category' : 'Navigation',
		'event_action' : 'Exit page',
		'event_label' : interest_measure(maxscroll),
		'event_value' : pagey
		});
}

function interest_measure(msc)
{
	if(msc <= 30) { return 'scroll less than one third'; }
	if(msc > 30 & msc <= 50) { return 'scroll one third to half'; }
	if(msc > 50 & msc <= 75) { return 'scroll half to three quarters'; }
	if(msc > 75) { return 'scroll three quarters to full'; }
}
	
</script>
