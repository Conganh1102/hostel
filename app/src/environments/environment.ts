// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  domain: 'http://localhost:3000/',
  agmApiKey: 'AIzaSyBIOJzNMhrwsDp26nrtYfVO9gw40VsMaRI',
  avatarUrl: 'http://localhost:3000/api/images/u/avatar/',
  commonImageUrl: 'http://localhost:3000/api/images/commons/',
  roomImageUrl: 'http://localhost:3000/api/images/room/'
};
