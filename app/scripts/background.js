'use strict';



chrome.runtime.onInstalled.addListener(() => {
  console.log('onInstalled...');
  // create alarm after extension is installed / upgraded
  chrome.alarms.create('refresh', { periodInMinutes: 1 });
});

//This will be ran every minute checking if the video has changed
chrome.alarms.onAlarm.addListener((alarm) => {
  console.log(alarm.name); // Prints alarm's name aka refresh
  getYoutubeTab();
  console.log('done');
});

//Gets every single tab of my browswer
function getTabs(){
  const queryOptions = {
    currentWindow: true
  }
  return new Promise((resolve, reject) => {
    try {
      chrome.tabs.query(queryOptions, function(tabs){
        resolve(tabs);
      })
    } catch(error) {
      reject(`Error is ${error}`)
    }
  })
}

function saveTab(key, obj){
  chrome.storage.sync.set({key: obj});
}

function getTab(key){
  return new Promise((resolve, reject) =>{
    try {
      chrome.storage.sync.get(key, function(data){
        resolve(data[key]);
      })
    } catch(error){
      reject(`Error is ${error}`)
    }
  })
}

//Gets all my tabs then sorts through all of them  and finds the youtube ones
async function getYoutubeTab(){
  const urls = await getTabs();
  var youtubeTabs = []

  for(var i =0;i<urls.length; i++){

    //If the tab is active and includes youtube in the url
    if(urls[i]['url'].includes('youtube') && urls[i]['active'] == true){
      youtubeTabs.push(urls[i]);

      //if the url has youtube and is playing in the background
    } else if (urls[i]['url'].includes('youtube') && urls[i]['active'] == false && urls[i]['audible'] == true){
      youtubeTabs.push(urls[i]);
    }
  }

  console.log(youtubeTabs);
  const oneTab = youtubeTabs[0];

  console.log(oneTab);
  var tabDetails = {
    "Title": oneTab['title'].slice(0, -10),
    'url': oneTab['url'],
    'timeSpentWatching': new Date()
  }

  console.log(oneTab['title'].slice(0, -10));

  chrome.storage.sync.set({'title': oneTab['title'].slice(0, -10)});

  var dataTitle = await getTab('title');


  console.log(dataTitle);
  chrome.runtime.sendMessage({
      msg: "Data Transfer",
      data: {
          subject: "Data",
          content: dataTitle
      }
  });

}
