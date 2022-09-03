
//:: 2. loadPhone e j parameter pathano hoisilo oita ekhne search field e add kore data ante hobe.
const loadPhones = (phoneName) =>
{
   fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneName}`)
   .then(res => res.json())
   .then(datas => showPhones(datas.data))
}

// :: 3. data gulo shopPhone function e eshe oi data gulo die html e value show korbo.
function showPhones(phones)
{
  
  if(phones == '')
  {
    Swal.fire('Given Wrong Input')
  }
  else
  {
    
  const phoneContainer = document.getElementById('listPhone')
  phoneContainer.innerHTML = ''
  phones.forEach(phone => {
    const phoneDiv = document.createElement('div')
    phoneDiv.classList.add('col')
    phoneDiv.innerHTML = 
  `
    <div class="card pt-4">
    <div class="d-flex justify-content-center">
    <img class=''   src="${phone.image}" class="card-img-top  " alt="...">
    </div>
    <div class="card-body">
    <h3 class="text-center" >${phone.brand}</h3>
      <h5 class="card-title">${phone.phone_name}</h5>
      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <button  onclick="showDetailed('${phone.slug}')" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#phoneModal" >Show Details</button>
    </div>
  </div>
    `
    phoneContainer.appendChild(phoneDiv)
  });
  
  }
  //loadspinner ekhane shesh hobe.
  loadSpinner(false)
}


//:::1.search button e click korle ei finction e input er value nie loadPhones function e pathabe
 const searchButton = document.getElementById('searchButton')
 searchButton.addEventListener('click',function()
 {
  //spinner will start from here
  loadSpinner(true)
  const searchInput = document.getElementById('searchInput')
  const searchInputValue = searchInput.value;
  loadPhones(searchInputValue)
 })


 ///load spinner function 
function loadSpinner(result)
{
  const spinner = document.getElementById('loadSpinner')
  if(result)
  {
     spinner.classList.remove('d-none')
  }
  else
  {
    spinner.classList.add('d-none')
  }
}

//show details functionality
function showDetailed(code)
{
  fetch(`https://openapi.programming-hero.com/api/phone/${code}`)
  .then(res => res.json())
  .then(detailedPhone => modalContent(detailedPhone.data))
}

const modalContent = phoneModalData =>
{
  console.log(phoneModalData)
  const modalHeader = document.getElementById('phoneModalHeader')
  modalHeader.innerHTML = `<h4 style="color:red;"  >${phoneModalData.name}</h4>`
  const modalBody = document.getElementById('modalBody')
  modalBody.innerHTML =
  `
  <div class="d-flex justify-content-center img-magnifier-container">
  <img id="myimage" src=${phoneModalData.image} >
  </div>
  <p><b>Storage :</b> ${phoneModalData.mainFeatures.storage}</p>
  <p><b>Display Size :</b>${phoneModalData.mainFeatures.displaySize}</p>
  <p><b>ChipSet :</b>${phoneModalData.mainFeatures.chipSet}</p>
  <p><b>Memory :</b>${phoneModalData.mainFeatures.memory}</p>
  `
  magnify("myimage", 3);
}


function magnify(imgID, zoom) {
  var img, glass, w, h, bw;
  img = document.getElementById(imgID);
  /*create magnifier glass:*/
  glass = document.createElement("DIV");
  glass.setAttribute("class", "img-magnifier-glass");
  /*insert magnifier glass:*/
  img.parentElement.insertBefore(glass, img);
  /*set background properties for the magnifier glass:*/
  glass.style.backgroundImage = "url('" + img.src + "')";
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
  bw = 3;
  w = glass.offsetWidth / 2;
  h = glass.offsetHeight / 2;
  /*execute a function when someone moves the magnifier glass over the image:*/
  glass.addEventListener("mousemove", moveMagnifier);
  img.addEventListener("mousemove", moveMagnifier);
  /*and also for touch screens:*/
  glass.addEventListener("touchmove", moveMagnifier);
  img.addEventListener("touchmove", moveMagnifier);
  function moveMagnifier(e) {
    var pos, x, y;
    /*prevent any other actions that may occur when moving over the image*/
    e.preventDefault();
    /*get the cursor's x and y positions:*/
    pos = getCursorPos(e);
    x = pos.x;
    y = pos.y;
    /*prevent the magnifier glass from being positioned outside the image:*/
    if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
    if (x < w / zoom) {x = w / zoom;}
    if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
    if (y < h / zoom) {y = h / zoom;}
    /*set the position of the magnifier glass:*/
    glass.style.left = (x - w) + "px";
    glass.style.top = (y - h) + "px";
    /*display what the magnifier glass "sees":*/
    glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
  }
  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    /*get the x and y positions of the image:*/
    a = img.getBoundingClientRect();
    /*calculate the cursor's x and y coordinates, relative to the image:*/
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /*consider any page scrolling:*/
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }
}



