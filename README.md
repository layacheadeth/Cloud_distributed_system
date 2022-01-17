# Our Music App(spotify)
To run the published application use the link below:
http://cloudproject123-20220118000552-hostingbucket-dev.s3-website-ap-southeast-1.amazonaws.com/

the username: mapakama.ellis@yahoo.com
password: mapakame0605


#To Create a similar app follow the instructions below

After cloning the github repository move to the (new_code) branch and open it in your favourite code editor.

# Prerequisites
1. Amazon Account
2. Node js
3. Npm
4. Amplify

# Installing Amplify
After NodeJs and Npm are installed you need to install amplify cli using: 
1. [npm install -g @aws-amplify/cli]
2. amplify configure
This will open a aws in a browser, use your account to login. After logging into aws go back to code editor and press enter and follow steps
- Add a region where u want to deploy the application
- and a name for the user and click enter. this will take you back to the browser where u create a user following the steps and make sure to keep note of the new User access key and secret key.
- After creating the user go back to terminal and press enter, paste the secret key and access key from the aws IAM you just created in the browser.
- You will be asked to add this to profile, say YES and give a name.
3. Amplify init
4. Amplify add auth
Select method as default and use email to sign in then click no I'm done and wait for it to finish creating configuration files.

#Installing React Prerequisites
1. npm install -- save @aws-amplify/ui-react
   


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
