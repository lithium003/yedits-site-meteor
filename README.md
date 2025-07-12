# Yedits Site (Meteor Rewrite)


### Setup:
```
meteor npm install
```
Obtain a Google Firebase Admin SDK key from the Google Firestore NoSQL database.
Create new file called `settings.json` and copy paste the below into it,
filling out the three relevant strings from your Firestore .json key.
```
{
  "private": {
    "firebase": {
      "projectId": "",
      "privateKey": "",
      "clientEmail": "",
    }
  }
}
```

## Start
```
meteor npm run start
```

## Lint

```
meteor npm run lint
```

```
meteor npm run lint:fix
```
## Tests

```
meteor npm run test
```
## Directory Structure
```
client/                 [Client-side Code]
imports/
├── api/                  [Backend] 
│   ├── collections/        // MongoDB collections
│   ├── methods/            // Meteor methods (client calls)
│   ├── publications/       // Publications for client subscribe
│   ├── schemas/            // Schemas for validation
│   ├── Methods.js          // Consolidates methods imports
│   ├── Publications.js     // Consolidates publications imports
│   └── Schemas.js          // Consolidates to Schemas array reuse
├── contexts/             [Custom React contexts]
├── hooks/                [Custom React hooks] 
├── routes/               [Route definitions] mirrors JSX from ui/
│   ├── components/
│   ├── layouts/
│   └── pages/
│   └── App.jsx             // Top Level Route /
├── ui/                   [Frontend]
│   ├── components/         // Reusable JSX components
│   ├── layouts/            // Reusable JSX layouts
│   ├── pages/              // JSX pages
│   └── App.jsx             // Root JSX container
├── utils/                // Utility helper functions          
└── Router.js             // Router loaded on client & server (SSR)
private/                <Server Assets>
public/                 <Client Assets, Music>
server/                 [Server-side Code]
tests/
└── main.js               // Consolidates Tests
```
