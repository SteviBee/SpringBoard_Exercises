"use strict";

const BASE_URL = "https://hack-or-snooze-v3.herokuapp.com";

/******************************************************************************
 * Story: a single story in the system
 */

class Story {

  /** Make instance of Story from data object about story:
   *   - {title, author, url, username, storyId, createdAt}
   */
// MENTOR Q / TODO - (11/13) - how are storyID username and createdAt being defined when creating a new story?
  constructor({ storyId, title, author, url, username, createdAt }) {
    this.storyId = storyId;
    this.title = title;
    this.author = author;
    this.url = url;
    this.username = username;
    this.createdAt = createdAt;
  }

  /** Parses hostname out of URL and returns it. */

  getHostName() {
    // UNIMPLEMENTED: complete this function!
    // TRYING WITHOUT INTERNET - 11/8/21:
    // let hardCode = "www.google.com/?cow2342342"

    // let getEnd = this.url.indexOf(".com")+3
    // let getEndTest = hardCode.indexOf(".com")+3
    // console.log("getend", getEndTest)
    return "hostname.com";
  }
}



/******************************************************************************
 * List of Story instances: used by UI to show story lists in DOM.
 */


class StoryList {
  constructor(stories) {
    this.stories = stories;
  }

  /** Generate a new StoryList. It:
   *
   *  - calls the API
   *  - builds an array of Story instances
   *  - makes a single StoryList instance out of that
   *  - returns the StoryList instance.
   */

  static async getStories() {
    // Note  esence of `static` keyword: this indicates that getStories is
    //  **not** an instance method. Rather, it is a method that is called on the
    //  class directly. Why doesn't it make sense for getStories to be an
    //  instance method? We want it to be a utility function for the StoryList class to be able to use

    // query the /stories endpoint (no auth required)
    const response = await axios({
      url: `${BASE_URL}/stories`,
      method: "GET",
    });

    // turn plain old story objects from API into instances of Story class
    const stories = response.data.stories.map(story => new Story(story));

    // build an instance of our own class using the new array of stories
    return new StoryList(stories);
  }

  /** Adds story data to API, makes a Story instance, adds it to story list.
   * - user - the current instance of User who will post the story
   * - obj of {title, author, url}
   *
   * Returns the new Story instance
   */

  // PURPOSE: adds a new story by sending the right data to our API.
  async addStory(user, newStory) {
    // Setting variable: STUCK HERE 11/8/21 - Don't know if loginToken or token should be on user. Undefined error thrown
    let token = user.loginToken

    // Add story data to API with token - 
    // Question = Does the key "story" need to be exact to the API references
    // Question = does params or data matter when sending the response?
    const response = await axios({
      url: `${BASE_URL}/stories`,
      method: "POST",
      data: { token: token, story: newStory },
    })


    // Make a story instance with "newStory" calling the same key:value pair as above:
    let newStoryInstance = new Story(response.data.story);

    // Add it to the storylist array:
    // console.log("stories array!", this.stories)
    this.stories.unshift(newStoryInstance);
    user.ownStories.unshift(newStoryInstance);
    // console.log("user stories array!", user.ownStories)
    

    return newStoryInstance
  }

  // REMOVING STORY DATA: (must send the correct data from the front end to correctly trigger this removal) - 11/14 PM REVERT
  async removeStory(user, storyId) {
    let tokenKey = user.loginToken
    // // Problem solving - HELP
    // console.log("user: ", user)
    // console.log("token passed: ", tokenKey)
    // console.log("removeStory URL: ", `${BASE_URL}/stories/${storyId}`)

    // COMMENTED THIS OUT DUE TO KEEPING FUNCTION GOING - 11/14_________________________________________________________
    // await axios({
    //   url: `${BASE_URL}/stories/${storyId}`,
    //   method: "DELETE",
    //   data: { token: tokenKey } 
    // })
    // console.log("removeStory Ran, storyId deleted: ", storyId);
  }

  // ANSWER KEY - NO DIFFERENECE FROM MINE ABOVE - 11/14
  // async removeStory(user, storyId) {
  //   const token = user.loginToken;
  //   await axios({
  //     url: `${BASE_URL}/stories/${storyId}`,
  //     method: "DELETE",
  //     data: { token: user.loginToken }
  //   });

