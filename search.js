function onJson(json)
{
    console.log(json);
    const viewer=document.querySelector('#opere');
    viewer.innerHTML='';
    let num_results = json.total;
    if(num_results > 5)
			num_results = 5;

    for (let i = 0; i < num_results; i++)
	{
    const id=json.objectIDs[i];
    /*Prendere il tuo search e confrontare con: "http://....Id&title=search e visualizzi" */
    const url_singolo = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + id;
    fetch(url_singolo).then(onResponse).then(onJsonSingolo);
    

    console.log(id);

  }
}

function onJsonSingolo(json)
{
  console.log(json);
  const viewer = document.querySelector('#opere');

  const singolo = document.createElement('div');
		singolo.classList.add('singolo');

    const titolo = document.createElement('h1');
    titolo.textContent=json.title;

		const img = document.createElement('img');
		img.src = json.primaryImageSmall;
		
    const autore= document.createElement('p');
    autore.textContent=json.artistDisplayName;


    singolo.appendChild(titolo);
    singolo.appendChild(img);
    singolo.appendChild(autore);
    viewer.appendChild(singolo);
    


	

}


function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }


function search(event)
{
    event.preventDefault();
    const input_search= document.querySelector("#form_imagine .search"); 
    const value_search=encodeURIComponent(input_search.value);
    rest_url="https://collectionapi.metmuseum.org/public/collection/v1/search?q="+value_search;
    fetch(rest_url).then(onResponse).then(onJson);
}


const form= document.querySelector("#form_imagine");
form.addEventListener("submit",search);

//SPOTIFY


function onJsonMusic(json) {
  console.log(json);
  
  const album = document.querySelector('#album');
  album.innerHTML = '';

  const results = json.tracks.items;
  let num_results = results.length;
  
  if(num_results > 5)
    num_results = 5;

  for(let i=0; i<num_results; i++)
  {
     const track = document.createElement('div');
    track.classList.add('traccia');

    const id_music = results[i].id;
    const url_music="https://open.spotify.com/embed/track/"+id_music;
    const frame= document.createElement('iframe');
    frame.src=url_music;
    frame.width=300;
    frame.height=300;

    track.appendChild(frame);
    album.appendChild(track);
    
  }
}

function search_music(event)
{
 
  event.preventDefault();
 
  const album_input = document.querySelector('#form_music .search');
  const track_value = encodeURIComponent(album_input.value);
  console.log('Eseguo ricerca: ' + track_value);
  
  fetch("https://api.spotify.com/v1/search?type=track&q=" + track_value,
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponse).then(onJsonMusic);
}

function onTokenJson(json)
{
  
  token = json.access_token;
}

function onTokenResponse(response)
{
  return response.json();
}

// OAuth credentials --- NON SICURO!
const client_id = '141b587c70b447bd968bff2fd39a679c';
const client_secret = 'e70b20f211bc48ec9ae715329e91e20b';
// Dichiara variabile token
let token;
// All'apertura della pagina, richiediamo il token
fetch("https://accounts.spotify.com/api/token",
	{
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
   }
  }
).then(onTokenResponse).then(onTokenJson);


// Aggiungi event listener al form
const form_music = document.querySelector('#form_music');
form_music.addEventListener('submit', search_music)