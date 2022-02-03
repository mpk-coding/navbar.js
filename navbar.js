const navBar = () => {
  console.log("===\nnavbar.js imported!");
  const nav = document.querySelector("header > nav");
  const navList = nav.querySelector(".nav__list");
  const dropdowns = document.querySelectorAll("header .nav__dropdown");
  //
  // DEFS
  //
  const onScrollSticky = () => {
    //
  };
  //
  const addDropdownCarets = () => {
    //
    dropdowns.forEach((dropdown) => {
      const caret = document.createElement("span");
      const caretContent = document.createTextNode("^");
      caret.setAttribute("class", "nav__caret");
      caret.append(caretContent);
      dropdown.parentElement.append(caret);
      //
    });
    //
  };
  //
  const dropdownHandler = (event) => {
    //
    const closeCurrentLevelDropdowns = (event) => {
      const root =
        event.target.parentElement === navList
          ? navList
          : event.target.parentElement;
      //
      const dropdowns = root.querySelectorAll(".nav__dropdown");
      //
      dropdowns.forEach((dropdown) => {
        //  close every dropdown except for the event.target relevant one
        //  so as not to close the one that is supposed to be opened
        if (dropdown.parentElement !== event.target) {
          dropdown.classList.remove("show");
        }
        //
      });
      //
    };
    //
    const closeAllDropdowns = (event) => {
      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove("show");
        //
      });
      //
    };
    //
    const clickHandler = (event) => {
      const isDropdown = Array.from(dropdowns).find((dropdown) => {
        return event.target === dropdown.parentElement;
        //
      });
      //
      if (isDropdown) {
        closeCurrentLevelDropdowns(event);
        //
        isDropdown.classList.toggle("show");
        //
      }
      //
    };
    //
    const mouseoverHandler = (event) => {
      closeCurrentLevelDropdowns(event);
      //
    };
    //
    const mouseleaveHandler = (event) => {
      closeAllDropdowns(event);
      //
    };
    //
    if (event.type === "click") {
      clickHandler(event);
      //
    }
    //
    if (event.type === "mouseover") {
      mouseoverHandler(event);
      //
    }
    //
    if (event.type === "mouseleave") {
      mouseleaveHandler(event);
      //
    }
    //
  };
  //
  const initNav = () => {
    //
    addDropdownCarets();
    //
    nav.addEventListener("click", (event) => {
      dropdownHandler(event);
      //
    });
    //
    nav.addEventListener("mouseover", (event) => {
      dropdownHandler(event);
      //
    });
    //
    nav.addEventListener("mouseleave", (event) => {
      dropdownHandler(event);
      //
    });
    //
  };
  //
  initNav();
  //
};

window.onload = (event) => {
  navBar();
};
