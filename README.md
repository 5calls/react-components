# 5 Calls React Component Library

This repository holds standard React components used in the 5 Calls project.

## Project installation and Build

Install dependencies from npm using the command:
```
npm install
```

Build the library into the lib folder using:
```
npm run build
```
To setup an npm link that allows you to use these components locally by running the following from this project's root folder:
```
npm link
```

Link this project to a React application by running the following in the project's root folder:
```
npm link @5calls/react-components
```

Add project components to a React jsx or tsx file using an ES2015 import statement. For instance to add the `Faq` component use the following import:
```
import { Faq } from '@5calls/react-components';
```

## TODOs
- Add CSS styling