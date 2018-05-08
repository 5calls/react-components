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

### Link this project to local npm
To setup an npm link that allows you to use these components locally by running the following from this project's root folder:
```
npm link
```
The `npm link` command installs `@types/node` into the `node_modules` folder, which causes an error to be thrown when `npm run build` is run again. The way to get around this is to delete the `node_modules/@types/node` folder.

There is no need to run `npm link` repeatedly if an edit is made to this project. You just need to run the build to make any changes in this code available to a project that uses these components.

### Setup a local application to use these components

Link this project to a React application by running the following in the project's root folder:
```
npm link @5calls/react-components
```

Add project components to a React jsx or tsx file using an ES2015 import statement. For instance to add the `Faq` component use the following import:
```
import { Faq } from '@5calls/react-components';
```

## TODOs
- Add more components
- Integrate Redux
- Add CSS styling