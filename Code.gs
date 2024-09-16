// Code.gs

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

function uploadFile(base64Data, fileName, mimeType, username) {
  try {
    var folderId = 'YOUR_FOLDER_ID'; // Replace with your folder ID
    var folder = DriveApp.getFolderById(folderId);

    // Decode the base64 data
    var blob = Utilities.newBlob(Utilities.base64Decode(base64Data), mimeType, fileName);
    var file = folder.createFile(blob);

    // Get the file URL
    var fileUrl = file.getUrl();

    // Log the file and user information to the Google Sheets
    logUploadInfo(username, file.getName(), fileUrl);

    return fileUrl;
  } catch (e) {
    return 'Error: ' + e.message;
  }
}

function logUploadInfo(username, fileName, fileUrl) {
  try {
    var sheetId = 'YOUR_SPREADSHEET_ID'; // Replace with your Google Sheets ID
    var sheet = SpreadsheetApp.openById(sheetId).getActiveSheet();
    sheet.appendRow([new Date(), username, fileName, fileUrl]);
  } catch (e) {
    Logger.log('Error logging upload info: ' + e.message);
  }
}