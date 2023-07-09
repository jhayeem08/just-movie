var apiKey = "533313cc880a2148c77843e769ec1a97";
const apiRoot = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US%7Cen&with_original_language=en&api_key=${apiKey}`
const query = getQuery()
var genreId = query.id;
let pageNo = Number(query.page || 1)
getQuery()
const resultContentDiv = document.querySelector('#result-content')
const imgPathRoot = `https://image.tmdb.org/t/p/w500`

// const nextPageLink = document.querySelector('#next-page-link')
// nextPageLink.href = `/moviegenre.html?genre=${genreId}&page=${Number(pageNo)+1}`
// const prevPageLink = document.querySelector('#prev-page-link')
// prevPageLink.href = `/moviegenre.html?genre=${genreId}&page=${Number(pageNo)-1}`

renderPaginationLinks()
function renderPaginationLinks() {
  const paginationNav = document.querySelector('#pagination-nav')
  if (pageNo > 1) {
    let prevButton = document.createElement('a')
    prevButton.innerText = 'prev'
    prevButton.href = `/moviegenre.html?genre=${genreId}&page=${Number(pageNo)-1}`
    paginationNav.append(prevButton)
  }

  let amtPrev = pageNo - 1 > 3 ? 3 : pageNo - 1

  console.log(pageNo, amtPrev)

  for (i=0;i<amtPrev;i++) {
    let pageButton = document.createElement('a')
    pageButton.innerText = (pageNo-amtPrev)+i
    pageButton.href = `/moviegenre.html?genre=${genreId}&page=${(pageNo-amtPrev)+i}`
    paginationNav.append(pageButton)
  }

  let currentPage = document.createElement('a')
  currentPage.innerText = pageNo
  currentPage.classList.add('current-page')
  paginationNav.append(currentPage)

  for (i=0;i<3;i++) {
    let pageButton = document.createElement('a')
    pageButton.innerText = pageNo+1+i
    pageButton.href = `/moviegenre.html?genre=${genreId}&page=${pageNo+i+1}`
    paginationNav.append(pageButton)
  }
  
  let nextButton = document.createElement('a')
  nextButton.innerText = 'next'
  nextButton.href = `/moviegenre.html?genre=${genreId}&page=${Number(pageNo)+1}`
  paginationNav.append(nextButton)
}

//movie details by genre
function getMovieByGenre(genre) {

  let apiUrl = apiRoot + `&page=${pageNo}&with_genres=${genre}`

  // console.log(apiUrl);

  fetch(apiUrl, { cache: "reload" })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          displayMoviePosters(data);
        });
      } else {
        // alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      // alert('Unable to connect to Fetch');
    });
};

getMovieByGenre(genreId);

// ?id=49&page=5&rating=pg13

function displayMoviePosters(data) {
  data.results.forEach(movie => {
    resultContentDiv.innerHTML += `
    <a class='movie-poster' href="/moviedetails.html?id=${movie.id}">
      <img src="${imgPathRoot+movie.poster_path}">
      <h3>${movie.original_title}</h3>
    </a>
    `
  })
}

function getQuery() {
  return Object.fromEntries(location.search.replace('?','').split('&').map(x=>x.split('=')))
}


/* {
  "genres": [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]
*/