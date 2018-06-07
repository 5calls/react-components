# 5 Calls React Component Library

This repository holds standard React components used in the 5 Calls project.

## Project installation and Build

### Install dependencies
Install dependencies from npm using the command:
```
npm install
```

### Build this library
Build the library into the lib folder using:
```
npm run build
```

### Publish this library to npm
Build the library  and then run the following command:
```
npm publish
```
Make sure you bump the version number in package.json before you publish an update to the package.

Once the module is published in npm, you can use the components in this module in another project by running the following command:
```
npm install --save @5calls/react-componets
```


### Link this project to local npm
To setup an npm link that allows you to use these components locally without installing the npm package run the following from this project's root folder:
```
npm link
```

There is no need to run `npm link` repeatedly if an edit is made to this project. You just need to run the build to make any changes in this code available to a project that uses these components.

### Setup a local application to use linked components from this project

Reference the linked project to a local React application by running the following in the project's root folder:
```
npm link @5calls/react-components
```

To add this project's components to a React jsx or tsx file use an ES2015 import statement. For instance to add the `Faq` component use the following import:
```
import { Faq } from '@5calls/react-components';
```
The styling of these components will need the following import added to the root application's tsx file.
```
import '@5calls/react-components/lib/index.css';

```

## TODOs
- Add more components