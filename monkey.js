// ==UserScript==
// @name         Auto Close Sponsored fb
// @namespace    test
// @version      1.0.1
// @description  Auto Close Sponsored fb
// @run-at       document-end
// @author       taga
// @match        *://*.facebook.com/*
// ==/UserScript==

(function() {
  function hideSponsored({target}){
    const regexHyperfeed = /hyperfeed_story_id_.*/;
    if(target.id.match(regexHyperfeed)){
      const regexSponso = /.*Sponsorisé.*/;
      if(target.innerText.match(regexSponso)){
        console.log("ad blocked: " + target.id);
        target.remove();
      }
    }
  }

  function handleMutation(mutation){
    mutation.forEach(hideSponsored);
  }

  function init() {
    console.log('loading...');
    const feed = document.getElementById('stream_pagelet');
    if(feed) { // for unknown reason this script is called multiple time, but only the first call result in feed being found..
      console.log('hooked !');
      const config = { attributes: false, childList: true, subtree: true };
      const observer = new MutationObserver(handleMutation);
      observer.observe(feed, config);
    }
  }

  init();
})();
