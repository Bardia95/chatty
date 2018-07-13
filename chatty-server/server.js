// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v1');


// Set the port to 3001
const PORT = 3001;

let clients = {}



const createMessage = msg => ({
  type: "message",
  data: {
    id: uuid(),
    userId: msg.userId,
    username: msg.username,
    content: msg.content
  }
});

const createNotification = msg => ({
  type: "notification",
  data: {
    id: uuid(),
    oldName: msg.oldName,
    currentUser: msg.currentUser
  }
})

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });


const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const clientDisconected = clientId => {
  const client = clients[clientId]

  if (!client) return // catch race condition

  const disconnectionMsg = {
    type: 'disconnection',
    data: client
  }

  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(disconnectionMsg));
    }
  });
  delete clients[clientId]
}


const clientConnected = (client, clientId) => {
  // Create client data
  clients[clientId] = {
    id: clientId,
    color: getRandomColor(),
  }

  // Setup message to be sent to the client
  // Includes all currently connected clients
  const setupMsg = {
    type: 'setup',
    data: {
      id: clientId,
      connectedClients: clients,
      nOfUsers: wss.clients.size
    }
  }

  // Connection message to be sent to the client
  // Tells the client who they are
  const connectionMsg = {
    type: 'connection',
    data: clients[clientId]
  }

  if (client.readyState === client.OPEN) {
    client.send(JSON.stringify(setupMsg))
  }
   wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(connectionMsg));
    }
  });
}


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', client => {
  console.log('Client connected');

  const clientId = uuid();

  clientConnected(client, clientId);


  client.onmessage = function (event) {
    const msg = JSON.parse(event.data);
    switch (msg.type) {
      case "message":
        const message = createMessage(msg);
        wss.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
          }
         });
        break;
      case "notification":
        const notification = createNotification(msg);
        wss.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(notification));
          }
        })
      default:
    }
  };

  client.on('close', () => {
    clientDisconected(clientId)
  })
});





