export class MusicPlayer {
  constructor(el,data) {
    this.$el = el
    this.tigger(data)
  }

  tigger(data) {
    this.$el.addEventListener('click', function (event) {
      let target = event.target
       let player = document.getElementById('player')
      player.classList.add('show')
      let dataNum = target.dataset.num

     
      let currentNode = data.filter(object => {
        if (object.num == dataNum) {
          return object;
        }
      })
      
      let Node = currentNode[0]
      let { url, lyric, songname, singer } = Node
    
      document.querySelector('#player').querySelector('.songname').innerText = songname;
      document.querySelector('#player').querySelector('.singer').innerText = singer;

      // 删除歌词
      let linesNode = document.querySelector('.lines')
      if (linesNode.children.length > 1) {
        linesNode.innerHTML = "";
        this.parseLyric(lyric);
      } else this.parseLyric(lyric);


      if (document.querySelector('.targetAudio')) {
        let audio = document.querySelector('.targetAudio')
        audio.src = url;
        audio.play();
      } else this.initPlayer(url)
    }.bind(this))
  }



  initPlayer(url) {
    let audio = document.createElement('audio')
    audio.src = url
    audio.classList.add('targetAudio')
    document.body.appendChild(audio);
    audio.play();

    document.querySelector('.icon-pause').addEventListener('click', function () {
      audio.pause();
      document.querySelector('.pause').classList.add('playing')
    })

    document.querySelector('.icon-play').addEventListener('click', function () {
      audio.play();
      document.querySelector('.pause').classList.remove('playing')
    })

    setInterval(() => {
      let seconds = audio.currentTime
      let minutes = ~~(seconds / 60)
      let remainder = seconds - minutes * 60
      let time = `${this.pad(minutes)}:${this.pad(remainder)}`
      let lines = document.querySelector('.lines')

      for (let i = 0; i < lines.children.length; i++) {
        let currentLineTime = lines.children[i].dataset.time;
        let nextLineTime = lines.children[i + 1].dataset.time;

        if (lines.children[i + 1] !== undefined && currentLineTime < time && time < nextLineTime) {
          let top = lines.children[i].offsetTop
          let lineTop = lines.offsetTop
          let delta = top - lineTop
          lines.style.transform = `translateY(-${delta}px)`
          lines.children[i].classList.add('active')
          if (lines.children[i].previousElementSibling) {
            lines.children[i].previousElementSibling.classList.remove('active')
          }
          break;
        }
      }
    }, 300)
  }

  pad(number) {
    return number >= 10 ? number + "" : "0" + number
  }


  parseLyric(lyric) {
    let array = lyric.split('\n')
    let regex = /^\[(.+)\](.*)$/
    array = array.map(string => {
      let matches = string.match(regex)
      if (matches) {
        return { time: matches[1], words: matches[2] }
      }
    })
    array.map(object => {
      if (!object) { return }
      let $container = document.querySelector('.lyric')
      let $p = document.createElement('p')
      $p.setAttribute("data-time", object.time)
      $p.innerText = object.words
      $container.children[0].appendChild($p)
    })
  }
}