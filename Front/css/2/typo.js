/* const view1 = document.getElementById("cafe");
console.log(view1);

const view2 = document.querySelector(".box");//#forid - .forclass - nothingfortag
console.log(view2);

const views = document.getElementsByClassName("column2");
console.log(views);
 */
// const box2 = document.querySelector(".box2");


const header = document.querySelector("header");
header.innerHTML = "<h1>Welcome to my website</h1>";

header.style.justifyContent = "space-evenly";

const box = document.querySelector(".box1");
box.style.backgroundColor = "lightblue";
box.style.padding = "20px";
box.style.borderRadius = "10px";

console.log(box);




const dosomething = () =>{

alert("Hello, World!"); 
}

const h2 = document.querySelector("h2");
h2.addEventListener("click", dosomething, false);


const img = document.querySelector("img");
img.setAttribute("src", "pet.jpg");






const input = document.querySelector("#username");

input.addEventListener("input", () => {
  console.log(input.value);
});




localStorage.setItem("username", "Ali");

const user = localStorage.getItem("username");
console.log(user);




const user1 = {
  name: "Ali",
  age: 22
};

console.log(localStorage.setItem("user1", JSON.stringify(name)));



/* module

import { formatName } from "./utils.js";

console.log(formatName("  ALI  "));
 */


function greet(name) {
  return `Hi ${name}`;
}

function processUserInput(callback) {
  const name = "Ali";
  console.log(callback(name));
}

processUserInput(greet);





function greet(nikname){
  return `hey ${nikname}`
}

function processUserInput(call){
  const nikname = "Navid"
  console.log(call(nikname))
}

processUserInput(greet);

const numbers = [1, 2, 3];

numbers.forEach((num) => {
  console.log(num);
});


const users2 = [
  { id: 1, name: "Ali" },
  { id: 2, name: "Sara" }
];

const user2 = users2.find((item) => item.id === 2);
console.log(user2);




function multiplier(factor) {
  return function (number) {
    return number * factor;
  };
}

const double = multiplier(3);
console.log(double(6));



const nums = [1, 2, 3, 4];

const sum = nums.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);

console.log(sum);





/* async function getPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  console.log(data);
}

getPosts();
 */



/* const checkBalance = (price) => {
  
  return new Promise((resolve, reject) => {
    
    const myMoney = 50000; // موجودی ما ۵۰ هزار تومان
    console.log("در حال بررسی موجودی حساب...");

    setTimeout(() => {
      if (myMoney >= price) {
        resolve("پرداخت با موفقیت انجام شد.");
      } else {
        reject("موجودی حساب کافی نیست!");
      }
    }, 1500);
  });
};

// خرید یک محصول ۴۰ هزار تومانی:
checkBalance(40000)
  .then((res) => console.log("نتیجه خرید:", res))
  .catch((err) => console.log("خطا:", err)); */



/* 

  const getGPSLocation = new Promise((resolve, reject) => {
    const gpsEnabled = true; // فرض کنید GPS فعال است
    console.log("در حال بررسی وضعیت GPS...");

    
      
    setTimeout(() => {
      if (gpsEnabled) {
      resolve("موقعیت مکانی با موفقیت دریافت شد.");
    } else {
      reject("GPS فعال نیست!");
    } 1500});


    getGPSLocation
      .then((res) => console.log("نتیجه دریافت موقعیت مکانی:", res))
      .catch((err) => console.log("خطا:", err));
  }
) */

  

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => {
    // ابتدا چک می‌کنیم سرور پاسخ درستی داده یا نه (مثلا خطای 404 نداده باشد)
    if (!response.ok) {
      throw new Error("شبکه پاسخی نداد.");
    }
    return response.json(); // تبدیل پاسخ به آرایه‌ای از آبجکت‌ها
  })

  .then((users) => {
    console.log("لیست کاربران دریافت شد:");
    console.log(users); // چاپ لیست کاربران در کنسول
  })
  .catch((error) => {
    console.error("مشکلی در دریافت اطلاعات وجود دارد:", error);
  });




  async function getUserAndTheirAlbums(userId) {
      
    try {
        // مرحله اول: گرفتن اطلاعات کاربر
        
        const userRes = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

        const user = await userRes.json();

        console.log(`کاربر پیدا شد: ${user.name}`);
        
        // مرحله دوم: استفاده از شناسه کاربر برای گرفتن آلبوم‌هایش
        
        const albumRes = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
       
        const albums = await albumRes.json();
        
        console.log(`تعداد آلبوم‌های این کاربر: ${albums.length}`);
      } catch (error) {
        console.log("خطا در عملیات دو مرحله‌ای:", error);
      }
}

getUserAndTheirAlbums(4);




// \d به معنی ارقام (0-9) است. 
// فلگ g مخفف global است، یعنی کل متن را بگرد و با پیدا کردن اولین مورد متوقف نشو.
const digitPattern = /\d/g;

const sentence = "در سال 2026، من 26 ساله خواهم شد.";
const result = sentence.match(digitPattern);

console.log(result); 
// خروجی یک آرایه است: ['2', '0', '2', '6', '2', '6']




const cartPrices = [100, 250, 400, 50];

// accumulator: مقداری که تا این لحظه جمع شده (انباره)
// currentValue: عدد فعلی که در این دور از حلقه از آرایه برداشته شده
const totalPrice = cartPrices.reduce((accumulator, currentValue) => {
    console.log(`تا الان: ${accumulator} + عدد فعلی: ${currentValue}`);
    return accumulator + currentValue;
}, 0); // عدد 0 مقدار اولیه accumulator است

console.log("مجموع نهایی:", totalPrice); // خروجی: 800

/* 
تحلیل مراحل:
دور اول: 0 + 100 = 100
دور دوم: 100 + 250 = 350
دور سوم: 350 + 400 = 750
دور چهارم: 750 + 50 = 800
*/

