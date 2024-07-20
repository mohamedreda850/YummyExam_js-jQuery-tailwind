function openNav() {
  $(".side-nav").animate(
    {
      left: 0,
    },
    500
  );

  $(".open-nav-icon").removeClass("fa-bars");
  $(".open-nav-icon").addClass("fa-x");
  for (let i = 0; i < 5; i++) {
    $(".links li")
      .eq(i)
      .animate(
        {
          top: 0,
        },
        (i + 5) * 100
      );
  }
}

function closeNav() {
  let boxWidth = $(".side-nav .nav-tap").outerWidth();
  $(".side-nav").animate(
    {
      left: -boxWidth,
    },
    500
  );

  $(".open-nav-icon").addClass("fa-bars");
  $(".open-nav-icon").removeClass("fa-x");
  $(".links li").animate(
    {
      top: 300,
    },
    500
  );
}
closeNav();

$(".open-nav-icon").click(() => {
  if ($(".side-nav").css("left") == "0px") {
    closeNav();
  } else {
    openNav();
  }
});

$(document).ready((_) => {
    nameSearch("").then(() => {
        $(".spinner").fadeOut(500)
        $("body").css("overflow", "visible")

    })
  //get categories
  $(".categories-li").click((_) => {
    getcategorie();
    closeNav();
  });
  //get area
  $(".area-li").click((_) => {
    getArea();
    closeNav();
  });

  //ingrediants
  $(".ingredient-li").click((_) => {
    getIngredient();
    closeNav();
  });

  //search
  $(".search-li").click((_) => {
    searchInput()
    closeNav();
  });
  getCategoryMealsForHome('beef')
  $(".contact-us-li").click((_) => {
    document.querySelector(".meal-display").innerHTML = "";
    document.querySelector(".search").innerHTML = "";
    $(".meal-display")
      .html(`<div class="sm:w-full md:w-full lg:w-1/2 xl:w-1/2 2xl:w-1/2 p-2 ">
        <input
          type="text"
          class="w-full rounded-md p-2 bg-white "
          placeholder="Enter Your Name"
        />
      </div>
      <div class="sm:w-full md:w-full lg:w-1/2 xl:w-1/2 2xl:w-1/2 p-2">
        <input
          type="text"
          class="w-full rounded-md p-2 bg-white "
          placeholder="Enter Your Email"
        />
      </div>
      <div class="sm:w-full md:w-full lg:w-1/2 xl:w-1/2 2xl:w-1/2 p-2">
        <input
          type="text"
          class="w-full rounded-md p-2 bg-white "
          placeholder="Enter Your Phone"
        />
      </div>
      <div class="sm:w-full md:w-full lg:w-1/2 xl:w-1/2 2xl:w-1/2 p-2">
        <input
          type="text"
          class="w-full rounded-md p-2 bg-white "
          placeholder="Enter Your Age"
        />
      </div>
      <div class="sm:w-full md:w-full lg:w-1/2 xl:w-1/2 2xl:w-1/2 p-2">
        <input
          type="text"
          class="w-full rounded-md p-2 bg-white "
          placeholder="Enter Your Password"
        />
      </div>
      <div class="sm:w-full md:w-full lg:w-1/2 xl:w-1/2 2xl:w-1/2 p-2">
        <input
          type="text"
          class="w-full rounded-md p-2 bg-white "
          placeholder="Enter Your Repassword"
        />
      </div>

      <button type="submit" class="border border-red-800 text-red-800 rounded-md p-2 m-auto mt-4">Submit</button>`);
    closeNav();
  });
});

function displayMeals(data) {
    $(".spinner").fadeIn(500)
    let cartona = ``;
    for (let i = 0; i < data.length; i++) {
      cartona += `  <div onclick="getMeal('${data[i].idMeal}')" class=" sm:w-full md:w-full lg:w-1/2 xl:w-1/4 2xl:w-1/4 p-3 relative group">
          <img src="${data[i].strMealThumb}" class="w-full rounded-md" alt="">
          <div class=" m-3  bg-white overflow-hidden flex items-center top-[100%] text-black opacity-50 rounded-md z-10 absolute  bottom-0 right-0 left-0 group-hover:top-0 transition-all duration-500">
              <h3 class=" text-3xl textb m-3 font-medium " >${data[i].strMeal}</h3>
          </div>
      </div>`;
    }
  
    $(".meal-display").html(cartona);
    $(".spinner").fadeOut(500)
  }
  
  

