import { MusicPlayer } from './player.js'

fetch('/src/json/rank.json')
      .then(res => res.json())
      .then(renderRank)

function renderRank(json) {
  let rank = json.data.rank;
  let $el = document.querySelector("#rank-view")
  let $ul = document.createElement("ul")
  $ul.classList.add("rank-list")

  $ul.innerHTML = rank.map(current =>
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
  $el.appendChild($ul)

  let rankList = document.querySelector('.rank-list')
  new MusicPlayer(rankList,rank)

};

