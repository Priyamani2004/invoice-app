 $("#new-invoices").click(function(){
        $("#opaciti").slideToggle("slow");
        $("#invoice-page").slideToggle("slow");
    });

    $("#edits").click(function(){
      $("#opaciti").slideToggle("slow");
     $('#invoicenodes').slideToggle("slow");
 });
  
  $("#cancel").click(function(){
   $("#opaciti").slideToggle("slow");
   $('#invoicenodes').slideToggle("slow");
  })
  
   $("#cancelbtn").click(function(){
   $("#opaciti").slideToggle("slow");
   $('#wholedeletepage').slideToggle("slow");
  })

  $("#delete").click(function(){
   $("#opaciti").slideToggle("slow");
   $('#wholedeletepage').css("display","flex");
  })

 $("#discard").click(function(){
   $("#opaciti").slideToggle("slow");
        $("#invoice-page").slideToggle("slow");
    $("#clientname").val('');
    $("#clientemail").val('');
    $("#streetaddres").val('');
    $("#street1").val('');
    $("#street2").val('');
    $("#street3").val('');
    $("#createday").val('');
    $("#inp1").val('');
    $("#inp2").val('');
    $("#inp3").val('');
    $("#description").val('');
 });

 $("select.filter").change(function() {
   let selectedItem = $(this).children("option:selected").val();
   console.log(selectedItem);
   startfilter(selectedItem);
 });


 let Addelement=document.getElementById("Additems");
function createitems() {
   let Addbox = document.createElement("div");
   Addelement.appendChild(Addbox).setAttribute("id", "Addbox")
   Addbox.innerHTML = `
     <input type="text" id="textbox1" class="input1" value="" name="itemname" />
     <input type="number" id="textbox1" class="input2"  value="" name="qtynum"/>
     <input type="number" id="textbox1"  class="input3" value="" name="pricenum"/>
     <div class="aligns">
       <p class="totals" id="getptag"></p>
     </div>
     <div class="aligns" onclick="removediv(this)">
       <img src="../assets/icon-delete.svg" id="deletebtn" class="deleteimg"/>
     </div>
   </div>`;
 
   let input1 = Addbox.querySelector(".input2");
   let input2 = Addbox.querySelector(".input3");
   let getptag = Addbox.querySelector("#getptag");
 
   input1.addEventListener("input", checkInputs);
   input2.addEventListener("input", checkInputs);
 
   function checkInputs() {
     var input1Value = input1.value;
     var input2Value = input2.value;
     if (input1Value && input2Value) {
       getptag.innerText = parseInt(input1Value) * parseInt(input2Value);
     }
     else{
      getptag.innerText ="";
     }
   }
 }
 
function removediv(element){
   element.parentElement.remove();
}
 
function myFunction(){
  console.log("mani");
}

$(document).ready(function() {
   $('#inp2, #inp3').on('input', function() {
     let qty = $('#inp2').val();
     let price = $('#inp3').val();
     if(qty != "" && price != "") {
       let total = parseInt(qty) * parseInt(price);
       $('#total').text(total);
     } else {
       $('#total').text('');
     }
   });
 });
 
let maindiv=document.getElementById("maindiv");
let createdetails=document.querySelectorAll('#createboxes');
let changeptagclrs=document.querySelectorAll("#ptagclr");
let allinvoices=document.getElementById("create-newinvoice");
let changecolors=document.querySelectorAll("#detailclr");
let inputhemes=document.querySelectorAll("input");
let selectele=document.querySelector("select");
let textboxes=document.querySelectorAll("#textbox1");
let changeitems=document.querySelectorAll(".changeadditem");
let showdetails=document.getElementById("showdetail");
let themediv=document.getElementById("themediv")

