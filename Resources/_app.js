// set bg color of master viewTitanium.UI.setBackgroundColor('#000');// Create general tabgroupvar tabGroupHome = Titanium.UI.createTabGroup({ id: 'tgHome' });// Create window for Home tabvar winHome = Titanium.UI.createWindow({ id: 'winHome',  url: 'home/home.js' });var tabHome = Titanium.UI.createTab({        id: 'tabHome',	window: winHome   });// Window for Ticketsvar winTickets = Titanium.UI.createWindow({ id: 'winTickets',  url: 'tickets/ticket_list.js'});var tabTickets = Titanium.UI.createTab({	id: 'tabTickets',    window: winTickets});// Window for Assets var winAssets = Titanium.UI.createWindow({ id: 'winAssets', url: 'assets/tweets.js' });var tabAssets = Titanium.UI.createTab({    id: 'tabAssets',    window: winAssets});// add tabstabGroupHome.addTab(tabHome);tabGroupHome.addTab(tabTickets);tabGroupHome.addTab(tabAssets);tabGroupHome.addEventListener('open', function () {// set background color back to white after tab group transition    Titanium.UI.setBackgroundColor('#fff');});tabGroupHome.setActiveTab(0);tabGroupHome.open();