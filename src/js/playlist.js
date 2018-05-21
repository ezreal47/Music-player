import { MusicPlayer } from './player.js';


fetch('/src/json/all.json')
  .then(res => res.json())
  .then(renderplaylist)

function renderplaylist(json) {
  let { songs, songlist } = json.data
  let $el = document.querySelector(".songs")
  let $ul = document.createElement("ul")
  $ul.classList.add("rank-list")

  
  let id = parseInt(location.search.match(/\bid=([^&]*)/)[1])

  let cover = songlist.filter(item => {
    return item.id === id
  })[0]

  let $head = document.querySelector('.head-content');
  $head.innerHTML = `
            <div class="head-content">
              <img src=${cover.images} alt="">
              <p class="description">${cover.description}</p>
            </div>
          `

  document.querySelector('.head-bg').style.backgroundImage = `url(${cover.images})`;


  $ul.innerHTML = songs.map(current =>
    `
      <li class="rank-item" data-num="${current.num}">
        <div class="rank-num" data-num="${current.num}">${current.num}</div>
        <div class= "rank-content" data-num="${current.num}">
          <div class="songname" data-num="${current.num}">${current.songname}</div>
          <div class="singer" data-num="${current.num}">${current.singer}</div>
          <svg class="play" data-num="${current.num}">
            <use xlink:href="#icon-custom-toplay"></use>
          </svg>
        </div>
      </li>
    `
  ).join('')
  $el.appendChild($ul);

  let rankList = document.querySelector('.rank-list')
  new MusicPlayer(rankList, songs)
}


document.getElementsByClassName('out-player')[0].addEventListener('click', function (event) {
  let target = event.target
  let player = document.getElementById('player')
  player.classList.remove('show')
});





