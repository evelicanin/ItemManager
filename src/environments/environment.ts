// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase:{
    apiKey: "AIzaSyDom5o_B6q-XBGyqtuJSrY5Hd_zWSM0cGg",
    authDomain: "itemmanager-b618b.firebaseapp.com",
    databaseURL: "https://itemmanager-b618b.firebaseio.com",
    projectId: "itemmanager-b618b",
    storageBucket: "itemmanager-b618b.appspot.com",
    messagingSenderId: "71887544144"
  }
};
