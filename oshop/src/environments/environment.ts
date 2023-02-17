// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const environment = {
  production: true,
  firebase: {
    projectId: 'organic-shop-fa7b2',
    appId: '1:423158115311:web:b065f5b61edb14fc0ba41a',
    databaseURL: 'https://organic-shop-fa7b2-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'organic-shop-fa7b2.appspot.com',
    apiKey: 'AIzaSyB7EKtWeaTe1ynkhOJqTmyA2WdCWIsQyC8',
    authDomain: 'organic-shop-fa7b2.firebaseapp.com',
    messagingSenderId: '423158115311',
    measurementId: 'G-RMZ92996TR',
  }
};


