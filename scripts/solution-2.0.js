function solutionTabber() {
  const navItems = document.querySelectorAll(".c-so-nav-item");
  const tabItems = document.querySelectorAll(".c-so-tab-item");

  if (!navItems.length || !tabItems.length) return;

  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  function activateTab(index) {
    if (index >= 0 && index < navItems.length && index < tabItems.length) {
      navItems.forEach(item => item.classList.remove("is-active"));
      tabItems.forEach(item => item.classList.remove("is-active"));
      navItems[index].classList.add("is-active");
      tabItems[index].classList.add("is-active");
    }
  }

  navItems.forEach((navItem, index) => {
    navItem.addEventListener("click", () => {
      activateTab(index);
    });
  });

  const tabParam = getQueryParam("tab");
  if (tabParam) {
    const tabIndex = parseInt(tabParam, 10);
    if (!isNaN(tabIndex)) {
      activateTab(tabIndex);
      return;
    }

    const tabMapping = {
      regulatory: 0,
      market: 1,
      map: 2,
      neimo: 3,
    };

    if (tabMapping.hasOwnProperty(tabParam)) {
      activateTab(tabMapping[tabParam]);
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  solutionTabber();
});
