import { MusicPlayer } from './player.js'

fetch('/src/json/rank.json')
  .then(res => res.json())
  .then(res => {
    let datarank = res.data.rank
    let $output = document.querySelector(".output")
    let timer = undefined
    let cleanButton = document.querySelector('.icon-clean')

    document.querySelector("#searchSong").addEventListener("input", function (event) {     
      let value = event.target.value
      cleanButton.classList.add('active')
      cleanButton.addEventListener('click',function(){
        document.querySelector('.icon-clean').classList.remove('active')
        document.querySelector('#searchSong').value = '';
        $output.innerHTML = "";       
      })     
      

      if(timer){
        clearTimeout(timer)
      }

      
      timer = setTimeout(function () {        
        $output.innerHTML = ""      
        search(value, datarank).then(result => {
          timer = undefined
          if (result.length !== 0) {
            for(let i=0;i<result.length;i++){
              let li = document.createElement('li')
              li.innerText = result[i].songname
              li.dataset.num = result[i].num
              $output.appendChild(li)
            }  
          } else {
            $output.innerHTML = `<li>没有结果</li>`
          }
        })
      }, 400)
    })
    new MusicPlayer($output,datarank)
  })



function search(keyword, data) {
 
  return new Promise((resolve, reject) => {
    if(keyword == ''){
      document.querySelector('.icon-clean').classList.remove('active')
      return;
    }
   
    let result = data.filter(item => {
      return item.songname.indexOf(keyword) >= 0
    })
  
    // resolve(result)
    setTimeout(() => {
      resolve(result)
    }, (Math.random() * 200 + 400))
  })
}


