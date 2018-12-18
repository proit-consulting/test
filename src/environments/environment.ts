// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase:{
     apiKey: "AIzaSyBVspOFz8NRLDw1qKQY5VYCKNFzk0_sR2Y",
    authDomain: "gesteventos-f5789.firebaseapp.com",
    databaseURL: "https://gesteventos-f5789.firebaseio.com",
    projectId: "gesteventos-f5789",
    storageBucket: "gesteventos-f5789.appspot.com",
    messagingSenderId: "206177627562"
  },
  google_analytics_code: 'UA-125317212-1',
  //apiKey:'AIzaSyAGWDWRkhWtmeAlOJ6dR0znWcQjU3-kUu0'
  apiKey:'AIzaSyBVspOFz8NRLDw1qKQY5VYCKNFzk0_sR2Y',
  gdaxURL: 'wss://ws-feed.gdax.com'
};
