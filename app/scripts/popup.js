'use strict';

console.log('\'Allo \'Allo! Popup');

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg === "Data Transfer") {
            //  To do something
            console.log(request.data.subject)
            console.log(request.data.content)
        }
    }
  )

// const express = require('express');
// const RPC = require('discord-rpc');
// const app = express();
// const port = 3002;
//
// const clientId = '864432694884958208';
// const clientSecret = 'lOviEJCe-4kTeGdUgYY-50y8vqk7U_UF';
// const scopes = ['rpc'];
// const client = new RPC.Client({ transport: 'ipc' });
//
//
// app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
//
// app.get('/', function(req, res){
//
//   client.login({
//     clientId,
//     clientSecret: clientSecret,
//     redirectUri: `http://localhost:${port}`,
//     scopes: ['rpc']
// })
//
//   client.on('ready', () => {
//     console.log('Logged in as', client.application.name);
//     console.log('Authed for user', client.user.username);
//     client.connect();
//     console.log(client.user);
//
//     const startTimestamp = new Date();
//
//
//     client.setActivity({
//       details: `Testing shit`,
//       state: 'Really hope this project will work',
//       startTimestamp,
//       instance:false,
//     });
//
//   });
//
// })

// chrome.tabs.query({
//   currentWindow:true,
//   active: true
//   }, function(tab){
//     console.log("error");
//     tabID=tab[0].id;
//   chrome.tabs.sendMessage(tabID,{
//     method: "error",
//     content: JSON.stringify(json_obj)
//     });
// });
