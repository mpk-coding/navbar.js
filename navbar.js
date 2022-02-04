const navBar = () => {
  console.log("===\nnavbar.js imported!");
  // preferably configurable and flexible in the future (use of .contains() instead of .parentElement)
  const nav = document.querySelector("header > nav");
  const navList = nav.querySelector(".nav__list");
  const dropdowns = document.querySelectorAll("header .nav__dropdown");
  const supportedEvents = [
    {
      event: "click",
      handler: (event) => {
        const isDropdown = Array.from(dropdowns).find((dropdown) => {
          return event.target === dropdown.parentElement;
        });
        if (isDropdown) {
          closeCurrentLevelDropdowns(event);
          isDropdown.classList.toggle("show");
        }
      },
    },
    {
      event: "mouseover",
      handler: (event) => {
        closeCurrentLevelDropdowns(event);
      },
    },
    {
      event: "mouseleave",
      handler: (event) => {
        closeAllDropdowns(event);
      },
    },
  ];
  const addDropdownCarets = () => {
    dropdowns.forEach((dropdown) => {
      const caret = document.createElement("span");
      const caretContent = document.createTextNode("^");
      caret.setAttribute("class", "nav__caret");
      caret.append(caretContent);
      dropdown.parentElement.append(caret);
    });
  };
  const closeCurrentLevelDropdowns = (event) => {
    const root =
      event.target.parentElement === navList
        ? navList
        : event.target.parentElement;
    const dropdowns = root.querySelectorAll(".nav__dropdown");
    Array.from(dropdowns).find((dropdown) => {
      return (
        dropdown.parentElement !== event.target &&
        dropdown.classList.remove("show")
      );
    });
  };
  const closeAllDropdowns = (event) => {
    Array.from(dropdowns).map((dropdown) => {
      return dropdown.classList.remove("show");
    });
  };
  const dropdownHandler = (event) => {
    supportedEvents.find((triggeredEvent) => {
      return (
        triggeredEvent.event === event.type && triggeredEvent.handler(event)
      );
    });
  };
  const initNav = () => {
    addDropdownCarets();
    supportedEvents.map((supportedEvent) => {
      return nav.addEventListener(supportedEvent["event"], dropdownHandler);
    });
  };
  return initNav();
};

window.onload = (event) => {
  navBar();
};
