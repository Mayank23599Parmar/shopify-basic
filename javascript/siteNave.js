class siteNavJs {
    constructor() {
      this.menuHover();
      this.menuClick();
    }
    menuClick = () => {
      $(".has-child-click.li>a").click(function (e) {
        e.stopPropagation();
        e.preventDefault();
        let parent = $(this).closest(".has-child-click");
        $(".has-child-click.li .child-menu").not($(".child-menu", parent)).hide();
        $(".child-menu", parent).toggle();
      });
      $(".has-child-click.li .child-menu").click(function (e) {
        e.stopPropagation();
      });
      $(document).click(function (e) {
        e.stopPropagation();
      });
    }
    menuHover = () => {
      document.querySelectorAll(".has-child.li").forEach(item => {
        item.addEventListener("mouseenter", function (event) {
          let menuItem = item.querySelector(".child-menu");
          menuItem.style['display'] = 'block';
        });
      })
      document.querySelectorAll(".has-child.li").forEach(item => {
        item.addEventListener("mouseleave", function (event) {
          let menuItem = item.querySelector(".child-menu");
          menuItem.style['display'] = 'none';
        });
      })
    }
  }
  export default siteNavJs;