function getData(sheetName) {
  const sheet = SpreadsheetApp.getActiveSheet(); // アクティブシートの指定
  const lastRow = sheet.getLastRow(); // 最終行
  const lastColumn = sheet.getLastColumn(); // 最終列
  
  const Array = sheet.getRange(2,1,lastRow-1,lastColumn).getValues(); //2行目以降のセルの取得

// オブジェクトに値を入れていく
  return Array.map(function(row) {
    let object = {};
    object.type = "Feature"

    // プロパティの値を入れる
    object.properties = {};
    object.properties.name = row[0];
    object.properties.place = row[1];
    object.properties.address = row[2];
    object.properties.tel = row[3];
    object.properties.number = row[6];
    object.properties.max = row[7];
    object.properties.rate = row[8];

    // ポイント（点データ）の指定
    object.geometry = {};
    object.geometry.type = "Point";

    // 位置情報を代入する
    object.geometry.coordinates = [];
    object.geometry.coordinates.push(row[5],row[4]);

    return object;
  });

}

// 呼び出し関数
function doGet() {
  const data = getData("sheet1"); // sheet1の指定

  const geojson = {};
  geojson.type = "FeatureCollection";
  geojson.features = data;

  // geojsonファイルを返す
  return ContentService
  .createTextOutput(JSON.stringify(geojson, null, 2))
  .setMimeType(ContentService.MimeType.JSON);

}