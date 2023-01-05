# Using Dotenv Vault with Edgio and Nuxt.js

Learn how to make Edgio, Nuxt.js, and Dotenv Vault work together in a simple web app. This tutorial assumes you are already familiar with .env files and know [how to sync them](https://www.dotenv.org/docs/tutorials/sync).

## Initialize a Nuxt(2) App

```bash
npx create-nuxt-app edgio-dotenv-vault-nuxt-example
```

## Install Edgio CLI

```bash
npm i -g @edgio/cli
```

## Integrate Edgio with Nuxt(2)

```bash
edgio init
```

## Install dotenv-vault

```bash
# Install as dep and not devDep
npm install dotenv-vault
```

## Update nuxt.config.js to use dotenv-vault

```js filename='nuxt.config.js'
require("dotenv-vault-core").config()

export default {
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [["@edgio/nuxt/module", { edgioSourceMaps: true }]],
}
```

## Update edgio.config.js to include .env.vault

```js
"use strict"

module.exports = {
  connector: "@edgio/nuxt",

  // Set to true to include all packages listed in the dependencies property of package.json when deploying to Edgio.
  includeNodeModules: true,

  // Allows you to include additional resources in the bundle that is deployed to Edgio’s serverless JS workers.
  // Keys are globs, value can be a boolean or string. This is typically used to ensure that resources
  // that need to be dynamically required at runtime such as build manifests for server-side rendering
  // or other config files are present in the cloud.
  includeFiles: {
    ".env.vault": true,
  },
  
}
```

## Run dotenv-vault new

Open terminal, enter your project’s root directory (where you keep your .env file), and run dotenv-vault new.

```bash
npx dotenv-vault new
```

Note: **Picked verbatim from [dotenv.org](https://www.dotenv.org/docs/tutorials/sync#:~:text=Let%E2%80%99s%20get%20started.-,Run%20dotenv%2Dvault%20new,-Open%20terminal%2C%20enter)**

## Run dotenv-vault login

Next, authenticate your machine by running dotenv-vault login.

```bash
npx dotenv-vault login
```

Note: **Picked verbatim from [dotenv.org](https://www.dotenv.org/docs/tutorials/sync#:~:text=Run%20dotenv%2Dvault%20login)**

## Push your .env to the dotenv account

Return one last time to terminal and run dotenv-vault push.

This will securely push your .env file to dotenv-vault. Each time you change your .env file, run dotenv-vault push.

```bash
npx dotenv-vault push
```

Congratulations 🎉, you just pushed (and secured) your first .env file in dotenv-vault.

Note: **Picked verbatim from [dotenv.org](https://www.dotenv.org/docs/tutorials/sync#:~:text=12%20package.json-,Run%20dotenv%2Dvault%20push,-Return%20one%20last)**

## Build the vault before running dev, build and production mode

Make sure you are logged in and in sync with your Vault first then run npx dotenv-vault build from CLI in your project root.

This will build an encrypted .env.vault file that serves as a unique identifier for your project in Dotenv.

Inside it you will find the public keys for every environment you have setup and must be committed to source.

```bash
npx dotenv-vault build
```

Note: **Picked verbatim from [dotenv.org](https://www.dotenv.org/docs/integrations/vercel/nuxtjs#:~:text=Example.-,Build%20the%20Vault,-Make%20sure%20you)**

## Fetch the dotenv-vault keys

With the Vault successfully built, you now can fetch the .env.vault decryption keys for each environment in the Vault project.

Running npx dotenv-vault keys production, for example, will return the production key and so will development and ci respectively.

```bash
npx dotenv-vault keys production
remote:   Listing .env.vault decryption keys... done

dotenv://:key_1234@dotenv.org/vault/.env.vault?environment=production
```

Note: **Picked verbatim from [dotenv.org](https://www.dotenv.org/docs/integrations/vercel/nuxtjs#:~:text=dotenv%2Dvault%20build-,Fetch%20the%20keys,-With%20the%20Vault)**

## Okay, what just happened?

So now realize that you've created three files:
- .env: The file containing all your secret variables that you pushed to dotenv-vault via npx dotenv-vault push. This file is **not** to be pushed in git commit(s).

- .env.me: That contains the key that uniquely identifies the user of the dotenv-vault project. This file is **not** to be pushed in git commit(s).

- .env.vault: The file that contains the hashes to dotenv-vault's four mode: development, ci, staging and production.  This file is **to be pushed** in git commit(s).

- You probably still haven't realized that dotenv-vault has stages of secrets. For example, look at the gray button on the top right corner in the screenshot below that says 'development'.
 
![dotenv-vault example repo](https://a.storyblok.com/f/117912/2200x628/3880d64ef2/dotenv-vault.png)

To get keys for the **development** environment, one needs to run:

```bash
npx dotenv-vault keys development
remote:   Listing .env.vault decryption keys... done

dotenv://:key_1234@dotenv.org/vault/.env.vault?environment=development
```


## Requirements to run dotenv-vault

What you get above is what we'll be referred to as **DOTENV_KEY** in the guide. To ensure dotenv-vault properly, in any mode, you'd require the **DOTENV_KEY** environment variable set, and the **.env.vault** file present in the root directory.


## Using dotenv-vault during edgio dev (Edgio's dev mode)

### Using .env at the root directory

Create a .env in your system which contains the following:

```env
# .env

DOTENV_KEY=dotenv://:key_XXXX@dotenv.org/vault/.env.vault?environment=development
```

and then run the edgio's dev mode via:

```bash
edgio dev
```

### Setting the variable with the CLI command

```bash
DOTENV_KEY=dotenv://:key_XXXX@dotenv.org/vault/.env.vault?environment=development edgio dev
```

## Using dotenv-vault during edgio build (Edgio's build mode)

### Using .env at the root directory

Create a .env in your system which contains the following:

```env
# .env

DOTENV_KEY=dotenv://:key_XXXX@dotenv.org/vault/.env.vault?environment=development
```

and then run the edgio's build mode via:

```bash
edgio build
```

### Setting the variable with the CLI command

```bash
DOTENV_KEY=dotenv://:key_XXXX@dotenv.org/vault/.env.vault?environment=development edgio build
```

## Deploy To Edgio

- To use dotenv-vault while deploying to Edgio, if you need the variables during the build time, deploy with:

```bash
DOTENV_KEY=dotenv://:key_XXXX@dotenv.org/vault/.env.vault?environment=development edgio deploy
```

else just deploy with:

```bash
edgio deploy
```

## Using dotenv-vault during runtime (server-side)

To use the dotenv-vault during the **runtime** with Edgio, add an environment variable by following the guide [here](https://docs.edg.io/guides/basics/environments#creating-and-editing-environment-variables) named **DOTENV_KEY**.

![Example DOTENV_KEY added to Edgio's environment](https://a.storyblok.com/f/117912/3024x1724/f9bca82f4c/loggedinss.png)

## References

- [https://www.dotenv.org/docs/integrations/vercel/nuxtjs](https://www.dotenv.org/docs/integrations/vercel/nuxtjs)
- [https://www.dotenv.org/docs/tutorials/sync](https://www.dotenv.org/docs/tutorials/sync)
