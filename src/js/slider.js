export class Slider {
  constructor( option = {}) {
    this.$el = option.el
    this.slider = option.slider
    this.interval = option.interval || 3000
    this.index = 0
    this.render()
    this.start()
  }

  render() {
    this.$el.innerHTML = `<ul class="slider-wrap"></ul><ul class="slider-tab"></ul>`
    this.$wrap = this.$el.firstElementChild
    this.$wrap.innerHTML = this.slider.map(current => 
    ` <li class="slider-item">
        <a href="${current.link}">
          <img src="${current.images}">
        </a>
      </li> `
    ).join('')
    let firstImg = this.$wrap.firstElementChild.cloneNode(true)
    this.$wrap.appendChild(firstImg)
    this.$wrap.style.width = `${(this.slider.length + 1) * 100}%`

    this.$wrap.nextSibling.innerHTML = `<li class="item active"></li>
                              <li class="item"></li>
                              <li class="item"></li>
                              <li class="item"></li>`
  }

  start() {
    setInterval(this.next.bind(this),2500)
  }

  next() {
    this.$wrap.style.transition = `transform 1s` 
    this.index += 1;
    if( this.index === (this.slider.length+1)){
      this.$wrap.style.transition = `none`
      this.$wrap.style.transform = `translate(0%)`
      this.index = 0;
      return;
    }

    if(this.index < this.slider.length){
      this.$wrap.nextSibling.children[this.index-1].classList.remove('active')
      this.$wrap.nextSibling.children[this.index].classList.add('active')
    }else {
      this.$wrap.nextSibling.children[this.slider.length-1].classList.remove('active')
      this.$wrap.nextSibling.children[0].classList.add('active')
    }
    
    this.$wrap.style.transform = `translate(-${this.index * 100 / (this.slider.length + 1)}%)`  
   
  }
}