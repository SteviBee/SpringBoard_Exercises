"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */
async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
  putFavoritesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link d-inline">
          ${story.title}
        </a>
        <span class="d-inline">
            <label class="btn btn-secondary active">
            <input type="checkbox" id="fav-button"> Favorite
          </label>
        </span>
        <br>
        <button type="submit" id=${story.storyId}>remove</button>
        <br>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

// NEWCODE -------------------------------------------------------------------------------------
function putFavoritesOnPage() {
  console.debug("putFavoritesOnPage");
  
  $favsList.empty()

  // Looop through and generate new HTML for favs if present 
  if (!currentUser.favorites.length > 0) return false
  for (let i = 0; i < currentUser.favorites.length; i++) {
    const $favStory = generateStoryMarkup(currentUser.favorites[i])
    console.log("favstory at index is :", i, currentUser.favorites[i], $favsList)
    $favsList.append($favStory)
  }
  $favsList.show()
  $("h2").show()
}

// Removing selected story from HTML and API
async function removeStoryFromHTMLAndAPI(e) {
  console.debug("deleteStory"); 
  // console.log("ensuring correct data:", "token:", currentUser.loginToken, "Storyid", this.id)
  // console.log("the data removeStoryFromHTMLAndAPI", "USER:", currentUser, "ID", this.id)
  // REMOVING STORY FROM API NOT WORKING - HELP 11/14
  await storyList.removeStory(currentUser, this.id)

  // // recall stories without the one we took out:
  console.log("goign to delete THIS: ", this.parentElement)
  let $parent = this.parentElement
  $parent.remove()

}
$allStoriesList.on("click", "button", removeStoryFromHTMLAndAPI)

// Creating EVENT for ADD STORY form submition:
async function addStoryFromForm(e) {
  e.preventDefault();

  // let $items = $(
  //   `<li>
  //       <a href=${$addStoryUrl.val()} class="story-link">${$addStoryTitle.val()}</a>
  //       <small>${$addStoryTitle.val()}</small>
  //       <small>${$addStoryAuthor.val()}</small>
  //       <small>${$addStoryUrl.val()}</small>
  //   </li>`)

  // let $items = $(`<li>`).text($addStoryInput.val())
  // ALT - let $item2 = $(`<tr class="text-center" id="tRow"></tr>`)

  // Calling addStory to send data to API
  let user = currentUser
  let $story = await storyList.addStory(user, {
    url: $addStoryUrl.val(),
    author: $addStoryTitle.val(),
    title: $addStoryAuthor.val(),
  })

  // console.log("Returning story object", $story.title)
  // Takes story object and pulls the markup out of it via the fn below
  let $items = generateStoryMarkup($story)
  $allStoriesList.append($items) 
  
  // Reset form and hide it:
  $addStoryForm.slideUp("slow");
  $addStoryForm.trigger("reset");
}

$body.on("submit", "#addstoryform", addStoryFromForm)

// currentUser.removefavorite(storyList.stories[0] - 11/13/21 HERERER MAATCH STORY ID TO GET THE RIGHT STROY
// THEN RETURN IT TO MY DATA FUNCTIONS AND ADD AND REMOOVE THAT SHIT

// NEW - Adding event to add FAV and remove FAV
async function addFavoriteStory(e) {
  
  if ($(this).hasClass("fav")) {
    // If already in fav then remove that story 
    for (let i = 0; i < storyList.stories.length; i++) {
      if (storyList.stories[i].storyId === e.target.parentElement.parentElement.parentElement.id) {
        currentUser.removefavorite(storyList.stories[i])
      } 
    }
    $(this).removeClass("fav");
  } else {
    // get story and add it to currentuser favorite
    for (let i = 0; i < storyList.stories.length; i++) {
      if (storyList.stories[i].storyId === e.target.parentElement.parentElement.parentElement.id) {
        currentUser.addfavorite(storyList.stories[i])
      } 
    }
    $(this).addClass("fav");
  }

  // let story = storyList.stories[0].storyId

}

// TODO - look at change event via jquery 
$allStoriesList.on("change", "#fav-button", addFavoriteStory);