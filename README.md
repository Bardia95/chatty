# ChattyApp

A real time chat application that allows users to send text to anyone who is also connected to the app. Built with React and WebSockets.

### Installation

-   Clone the repo into any folder <br />
-   Install the dependences in the chattyApp Main Folder <br />
-   IMPORTANT: cd into the chatty_server folder and install the dependencies there too <br />
-   Start the WebSockets Server in chatty_server with nodemon server <br />
-   In a new terminal, Start the WebpackDev Server with npm start

```
git clone git@github.com:Bardia95/chatty.git
cd chatty-app
npm i
cd chatty-server
npm i
# inside chatty_ws_server start the ws server
nodemon server
# with another terminal, go back to main chatty-app and start the WebpackDev Server
cd ..
npm start
open http://localhost:3000
```

### Screenshots

!["Screenshot of chatty-app"](https://github.com/Bardia95/chatty/blob/master/public/ChattyScreenshot.png)
