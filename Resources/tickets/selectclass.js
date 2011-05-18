var win = Ti.UI.currentWindow;

var data = [];

for (var i=0;i<=4;i++)
{
	var row = Ti.UI.createTableViewRow();
	var rowTitle = '';
	switch (i)
	{
		case 0: rowTitle = 'Class 1';
			break;
		case 1: rowTitle = 'Class2';
		break;
		case 2: rowTitle = 'Class 3';
		break;
		case 3: rowTitle = 'Class 4';
		break;
		case 4: rowTitle = 'Class 5';	
		break;
	}
	if (i==2)
	{
		row.hasCheck=true;
	}
	var l = Ti.UI.createLabel({
		left:5,
		font:{fontSize:20, fontWeight:'bold'},
		color:'#000',
		text:rowTitle
	});
	row.add(l);
	data[i] = row;
}

// create table view
var tableview = Titanium.UI.createTableView({
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