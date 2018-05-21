export class Songlist {
  constructor(option = {}) {
    this.$el = option.el,
    this.songlist = option.songlist
    this.render();
  }

  render() {
    let $ul = document.createElement("ul")
    $ul.classList.add('sl-ul')
    $ul.innerHTML = this.songlist.map(current => 
      `
        <li class="sl-item">
          <a href="./playlist.html?id=${current.id}">
            <img src="${current.images}">
            <p>${current.description}</p>
          </a>
        </li> 
      `
      ).join('')
    this.$el.appendChild($ul)
  }
}

