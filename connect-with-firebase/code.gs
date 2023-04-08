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


