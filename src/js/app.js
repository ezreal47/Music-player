import './tab.js'
import './search.js'
import './rank.js'
import { Songlist } from './songlist.js'
import { Slider } from './slider.js'

 
fetch('/src/json/all.json')
  .then(res => res.json())
  .then(render)


function render(json) {
  let slider = json.data.slider.map(child => {
    return { link: child.linkjson, images: child.imagesjson }
  })

  new Slider({
    el: document.querySelector('#slider'),
    slider
  })


  let songlist = json.data.songlist
  new Songlist({
    el: document.querySelector('.song-list'),
    songlist
  }) 
} 
  

document.getElementsByClassName('out-player')[0].addEventListener('click',function(event){
  let target = event.target
  let player = document.getElementById('player')
  player.classList.remove('show')
});


  





