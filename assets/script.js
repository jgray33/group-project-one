console.log("connected");

// Fetches the list of actor's from the user's search using IMDI data ----------------------------
async function getIMDBApi(new_data) {
  let requestUrl = `https://imdb-api.com/en/API/SearchMovie/k_faz1hkma/${new_data}`;
  let response = await fetch(requestUrl);
  let data = await response.json();
    let movieId = data.results[0].id;
  
  let getFullCast = `https://imdb-api.com/en/API/FullCast/k_faz1hkma/${movieId}`;
  let response2 = await fetch(getFullCast);
  let data2 = await response2.json();
  console.log(data2);
  console.log(data2.actors[0]);
  let characterName = data2.actors[0].asCharacter;
  let actorName = data2.actors[0].name;
  let actorImage = data.results[0].image;
  console.log(actorName);

  let actorNameArray = actorName.split(" ");
  console.log(actorNameArray);
  let actorFirstName = actorNameArray[0];
  let actorSecondName = actorNameArray[1];
  getActorID(actorFirstName, actorSecondName);
  $("#actor-info").append(
    `<li>Character name: ${characterName}</li>`,
    `<li>${actorName}</li>`
  );
}

// When the search button is pressed, user's search adds to search history -------------------------------
$("#search-bttn").click(function () {
  console.log("you clicked search ");
  let new_data = $("#search-field").val();
  if (localStorage.getItem("movieSearch") == null) {
    localStorage.setItem("movieSearch", "[]");
  }
  let old_list = JSON.parse(localStorage.getItem("movieSearch"));
  old_list.push(new_data);
  localStorage.setItem("movieSearch", JSON.stringify(old_list));
  let userMovieSearch = JSON.parse(localStorage.getItem("movieSearch"));
  console.log(userMovieSearch);
  $(".search-history-box").append(
    `<li><button id="movieSearch" value=${new_data}> ${new_data} </button></li>`
  );
  getIMDBApi(new_data);
});

// Used the TMDB API to get the Actor's ID
async function getActorID(actorFirstName, actorSecondName) {
  let requestUrl = `https://api.themoviedb.org/3/search/person?api_key=7fcabf766db7f48c8e77b585913f04f8&query=${actorFirstName}+${actorSecondName}`;
  let response = await fetch(requestUrl);
  let data = await response.json();
  console.log(data);
  let actorID = data.results[0].id
  console.log(actorID)
  getTwitterID(actorID)
  }


async function getTwitterID(actorID){
let requestUrl = `https://api.themoviedb.org/3/person/${actorID}/external_ids?api_key=7fcabf766db7f48c8e77b585913f04f8&language=en-US`
let response = await fetch(requestUrl)
let data = await response.json()
console.log(data)
let instagramHandle = data.instagram_id
let twitterHandle = data.twitter_id
}

// Get the names of the actor's in the film from a movie search
// Get the actor's iod from TMDB
// Plug in that ID into TBDB to get their twitter handle
// Plug that twitter handel into the twitter API

// To do:
// Get the data from the IMDB API
// 1.
