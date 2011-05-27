function createTicketTableView(tickets, tickets_id)
{
	var rowData = [];
	for (var i = 0; i < tickets.length; i++) {
			var number = tickets[i].number;
            var subject = tickets[i].subject;
            var user = tickets[i].user_name;
            var tech = tickets[i].tech_name;
            var account = tickets[i].account_name;
            var tclass = tickets[i].class_name;
            var priority = tickets[i].priority_level;
            var project = tickets[i].project;
            var status = tickets[i].status_name;
            var level = tickets[i].level;
            var ticket_time = tickets[i].created_time_str;
            
            var label_color = '#888888';
            var text_color = '#222222';
            
            var label_size = 13;
            var text_size = 14;
            
            var left_indent = 20;
            var top_indent = 6;
            var label_bottom_shift = 0;
                                    
            var row = Titanium.UI.createTableViewRow({ height: 'auto', hasChild: false });

            var post_view = Titanium.UI.createView({
                height: 'auto',
                layout: 'vertical',
                top: 4,
                right: 2,
                bottom: 4,
                left: 8
            });
            
            // num row
            var row1view = Titanium.UI.createView({
                height: 'auto',
                width: '100%',                
                top: 2,
                right: 0,
                bottom: 0,
                left: 0                
            });
            
            var tktnumuser_view = Titanium.UI.createView({
                height: 'auto',
                width: 'auto',
                layout: 'horizontal',
                top: 0,
                left: 0,
                zIndex: 50
            });
            
            var tktnum_lbl = Titanium.UI.createLabel({
                text: number,                
                top: 0,
                left: 0,
                width: 'auto',                
                height: 'auto',
                font:{fontSize:22, fontWeight:'bold'}             
            });
            
            var tktuser_lbl = Titanium.UI.createLabel({
                text: user,                
                top: 2,
                left: 5,
                width: 'auto',                
                height: 'auto',
                font:{fontSize:20, fontWeight:'normal'}             
            });
            
            tktnumuser_view.add(tktnum_lbl);
            tktnumuser_view.add(tktuser_lbl);
                        
            row1view.add(tktnumuser_view);
                                                
            var time_view = Titanium.UI.createView({            	
                height: text_size,
                width: 80,
                top: 8,                
                right: 0,
                zIndex: 100,
                backgroundColor: 'white'
            });
            
            var time_lbl = Titanium.UI.createLabel({
                text: ticket_time,                
                top: 0,
                right: 0,
                width: 'auto',                
                height: text_size,
                color:'#2d76d9',
                font:{fontSize:text_size, fontWeight:'normal'} 
            });
            time_view.add(time_lbl);
            row1view.add(time_view);
            
            post_view.add(row1view);
            
            var ticket_lbl = Titanium.UI.createLabel({
                text: subject,
                top: 3,
                left: 0,                
                width: 307, // depends on screen width
                height: 17,
                color: '#6d0f14',
                font:{fontSize:17, fontFamily:'TimesNewRomanPS-BoldItalicMT'}
            });
            post_view.add(ticket_lbl);
            
            // Account + level row
            var account_row = Titanium.UI.createView({            	
                height: text_size,
                top: top_indent,                
                left: left_indent,
                right: 0
            });
            
            var account_view = Titanium.UI.createView({            	
                height: text_size,
                width: 'auto',
                layout: 'horizontal',
                top: 0,                
                left: 0,
                zIndex: 50
            });         
            
            var account_header_text = 'Account';
            var account_header_indent = 3;
            if (account == null)
            {
            	account_header_text = 'No Account Assigned';
            	account_header_indent = 0;
            }
            else
            {
            	var account_lbl = Titanium.UI.createLabel({
	                text: account,                
	                top: label_bottom_shift,
	                left: 0,
	                width: 'auto',                
	                height: text_size,
	                color:text_color,
	                font:{fontSize:text_size, fontWeight:'normal'}             
	            });
	            account_view.add(account_lbl);
            }
            var accountheader_lbl = Titanium.UI.createLabel({
                text: account_header_text,
                top: 0,
                left: account_header_indent,
                width: 'auto',
                height: label_size,
                color:label_color,
				font:{fontSize:label_size, fontWeight:'normal'}
            });
            account_view.add(accountheader_lbl);
            account_row.add(account_view);
            
            var status_view = Titanium.UI.createView({            	
                height: text_size,
                width: 55,
                top: 0,                
                right: 0,
                zIndex: 100,
                backgroundColor: 'white'
            });
            
            var status_lbl = Titanium.UI.createLabel({
                text: status,                
                top: 0,
                right: 0,
                width: 'auto',                
                height: text_size,
                color:'#3f6c19',
                font:{fontSize:text_size, fontWeight:'normal'}
            });      
            status_view.add(status_lbl);
            account_row.add(status_view);
            
            post_view.add(account_row);
            // End of Account + Level row
            
            // tech + priority row
            var tech_row = Titanium.UI.createView({            	
                height: text_size,
                top: top_indent,                
                left: left_indent,
                right: 0
            });
            
            var tech_view = Titanium.UI.createView({            	
                height: text_size,
                width: 'auto',
                layout: 'horizontal',
                top: 0,                
                left: 0,
                zIndex: 50
            });            
            
            var techheader_lbl = Titanium.UI.createLabel({
                text: 'Tech',
                top: label_bottom_shift,
                left: 3,
                width: 'auto',
                height: label_size,
                color:label_color,
				font:{fontSize:label_size, fontWeight:'normal' }
            });
           
            var tech_lbl = Titanium.UI.createLabel({
                text: tech,                
                top: 0,
                left: 0,
                width: 'auto',                
                height: text_size,
                color:text_color,
                font:{fontSize:text_size, fontWeight:'normal' }
            });
            tech_view.add(tech_lbl);
            tech_view.add(techheader_lbl);
            tech_row.add(tech_view);
            
            var level_view = Titanium.UI.createView({            	
                height: text_size,
                width: 55,
                top: 0,                
                right: 0,
                zIndex: 100,
                backgroundColor: 'white'
            });
                        
            var level_lbl = Titanium.UI.createLabel({
                text: level,                
                top: 0,
                right: 0,
                width: 'auto',                
                height: text_size,
                color:text_color,
                font:{fontSize:text_size, fontWeight:'normal'} 
            });
            
            var levelheader_lbl = Titanium.UI.createLabel({
                text: 'Level',
                top: label_bottom_shift,
                right: 10,
                width: 'auto',                
                height: label_size,
                color:label_color,
                font:{fontSize:label_size, fontWeight:'normal'}
            });         
            level_view.add(level_lbl);
            level_view.add(levelheader_lbl);
            tech_row.add(level_view);
            
            post_view.add(tech_row);
            // End of tech + priority row
            
            // class row
            var class_row = Titanium.UI.createView({            	
                height: text_size,
                top: top_indent,                
                left: left_indent,
                right: 0
            });
            
            var class_view = Titanium.UI.createView({            	
                height: text_size,
                width: 'auto',
                layout: 'horizontal',
                top: 0,                
                left: 0,
                zIndex: 50
            });            
            
            var classheader_lbl = Titanium.UI.createLabel({
                text: 'Class',
                top: 0,
                left: 3,
                width: 'auto',
                height: label_size,
                color:label_color,
				font:{fontSize:label_size, fontWeight:'normal'}
            });
           
            var class_lbl = Titanium.UI.createLabel({
                text: tclass,                
                top: label_bottom_shift,
                left: 0,
                width: 'auto',                
                height: text_size,
                color:text_color,
                font:{fontSize:text_size, fontWeight:'normal'}             
            });
            class_view.add(class_lbl);
            class_view.add(classheader_lbl);
            class_row.add(class_view);
            
            
            var priority_view = Titanium.UI.createView({            	
                height: text_size,
                width: 55,
                top: 0,                
                right: 0,
                zIndex: 100,
                backgroundColor: 'white'
            });
                        
            var priority_lbl = Titanium.UI.createLabel({
                text: priority,                
                top: 0,
                right: 0,
                width: 'auto',                
                height: text_size,
                color:text_color,
                font:{fontSize:text_size, fontWeight:'normal'} 
            });
            
            var priorityheader_lbl = Titanium.UI.createLabel({
                text: 'Priority',
                top: label_bottom_shift,
                right: 10,
                width: 'auto',                
                height: label_size,
                color:label_color,
                font:{fontSize:label_size, fontWeight:'normal'}            
            });
            
            priority_view.add(priority_lbl);
            priority_view.add(priorityheader_lbl);
            class_row.add(priority_view);
            post_view.add(class_row);
            // End of class row
            
            var imvAttach = Titanium.UI.createImageView({
				image: '../images/paperclip.png',
				width:16,
				height:16,
				top:60,
				left:8
			});
			
			row.add(post_view);
			row.add(imvAttach);
            row.className = "itemTicket";
			row.tid = tickets[i].key;
			tickets_id[i] = tickets[i].key;
			row.number = number;
            rowData[i] = row;
        }
     return rowData;
}

