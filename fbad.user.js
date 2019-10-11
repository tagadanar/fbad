// ==UserScript==
// @name         Auto Close Sponsored fb
// @namespace    prod
// @version      1.0.3
// @description  Auto Close Sponsored fb
// @run-at       document-end
// @author       taga
// @match        *://*.facebook.com/*
// @updateURL    https://github.com/tagadanar/fbad/raw/master/fbad.user.js
// @downloadURL  https://github.com/tagadanar/fbad/raw/master/fbad.user.js
// ==/UserScript==

(function() {
  // special check data-content shenanigan
  function checkSponsored(node) {
    var result = '';
    function allDescendants(node) {
      for(var i = 0; i < node.childNodes.length; i++) {
        var child = node.childNodes[i];
        addToString(child);
        allDescendants(child);
      }
    }
    function addToString(node) {
      try{
        if(getComputedStyle(node, null).display != 'none'
          && node.dataset && node.dataset.content){
          result += node.dataset.content;
        }
      }catch(e){}
    }
    allDescendants(node);
    return result;
  }
  
  function hideSponsored({target}){
    const regexHyperfeed = /hyperfeed_story_id_.*/;
    if(target.id.match(regexHyperfeed)){
      const regexSponso = /.*Sponsorisé.*/;
      if(target.innerText.match(regexSponso)){
        console.log("ad blocked: " + target.id);
        target.remove();
      } else {
        var sponsoStr = checkSponsored(target);
        if(sponsoStr.match(regexSponso)){
          console.log("ad blocked (data-content): " + target.id);
            target.remove();
        }
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
