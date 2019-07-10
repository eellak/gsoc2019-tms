// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: "http://localhost:3000",
  config: {
    
    // the auth0 client ID to be used - see https://auth0.com/docs/api-auth/tutorials/client-credentials
    clientId: 'ISe3r0XrgUoKgchkvExvSPlqGecxhN67',

    // the auth0 domain to login - see https://auth0.com/docs/api-auth/tutorials/client-credentials
    domain: 'dev-i5mfll-2.auth0.com',
    audience: 'https://dev-i5mfll-2.auth0.com/api/v2/',
    logoutRedirectUri: 'http://localhost:4200/sso_logout',

    hooks: {
      // before the redirect to the redirectUri happens (with fallback to logoutRedirectUri and then to window.location.href)
      // if the user information is stored in a backend store, it's best to clean that before the redirect happens
      logout(redirectUri) {
       // localStorage.removeItem('currentUser');

        // implement what should happen at logout
        // a typical use case is to remove the auth token from your storage (memory, cookie, local store), or perform other cleanup tasks
      },
      // the profile was retrieved, this is an option to store the profile, or update the user interface
      profileRefreshed(profile) {
        // once the profile is refreshed, which includes the auth0 sub and other meta data
        // a typical use case is to show the username on screen
        // or use getProfile()
        
      },
      // the auth token was retrieved, this is an option to store the token for later use
      tokenRefreshed() {

        // once a new token was retrieved from auth0, this happens right before expiry.  When using getIdToken(), it may be an unnecessary hook.
      },
      // called before logout or when there's a problem with the current user, for example an invalid token
      // this gives implementors the option to remove the current user's details from the store if saved
      removeLogin() {
        // typical use case it to provide the same method as for logout
      },
      // allows to override log messages; defaults to log to the console
      log(messageObject) {
        // some debug message objects from the library; can be overridden to not log to the console
      }
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
