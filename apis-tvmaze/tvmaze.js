/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 * 
 * http://api.tvmaze.com/search/shows?q=<search query>

and

http://api.tvmaze.com/shows/<show id>/episodes
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
const MISSING_IMAGE_URL = "http://tinyurl.com/missing-tv";

// Calls api and gets back search result general data, then returns a few data points
async function searchShows(query) {

  
  let url = "https://api.tvmaze.com/search/shows"
  let params = {
    q: query
  }

  let showSearchResults = await axios.get(url, {params});

  // data[0].show.image.original

  return [
    {
      id: showSearchResults.data[0].show.id,
      name: showSearchResults.data[0].show.name,
      summary: showSearchResults.data[0].show.summary,
      image: showSearchResults.data[0].show.image.original ? showSearchResults.data[0].show.image.medium : MISSING_IMAGE_URL,
    }
  ]
}





/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {

  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}" id="new-id">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
             <img class="card-img-top" src=${show.image}>
           </div>
         </div>
       </div>
      `);

    $showsList.append($item);
  }
}



/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */




/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();


  // Get input from user, if empty do nothing
  let query = $("#search-query").val();
  if (!query) return;

  // $("#episodes-area").hide();

  // Set variables to the objects returned from the respective API requests
  let shows = await searchShows(query);

  populateShows(shows);
  // populateEpisodes(episodes);
});



// chekc how i moved the espisode stuff around  -TODO 10/20 notes

async function getEpisodes(id) {
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes
  //       https://api.tvmaze.com/shows/1/episodes

  // TODO: return array-of-episode-info, as described in docstring above
  let res = await axios.get(`https://api.tvmaze.com/shows/${id}/episodes`);


  // Map returns an array with each item in the res.data to have the id/name/season/number applyed to each
  let episodes = res.data.map(episode => ({
    id: episode.id,
    name: episode.name,
    season: episode.season,
    number: episode.number,
  }));
  
  return episodes
}

// Take the episode object and populate the DOM 
function populateEpisodes(episodes){

  const $episodesList = $("#episodes-list");
  // $showsList.empty();

  for (let episode of episodes) {
    // Best Practice: make a jquery variable with "$" in front so you know it is jquery
    let $item = $(
      `<li data-show-id="${episode.id}"> Name: ${episode.name} Season: ${episode.season}  Number:${episode.number} </li>`);

    $episodesList.append($item);
  }
}

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();
  $("#episodes-area").css("display", "inline")


  // Get input from user, if empty do nothing
  let query = $("#search-query").val();
  if (!query) return;

  // Calling the show query again
  let url = "https://api.tvmaze.com/search/shows"
  let params = {
    q: query
  }

  let showId = await axios.get(url, {params})

  // console.log("event target", evt.target)

  // Set variables to the objects returned from the respective API requests
  // let showId = $(evt.target).closest(".Show").data("show-id");

  // TODO - try to get this way to work (10/24/21): (To grab the shows id)
  // let showId = $("#new-id").attr("data-show-id")

  let episodes = await getEpisodes(showId.data[0].show.id);

  populateEpisodes(episodes);
});