# Preact Web Extension Boilerplate

A very simple web extension boilerplate inspired by [vitesse-webext project](https://github.com/antfu/vitesse-webext) but with a [Preact](https://github.com/preactjs/preact) flavor, suited for my basic needs.

It has only **5,46kb** compressed and it's also powered by [Vite](https://vitejs.dev/). At the moment doesn't have any CSS pre configuration, neither typescript support.

## To use it

Clone this repo to your local machine and install the dependencies:

```sh
git clone git@github.com:yaiks/preact-webext.git my-project
cd my-project
npm i
```

As this is an web extension, we need to generate an output folder to unload it on the browser:

```sh
npm run dev
```

This command above will generate a `extension` folder and you can unpack it on `chrome://extensions`. Voilá, now you have a dev environment setup for creating browser extensions with Preact. We are using Vite to build the project in `--watch` mode, so a full rebuild will trigger once you update any code in the `src` folder, but it shouldn't affect your dev experience since Vite is very fast.

## Contribute

PRs and issues are more than welcome. If you want to build lightweight yet powerful web extensions feel free to contribute in any way.