  //   // filter out the story whose ID we are removing
  //   this.stories = this.stories.filter(story => story.storyId !== storyId);

  //   // do the same thing for the user's list of stories & their favorites
  //   user.ownStories = user.ownStories.filter(s => s.storyId !== storyId);
  //   user.favorites = user.favorites.filter(s => s.storyId !== storyId);
  // }

}


/******************************************************************************
 * User: a user in the system (only used to represent the current user)
 */

class User {
  /** Make user instance from obj of user data and a token:
   *   - {username, name, createdAt, favorites[], ownStories[]}
   *   - token
   */

  constructor({
                username,
                name,
                createdAt,
                favorites = [],
                ownStories = []
              },
              token) {
    this.username = username;
    this.name = name;
    this.createdAt = createdAt;

    // instantiate Story instances for the user's favorites and ownStories
    this.favorites = favorites.map(s => new Story(s));
    this.ownStories = ownStories.map(s => new Story(s));

    // store the login token on the user so it's easy to find for API calls.
    this.loginToken = token;
  }

  /** Register new user in API, make User instance & return it.
   *
   * - username: a new username
   * - password: a new password
   * - name: the user's full name
   */

  static async signup(username, password, name) {
    const response = await axios({
      url: `${BASE_URL}/signup`,
      method: "POST",
      data: { user: { username, password, name } },
    });

    let { user } = response.data

    return new User(
      {
        username: user.username,
        name: user.name,
        createdAt: user.createdAt,
        favorites: user.favorites,
        ownStories: user.stories
      },
      response.data.token
    );
  }

  /** Login in user with API, make User instance & return it.

   * - username: an existing user's username
   * - password: an existing user's password
   */

  static async login(username, password) {
    const response = await axios({
      url: `${BASE_URL}/login`,
      method: "POST",
      data: { user: { username, password } },
    });

    let { user } = response.data;

    return new User(
      {
        username: user.username,
        name: user.name,
        createdAt: user.createdAt,
        favorites: user.favorites,
        ownStories: user.stories
      },
      response.data.token
    );
  }

  /** When we already have credentials (token & username) for a user,
   *   we can log them in automatically. This function does that.
   */

  static async loginViaStoredCredentials(token, username) {
    try {
      const response = await axios({
        url: `${BASE_URL}/users/${username}`,
        method: "GET",
        params: { token },
      });

      let { user } = response.data;

      return new User(
        {
          username: user.username,
          name: user.name,
          createdAt: user.createdAt,
          favorites: user.favorites,
          ownStories: user.stories
        },
        token
      );
    } catch (err) {
      console.error("loginViaStoredCredentials failed", err);
      return null;
    }
  }

  // Creating DATA for favorite adding and removing - currentUser.removefavorite(storyList.stories[0])
  async addfavorite(story) {
    

    // Adding to LS it will OVERRIDE any current favorites : - CHANGING LS ->API: Action = Disabled
    // saveFavoritesInLocalStorage()

    // Calling the custom private method for updating the API with the favorites
    this.favorites.push(story)
    await this._addOrRemoveFavorite("add", story)


    console.log("this work and this fav called",  this.favorites)
  }
  async removefavorite(story) {
    // let index = this.favorites.indexOf(story)
    // - CHANGING LS ->API: Action = Disabled - HEHREHRHEHRHERHREHE
    let newArray = []
    for (let i = 0; i < this.favorites.length; i++) {
      if (this.favorites[i] === story) {
      } else {
        newArray.push(this.favorites[i])
      }
    } 
    
    console.log("removefavorite worked and this was removed: ",  story)
    console.log("this is: ", this)
    // NOTE - empty current favorites then recopy over the filtered ones
    this.favorites = []
    this.favorites = [...newArray]
    // Overriding OLD favorites with new UPDATED ones - CHANGING LS ->API: Action = Disabled
    // saveFavoritesInLocalStorage()
    // Calling private method for user to remove the story from favs
    await this._addOrRemoveFavorite("remove", story)  
  }

  async _addOrRemoveFavorite(action, story) {
    const method = action === "add" ? "POST" : "DELETE";
    const token = this.loginToken;
    await axios({
      url: `${BASE_URL}/users/${this.username}/favorites/${story.storyId}`,
      method: method,
      data: { token },
    });
  }
  

  // async getApiFavs(){
    
  // }

}
