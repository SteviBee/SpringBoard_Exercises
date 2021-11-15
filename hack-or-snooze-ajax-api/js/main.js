"use strict";

// So we don't have to keep re-finding things on page, find DOM elements once:

const $body = $("body");

const $storiesLoadingMsg = $("#stories-loading-msg");
const $allStoriesList = $("#all-stories-list");

const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");

const $navLogin = $("#nav-login");
const $navUserProfile = $("#nav-user-profile");
const $navLogOut = $("#nav-logout");
// Added addstory sunbmit button const:
const $navAddStory = $("#add-story-submit");
const $addStorySection = $("#addstory-section");
const $addStoryForm = $("#addstoryform");
let $addStoryTitle = $("#addstory-title");
let $addStoryAuthor = $("#addstory-author");
let $addStoryUrl = $("#addstory-url");
let $favButton = $("#fav-button")
let $favsList = $("#all-favs-list")
let $favTitle = $("h2")



/** To make it easier for individual components to show just themselves, this
 * is a useful function that hides pretty much everything on the page. After
 * calling this, individual components can re-show just what they want.
 */

// QUESTION - i added $add story and section 11/11
function hidePageComponents() {
  const components = [
    $allStoriesList,
    $loginForm,
    $signupForm,
    $addStoryForm,
    $favTitle,
  ];
  components.forEach(c => c.hide());
}

/** Overall function to kick off the app. */

async function start() {
  console.debug("start");

  // "Remember logged-in user" and log in, if credentials in localStorage
  await checkForRememberedUser();
  await getAndShowStoriesOnStart();
  // 11/14 - EDITS - trying to chekc for current favs and reload them to page
  await checkForFavoritesUser();

  // if we got a logged-in user
  if (currentUser) updateUIOnUserLogin();
}

// Once the DOM is entirely loaded, begin the app

console.warn("HEY STUDENT: This program sends many debug messages to" +
  " the console. If you don't see the message 'start' below this, you're not" +
  " seeing those helpful debug messages. In your browser console, click on" +
  " menu 'Default Levels' and add Verbose");
$(start);
