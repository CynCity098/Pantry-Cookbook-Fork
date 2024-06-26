document.addEventListener("DOMContentLoaded", async () => {
  // Fetch user data from the server
  const response = await fetch("/user-profile");
  const userData = await response.json();

  console.log(response);
  console.log("inside profile.js...");
  console.log(userData);
  // Update the welcome message with the user's name
  const userGreeting = document.querySelector(".welcome h1");
  if (userData && userData.username) {
    userGreeting.textContent = `Welcome Back, ${userData.username}!`;
  } else {
    userGreeting.textContent = "Welcome!";
  }

  // Prep before displaying
  const container = document.getElementById("content-box");
  const tabs = document.querySelectorAll(".tabs h3");
  var selected_tab = document.getElementsByClassName("selected-tab");
  const liked_items = userData.liked;
  const fav_items = userData.faved;
  const likesHtml = document.getElementById("likes_section");
  const favesHtml = document.getElementById("faves_section");

  
  function performSearch(list, htmlElement) {
    htmlElement.innerHTML = "";
    let likesRow = document.createElement("div");
    htmlElement.innerHTML = "";
    let favesRow = document.createElement("div");
    for (let i = 0; i < list.length; i++) {
      let buildURI = "/api/id-search?";
      const recipeID = list[i];
      buildURI += `&id=${recipeID}`; //?type=public&app_id=idddddddd&app_key=keeeeeeeyyyyy
      console.log(recipeID);
      console.log(buildURI);
      fetch(buildURI, {
        method: "GET",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          display(data.hit, htmlElement);
         
          })
          .catch((error) => console.error("Error:", error));
    } //**end for loop
  }
  performSearch(liked_items, likesHtml);
  performSearch(fav_items, favesHtml);

  container.appendChild(favesHtml);
  container.appendChild(likesHtml);

  function display(result, sectHtml){
    const card = document.createElement("div");
    card.classList.add("card");

    //Create a link for each recipe
    const link = document.createElement("a");
    link.classList.add("meal-name");

    // Construct the link using the recipe ID
    link.href = result.recipe.url;
    link.target = "_blank"; // Open link in a new tab
    link.textContent = result.recipe.label

    const recipeName = document.createElement("p");
    recipeName.classList.add("meal-name");
    recipeName.id = "meal-name";
    recipeName.appendChild(link);

    // Extract the Image
    const img = document.createElement("img")
    img.classList.add("image");
    img.src = result.recipe.image;
    img.alt = recipeName.textContent;

    card.appendChild(img);
    card.appendChild(recipeName);
    sectHtml.appendChild(card);
  }


  // Change selected tab on click
  /** iterate the tabs and assign them to variables that correspond to their innerhtml.toLowerCase(); */

  const lkTab = tabs.item(0);
  const fvTab = tabs.item(1);
  console.log(lkTab);
  console.log(fvTab);

  //   const pending = document.createTextNode(". . . Brewing in the Kitchen . . .");
  //   let st = `{.hide {visibility: "hidden";}`;
  // //   pending.classList.add("brew");
  //   pending.insertRule(st,0);

  tabs.forEach((tab) => {
    tab.onclick = (e) => {
      console.log(e.target);
      console.log("clicked tab");

      // Determine Tab and Display Content
      if (e.target == lkTab) {
        console.log("liked tab if...");
        fvTab.classList.contains("selected")
          ? fvTab.classList.replace("selected", "unselected")
          : fvTab.classList.add("unselected");
        favesHtml.classList.remove("show");

        lkTab.classList.contains("unselected")
          ? lkTab.classList.replace("unselected", "selected")
          : lkTab("selected");
        //lkTab.classList.add("selected");
        likesHtml.classList.add("show");

        // pending.classList.replace("show", "hide");
        container.appendChild(likesHtml);
      } else if (e.target == fvTab) {
        console.log("fave tab if...");
        lkTab.classList.contains("selected")
          ? lkTab.classList.replace("selected", "unselected")
          : lkTab.classList.add("unselected");
        likesHtml.classList.remove("show");

        fvTab.classList.contains("unselected")
          ? fvTab.classList.replace("unselected", "selected")
          : fvTab.classList.add("selected");
        favesHtml.classList.add("show");
        container.appendChild(favesHtml);
      } else {
        // Nothing //
      }
    };
  });
  // tab.classlist.add("selected-tab");

  // if(tab.innerHTML == "Likes"){
  //container.appendChild(likesHtml);
  //     tab.classList.add("show");

  // }else if(tab.innerHTML == "Favorites"){
  //     container.appendChild(favesHtml);
  // }else{
  //container.appendChild("Build Your Personal Cookbook Here!");
  //}
});

/** search by ID */
//   "https://api.edamam.com/api/recipes/v2/{ b3b1e3e63bff8c8ac0192cdc04a992ee }?type=public&app_id=idddddddd&app_key=keeeeeeeyyyyy",

/** single uri element */
//https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_
//{the recipe URI ID}&app_id=IDDDDD&app_key=KEEEEEY

/** multiple uri element [seperated by ',' until the last one] */
//https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_{RECIPE URI},
//http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_{RECIPE URI},
//http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_{RECIPE URI}
//&app_id=iddddddd&app_key=kkkkkeeeeyyyyyy
