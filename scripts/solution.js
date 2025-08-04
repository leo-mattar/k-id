function solutionTabber() {
  const navItems = document.querySelectorAll(".c-so-nav-item");
  const tabItems = document.querySelectorAll(".c-so-tab-item");

  if (!navItems.length || !tabItems.length) return;

  navItems.forEach((navItem, index) => {
    navItem.addEventListener("click", () => {
      navItems.forEach(item => item.classList.remove("is-active"));
      tabItems.forEach(item => item.classList.remove("is-active"));
      navItem.classList.add("is-active");
      if (tabItems[index]) {
        tabItems[index].classList.add("is-active");
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  solutionTabber();
});
