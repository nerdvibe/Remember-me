// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/*
  Displays a notification with the current time. Requires "notifications"
  permission in the manifest file (or calling
  "Notification.requestPermission" beforehand).
*/
function show() {
  var time = /(..)(:..)/.exec(new Date());     // The prettyprinted time.
  var hour = time[1] % 12 || 12;               // The prettyprinted hour.
  var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.
  new Notification(hour + time[2] + ' ' + period, {
    icon: 'icons/48.png',
    body: 'TEXT GOES HERE'
  });
}

// Conditionally initialize the options.
if (!localStorage.isInitialized) {
  localStorage.isActivated = true;   // The display activation.
  localStorage.frequency = 1;        // The display frequency, in minutes.
  localStorage.isInitialized = true; // The option initialization.
}

// Test for notification support.
if (window.Notification) {
  // While activated, show notifications at the display frequency.
  if (JSON.parse(localStorage.isActivated)) { show(); }

  var interval = 0; // The display interval, in minutes.

  setInterval(function() {
    interval++;

    if (
      JSON.parse(localStorage.isActivated) &&
        localStorage.frequency <= interval
    ) {
      show();
      interval = 0;
    }
  }, 600000);
}

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      return {cancel: details.url.indexOf("://www.evil.com/") != -1};
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
);

$( document ).ready(function() {
    console.log('this is ready yo!');
    $(".txtMessage").on( "keypress", function(event) {
        if (event.which == 13 && !event.shiftKey) {
            console.log("Key pressed");
            event.preventDefault();
            $("#note").hide();
            $("#success").show();
        }
    });
});