import { blackBgClose, blackBgOpen } from './helper';
class mobileMenu {
  constructor() {
    this.clickEvent();
    this.headerFixed()
  }
  headerFixed = () => {
    window.onscroll = function () { myFunction() };

    // Get the header
    var header = document.querySelector(".small-header");

    // Get the offset position of the navbar
    var sticky = header.offsetTop;

    // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function myFunction() {
      if (window.pageYOffset > sticky) {
        header.classList.add("fixed");
      } else {
        header.classList.remove("fixed");
      }
    }
  }
  clickEvent = () => {
    const that = this;
    /* open mobile menu */
    $(".mobile-menu-btn").click(function (e) {
      e.stopPropagation();
      that.openMobileMenu();
    });
    /* close mobile menu */
    $(".mobile-back-drop").click(function () {
      that.closeMobileMenu();
    });
    /* open second submenu */
    $(document).on("click", "#mobile-drawer .child-li", function (e) {
      e.stopPropagation();
      var li = $(this);
      $(".link-data", li).slideToggle();
    });
    /* open thid submenu */
    $(document).on("click", "#mobile-drawer .li .icon-wrap", function (e) {
      e.stopPropagation();
      $("span", $(this)).toggleClass("hide");
      $(this).parent().next(".child-menu").slideToggle();
    });
    /* to prevent anchor tag click */
    $(document).on("click", "#mobile-drawer .li a", function (e) {
      e.stopPropagation();
    });
  }

  openMobileMenu = () => {
    $("#mobile-drawer").addClass("active");
    let backdrop = document.querySelector(".mobile-back-drop");
    let pageHeight = document.querySelector(".main_page").clientHeight
    if (pageHeight) {
      backdrop.style.height = `${pageHeight}px`
    }
    if (!backdrop.classList.contains("active")) {
      document.querySelector(".mobile-back-drop").classList.add("active")
    }
    blackBgOpen();
  }

  closeMobileMenu = () => {
    $("#mobile-drawer").removeClass("active");
    blackBgClose();
    let backdrop = document.querySelector(".mobile-back-drop")
    backdrop.style.height = `${0}px`
    if (backdrop.classList.contains("active")) {
      document.querySelector(".mobile-back-drop").classList.remove("active")
    }
  }

}
new mobileMenu;