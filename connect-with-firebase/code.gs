/**
   * A1. Find Direbase Database Secrets
   * A2. Project Overview > then click gear icon > Project Settings
   * A3. Service Accounts tab > Database secrets 
   * 
   * B1. Create Private Key
   * B2. Project Overview > then click gear icon > Project Settings
   * B3. Service Accounts tab > Firebase Admin SDK >  Generate new private key 
   * 
   * C. Now you need to add another library. Click on the + next to Libraries and paste the following ID:
   *    0Auth2 ID = "1B7FSrk5Zi6L1rSxxTDgDEUsPzlukDsi4KGuTMorsTQHhGBzBkMun4iDF"
   *   
   *   https://ai2.metricrat.co.uk/guides/use-firebase-with-google-apps-script
   *   https://sites.google.com/site/scriptsexamples/new-connectors-to-google-services/firebase/reference?authuser=0
   * }}
*/



const firebaseUrl = "https://{{myapp}}-default-rtdb.firebaseio.com/"

let service, token, baseToken;

function init(){
  service = getFirebaseService();
  token = service.getAccessToken();
  baseToken = FirebaseApp.getDatabaseByUrl(firebaseUrl,token);
}

function demo(){
  init();
  if (service.hasAccess()) {
    if ("allRecords") {
      var records = JSON.stringify(baseToken.getData());
      Logger.log(records);
    }
    // if (e.parameter.func == "readRecord") {
    //   var record = JSON.stringify(baseToken.getData(e.parameter.pb + "/" + e.parameter.key));
    //   return ContentService.createTextOutput(record);
    // }
  }  
}




function getData(){
  init();
  if (service.hasAccess()) {
    // get data by single path - getData(path, optQueryParameters)
    const path1 = "demo/data"
    const demo_data  = baseToken.getData(path1)

    // get data by multipale path
    const path2 = "demo/links"
    const path3 = "demo/type"
    const demo_all_data = baseToken.getAllData([path1, path2, path3])

    // get data by multipale path
    const fb_db = baseToken.getData()

    Logger.log(fb_db);
  }
}

function setData(){
  init();
  if (service.hasAccess()) {
    // set data by path - setData(path, data, optQueryParameters)
    // if key or node not present create path/nodes and push data
    // if key or node present then replace the parent node data with new data
    const path1 = "demo/ndata"
    const data1 = {
      "fname" : "Ravi",
      "lname" : "Agarwal",
      "id" : 147
    }
    const set_data  = baseToken.setData(path1, data1)

    Logger.log(set_data);
  }
}


function updateData(){
  init();
  if (service.hasAccess()) {
    // set data by path - updateData(path, data, optQueryParameters)
    // if key or node not present create path/nodes and push data
    // if key or node present then update the parent node data with new data
    // modifying existing data and add new data,If some keys are not updated they will remain as before
    const path1 = "demo/udata"
    const data1 = {
      "lname" : "Gupta",
      "mob" : 9999988888
    }
    const update_data  = baseToken.updateData(path1, data1)

    Logger.log(update_data);
  }
}

function deleteData(){
  init();
  if (service.hasAccess()) {
    // set data by path - removeData(path, optQueryParameters)
    const path1 = "demo/type"  
    const del_data  = baseToken.removeData(path1)

    Logger.log(del_data);
  }
}







// function createFirebaseAuthToken() {

  //   var baseUrl = "https://samplechat.firebaseio-demo.com/";
  //   var secret = "7iAYf--Random--BCrtfsE7tT";
  //   var serviceAccountEmail = "firebase-adminsdk-kuu0n@{{myapp}}.iam.gserviceaccount.com";
    
    // var privateKey = "-----BEGIN PRIVATE KEY-----\nmiiSOMETHINGveryLONGtext0zr\n-----END PRIVATE KEY-----\n";

    
  //   var database = FirebaseApp.getDatabaseByUrl(baseUrl, secret);


  //   var token = database.createAuthToken(
  //         Session.getEffectiveUser().getEmail(),
  //         null,
  //         serviceAccountEmail,
  //         privateKey)

  //   Logger.log(token);

// }



const SECRET_KEY = '7iAYf--Random--BCrtfsE7tT';
const CLIENT_EMAIL = "firebase-adminsdk-kuu0n@{{myapp}}.iam.gserviceaccount.com";

const PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nmiiSOMETHINGveryLONGtext0zr\n-----END PRIVATE KEY-----\n";



function getFirebaseService() {
  return OAuth2.createService('Firebase')
  // Set the endpoint URL.
    .setTokenUrl('https://accounts.google.com/o/oauth2/token')
  // Set the private key and issuer.
    .setPrivateKey(PRIVATE_KEY)
    .setIssuer(CLIENT_EMAIL)
  // Set the property store where authorized tokens should be persisted.
    .setPropertyStore(PropertiesService.getScriptProperties())
  // Set the scopes.
    .setScope('https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/firebase.database');
}


function reset() {
  var service = getFirebaseService();
  service.reset();
}


