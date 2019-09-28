// ==UserScript==
// @name         Auto Close Sponsored fb
// @namespace    prod
// @version      1.0.0
// @description  Auto Close Sponsored fb
// @author       taga
// @match        *://*.facebook.com/*
// ==/UserScript==

function hideSponsored({target}){
  var regexHyperfeed = /hyperfeed_story_id_.*/;
  if(target.id.match(regexHyperfeed)){
    //console.log(target.textContent);
    //console.log(target.innerText);
    var regexSponso = /.*Sponsorisé.*/;
    if(target.innerText.match(regexSponso)){
      target.remove();
      console.log("ad blocked: " + target.id);
    }
  }
}

function handleMutation(mutation){
	mutation.forEach(hideSponsored);
}

function addWatcher(){
	const feed = document.getElementById('stream_pagelet');
	const config = { attributes: false, childList: true, subtree: true };
	const observer = new MutationObserver(handleMutation);
	observer.observe(feed, config);
}


addWatcher();
