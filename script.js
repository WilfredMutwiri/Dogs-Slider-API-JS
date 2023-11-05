let Timer;
let deleteFirstPhotoDelay;
// this function retrieves data from the dog API
async function start () {
  try {
    const response = await fetch('https://dog.ceo/api/breeds/list/all')
    const data = await response.json()
    createDogList(data.message)
  } catch (e) {
    console.log('There was an error in fetching the breed list')
  }
}
start()
// this function creates list of the dogs got from the start function
function createDogList (breedList) {
  document.getElementById('breed').innerHTML = `
<select onchange="loadByBreed(this.value)">
<option>Choose a Dog Breed</option>
${Object.keys(breedList)
  .map(function (breed) {
    return `<option>${breed}</option>`
  })
  .join(' ')}
</select>
`
}
// load every breed selected
async function loadByBreed (breed) {
  if (breed != 'Choose a Dog Breed') {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
    const data = await response.json()
    createSlideShow(data.message)
  }
}
// create the dog slideshow
function createSlideShow (images) {
  let currentPosition = 0
  clearInterval(Timer);
  clearTimeout(deleteFirstPhotoDelay);
  if (images.length >= 1) {
    document.getElementById('slideShow').innerHTML = `
<div class="slide" style="background-image: url('${images[0]}')"></div>
<div class="slide" style="background-image: url('${images[1]}')"></div>
`
  } else {
    document.getElementById('slideShow').innerHTML = `
<div class="slide" style="background-image: url('${images[0]}')"></div>
<div class="slide"></div>
`
  }
  currentPosition += 2
  if (images.length == 2) currentPosition = 0

  //   move to the next slide if images are > 2
  Timer=setInterval(nextSlide, 3000)
  function nextSlide () {
    document
      .getElementById('slideShow')
      .insertAdjacentHTML(
        'beforeend',
        `<div class="slide" style="background-image: url('${images[currentPosition]}')"></div>`
      )
   deleteFirstPhotoDelay= setTimeout(() => {
      document.querySelector('.slide').remove()
    }, 1000)
    if (currentPosition + 1 >= images.length) {
      currentPosition = 0
    } else {
      currentPosition++
    }
  }
}
