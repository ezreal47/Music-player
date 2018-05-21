document.addEventListener('click',function(event){
  let target = event.target
  if(target.dataset.role !== 'tab') return

  let view = document.querySelector(target.dataset.view);
  
  [].forEach.call(target.parentNode.children,child => {
    child.classList.remove('active')
  })
  target.classList.add('active')

  if(view) {
    // console.log(view.previousElementSibling)
    // console.log(view.nextSibling)

    [].forEach.call(view.parentNode.children,child => {
      child.style.display = 'none'
    })
    view.style.display = 'block'
    let player = document.querySelector("#player")
    player.style.display = "block"
  }
})
