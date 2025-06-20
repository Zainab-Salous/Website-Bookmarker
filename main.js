var siteName = document.getElementById("name");
var siteUrl = document.getElementById("url");
var submit = document.getElementById("submit");
var updateButton = document.getElementById("update");
var bookmarkList = document.getElementById("bookmarks-list");
var siteNameError = document.querySelector(".siteError");
var siteUrlError = document.querySelector(".urlError");
var siteImage = document.getElementById("siteImg");

var currentIndex ;

var bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

document.addEventListener("DOMContentLoaded", function () {
  showBookmarkList();
});



function handleAddBookmark(event) {
  event.preventDefault();
  
  var site = siteName.value.trim();
  var url = siteUrl.value.trim();

// Regular expressions for validation
var siteNamePattern=/^[a-zA-Z0-9 ]{3,}$/;
var siteUrlPattern=/^(https?:\/\/)?(www\.)?([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;

var isValid = true ;

    //validate site name and url
if(site===""){
  isValid= false;
  siteNameError.textContent = "Site name cannot be empty.";
}else if(siteNamePattern.test(site) === false){
  isValid= false;
  siteNameError.textContent = "Please enter a valid site name.";
  
}else{
  siteNameError.textContent = "";
}


if(url===""){
  isValid= false;
  siteUrlError.textContent = "Site URL cannot be empty.";
}else if(siteUrlPattern.test(url) === false){
  isValid= false;
  siteUrlError.textContent = "Please enter a valid site URL.";
}else{
  siteUrlError.textContent = "";
}

if(isValid){
    var bookmark = {
        name: site,
        url: url,
        imageSrc: siteImage.files?.[0].name,
    };

    bookmarks.push(bookmark);
localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    siteName.value = "";
    siteUrl.value = "";
    siteImage.value = "";
    showBookmarkList();
}
}



function showBookmarkList() {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

    bookmarkList.innerHTML = "";

    bookmarks.forEach((bookmark, i) => {
    var tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="siteImage w-25">
        <img src="/images/${bookmark.imageSrc ? bookmark.imageSrc : 'default.png'}" alt="Site Image" class="siteImg w-25 ">
      </td>
      <td class="siteName text-center">${bookmark.name}</td>
      <td><a class="btn btn-primary" href="https://${bookmark.url}" target="_blank"><i class="fa-solid fa-eye"></i></a></td>
      <td><button class="btn btn-danger" onclick="deleteBookmark(${i})"><i class="fa-solid fa-trash"></i></button></td>
      <td><button class="btn btn-secondary" onclick="updateBookmark(${i})"><i class="fa-solid fa-pen-to-square"></i></button></td>
    `;
    bookmarkList.appendChild(tr);
  });
}
   


 
function deleteBookmark(index) {
 bookmarks.splice(index, 1);
localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    showBookmarkList();
}


function updateBookmark(index){
  var bookmark = bookmarks[index];
    currentIndex = index;
    siteName.value = bookmark.name;
    siteUrl.value = bookmark.url;
    submit.style.display = "none";
    updateButton.style.display = "block";

}

function handleUpdateBookmark() {
    event.preventDefault();
    var bookmark = {
        name: siteName.value,
        url: siteUrl.value,
    };

bookmarks[currentIndex] = bookmark;
localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    siteName.value = "";
    siteUrl.value = "";
    siteImage.value = ""; 
    submit.style.display = "block";
    updateButton.style.display = "none";
    showBookmarkList();
}


function handleSearch(){
  var searchInput = document.getElementById("search").value.toLowerCase();
 var temp ="";
 for(var i=0; i<bookmarks.length; i++){
    if(bookmarks[i].name.toLowerCase().includes(searchInput) || bookmarks[i].url.toLowerCase().includes(searchInput)){
      temp += `<tr>
        <td class="siteImage w-25"></td>
          <img src="/images/${bookmarks[i].imageSrc ? bookmarks[i].imageSrc : 'default.png'}" alt="Site Image" class="siteImg w-25">
        </td>
        <td class="siteName text-center">${bookmarks[i].name}</td>
        
        <td><a class="btn btn-primary" href="https://${bookmarks[i].url}" target="_blank"><i class="fa-solid fa-eye"></i></a></td>
        <td><button class="btn btn-danger" onclick="deleteBookmark(${i})"><i class="fa-solid fa-trash"></i></button></td>
        <td><button class="btn btn-secondary" onclick="updateBookmark(${i})"><i class="fa-solid fa-pen-to-square"></i></button></td>
      </tr>`;
    }
  }
  document.getElementById("bookmarks-list").innerHTML = temp;
}