function changetheme(img){
  if (img.style.backgroundImage === 'url("../assets/icon-moon.svg")') {
    localStorage.setItem("value",true)
    img.style.backgroundImage='url("../assets/icon-sun.svg")';
  }
   else {
    img.style.backgroundImage='url("../assets/icon-moon.svg")';
    localStorage.setItem("value",false)
  }
  maindiv.classList.toggle("changemain");
  createdetails.forEach(detail => {
    detail.classList.toggle("changedetail");
  });
  changeptagclrs.forEach(detail => {
    detail.classList.toggle("changeptag");
  });
  allinvoices.classList.toggle("changedetailclr");
  changecolors.forEach(detail => {
    detail.classList.toggle("replaceptag");
  });
  inputhemes.forEach(detail => {
    detail.classList.toggle("changebkclr");
  });
  selectele.classList.toggle("replacebkclr")
  textboxes.forEach(detail => {
    detail.classList.toggle("changetextbox");
  });
  changeitems.forEach(detail => {
    detail.classList.toggle("changeinputbox");
  });
  themediv.classList.toggle("showsun");
}

let currentUrl = window.location.href;
console.log(currentUrl);
if(currentUrl===`http://localhost:5132/useraddress`){
  changeblacktheme()
}

function changeblacktheme(){
  let localStorageget=localStorage.getItem("value");
  if(localStorageget==="true"){
    let getimg=document.getElementById("themediv");
    getimg.style.backgroundImage='url("../assets/icon-sun.svg")';
    let showdetailpage=document.getElementById("showdetailpage");
    showdetailpage.style.backgroundColor="#141625";
    let showdetail=document.getElementById("showdetail");
    showdetailpage.style.backgroundColor="#141625";
    let backbtn=document.getElementById("backbtn");
    backbtn.style.backgroundColor="#141625";
    let setsameclr=document.querySelectorAll("#setsameclr");
    setsameclr.forEach(detail => {
      detail.style.color="#FFFFFF"
    });
    let samebackground=document.querySelectorAll(".samebackground");
    samebackground.forEach(detail => {
      detail.style.backgroundColor="#1E2139"
    });
    let itemlist=document.getElementById("itemlist");
    itemlist.style.backgroundColor="#252945";
    let newinvoices=document.getElementById("create-newinvoice");
    newinvoices.style.backgroundColor="#252945";
    let inputhemes=document.querySelectorAll("input");
    inputhemes.forEach(detail => {
      detail.style.backgroundColor="#1E2139";
      detail.style.border="none";
      detail.style.color="#FFFFFF"
    });
    let selectele=document.querySelector("select");
    selectele.style.backgroundColor="#1E2139";
    selectele.style.color="#FFFFFF";
    selectele.style.border="none";
    let ptags=document.querySelectorAll("p");
    ptags.forEach(detail => {
      detail.style.color="#FFFFFF";
    })
    let changeclr=document.querySelectorAll(".changeclr");
    changeclr.forEach(detail => {
      detail.style.color="#FFFFFF";
      detail.style.backgroundColor="#1E2139";
    })
    let deleteele=document.getElementById("deletecontainer");
    deleteele.style.backgroundColor="#1E2139";
    let h1tag=document.getElementById("h1tag");
    h1tag.style.color="#FFFFFF";
  }
}

if(currentUrl===`http://localhost:5132/index`){
  let localStorageget=localStorage.getItem("value")
    if(localStorageget==="true"){
      let getimg=document.getElementById("themediv");
       changetheme(getimg);
    } 
  }
  
  //filter
  let filterboxes=document.getElementById("filterboxes");
  let paid=document.getElementById("paidele");
  let pending=document.getElementById("pendingele");
  let draft=document.getElementById("draftele");
  let allelement= document.querySelectorAll(".createdetail");
  
  function filtering(){
    filterboxes.style.display="block";
  }
  function applyfilter(){
    let filterarr=[];
    filterboxes.style.display="none";
    if(paid.checked==true){
      filterarr.push("Paid")
    }
    if(pending.checked==true){
      filterarr.push("Pending")
    }
    if(draft.checked==true){
      filterarr.push("Draft")
    }
    if(filterarr.length === 0){
      clearfilter();
  }
    else{
      for(let i=0; i<allelement.length; i++){
        let litext=allelement[i].childNodes[9].childNodes[0].textContent;
        if(filterarr.includes(litext)){
          allelement[i].style.display="grid";
        }
        else{
          allelement[i].style.display="none";
        }
      }
    }
    console.log(filterarr);
  }

 function clearfilter(){
  filterboxes.style.display="none";
  paid.checked=false;
  pending.checked=false;
  draft.checked=false;
  for(let i=0; i<allelement.length; i++){
    allelement[i].style.display="grid";
  }
  }