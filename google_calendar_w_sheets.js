//Matt Davis
//3/5/2015
//UW-Platteville

//The Description of the event must either have the words "Work", "Meeting", or Neither. (Searching of calendar events relies on description, not title)
//Global Vars to change
//This needs to be changed to sheet by name
var sheet = SpreadsheetApp.getActiveSheet();

//Area that needs to be wiped. So, the in / out status, and the "Note"
var cleanArea = 'B25:C25'; //(b25 is "IN" and C25 is "Note"

//Position of the person who needs to be updated
var IN = 'B25';            //(b25 is when you'll arrive)
var NOTE = 'C25';          //(c25 is a note)
var mycal = "********@group.calendar.google.com"; //this is found by going to calendar > Arrow down > calendar settings > Calendar Address:

//Main / Only function that does all the magic
function export_gcal_to_gsheet(){
  
var cal = CalendarApp.getCalendarById(mycal);
  
//Clean sheet 
sheet.getRange(cleanArea).clearContent();

var now = new Date();
var almostNow = new Date(now.getTime() + 2 * 1000);
    
var events = cal.getEvents(now, almostNow);
  Logger.log(events.length);
  
// Loop through all calendar events found
for (var i=0;i<=events.length;i++) {
  if (events.length > 0)
  {
    
    var checklength = cal.getEvents(now, almostNow, {search: 'Work'});
    if(checklength.length > 0)
    {
      checklength = cal.getEvents(now, almostNow, {search: 'meeting'});
      if(checklength.length > 0)
      {
        var range = sheet.getRange(IN).setValue('meeting');
        range = sheet.getRange(NOTE);
        range.setValue('From now until ' + events[i].getEndTime());
        i = events.length + 1;
      }
      else
      {
        var range = sheet.getRange(IN).setValue('X');
        sheet.getRange(NOTE).setValue(events[i].getEndTime() + " is when i'm done.");
        i = events.length + 1;
      }
    }
    else
      checklength = cal.getEvents(now, almostNow, {search: 'meeting'});
      if(checklength.length > 0)
         {
            var range = sheet.getRange(IN).setValue('meeting');
            range = sheet.getRange(NOTE);
           //Parse below (endTime) as an int and reduce it to just a <99:99> AM / PM time.
            range.setValue('From now until ' + events[i].getEndTime());
            i = events.length + 1;
         }
  }
  else
  {
    var range = sheet.getRange(IN).clearContent();  //This is "out" under the "IN" column 
  }
 }
}