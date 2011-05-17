var win = Ti.UI.currentWindow;

var search = Titanium.UI.createSearchBar({
	//barColor:'#000',
	showCancel:true,
	/*height:43,
	top:0,*/
	hintText:'Search User'
});

search.addEventListener('change', function(e)
{
Titanium.API.info('search bar: you type ' + e.value + ' act val ' + search.value);
});
search.addEventListener('return', function(e)
{
search.blur();
});
search.addEventListener('cancel', function(e)
{
search.blur();
});

win.add(search);


var data = [];

for (var i=0;i<=4;i++)
{
	var row = Ti.UI.createTableViewRow();
	var rowTitle = '';
	switch (i)
	{
		case 0: rowTitle = 'Jon Vickers';
			break;
		case 1: rowTitle = 'Yuriy Mykytyuk';
		break;
		case 2: rowTitle = 'Yuriy Dzoba';
		break;
		case 3: rowTitle = 'Igor Vladyka';
		break;
		case 4: rowTitle = 'Vladimir Gooz';	
		break;
	}
	if (i==2)
	{
		row.hasCheck=true;
	}
	/*var l = Ti.UI.createLabel({
		left:5,
		font:{fontSize:20, fontWeight:'bold'},
		color:'#000',
		text:rowTitle
	});
	row.add(l);*/
	row.title = rowTitle;
	data[i] = row;
}

// create table view
var tableview = Titanium.UI.createTableView({
	search:search,
	searchHidden:false,
	data:data//,
	//style: Titanium.UI.iPhone.TableViewStyle.GROUPED
});

// create table view event listener
tableview.addEventListener('click', function(e)
{
	// event data
	var index = e.index;
	var section = e.section;

	setTimeout(function()
	{
		// reset checks
		for (var i=0;i<section.rows.length;i++)
		{
			section.rows[i].hasCheck = false;
			section.rows[i].children[0].color = '#000';
		}
		// set current check
		section.rows[index].hasCheck = true;
		section.rows[index].children[0].color = '#336699';
		
	},250);
	
	setTimeout(function()
	{
		//win.navGroup.close(win._parent);
		win.navGroup.close(win);
	},
	500);
	
	
});

// add table view to the window

win.add(tableview);

//win.open();
