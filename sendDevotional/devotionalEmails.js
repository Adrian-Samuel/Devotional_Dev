function sendDevotional() {
  
    const sheet_url = PropertiesService.getScriptProperties().getProperty("sheet_url")
    const api_url =  PropertiesService.getScriptProperties().getProperty("api_url")
    
    const gmailSheet = SpreadsheetApp.openByUrl(sheet_url)
    
    const [headers, ...responses] = gmailSheet.getDataRange().getValues()
  
    const emailList = responses.map(record => record[1])
   
    const bibleResponse = UrlFetchApp.fetch(api_url);
    
    const jsonResponse = JSON.parse(bibleResponse.getContentText());
    
    const {text, reference, version} = jsonResponse.verse.details
    
    const emailContent = `
      <!DOCTYPE html>
      <html>
      <body>
      <h1> Devotional for the Day </h1>
      <p> ${text} - ${reference} (${version}) </p>
    
    </body>
    
    </html>
    `
    
    
    GmailApp.sendEmail(emailList.join(','), 'Devotional Email', '', {
      htmlBody: emailContent
  });
  
  }
  