function createHTMLTicketView()
{
	return '<html><body><table cellpadding=4 cellspacing=0><tbody><tr><td style="background-color:#aaaaaa;text-align:right;font-size:10pt;color:White;border-bottom:solid 1px #555555">Ticket #</td><td style="border-bottom:solid 1px #555555;text-align:left"><b><a href="http://login.bigwebapps.com/?TicketId=4410191&amp;login=yuriy.mykytyuk@micajah.com&amp;DeptId=7&amp;DeptName=bigWebApps+Support" target="_blank">11620</a> </b></td></tr><tr><td style="background-color:#aaaaaa;text-align:right;font-size:10pt;color:White;border-bottom:solid 1px #555555">Subject</td><td style="border-bottom:solid 1px #555555;text-align:left">Mobile UI Adjustmetns </td></tr><tr><td style="background-color:#aaaaaa;text-align:right;font-size:10pt;color:White;border-bottom:solid 1px #555555">Department</td><td style="border-bottom:solid 1px #555555;text-align:left">bigWebApps Support </td></tr><tr><td style="background-color:#aaaaaa;text-align:right;font-size:10pt;color:White;border-bottom:solid 1px #555555">Account/Location</td><td style="border-bottom:solid 1px #555555;text-align:left">bigWebApps Support (Internal) / Atlanta </td></tr><tr><td style="background-color:#aaaaaa;text-align:right;font-size:10pt;color:White;border-bottom:solid 1px #555555">Technician</td><td style="border-bottom:solid 1px #555555;text-align:left">Yuriy Mykytyuk </td></tr><tr><td style="background-color:#aaaaaa;text-align:right;font-size:10pt;color:White;border-bottom:solid 1px #555555">User</td><td style="border-bottom:solid 1px #555555;text-align:left">Jon Vickers<br><a href="mailto:jon.vickers@micajah.com">jon.vickers@micajah.com</a></td></tr><tr><td style="background-color:#aaaaaa;text-align:right;font-size:10pt;color:White;border-bottom:solid 1px #555555">Level</td><td style="border-bottom:solid 1px #555555;text-align:left">3 - Active Plate </td></tr><tr><td style="background-color:#aaaaaa;text-align:right;font-size:10pt;color:White;border-bottom:solid 1px #555555">Priority</td><td style="border-bottom:solid 1px #555555;text-align:left">4 - Upgrade/New Feature </td></tr><tr><td style="background-color:#aaaaaa;text-align:right;font-size:10pt;color:White;border-bottom:solid 1px #555555">Expect Response By</td><td style="border-bottom:solid 1px #555555;text-align:left">5/5/2011 17:34 </td></tr><tr><td style="background-color:#aaaaaa;text-align:right;font-size:10pt;color:White;border-bottom:solid 1px #555555">Class</td><td style="border-bottom:solid 1px #555555;text-align:left">HelpDesk </td></tr><tr><td style="background-color:#aaaaaa;text-align:right;font-size:10pt;color:White;border-bottom:solid 1px #555555">Project</td><td style="border-bottom:solid 1px #555555;text-align:left">HelpDesk </td></tr><tr><td style="background-color:#aaaaaa;text-align:right;font-size:10pt;color:White;border-bottom:solid 1px #555555">Logged Time</td><td style="border-bottom:solid 1px #555555;text-align:left">0 hours </td></tr><tr><td style="background-color:#aaaaaa;text-align:right;font-size:10pt;color:White;border-bottom:solid 1px #555555">Remaining Time</td><td style="border-bottom:solid 1px #555555;text-align:left">0 hours </td></tr><tr><td style="background-color:#aaaaaa;text-align:right;font-size:10pt;color:White;border-bottom:solid 1px #555555">Total Time</td><td style="border-bottom:solid 1px #555555;text-align:left">No budget </td></tr></tbody></table>' +
	  	   '<br><table border=0 cellpadding=3 cellspacing=0><tbody><tr bgcolor="#3d3d8d"><td colspan=2 align=center><font color="#ffffff" size=2><b>Initial Post</b></font></td></tr><tr bgcolor="#cccccc"><td>Vickers, Jon</td><td align=right>5/5/2011 15:34</td></tr><tr><td colspan=2>https://bigwebapps.basecamphq.com/projects /6951513/posts/45369530/comments<br><br>Hey Yuriy, here is official ticket to make worklist UI adjustments.  Pat and I are giving conflicting opinions.  Take these suggestions and do what you think is best solution.<br><br>We can refine the UI additional later as one main project to clean all screens once we get the data working properly.<br><br>Following files were  uploaded: Ticket list style adjust.png, Ticket list style adjust2.png.</td></tr></tbody></table></html></body>';
}
function createTicketView(ticket)
{
    var number = ticket.ticket;
    var subject = ticket.subject;
    var user = ticket.user_name;
    var tech = ticket.tech_name;
    var account = ticket.account_name;
    var tclass = ticket.class_name;
    var priority = ticket.priority_level;
    var project = ticket.project;
    var status = ticket.status_name;
    var level = ticket.ticket_level;
    var ticket_time = ticket.created_time_str;
    
    var data = [];
    
	// subject
    var rowSubject = Ti.UI.createTableViewRow({
		title:subject	
		//header:'Subject'	
	});
	data[0] = rowSubject;	

	// User row
	var rowUser = Ti.UI.createTableViewRow({
		title:user		
		//header:'User'	
	});
	data[1] = rowUser;
	
	// Tech row
	var rowTech = Ti.UI.createTableViewRow({
		title:tech	
	});
	data[2] = rowTech;
	
	// Account row
	var rowAccount = Ti.UI.createTableViewRow({
		title:account,
		header:'Account'	
	});
	data[3] = rowAccount;
	
	// Class row
	var rowClass = Ti.UI.createTableViewRow({
		title:tclass,
		header:'Class'	
	});
	data[4] = rowClass;
	
	// Status row
	var rowStatus = Ti.UI.createTableViewRow({
		title:status,
		header:'Status'	
	});
	data[5] = rowStatus;
	
	// Priority row
	var rowPriority = Ti.UI.createTableViewRow({
		title:priority,
		header:'Priority'	
	});
	data[6] = rowPriority;
	
	// Project row
	var rowProject = Ti.UI.createTableViewRow({
		title:project,
		header:'Project'	
	});
	data[7] = rowProject;
	
	// Level row
	var rowLevel = Ti.UI.createTableViewRow({
		title:level,
		header:'Level'	
	});
	data[8] = rowLevel;
	
	return data;
}

