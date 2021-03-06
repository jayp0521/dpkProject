// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
        production: false,
        firebaseConfig: {
            apiKey: 'AIzaSyDhNReeYGkJ47oS3ExPpBr6dkD06t-0B84',
            authDomain: 'dpkproject-d75d2.firebaseapp.com',
            databaseURL: 'https://dpkproject-d75d2.firebaseio.com',
            projectId: 'dpkproject-d75d2',
            storageBucket: 'dpkproject-d75d2.appspot.com',
            messagingSenderId: '1079450967840',
            appId: '1:1079450967840:web:8dc97db687e753fad00145',
            measurementId: 'G-TDV6VZZ3QW'
        },
        driveConfig: {
            clientId: '1079450967840-0q959otq42n6potofgto8gaf8kdlje9e.apps.googleusercontent.com',
            discoveryDocs: [ 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest' ],
            scope: 'https://www.googleapis.com/auth/drive.file',
        },
        url: 'http://localhost:4200/'
    }
;

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
