# Altocloud Cisco Spark React _(alto-react-ciscospark)_

> This code base is forked from the [Cisco Spark React Codebase](https://github.com/ciscospark/spark-js-sdk/tree/master/packages/widget-message-meet). We provide our own implementation for _widget-message-meet_ located under packages/@altocloud. The aim is too keep up to date with the latest cisco spark codebase while implementing our own needs on top.

After downloading the repo, you will need to set the upstream repo to get the latest from Cisco:
```
git remote add upstream https://github.com/ciscospark/react-ciscospark.git
```

After this, you can update as per usual. ONLY PULL *MASTER* FROM UPSTEAM.
```
git pull upstream master
```

## Installing using NPM

### Build From Source

1.  `npm config set @ciscospark:registry https://registry.npmjs.org`
1.  `npm login --scope=@ciscospark`
1.  `npm install`

# Cisco Spark for React _(react-ciscospark)_

* THIS REPO CONTAINS EXPERIMENTAL CODE *

> The Cisco Spark for React library allows developers to easily incorporate Spark functionality into an application.

## Table of Contents
- [Background](#background)
- [Widgets](#widgets)
- [Install](#install)
  - [Build from Source](#build-from-source)
- [Components](#components)
  - [Install](#install)
-   [Browser Support](#browser-support)

## Background

This library allows React developers to quickly and easily create a Cisco Spark experience within their apps. Here we provide basic components (e.g. buttons, text fields, icons) that reflect the styles and aesthetics of Spark, along with more complex, complete widgets, such as the Spark Message and Meet Widget.

The basic components are just presentational React <https://github.com/facebook/react> components, while our widgets leverage Redux <https://github.com/reactjs/redux> and the Spark Javascript SDK <https://github.com/ciscospark/spark-js-sdk>.

## Widgets

While many of our components are purely presentational, some have extended functionality that provide a piece of the full Cisco Spark experience. These fully self contained elements are called `Widgets` and are available here:

*  [Message and Meet Widget](./packages/node_modules/@ciscospark/widget-message-meet)

## Install

### Build From Source

1.  Clone this repo using a git client (e.g. `git clone https://github.com/ciscospark/react-ciscospark.git`)
1.  Run `npm install` from the root of the repo. You will want to run this every time you pull down any new updates.
1.  From the root of the repo, run the following to build the widget:

  ```sh
  npm run build
  ```
1.  The built bundles are located at `packages/node_modules/@ciscospark/PACKAGE_NAME/dist`.


## Limitations
### Development

* `stylelint` currently ignores all `node_modules` directories, and will not lint our packages. Discussion: <https://github.com/stylelint/stylelint/issues/2236>
