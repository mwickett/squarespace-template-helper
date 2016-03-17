Squarespace Template Helper
=======
> A simple workflow for customizing CSS and JavaScript on Squarespace templates without Developer mode.

## Overview

The Squarespace Template Helper is a simple front end development workflow and toolset to help you write organized, modular CSS and JavaScript for use with Squarespace templates **without developer mode**.

Too many designers and developers are customizing Squarespace websites without keeping quality and workmanship in check. Often times, CSS code is an unorganized mess and JavaScript is heavy, bloated and buggy. This workflow aims to solve that. Stick to this workflow and you'll have organized, DRY (don't repeat yourself), prefixed CSS code. You'll also learn to code well-documented, clean JavaScript code that's modular. Hey, you might even learn ES6 because of our ESlint configuration.

### Features

* Write CSS in Sass with PostCSS Autoprefixing. Sass is similar to LESS.
* Write modular JavaScript that's compiled to a single, minified JavaScript file.
* JavaScript best practices: Bundled with Webpack, transpiled with Babel, linted with ESlint.

## Getting Started

This workflow is meant to help you create and organize custom CSS and JavaScript for your Squarespace website. This project will output a compressed and minified CSS and JavaScript file that you can take into your website and use.

### Requirements

This project assumes you have Git and Node.js installed. Git and Node.js are required because we use NPM for downloading project dependencies and running tasks.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/)

### Clone

Clone this project to your local machine.

```
git clone git@github.com:Squarefront/squarespace-template-helper.git yourprojectname
```

`cd` into your newly created project folder.

### Install

Install all project dependencies.

```
npm install
```

You should now have all your dependencies installed into the `node_modules` folder.

This project includes a custom build of jQuery to remove unnecessary jQuery methods that hardly anyone uses anymore. I've created an npm task that downloads jQuery. Run that.

```
npm run jquery
```

If this was successful, you should now have a new folder `js/lib/jquery/dist` which contains the custom build of jQuery.

## Working

Now that you have everything, it's time to work. This project currently uses a simple approach to running tasks. Right now there's a NPM task that watches your CSS and JavaScript files and automatically compiles them to a storage area in this project, `sqs_template`.

```
# Start up the watch task.
npm start
```

### CSS

This project uses Sass, which is very similar to LESS. It really makes no difference though because the end result we're going to be adding to Squarespace's Custom CSS Editor is going to be compiled CSS. You could customize this workflow to use LESS instead.

Head over to the `sass` folder and explore how everything is setup. Don't be overwhelmed at the amount of files and folders. If you organize your custom CSS like this you'll have a very maintainable, modular project. I've tried to keep it as organized as possible. Here's a quick overview:

* `sass/blocks` - This folder contains one CSS file per Squarespace block. For example, if you're making customizations to a Squarespace summary block, store the CSS in a file in this folder.
* `sass/collections` - This folder contains one CSS file per Squarespace collection type. For example, if you're making customizations to a Squarespace blog collection, store the CSS in a file in this folder.
* `sass/config` - This should store your project variables and mixins used in all of your Sass files.
* `sass/core` - Core CSS files are generally items that you're going to use site-wide, such as type, grids, icons, etc.
* `sass/modules` - I like to call "modules" things that are "sections" of the website. For example, a header or footer could technically be called a module. Or maybe I'm creating a custom Google Map that's used in multiple places in my site. These are modules, in my mind.
* `sass/sqs` - These are global Squarespace customizations, such as for the announcement bar, Squarespace shopping cart, or anything else.
* `sass/state` - State normally contains CSS related to hovers, taps, or UI state. Also, I normally put "modifiers" in here.
* `screen.scss` - This is your CSS entry point file. This is how you create a modular Sass system. Head over to this file and give it a look. It simply @imports everything in the order you specify. Sass compiles your CSS file according to the order specified.

Remember, you do not have to use everything exactly how I set it up. Feel free to customize it. The point of this CSS system is maintainability. If my client needs a design update to Squarespace video blocks, or I have a bug in my grid system, I know exactly where to go to edit my CSS.

#### Autoprefixing

This project uses a post-build task that prefixes all of your code with the Autoprefixer PostCSS package. This means you can write non-prefixed code in your source CSS files.

### JavaScript

This project uses an object literal module system that's bundled with [Webpack](https://webpack.github.io/). This system functions very similar to our modular Sass system mentioned above. The key component here is our `webpack.config.js` config file. This project uses the Webpack CLI, so the config file will show you what's going on. Our JavaScript entry point is the `js/src/app.js` file. All of your custom JavaScript should be separated into modules that relates to one specific use in your Squarespace website. The `app.js` should be configured to pull in all of your modules. I tried to leave comments in the project in order to help you build upon the example.

#### Using your custom JavaScript in Squarespace without Developer mode

Webpack will compile all of your JavaScript into a single file, `sqs_template/scripts/app.js`. You should be able to upload this JavaScript file directly into Squarespace's file storage, then use Squarespace Code Injection to reference the file.

* Step 1: Upload `app.js` to Squarespace File Storage
* Step 2: Add `<script src="/s/app.js"></script>` to Code Injection > Footer

That's all you need to do.

#### Debugging JavaScript

Debugging is a little harder to do on a non-Dev mode Squarespace template, so at the very least you should be able to use Browser DevTools for basic debugging. I'll work on this. :)

#### Minifying your JavaScript for production

For now, I'm not using Webpack's minification. So when your code is functioning properly and you're done debugging, simply run `npm run min:js` which will take your `sqs_template/scripts/app.js` and output a minified and mangled version to `sqs_template/scripts/app.min.js`.

Simply repeat the Squarespace installation steps above, but reference `app.min.js` instead. This will drop your JavaScript file size considerably.

### Future Releases

I'm testing an all-Webpack system where all of the build tasks are done using Webpack and some of Webpack's awesome plugins. Feel free to comment or submit feedback/bugs by creating an [Issue](/issues).