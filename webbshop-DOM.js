function Product(name, price, colour, size, id) {
  this.name = name;
  this.price = price;
  this.colour = colour; //of package
  this.size = size; // in cm
  this.id = id;
}

let potatisSal = new Product("Potatis salad", 19, "beige", 13, 1);
let milk = new Product("Laktosfri milk", 21, "blue", 20, 2);
let bread = new Product("Whole-wheat bread", 12, "brown", 20, 3);
let pizza = new Product("Kebab pizza", 35, "green", 18, 4);
let products = [potatisSal, milk, bread, pizza];

//Visa produkt enligt sin id
function getProduct(prodId) {
  if (prodId == undefined) {
    for (i = 0; i < products.length; i++) {
      console.log(products[i]);
    }
  } else if (prodId <= 0 || prodId > products.length) {
    console.log("Please enter valid product ID.")
  } else {
    console.log(products[prodId - 1]); //-1 annars får vi nästa index än den vi vill ha
  }
}


//lägga produkter i min varukorg
var myBasket = [];

function addToBasket(prodId, antal) {
  for (i = 0; i < antal; i++) {
    myBasket.push(products[prodId - 1])
  }
}

//räkna summan
function summa() {
  let sum = myBasket.reduce(function (total, product) {
    return total + product.price;
  }, 0);

  console.log("Total price is:" + " " + sum);
}

//lägga produkter i min varukorg och göra summan
function getBasket() {
  console.log(myBasket);
  myBasket.forEach(function (product) {
    console.log("Product:" + " " + product.name);
    console.log("Price:" + " " + product.price);
  })
  summa();
}

//Tömmer min varukorg på samtliga produkter
function emptyBasket() {
  myBasket.splice(0);
  console.log("Your basket is empty.");
}

///////////
//LAB 2//
//////////
var listArea = document.querySelector("#productList");
var choosePr; //global variabel
var quantity; //global variabel

//skapa knapp för att lägga produkten in i varukorgen
function buttonAdd() {
  choosePr = document.createElement("button");
  choosePr.classList.add("chooseProduct");
  choosePr.innerHTML = "Add to basket";
}

//skapa meny för att välja antal produkter
function menuQuantity() {
  quantity = document.createElement("select");
  quantity.classList.add("productQuantity");
  quantity.name = "amount";

  for (x = 0; x < 6; x++) {
    chooseQ = document.createElement("option");
    chooseQ.innerHTML = x;
    chooseQ.classList.add(x);
    quantity.appendChild(chooseQ);
  }
}

//Visa alla produkter när sidan laddas
function ready() {
  for (i = 0; i < products.length; i++) {
    let item = document.createElement("li");
    item.innerHTML = "name:" + " " + products[i].name + "<br>" + "price:" + " " + products[i].price + "<br>";
    item.id = products[i].id; //vi har en id till varje "list item", så vi kan senare hitta rätt kanpp och meny för att lägga produkter i varukorgen
    listArea.appendChild(item);
    menuQuantity();
    item.appendChild(quantity); //en meny till varje produkt
    buttonAdd();
    item.appendChild(choosePr); //en "add to basket" knapp till varje produkt
  }

}
document.addEventListener("DOMContentLoaded", ready);

//Visa produktens egenskaperna
var item = document.getElementsByTagName("li");

function showProperties(e) {
  let myItem = e.target.id - 1; // -1 för att hitta rätt index
  item[myItem].innerHTML = ""; //så att egenskaperna visas bara en gång
  for (let [key, value] of Object.entries(products[myItem])) {
    item[myItem].innerHTML += `${key}: ${value}` + "<br>";
  }

  //innerHTML ändras efter att jag visar alla egenskaperna, så jag måste lägga till menyn ock knappen igen
  menuQuantity();
  item[myItem].appendChild(quantity);
  buttonAdd();
  item[myItem].appendChild(choosePr);
}

listArea.addEventListener("click", showProperties);

//DOM add to basket; connect to method add to basket; button "add to basket" should fill the array myBasket
let add = document.getElementsByClassName("chooseProduct");
let amounts = document.getElementsByClassName("productQuantity");

// add function to select amount
function selectAmount(e) {
  let amount = `${e.target.value}`;
  console.log(amount);
  let myTarget = e.target;
  let myButtonId = myTarget.parentNode.id;
  //inner funktion för att lägga i varukorgen rätt produkten
  function addMe() {
    if (isNaN(myButtonId) == false) { //så att om parentNode är inte en produkt (eller när vi vissar alla egenskaperna
      //) inget produkt går till varukorgen
      parseInt(myButtonId);
      addToBasket(myButtonId, amount);
    }
  }
  add[myButtonId - 1].addEventListener("click", addMe);
}

listArea.addEventListener("change", selectAmount);

//DOM show basket content and total price
var show = document.getElementById("show");
var productsPrice = document.querySelector("#productsPrice");
let myItems = document.getElementById("myProducts");
let sum = document.getElementById("myPrices");

function showBasket() {
  getBasket(); //bara att se varukorgen på konsolen]
  myItems.innerHTML = "";
  myBasket.forEach(function (product) {
    let p1 = document.createElement("p");
    p1.innerHTML = "Product:" + " " + product.name;
    let p2 = document.createElement("p");
    p2.innerHTML = "Price:" + " " + product.price;
    myItems.appendChild(p1);
    myItems.appendChild(p2);
  });
  sum.innerHTML = "";
  sum.innerHTML += "Total price is:" + " " + myBasket.reduce(function (total, product) {
    return total + product.price;
  }, 0);
  sum.style.fontWeight = "bold";

}
show.addEventListener("click", showBasket);

//DOM empty basket
var empty = document.getElementById("empty");

function isEmpty() {
  emptyBasket();
  myItems.innerHTML = "";
  sum.innerHTML = "Your basket is empty";
}
empty.addEventListener("click", isEmpty);