# web-manager

A program used to check domain validity, domain status, DNS information, and IP. It verifies the operation of the server that handles the domain and sends notifications when something happens with the domain or server.

# Dependencies

```bash
https://www.whoisxmlapi.com 
```

Go to https://www.whoisxmlapi.com and click on the "Sign Up" button.
Fill in the registration form with your details and submit it.
Navigate to the "Settings" tab and copy "API key".
Remember that the first 500 queries are free, and after that, you will need to pay according to the pricing plan. You can find the current pricing plan on their website at https://whois.whoisxmlapi.com/pricing.

# Environment

Create a .env file in the root folder and add the entry to it.

```bash
PUBLIC_WHOISAPI="API-KEY" 
```

## Developing

```bash
https://github.com/MichalMaciak/web-manager.git

npm install 

npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

