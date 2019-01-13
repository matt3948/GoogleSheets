function ack(m, n) {
  
   var ss = SpreadsheetApp.getActive();
   var sheet = ss.getSheetByName("Sheet1");  
   var updateValue = sheet.getRange("A5");
   var mValue = sheet.getRange("A8");
   var nValue = sheet.getRange("B8")
   
   var ans;
   if (m == 0)
   {
     nValue.setValue(n);
     mValue.setValue(m);
     ans = n+1;
     updateValue.setValue(ans);
   }
   else if (n == 0)
   {
     nValue.setValue(n);
     mValue.setValue(m);      
     ans = ack(m-1,1);
     updateValue.setValue(ans);
   }
   else 
   {
     nValue.setValue(n);
     mValue.setValue(m);      
     ans = ack(m-1, ack(m,n-1));
     updateValue.setValue(ans);
   }
  
   return (ans);
}