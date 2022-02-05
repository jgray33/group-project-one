// const actorsEL = document.querySelector('#actors-card');


let actorName;
let characterName;
let twitterHandle;
let actorImage;
let movieId;

// When the search button is pressed, user's search adds to search history -------------------------------
$("#search-bttn").click(function () {
  $("#actors-card").removeClass("hide")
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

// Fetches the list of actor's from the user's search using IMDI data ----------------------------
async function getIMDBApi(new_data) {
  let requestUrl = `https://imdb-api.com/en/API/SearchMovie/k_klb075h2/${new_data}`;
  let response = await fetch(requestUrl);
  let data = await response.json();
  console.log(data);
  movieId = data.results[0].id;
  getActorList(movieId);
}

async function getActorList() {
  let getFullCast = `https://imdb-api.com/en/API/FullCast/k_klb075h2/${movieId}`;
  let response2 = await fetch(getFullCast);
  let data2 = await response2.json();
  console.log(data2);

  //   Go through the actor list
  for (let i = 0; i < 4; i++) {
    characterName = data2.actors[i].asCharacter;
    actorName = data2.actors[i].name;
    actorImage = data2.actors[i].image;
    console.log(actorName);
    let actorNameArray = actorName.split(" ");
    console.log(actorNameArray);


    let actorFirstName = actorNameArray[0];
    let actorLastName = actorNameArray.slice(-1);
    console.log(actorLastName);
    await getActorID(actorFirstName, actorLastName);
  }
}

// Used the TMDB API to get the Actor's ID -----------------------------------------------
async function getActorID(actorFirstName, actorLastName) {
  let requestUrl = `https://api.themoviedb.org/3/search/person?api_key=7fcabf766db7f48c8e77b585913f04f8&query=${actorFirstName}+${actorLastName}`;
  let response = await fetch(requestUrl);
  let data = await response.json();
  console.log(data);
  let actorID = data.results[0].id;
  console.log(actorID);
  await getTwitterID(actorID);
}

// Get the social media handles from the TMDB API ----------------------------------------
async function getTwitterID(actorID) {
  let requestUrl = `https://api.themoviedb.org/3/person/${actorID}/external_ids?api_key=7fcabf766db7f48c8e77b585913f04f8&language=en-US`;
  let response = await fetch(requestUrl);
  let data = await response.json();
  console.log(data);
  instagramHandle = data.instagram_id;
  twitterHandle = data.twitter_id;
  await renderCard();
}

function renderCard() {
  let output = `    <div class="image-hover-wrapper column">
            <span class="image-hover-wrapper-banner">${characterName}</span>
              <span class="image-hover-wrapper-banner">${actorName}</span>
              <a href=""><img src="${actorImage}">
                <span class="image-hover-wrapper-reveal">
                  <p>Check it<br><i class="fab fa-twitter" aria-hidden="true">${twitterHandle}</i></p>
                </span>
              </a>
            </div>
    `;
  $(".row1").append(output);
}

// Get the names of the actor's in the film from a movie search
// Get the actor's iod from TMDB
// Plug in that ID into TBDB to get their twitter handle
// Plug that twitter handle into the twitter API

// To do:
// Get the data from the IMDB API
// 1.
