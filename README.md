# Sample Meteor App

## Setup
```
meteor npm run setup
```
```
meteor npm run start
```
### Manual Setup:
```
meteor npm install
```
Create new file called `settings.json` and copy paste the below code into it.
```
{
  "public": {
    "publicKeyName1": "publicKey1"
  },
  "private": {
    "privateKeyName1": "privateKey1",
  },
  "privateKeyName2": "privateKey2"
}
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
public/                 <Client Assets>
server/                 [Server-side Code]
tests/
└── main.js               // Consolidates Tests
```