async function getcategorie() {
    $(".spinner").fadeIn(500)
    document.querySelector(".meal-display").innerHTML = "";
    document.querySelector(".search").innerHTML = "";
  const api = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  const response = await api.json();

  let newRes = await response.categories;

  displaycategorie(newRes);
  $(".spinner").fadeOut(500)
}

function displaycategorie(data) {
  let cartona = ``;
  for (let i = 0; i < data.length; i++) {
    cartona += `<div onclick="getCategoryMeals('${
      data[i].strCategory
    }')" class="cursor-pointer catigory-item sm:w-full md:w-full lg:w-1/2 xl:w-1/4 2xl:w-1/4 p-3 relative group">
            <img src="${
              data[i].strCategoryThumb
            }" class="w-full rounded-md" alt="">
             <div
          class="m-3 bg-white overflow-hidden flex flex-col items-center justify-center top-[100%] text-black opacity-50 rounded-md z-10 absolute bottom-0 right-0 left-0 group-hover:top-0 transition-all duration-500"
        >
          <h3 class="text-3xl text-black m-3 font-medium ">${
            data[i].strCategory
          }</h3>
          <p class="text-center">
            ${data[i].strCategoryDescription.split(" ").slice(0, 10).join(" ")}
          </p>
        </div>
        </div>`;
    cate = data[i].strCategory;
  }

  $(".meal-display").html(cartona);
}

async function getCategoryMeals(category) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  let res = await response.json();
  console.log(res.meals);
  displayMeals(res.meals);
}
async function getCategoryMealsForHome(category) {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    let res = await response.json();
    
    displayMealsHome(res.meals);
  }
function displayMealsHome(data) {
    let cartona = ``;
    for (let i = 0; i < data.length; i++) {
      cartona += `  <div onclick="getMeal('${data[i].idMeal}')" class=" sm:w-full md:w-full lg:w-1/2 xl:w-1/4 2xl:w-1/4 p-3 relative group">
          <img src="${data[i].strMealThumb}" class="w-full rounded-md" alt="">
          <div class=" m-3  bg-white overflow-hidden flex items-center top-[100%] text-black opacity-50 rounded-md z-10 absolute  bottom-0 right-0 left-0 group-hover:top-0 transition-all duration-500">
              <h3 class=" text-3xl textb m-3 font-medium " >${data[i].strMeal}</h3>
          </div>
      </div>`;
    }
  
    $(".meal-display").html(cartona);
  }

async function getArea() {
    $(".spinner").fadeIn(500)
    document.querySelector(".meal-display").innerHTML = "";
    document.querySelector(".search").innerHTML = "";
  const api = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  const response = await api.json();
  let res = response.meals;
  displayAreas(res);
  $(".spinner").fadeOut(500)
}

function displayAreas(area) {
  let cartona = ``;
  for (let i = 0; i < area.length; i++) {
    cartona += `  <div onclick="getAreaMeals('${area[i].strArea}')" class=" sm:w-full md:w-full lg:w-1/2 xl:w-1/4 2xl:w-1/4 p-3 relative ">
        <div class="rounded-md text-center cursor-pointer">
        <i class="fa-solid fa-house-laptop fa-4x"></i>
        <h3 class="text-3xl font-bold">${area[i].strArea}</h3>
    </div>
        </div>`;
  }
  $(".meal-display").html(cartona);
}

async function getAreaMeals(area) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  let res = await response.json();
  displayMeals(res.meals);
}
//ingrediants

async function getIngredient() {
    $(".spinner").fadeIn(500)
    document.querySelector(".meal-display").innerHTML = "";
    document.querySelector(".search").innerHTML = "";
  const api = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  const response = await api.json();
  let res = response.meals;
  displayIngredient(res);
  $(".spinner").fadeOut(500)
}

