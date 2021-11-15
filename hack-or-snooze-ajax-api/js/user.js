"use strict";

// global to hold the User instance of the currently-logged-in user
let currentUser;

/******************************************************************************
 * User login/signup/login
 */

/** Handle login form submission. If login ok, sets up the user instance */

async function login(evt) {
  console.debug("login", evt);
  evt.preventDefault();

  // grab the username and password
  const username = $("#login-username").val();
  const password = $("#login-password").val();

  // User.login retrieves user info from API and returns User instance
  // which we'll make the globally-available, logged-in user.
  currentUser = await User.login(username, password);

  $loginForm.trigger("reset");

  saveUserCredentialsInLocalStorage();
  updateUIOnUserLogin();
  await checkForFavoritesUser();
}

$loginForm.on("submit", login);

/** Handle signup form submission. */

async function signup(evt) {
  console.debug("signup", evt);
  evt.preventDefault();

  const name = $("#signup-name").val();
  const username = $("#signup-username").val();
  const password = $("#signup-password").val();

  // User.signup retrieves user info from API and returns User instance
  // which we'll make the globally-available, logged-in user.
  currentUser = await User.signup(username, password, name);

  saveUserCredentialsInLocalStorage();
  updateUIOnUserLogin();

  $signupForm.trigger("reset");
}

$signupForm.on("submit", signup);

/** Handle click of logout button
 *
 * Remove their credentials from localStorage and refresh page
 */

function logout(evt) {
  console.debug("logout", evt);
  localStorage.clear();
  location.reload();
}

$navLogOut.on("click", logout);

/******************************************************************************
 * Storing/recalling previously-logged-in-user with localStorage
 */

/** If there are user credentials in local storage, use those to log in
 * that user. This is meant to be called on page load, just once.
 */

async function checkForRememberedUser() {
  console.debug("checkForRememberedUser");
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  if (!token || !username) return false;

  // try to log in with these credentials (will be null if login failed)
  currentUser = await User.loginViaStoredCredentials(token, username);
}

// 11/14 - GET favorites MATCHING storyId in LS to ol>li id - DISABLE FOR LS -> API
async function checkForFavoritesUser() {
  console.debug("checkForFavoritesUser");
  if (!currentUser) return false;
  const apiFavs = currentUser.favorites


  // let currentLs = JSON.parse(localS)
  populateCurrentFavs(apiFavs)
}

// Set current favorite list - NEW
function populateCurrentFavs(favsArray) {
for (let ind = 0; ind < favsArray.length; ind++) {
  console.log("ID of favorite Story", ind, ":", favsArray[ind].storyId)
  // console.log("Finding the right ID attirube JQUERY", $("li[id]").map(function() { return this.id; }).get())
  console.log("Story to make checked!!", $(`#${favsArray[ind].storyId} input`).prop("checked", true).addClass("fav"))
  // $("#82c764f3-aacd-4e48-8a03-fe295219c96b input").prop("checked", true)

  // Find list of ids
  // var IDs = $("#fav-button[id]")         // find spans with ID attribute
  // .map(function() { return this.id; }) // convert to set of IDs
  // .get(); // convert to instance of Array (optional)
  // if (favsArray[ind].storyId === 2) {
    
  // }


  // for (let i = 0; i < $favButton.length; i++) {
  //   console.log("inside SECOND LOOp for FAV")
  //   if (localS[i].storyId === $favButton.id){
  //     console.log("fav button", $favButton.id)
  //     }
  //   }
  }
}
  
  // console.log('TYPE OF', typeof(localS))
  // let newVar = JSON.parse(localS);
  // console.log("NEW VARIABLE", newVar)  

  // try to log in with these credentials (will be null if login failed)
  // currentUser = await User.loginViaStoredCredentials(token, username);


/** Sync current user information to localStorage.
 *
 * We store the username/token in localStorage so when the page is refreshed
 * (or the user revisits the site later), they will still be logged in.
 */

function saveUserCredentialsInLocalStorage() {
  console.debug("saveUserCredentialsInLocalStorage");
  if (currentUser) {
    localStorage.setItem("token", currentUser.loginToken);
    localStorage.setItem("username", currentUser.username);
  }
}

// // DISABLE - 11/14 LS -> API
// // 11/14 - Trying to figure out HOW TO SAVE AND RECALL FAVS
// function saveFavoritesInLocalStorage() {
//   console.debug("saveFavoritesInLocalStorage");
//   if (currentUser) {
//     localStorage.setItem("favs", JSON.stringify(currentUser.favorites));
//   }
// }
/******************************************************************************
 * General UI stuff about users
 */

/** When a user signs up or registers, we want to set up the UI for them:
 *
 * - show the stories list
 * - update nav bar options for logged-in user
 * - generate the user profile part of the page
 */

function updateUIOnUserLogin() {
  console.debug("updateUIOnUserLogin");

  $allStoriesList.show();

  updateNavOnLogin();
}