function displayIngredient(ingredient) {

  cartona = ``;
  for (let i = 0; i < ingredient.length; i++) {
    let description = ingredient[i].strDescription
      ? ingredient[i].strDescription.split(" ").slice(0, 10).join(" ")
      : "Description not available";
    cartona += ` <div onclick="getIngredientsMeals('${ingredient[i].strIngredient}')"
        class="cursor-pointer sm:w-full md:w-full lg:w-1/2 xl:w-1/4 2xl:w-1/4 p-3 text-center "
      >
       <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        
          <h3 class="text-3xl text-white m-3 font-medium ">${ingredient[i].strIngredient}</h3>
          <p class="text-center">
           ${description}
          </p>
      </div>`;
  }
  $(".meal-display").html(cartona);
}

async function getIngredientsMeals(ingredients) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
  );
  let res = await response.json();
  displayMeals(res.meals);
}

// async function getHomePage(){
//     const api = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772');
//     const response = await api.json();
//     let res =response.meals[0]
//     displayMealsHome(res)
// }

async function getMeal(id) {
    $(".spinner").fadeIn(500)
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let res = await respone.json();

  displayMealDetails(res.meals[0]);
  $(".spinner").fadeOut(500)
}

function displayMealDetails(meal) {
  document.querySelector(".meal-display").innerHTML = "";

  let ingredient = ``;

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredient += `<bg-teal-300 m-2 p-1 rounded-md">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }
  let tags = meal.strTags?.split(",");
  if (!tags) tags = [];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
        <li class="bg-gray-500 m-2 p-1 rounded-md">${tags[i]}</li>`;
  }

  let cartona = `<div class="sm:w-full md:w-full lg:w-1/4 xl:w-1/4 2xl:w-1/4">
<img
  src="${meal.strMealThumb}"
  class="rounded-md w-full"
  alt=""
/>
<h2 class="mt-2 text-3xl font-semibold">${meal.strMeal}</h2>
</div>
<div class="sm:w-full md:w-full lg:w-3/4 xl:w-3/4 2xl:w-3/4 px-3">
<h2 class="text-3xl font-semibold pb-2">Instructions</h2>
<p class="py-2">${meal.strInstructions}</p>
<h3 class="text-3xl font-semibold py-2">Area : <span>${meal.strArea}</span></h3>
<h3 class="text-3xl font-semibold py-2">Category  : <span>${meal.strCategory}</span></h3>
<h3 class="text-3xl font-light py-2">Recipes   : </h3>
<ul class="flex">
${ingredient}
</ul>
<h3 class="text-3xl font-light py-2">Tags  : </h3>
<ul class="flex">
${tagsStr}
</ul>
<ul class="flex">
    <a target="_blank" class="bg-green-600 m-2 p-1 rounded-md" href="${meal.strSource}">Source</a>
    <a target="_blank" class="bg-red-700 m-2 p-1 rounded-md" href="${meal.strYoutube}">Youtube</a>

</ul>
</div>`;

  document.querySelector(".meal-display").innerHTML = cartona;
}

function searchInput() {
  document.querySelector(".search").innerHTML =`<div class="sm:w-full md:w-full lg:w-1/2 xl:w-1/2 2xl:w-1/2 p-2">
                <input onkeyup="nameSearch(this.value)" type="text"
                class="w-full rounded-md p-2 bg-black border border-white"
                placeholder="Search by name">
            </div>
            <div class="sm:w-full md:w-full lg:w-1/2 xl:w-1/2 2xl:w-1/2 p-2">
                <input onkeyup="litterSearch(this.value)" type="text"
                class="w-full rounded-md p-2 bg-black border border-white"
                placeholder="Search by litter">
            </div>`;
            document.querySelector(".meal-display").innerHTML = "";
            
}
async function nameSearch(name) {
    $(".spinner").fadeIn(200)
  document.querySelector(".meal-display").innerHTML = "";

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  let res = await response.json();

  res.meals ? displayMeals(res.meals) : displayMeals([]);
  $(".spinner").fadeOut(200)
}

async function litterSearch(litter){
    $(".spinner").fadeIn(200)
    document.querySelector(".meal-display").innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${litter}`)
    res = await response.json()

    res.meals ? displayMeals(res.meals) : displayMeals([])
    $(".spinner").fadeOut(200)
}
