Fancybox.bind("[data-fancybox]", {
  // Your custom options
});

//подсветка активного пункта меню:---------------------------------------------------------
const body = document.querySelector("body");
const page = body.getAttribute("data-page");
const navLinks = document.querySelectorAll(".nav__link");
navLinks.forEach((item) => {
  if (item.getAttribute("href") === `${page}.html`) {
    item.classList.add("nav__link_active");
  }
});

const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  allowTouchMove: true,
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// -------------------------------------------- start popup: ---------------------------------------------
const popupLinks = document.querySelectorAll(".popup-link");
const lockPadding = document.querySelectorAll(".lock-padding");
// const btn = document.querySelector(".project-btn");

let unlock = true;
const timeout = 800;

if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener("click", function (e) {
      const popupName = popupLink.getAttribute("href").replace("#", "");
      const curentPopup = document.getElementById(popupName); //получаем id попап-окна
      popupOpen(curentPopup);
      e.preventDefault();
    });
  }
}

const popupCloseIcon = document.querySelectorAll(".popup-close");
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index];
    el.addEventListener("click", function (e) {
      popupClose(el.closest(".popup")); //ближайший родитель класса popup
      e.preventDefault();
    });
  }
}

function popupOpen(curentPopup) {
  if (curentPopup && unlock) {
    const popupActive = document.querySelector(".popup.open");
    if (popupActive) {
      // закрываем текущий открытый попап, если он есть
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    // console.log(curentPopup);
    curentPopup.classList.add("open");
    curentPopup.addEventListener("click", function (e) {
      if (!e.target.closest(".popup__content")) {
        // если клик был по области вокруг попапа то ничего не делаем
        popupClose(e.target.closest(".popup"));
      }
    });
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove("open");
    if (doUnlock) {
      bodyUnLock();
    }
  }
}

// добавляем боди padding-right при открытии попапа, на ширину скролл-бара
function bodyLock() {
  const lockPaddingValue =
    window.innerWidth - document.querySelector(".header").offsetWidth + "px";
  // console.log(lockPaddingValue);
  for (let index = 0; index < lockPadding.length; index++) {
    const el = lockPadding[index];
    el.style.marginRight = lockPaddingValue;
    // console.log(el.style.marginRight);
  }
  body.style.paddingRight = lockPaddingValue;
  // console.log(body.style.paddingRight);
  body.classList.add("lock");

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnLock() {
  setTimeout(function () {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.marginRight = "0px";
    }
    body.style.paddingRight = "0px";
    body.classList.remove("lock");
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const popupActive = document.querySelector(".popup.open");
    popupClose(popupActive);
  }
});
// -------------------------------------------- end popup: ---------------------------------------------

// -------------------------------------------- start gallery: ---------------------------------------------
// const previews = document.querySelectorAll(".plans__item");

// if (previews) {
//   previews.forEach((item) => {
//     item.addEventListener("click", function () {
//       const imgBox = document.querySelector(".plans__img").querySelector("img");
//       const img = item.querySelector("img").getAttribute("src");
//       imgBox.setAttribute("src", img);
//     });
//   });
// }

// -------------------------------------------- end gallery: ---------------------------------------------

// -------------------------------------------- start btn_montage: ---------------------------------------------

// -------------------------------------------- end btn_montage ---------------------------------------------

// -------------------------------------------- start корзина: ---------------------------------------------

const headerCartBtn = document.querySelector(".btn__cart");
if (headerCartBtn) {
  function setCartActive() {
    headerCartBtn.classList.add("btn__cart_active");
  }
  function setCartEmpty() {
    headerCartBtn.classList.remove("btn__cart_active");
  }
  headerCartBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "cart.html";
  });
}

const cartItemDelBtns = document.querySelectorAll(".card__del-btn");
if (cartItemDelBtns) {
  cartItemDelBtns.forEach((item) => {
    const el = item.closest(".cart__card");
    item.addEventListener("click", function (e) {
      e.preventDefault();
      el.remove();
      getTotalCost();
    });
  });
}

const cartCards = document.querySelectorAll(".cart__card");

if (cartCards.length) {
  // console.log(cartCards);
  const btnMontage = document.querySelectorAll(".btn_montage");
  if (btnMontage) {
    btnMontage.forEach((item) => {
      // изменение вида кнопки при клике:
      item.addEventListener("click", function () {
        item.classList.toggle("btn_montage_active");
        // const cost = item.closest(".cart__card").querySelector(".card__cost");
        // let quontity = item
        //   .closest(".cart__card")
        //   .querySelector(".card__counter-value").value;
        // console.log(quontity);
        getTotalCost();
      });
    });
  }

  cartCards.forEach((item) => {
    // счетчик количества карточек в корзине:
    const plus = item.querySelector(".card__counter-btn_plus");
    const minus = item.querySelector(".card__counter-btn_minus");
    const counterValue = item.querySelector(".card__counter-value");
    let quontity = 0;

    counterValue.addEventListener("input", function (e) {
      if (Number(counterValue.value) <= 0) {
        quontity = 0;
        counterValue.value = 0;
      } else {
        quontity = counterValue.value;
      }
      getCost(item, quontity);
      getTotalCost();
    });

    plus.addEventListener("click", function () {
      quontity++;
      counterValue.value = quontity;
      getCost(item, quontity);
      getTotalCost();
      setCartActive();
    });
    minus.addEventListener("click", function () {
      if (counterValue.value > 0) {
        quontity--;
        counterValue.value = quontity;
        getCost(item, quontity);
        getTotalCost();
      }
    });
  });
}

// вычисление стоимости товара в корзине, в зависимости от количества:
function getCost(item, quontity) {
  // console.log("getCost");
  const cost = item.querySelector(".card__cost");
  const priceText = item.querySelector(".card__price").innerHTML;
  const price = parseInt(priceText.replace(/\s/g, ""));
  cost.innerHTML = (price * quontity).toLocaleString();
}

// вычисление общей стоимости товаров в корзине:
function getTotalCost() {
  // console.log(55);
  let total = 0;
  const totalCost = document.querySelector(".form__cost-value");
  let allCosts = document.querySelectorAll(".card__cost");

  allCosts.forEach((item) => {
    total += parseInt(item.innerHTML.replace("&nbsp;", ""));
    totalCost.innerHTML = total.toLocaleString();
  });
  if (total === 0) {
    setCartEmpty();
    totalCost.innerHTML = "0";
  }
}

// -------------------------------------------- end корзина ---------------------------------------------

// -------------------------------------------- start О компании: ---------------------------------------------

const btns = document.querySelectorAll(".stage__item");

const articles = document.querySelectorAll(".stage__article");

if (btns.length) {
  // console.log(btns);
  btns.forEach((item) => {
    item.addEventListener("click", function () {
      btns.forEach((item) => {
        item.classList.remove("stage__item_active");
      });
      const id = item.getAttribute("data-id");
      articles.forEach((item) => {
        item.classList.remove("stage__article_active");
        if (item.getAttribute("data-id") === id) {
          item.classList.add("stage__article_active");
        }
      });
      // document.querySelector(`.stage__article[data-id="${id}"]`).classList.add("stage__article_active");
      item.classList.toggle("stage__item_active");
    });
  });
}
// -------------------------------------------- end О компании ---------------------------------------------

// -------------------------------------------- start Отзывы: ---------------------------------------------

document.addEventListener("click", function (e) {
  // закрытие отзывов при клике на другой елемент:
  if (!e.target.closest(".card_about_open")) {
    const cardsFeedback = document.querySelectorAll(".card_about");

    cardsFeedback.forEach((item) => {
      item.classList.remove("card_about_open");
    });
  }

  // открытие отзывов:
  const openBtns = document.querySelectorAll(".feedback-btn_open");
  if (openBtns) {
    openBtns.forEach((item) => {
      if (e.target.closest(".feedback-btn_open") == item) {
        const card = item.closest(".card_about");
        const truthCardTextBlock = card.querySelector(".card__desc_hide");
        const truthCardText = truthCardTextBlock.textContent;
        const cardTextBlockForShow = card.querySelector(".card__desc_show");
        card.classList.add("card_about_open");
        cardTextBlockForShow.textContent = truthCardText;
      }
    });
  }

  // закрытие отзывов:
  const closeBtns = document.querySelectorAll(".feedback-btn_close");
  if (closeBtns) {
    closeBtns.forEach((item) => {
      if (e.target.closest(".feedback-btn_close") == item) {
        const card = item.closest(".card_about");
        const truthCardTextBlock = card.querySelector(".card__desc_hide");
        const truthCardText = truthCardTextBlock.textContent;
        const cardTextBlockForShow = card.querySelector(".card__desc_show");
        card.classList.remove("card_about_open");
        const cardTextTrim = truthCardText.slice(0, 140) + "...";
        cardTextBlockForShow.textContent = cardTextTrim;
      }
    });
  }
});

// форматирование отзывов при загрузке страницы:
const cardsFeedback = document.querySelectorAll(".card_about");
if (cardsFeedback.length) {
  cardsFeedback.forEach((item) => {
    const truthCardTextBlock = item.querySelector(".card__desc_hide");
    const truthCardText = truthCardTextBlock.textContent;
    // console.log(truthCardText);
    const cardTextBlockForShow = item.querySelector(".card__desc_show");

    if (truthCardText.length > 160) {
      item.classList.add("card_about_overflow");
      const cardTextTrim = truthCardText.slice(0, 140) + "...";
      cardTextBlockForShow.textContent = cardTextTrim;
    } else {
      cardTextBlockForShow.textContent = truthCardText;
    }
  });
}

// -------------------------------------------- end Отзывы ---------------------------------------------

// -------------------------------------------- start Каталог: ---------------------------------------------
const catalog = document.querySelector(".catalog-all-main");
if (catalog) {
  const activOptionsItem = document.querySelectorAll(".activ-options__item");
  if (activOptionsItem) {
    activOptionsItem.forEach((item) => {
      const closeBtn = item.querySelector(".activ-options__icon");
      closeBtn.addEventListener("click", function () {
        item.remove();
      });
    });
  }

  const allActivOptionsDelBtn = document.querySelector(
    ".activ-options__del-all"
  );
  if (allActivOptionsDelBtn) {
    const closeBtn = allActivOptionsDelBtn.querySelector(
      ".activ-options__icon"
    );
    closeBtn.addEventListener("click", function () {
      activOptionsItem.forEach((item) => {
        item.remove();
      });
      allActivOptionsDelBtn.remove();
    });
  }

  const menuItem = catalog.querySelectorAll(".filter__item_head");
  menuItem.forEach((item) => {
    item.addEventListener("click", function () {
      menuItem.forEach((item) => {
        item.classList.remove("filter__item_head_active");
      });
      item.classList.add("filter__item_head_active");
    });
  });

  //открытие фильтра:
  const filterItem = catalog.querySelectorAll(".filter__item_body");
  filterItem.forEach((item) => {
    item.addEventListener("click", function (e) {
      //закрытие всех остальных фильтров:
      filterItem.forEach((item) => {
        if (item !== e.target.closest(".filter__item_body")) {
          item.classList.remove("filter__item_body_active");
          const arrow = item.querySelector(".filter__icon");
          arrow.classList.remove("filter__icon_active");
        }
      });

      item.classList.toggle("filter__item_body_active");
      const arrow = item.querySelector(".filter__icon");
      arrow.classList.toggle("filter__icon_active");
    });
  });

  // закрытие фильтра:
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      filterItem.forEach((item) => {
        item.classList.remove("filter__item_body_active");
        const arrow = item.querySelector(".filter__icon");
        arrow.classList.remove("filter__icon_active");
      });
    }
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".filter__item_body")) {
      filterItem.forEach((item) => {
        item.classList.remove("filter__item_body_active");
        const arrow = item.querySelector(".filter__icon");
        arrow.classList.remove("filter__icon_active");
      });
    }
  });

  const catalogCards = document.querySelectorAll(".catalog-all__item");

  if (catalogCards.length) {
    // console.log(catalogCards);
    catalogCards.forEach((item) => {
      const cartLinkBtn = item.querySelector(".in-cart__icon");
      cartLinkBtn.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = cartLinkBtn.getAttribute("data-href");
      });

      const colorBtn = item.querySelectorAll(".card__color-item");
      if (colorBtn) {
        colorBtn.forEach((item) => {
          item.addEventListener("click", function (e) {
            e.preventDefault();
            colorBtn.forEach((item) => {
              item.classList.remove("card__color-item_active");
            });
            item.classList.add("card__color-item_active");
          });
        });
      }

      const toCartBtn = item.querySelector(".card__btn_to-cart");
      toCartBtn.addEventListener("click", function (e) {
        e.preventDefault();
      });
      const cartBtn = item.querySelector(".card__btn_in-cart");
      cartBtn.addEventListener("click", function (e) {
        e.preventDefault();
      });

      // счетчик количества карточек в корзине:
      const plus = item.querySelector(".card__counter-btn_plus");
      const minus = item.querySelector(".card__counter-btn_minus");
      const counterValue = item.querySelector(".card__counter-value");
      let quontity = 0;

      // counterValue.addEventListener("change", function (e) {
      //   quontity = e.target.value;
      // });
      counterValue.addEventListener("input", function (e) {
        if (Number(counterValue.value) <= 0) {
          quontity = 0;
          counterValue.value = "";
        } else {
          quontity = counterValue.value;
        }
      });

      plus.addEventListener("click", function (e) {
        e.preventDefault();

        quontity++;
        counterValue.value = quontity;
        // getCost(item, quontity);
        // getTotalCost();
      });
      minus.addEventListener("click", function (e) {
        if (counterValue.value > 0) {
          e.preventDefault();

          quontity--;
          counterValue.value = quontity;
          // getCost(item, quontity);
          // getTotalCost();
        }
      });

      const montageBtn = item.querySelector(".btn_montage");

      montageBtn.addEventListener("click", function (e) {
        e.preventDefault();
        montageBtn.classList.toggle("btn_montage_active");
      });

      toCartBtn.addEventListener("click", function (e) {
        e.preventDefault();
        toCartBtn.classList.add("card__btn_to-cart_hide");
        cartBtn.classList.add("card__btn_in-cart_visible");
      });
    });
  }
}

// -------------------------------------------- end Каталог ---------------------------------------------
// -------------------------------------------- start Описание товара: ---------------------------------------------

// const goodsItem = document.querySelector(".goods-item__main");
// if (goodsItem) {
//   const montageBtn = goodsItem.querySelector(".btn_montage");

//   montageBtn.addEventListener("click", function (e) {
//     e.preventDefault();
//     montageBtn.classList.toggle("btn_montage_active");
//   });

//   const botMenu = goodsItem.querySelectorAll(".bot-block__menu-item");
//   const botText = goodsItem.querySelectorAll(".bot-block__text");
//   botMenu.forEach((item) => {
//     item.addEventListener("click", function (e) {
//       const id = item.getAttribute("data-id");
//       botMenu.forEach((item) => {
//         item.classList.remove("bot-block__menu-item_active");
//       });
//       item.classList.add("bot-block__menu-item_active");

//       botText.forEach((item) => {
//         item.classList.remove("bot-block__text_active");
//         if (item.getAttribute("data-id") === id) {
//           item.classList.add("bot-block__text_active");
//         }
//       });
//     });
//   });

//   const previews = document.querySelectorAll(".small-img-wrap__img");

//   if (previews) {
//     previews.forEach((item) => {
//       item.addEventListener("click", function () {
//         const imgBox = document
//           .querySelector(".goods-item__img")
//           .querySelector("img");
//         const img = item.querySelector("img").getAttribute("src");
//         imgBox.setAttribute("src", img);
//       });
//     });
//   }

//   // счетчик количества карточек в корзине:
//   const plus = goodsItem.querySelector(".in-cart__counter-btn_plus");
//   const minus = goodsItem.querySelector(".in-cart__counter-btn_minus");
//   const counterValue = goodsItem.querySelector(".in-cart__counter-value");
//   const totalCost = goodsItem.querySelector(".cost__cost-value");
//   const priceEl = goodsItem.querySelector(".in-cart__price").innerHTML;
//   let price = parseInt(priceEl.replace(/\s/g, ""));
//   console.log(totalCost);

//   let quontity = 0;
//   counterValue.addEventListener("input", function (e) {
//     if (Number(counterValue.value) <= 0) {
//       quontity = 0;
//       counterValue.value = 0;
//     } else {
//       quontity = counterValue.value;
//     }
//     totalCost.innerHTML = (quontity * price).toLocaleString();
//   });

//   plus.addEventListener("click", function (e) {
//     quontity++;
//     counterValue.value = quontity;
//     console.log(quontity * price);
//     totalCost.innerHTML = (quontity * price).toLocaleString();
//   });

//   minus.addEventListener("click", function (e) {
//     if (counterValue.value > 0) {
//       quontity--;
//       counterValue.value = quontity;
//       totalCost.innerHTML = (quontity * price).toLocaleString();
//       console.log(quontity * price);
//       totalCost.innerHTML = (quontity * price).toLocaleString();
//     }
//   });

//   const colorBtn = goodsItem.querySelectorAll(".color-list__color-item");
//   if (colorBtn) {
//     colorBtn.forEach((item) => {
//       item.addEventListener("click", function (e) {
//         e.preventDefault();
//         colorBtn.forEach((item) => {
//           item.classList.remove("color-list__color-item_active");
//         });
//         item.classList.add("color-list__color-item_active");
//       });
//     });
//   }
// }

// -------------------------------------------- end Описание товара ---------------------------------------------
// -------------------------------------------- start OWL: ---------------------------------------------
// let margin = 16;

jQuery(($) => {
  if ($(window).width() <= 768) {
    margin = 13;
  }
});
// console.log(window.screen.width / 340);

jQuery(($) => {
  if ($(window).width() > 0) {
    $(".owl-carousel-index").owlCarousel({
      // screenLeft:true,
      // startPosition: 1,

      loop: false,
      // center: true,
      margin: 20,
      items: 4,
      nav: true,
      // navText : ["<i class='fa fa-chevron-left'>>>>></i>","<i class='fa fa-chevron-right'><<<<<<<</i>"],
      dots: false,
      singleItem: false,
      autoplay: false,
      smartSpeed: 1000,
      autoplayTimeout: 5000,
      stagePadding: 104, // позволяет задать начальное положение первого слайда
      responsive: {
        0: {
          nav: false,
          items: window.screen.width / 360,
        },
        800: {
          nav: false,
          items: window.screen.width / 420,
        },
        1200: {
          // items: 4
        },
      },
    });

    // $(".owl-carousel-index").owlCarousel({
    //   loop: false,
    //   center: true,
    //   margin: 20,
    //   // items: 4.5,
    //   nav: true,
    //   // navText : ["<i class='fa fa-chevron-left'>>>>></i>","<i class='fa fa-chevron-right'><<<<<<<</i>"],
    //   dots: false,
    //   singleItem: false,
    //   autoplay: false,
    //   smartSpeed: 1000,
    //   autoplayTimeout: 5000,
    //   responsive: {
    //     0: {
    //       nav: false,
    //       items: 1,
    //     },
    //     800: {
    //       nav: false,
    //       items: 1,
    //     },
    //     1200: {
    //       items: 1,
    //     },
    //   },
    // });

    $(".owl-carousel-slider").owlCarousel({
      loop: true,
      margin: 20,
      nav: true,
      dots: false,
      autoplay: false,
      smartSpeed: 1000,
      autoplayTimeout: 5000,
      responsive: {
        //Адаптация в зависимости от разрешения экрана
        0: {
          items: 1,
        },
        600: {
          items: 1,
        },
        1000: {
          items: 1,
        },
      },
    });

    $(".owl-carousel-about").owlCarousel({
      loop: false,
      margin: 16,
      items: 4,
      nav: true,
      // navText : ["<i class='fa fa-chevron-left'>>>>></i>","<i class='fa fa-chevron-right'><<<<<<<</i>"],
      dots: false,
      singleItem: false,
      autoplay: false,
      smartSpeed: 1000,
      autoplayTimeout: 5000,
      responsive: {
        0: {
          nav: false,
          margin: 5,
          items: 1,

          // items: window.screen.width / 360,
        },
        400: {
          nav: false,
          margin: 5,

          items: 1.3,

          // items: window.screen.width / 360,
        },
        520: {
          nav: false,
          margin: 5,

          items: 1.7,

          // items: window.screen.width / 360,
        },
        650: {
          nav: false,
          items: 2.2,

          // items: window.screen.width / 360,
        },
        800: {
          nav: false,
          items: 2.5,
          // items: window.screen.width / 420,
        },
        900: {
          nav: false,
          items: 3,
          // items: window.screen.width / 420,
        },
        1200: {
          nav: false,
          items: 4,
        },
        1350: {
          items: 4,
        },
      },
    });

    $(".owl-carousel_porf-item").owlCarousel({
      loop: false,
      margin: 16,
      // autoWidth:true,
      items: 4,
      nav: true,
      // navText : ["<i class='fa fa-chevron-left'>>>>></i>","<i class='fa fa-chevron-right'><<<<<<<</i>"],
      dots: false,
      singleItem: false,
      autoplay: false,
      smartSpeed: 1000,
      autoplayTimeout: 5000,
      responsive: {
        0: {
          nav: false,
          // margin: 5,
          items: 4,
          margin: 13,
        },
        600: {
          nav: false,
          items: 4,
          margin: 15,
        },
        1050: {
          items: 4,
        },
      },
    });

    $(".owl-carousel-news-item").owlCarousel({
      loop: false,
      margin: 16,
      // autoWidth:true,
      items: 3,
      nav: true,
      // navText : ["<i class='fa fa-chevron-left'>>>>></i>","<i class='fa fa-chevron-right'><<<<<<<</i>"],
      dots: false,
      singleItem: false,
      autoplay: false,
      smartSpeed: 1000,
      autoplayTimeout: 5000,
      responsive: {
        0: {
          nav: false,
          // margin: 5,
          items: 1,
          autoWidth: true,

          // margin: 13,
        },
        410: {
          nav: false,
          // margin: 5,
          items: 1.17,
          // margin: 13,
        },
        425: {
          nav: false,
          // margin: 5,
          items: 1.2,
          // margin: 13,
        },
        530: {
          nav: false,
          // margin: 5,
          items: 1.5,
          // margin: 13,
        },
        600: {
          nav: false,
          // margin: 5,
          items: 1.7,
          // margin: 13,
        },
        750: {
          nav: false,
          // margin: 5,
          items: 2.15,
          // margin: 13,
        },
        950: {
          nav: false,
          items: 2.4,
          // margin: 15,
        },
        1050: {
          nav: false,
          items: 2.7,
          // margin: 15,
        },
        1180: {
          items: 3,
        },
      },
    });
  }
});

// -------------------------------------------- end OWL ---------------------------------------------

// -------------------------------------------- start BURGER: ---------------------------------------------

const burger = document.querySelector(".burger");
const headerNav = document.querySelector(".header__nav");

if (burger) {
  burger.addEventListener("click", function (e) {
    burger.classList.toggle("burger_active");
    headerNav.classList.toggle("nav_active");
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".header__nav") && !e.target.closest(".burger")) {
      burger.classList.remove("burger_active");
      headerNav.classList.remove("nav_active");
    }
  });
}
// -------------------------------------------- end BURGER ---------------------------------------------

// -------------------------------------------- start Search: ---------------------------------------------
const headerSearchWrap = document.querySelector(".header__search-form-wrap");

if (headerSearchWrap) {
  if (window.screen.width <= 920) {
    headerSearchWrap.addEventListener("click", function (e) {
      headerSearchWrap.classList.add("header__search-form-wrap_active");
      // console.log("200");
    });
  }

  const closeSearchBtn = headerSearchWrap.querySelector(
    ".search-form__close-btn"
  );
  const inputField = headerSearchWrap.querySelector(".search-form__input");

  if (closeSearchBtn) {
    closeSearchBtn.addEventListener("click", function (e) {
      // e.preventDefault();
      headerSearchWrap.classList.remove("header__search-form-wrap_active");
      inputField.value = "";
      // console.log("100");
      e.stopPropagation();
    });
  }

  document.addEventListener("click", function (e) {
    if (
      !e.target.closest(".search-form") &&
      headerSearchWrap.classList.contains("header__search-form-wrap_active")
    ) {
      headerSearchWrap.classList.remove("header__search-form-wrap_active");
      inputField.value = "";
      // console.log("400");
    }
  });
}

// -------------------------------------------- end Search ---------------------------------------------

// -------------------------------------------- start товар: ---------------------------------------------
const goodsCartBtn = document.querySelectorAll(".goods-item__btn_to-cart");

if (goodsCartBtn) {
  // const goodsQuantity = document.querySelector(".goods__quantity");
  goodsCartBtn.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      item.classList.toggle("goods-item__btn_to-cart_active");
      // headerCartBtn.classList.toggle("btn__cart_active");
      setCartActive();
    });
  });
}

// -------------------------------------------- end товар ---------------------------------------------
// -------------------------------------------- start сертификаты: ---------------------------------------------
// const sertificates = document.querySelectorAll(".card_sert");

// if (sertificates) {
//   sertificates.forEach((item) => {
//     item.addEventListener("click", function (e) {
//       const img = item.innerHTML;
//       // const img = item.querySelector("img").getAttribute("src");
//       console.log(img);
//       // item.querySelector("img").setAttribute("src", img);

//       e.preventDefault();
//     });
//   });
// }

// -------------------------------------------- start сертификаты: ---------------------------------------------
// -------------------------------------------- end корзина ---------------------------------------------

$("#phone_1").mask("+7(999) 999 99 99");
$("#phone_2").mask("+7(999) 999 99 99");

// -------------------------------------------- start Куки: ---------------------------------------------
function setCookie(name, value, lifetimeDays = 30, path = "/") {
  var expires = "";
  if (lifetimeDays) {
    var date = new Date();
    date.setTime(date.getTime() + lifetimeDays * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=" + path;
}

function getCookie(name) {
  var nameEQ = name + "=";
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var c = cookies[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

if (!getCookie("CookiePolicyAccepted")) {
  $(".cookie").show();
} else {
  $(".cookie").hide();
}

function acceptCookiePolicy() {
  // console.log("acceptCookiePolicy");
  setCookie("CookiePolicyAccepted", true);
  $(".cookie").fadeTo(500, 0);
  setTimeout(() => {
    $(".cookie").hide();
  }, 500);
}
function closeCookiePolicyNotification() {
  // console.log("closeCookiePolicyNotification");
  $(".cookie").fadeOut(300);
}

const cookieBtn = document.querySelector(".cookie__btn");
if (cookieBtn) {
  cookieBtn.addEventListener("click", function (e) {
    e.preventDefault();
    acceptCookiePolicy();
  });
}

const cookieCloseBtn = document.querySelector(".cookie__close");
if (cookieCloseBtn) {
  cookieCloseBtn.addEventListener("click", function (e) {
    e.preventDefault();
    closeCookiePolicyNotification();
  });
}
// -------------------------------------------- end Куки ---------------------------------------------
// -------------------------------------------- start Отзывы: ---------------------------------------------

// -------------------------------------------- end Отзывы ---------------------------------------------
// -------------------------------------------- start Селект: ---------------------------------------------

let queryParams =  {
  name: "",
  phone: "",
  email: "",
  message: "",
  project: "sosnoviy",
  numbers_of_rooms: "",
  area: "",
  balcony: "",
  dressing_room: "",
  side_2: "",
  side_3: "",
  guest_bathroom: "",
  kitchen_living_room: "",
};

// console.log(selects);
const choiceForm = document.querySelector(".choice__form");
if (choiceForm) {
  const selectProject = document.querySelector(".choice__select");
  // selects.forEach((select) => {
    selectProject.addEventListener("click", (event) => {
      // console.log("click");
      selectProject.classList.toggle("select_open");
    });
    const selectOptions = selectProject.querySelectorAll(".select__item");
    selectOptions.forEach((item) => {
      item.addEventListener("click", (event) => {
        const input = selectProject.querySelector(".select__text");
        event.stopPropagation(); // отменяем всплытие, что бы повторно не сработало событие на самом селекте
        input.innerHTML = item.innerHTML;
        input.classList.add("select__text_active");
        input.setAttribute("data-id", item.getAttribute("data-id"));
        queryParams.project = item.getAttribute("data-id");
        // console.log(queryParams);
        selectProject.classList.remove("select_open");
        selectProject.classList.add("select_active");
      });
    });
  // });

  const choiceButtonsSelect = document.querySelector(".choice__buttons-select");
  if (choiceButtonsSelect) {
    // const btns = choiceButtonsSelect.querySelectorAll(".choice__buttons-select-item");

    const choiceBtns = document.querySelectorAll(".choice__buttons-select-item");

    if (choiceBtns) {
      choiceBtns.forEach((item) => {
        item.addEventListener("click", (event) => {
          item.classList.toggle("choice__buttons-select-item_active");
          queryParams.numbers_of_rooms = "";

          choiceBtns.forEach((item) => {
            if (item.classList.contains("choice__buttons-select-item_active")) {
              queryParams.numbers_of_rooms = queryParams.numbers_of_rooms + ", " + item.getAttribute("data-id");
            }
          });
          // console.log(queryParams);
        });
      });
    }
  }

  
  const filterBtns = document.querySelectorAll(".choice__btn-filter");

  if (filterBtns) {
    filterBtns.forEach((item) => {
      item.addEventListener("click", (event) => {
        item.classList.toggle("choice__btn-filter_active");
        let key = item.getAttribute("data-id");
        if (item.classList.contains("choice__btn-filter_active")) {
          queryParams[key] = "yes";
        } else {
          queryParams[key] = "";
        }
        // console.log(queryParams);
      });
    });
  }

  const choice__square = document.querySelector(".choice__square-select");
  if (choice__square) {
    const inputFrom = choice__square.querySelector(".select__input_from"); 
    const inputTo = choice__square.querySelector(".select__input_to");
    queryParams.area = inputFrom.value + " - " + inputTo.value;

    inputFrom.addEventListener("input", (event) => {
      queryParams.area = inputFrom.value + " - " + inputTo.value;
      // console.log(queryParams);
    });

    inputTo.addEventListener("input", (event) => {
      queryParams.area = inputFrom.value + " - " + inputTo.value;
      // console.log(queryParams);
    });
  }

  const choiceForm = document.querySelector("#choice-form");
  // console.log(choiceForm);
  if (choiceForm) {
    const submitBtn = choiceForm.querySelector(".form__btn");
    // console.log(submitBtn);
    submitBtn.addEventListener("click", (event) => {
      // console.log("click");
    // choiceForm.addEventListener("submit", (event) => {
      event.preventDefault();
      queryParams.name = choiceForm.querySelector(".form__input_name").value;
      queryParams.phone = choiceForm.querySelector(".form__input_phone").value;
      queryParams.email = choiceForm.querySelector(".form__input_email").value;
      queryParams.message = choiceForm.querySelector(".form__input_textarea").value;
      // console.log(queryParams);
      postForm(queryParams);
      // const popupActive = document.querySelector(".popup.open");
      // popupClose(popupActive);
      const popupSuccess = document.querySelector("#success");
      popupOpen(popupSuccess);

      // return false;
    });
  }

  const requestForm = document.querySelector("#request-form");
  if (requestForm) {
    const submitBtn = requestForm.querySelector(".request__btn");
    // console.log(submitBtn);
    submitBtn.addEventListener("click", (event) => {
      // console.log("click");
    // requestForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const queryParams = {
        apartment: "",
        name: "",
        phone: "",
        email: "",
        message: "",
      };
      queryParams.apartment = requestForm.querySelector(".request__input_apartment").value;
      queryParams.name = requestForm.querySelector(".request__input_name").value;
      queryParams.phone = requestForm.querySelector(".request__input_phone").value;
      queryParams.email = requestForm.querySelector(".request__input_email").value;
      queryParams.message = requestForm.querySelector(".request__input_textarea").value;
      // console.log(queryParams);
      postRequest(queryParams);
      // const popupActive = document.querySelector(".popup.open");
      // popupClose(popupActive);
      const popupSuccess = document.querySelector("#success");
      popupOpen(popupSuccess);

      // return false;
    });
  }

  // const 
    // const btns = choiceButtonsSelect.querySelectorAll(".choice__buttons-select-item";


    // btns.forEach((btn) => {
    //   btn.addEventListener("click", (event) => {
    //     const input = choiceButtonsSelect.querySelector(".choice__buttons-select-text");
    //     event.stopPropagation(); // отменяем всплытие, что бы повторно не сработало событие на самом селекте
    //     input.innerHTML = btn.innerHTML;
    //     input.classList.add("choice__buttons-select-text_active");
    //     input.setAttribute("data-id", btn.getAttribute("data-id"));
    //     queryParams.numbers_of_rooms = btn.getAttribute("data-id");
    //     // console.log(queryParams);
    //     choiceButtonsSelect.classList.remove("choice__buttons-select_active");
    //   });
    // });
// }

// console.log(selects);
// const selects = document.querySelectorAll(".select");
// if (selects) {
//   selects.forEach((select) => {
//     select.addEventListener("click", (event) => {
//       console.log("click");
//       select.classList.toggle("select_open");
//     });
//     const selectOptions = select.querySelectorAll(".select__item");
//     selectOptions.forEach((item) => {
//       item.addEventListener("click", (event) => {
//         const input = select.querySelector(".select__text");
//         event.stopPropagation(); // отменяем всплытие, что бы повторно не сработало событие на самом селекте
//         input.innerHTML = item.innerHTML;
//         input.classList.add("select__text_active");
//         input.setAttribute("data-id", item.getAttribute("data-id"));
//         select.classList.remove("select_open");
//         select.classList.add("select_active");
//       });
//     });
//   });



}
// -------------------------------------------- end Селект ---------------------------------------------
// -------------------------------------------- start Карта ---------------------------------------------
// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.


ymaps.ready(init);
function init() {
  // Создание карты.

  let myMap = new ymaps.Map("map", {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    // Чтобы не определять координаты центра карты вручную,
    // воспользуйтесь инструментом Определение координат.
    // center: [48.872185073737896, 2.354223999999991],
    center: [56.97004647141038, 65.79187000766548],

    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 14.7,
  });

  // Создание геообъекта с типом точка (метка).
  let myMark = new ymaps.Placemark(
    [56.971359032603615,65.80127919688765],
    // [56.97004647141038,65.79187000766548],
    {},
    {
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: "default#image",
      // Своё изображение иконки метки.
      iconImageHref: "img/pin.svg",
      // Размеры метки.
      iconImageSize: [42, 58],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-21, -58],
    }
  );
  // Размещение геообъекта на карте.
  myMap.geoObjects.add(myMark);
}

// function setVisible() {
//   myGeoObject4.options.set({
//     visible: false
//   });
//   myGeoObject3.options.set({
//     visible: false
//   });
//   myGeoObject2.options.set({
//     visible: false
//   });
//   myGeoObject.options.set({
//     visible: false
//   });
// }
// $(document).ready(function() {
//   $('#change-map').on('click', function() {
//     setVisible();
//   });
// });


const mapMarks = document.querySelector(".map__mark-item");
mapMarks.addEventListener("click", (event) => {
  mapMarks.classList.toggle("map__mark-item_active");  
})
// -------------------------------------------- end Карта ---------------------------------------------
//--------------------------Запрос к БД----------------------------
// Загружаем список контрагентов с БД:
async function fetchToDB(options) {
  // Блок try выполнится полностью, если не будет ошибок:
  try {
    // Выполняем запрос:
    const responce = await fetch("files/main.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options),
    });
    const infoList = await responce.json();
    return infoList; // Возвращаем результат запроса
  } catch (err) {
    // Блок catch сработает только если будут какие-то ошибки в блоке try:
    // Выведем в консоли информацию об ошибке:
    console.log("При запросе к БД произошла ошибка, детали ниже:");
    console.error(err);
    // Вернем исключение с текстом поясняющим детали ошибки:
    alert("Произошла ошибка при запросе к БД!");
    throw new Error("Запрос завершился неудачно.");
  }
}

let options = {
  // опции для получения списка всех контрагентов
  function: "getAll",
  table: "apartments",
  all: "*",
};

const arrApartments = await fetchToDB(options);
const apartmentsForRender = [...arrApartments]
console.log(apartmentsForRender);

// console.log(options);
// await fetchToDB(options); 
// требуется подключить скрипт как модуль, иначе await не работает!!!
//--------------------------end Запрос к БД----------------------------

const footerForm = document.querySelector(".footer__form");
if (footerForm) {
  const submitBtn = footerForm.querySelector(".form__btn");
  submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let queryParams = {
      name: "",
      phone: "",
      email: "",
      message: "",
    };

    queryParams.name = document.querySelector(".form__input_name").value;
    queryParams.phone = document.querySelector(".form__input_phone").value;
    queryParams.email = document.querySelector(".form__input_email").value;
  // footerForm.addEventListener("submit", (event) => {
  //   event.preventDefault();
  //   const footerName = document.querySelector(".footer__input-name");
  //   const footerEmail = document.querySelector(".footer__input-email");
  //   const footerPhone = document.querySelector(".footer__input-phone");
  //   console.log(footerName.value);
  //   console.log(footerEmail.value);
  //   console.log(footerPhone.value);
  //   footerName.value = "";
  //   footerEmail.value = "";
  //   footerPhone.value = "";
  //   return false;
  // });
    // console.log(queryParams);
    fetchToPostFooter(queryParams);
    const popupSuccess = document.querySelector("#success");
    popupOpen(popupSuccess);
  });
}

async function fetchToPostFooter(queryParams) {
  // console.log(JSON.stringify(queryParams));
  // Блок try выполнится полностью, если не будет ошибок:
  try {
    // Выполняем запрос:
    const responce = await fetch("files/post-mail.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(queryParams),
    });
    // const infoList = await responce.json();
    // return infoList; // Возвращаем результат запроса
    // console.log(responce);
  } catch (err) {
    // Блок catch сработает только если будут какие-то ошибки в блоке try:
    // Выведем в консоли информацию об ошибке:
    console.log("При оптравке письма произошла ошибка, детали ниже:");
    console.error(err);
    // Вернем исключение с текстом поясняющим детали ошибки:
    alert("Произошла ошибка при оптравке письма!");
    throw new Error("Запрос завершился неудачно.");
  }
}



// footerForm.addEventListener("submit", (event) => {
//   event.preventDefault();
//   const footerName = document.querySelector(".footer__input-name");
//   const footerEmail = document.querySelector(".footer__input-email");
//   const footerPhone = document.querySelector(".footer__input-phone");
//   console.log(footerName.value);
//   console.log(footerEmail.value);
//   console.log(footerPhone.value);
//   footerName.value = "";
//   footerEmail.value = "";
//   footerPhone.value = "";
//   return false;
// });


//-------------------------- start отправка формы на почту ------------------------------

async function postForm(queryParams) {
  // console.log(JSON.stringify(queryParams));
  // Блок try выполнится полностью, если не будет ошибок:
  try {
    // Выполняем запрос:
    const responce = await fetch("files/post-form.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(queryParams),
    });
    // const infoList = await responce.json();
    // return infoList; // Возвращаем результат запроса
    // console.log(responce);
  } catch (err) {
    // Блок catch сработает только если будут какие-то ошибки в блоке try:
    // Выведем в консоли информацию об ошибке:
    console.log("При оптравке письма произошла ошибка, детали ниже:");
    console.error(err);
    // Вернем исключение с текстом поясняющим детали ошибки:
    alert("Произошла ошибка при оптравке письма!");
    throw new Error("Запрос завершился неудачно.");
  }
}

async function postRequest(queryParams) {
  // console.log(JSON.stringify(queryParams));
  // Блок try выполнится полностью, если не будет ошибок:
  try {
    // Выполняем запрос:
    const responce = await fetch("files/post-request.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(queryParams),
    });
    // const infoList = await responce.json();
    // return infoList; // Возвращаем результат запроса
    // console.log(responce);
  } catch (err) {
    // Блок catch сработает только если будут какие-то ошибки в блоке try:
    // Выведем в консоли информацию об ошибке:
    console.log("При оптравке письма произошла ошибка, детали ниже:");
    console.error(err);
    // Вернем исключение с текстом поясняющим детали ошибки:
    alert("Произошла ошибка при оптравке письма!");
    throw new Error("Запрос завершился неудачно.");
  }
}

// const choiceSendBtn = document.querySelector(".choice__btn");
// choiceSendBtn.addEventListener("click", (event) => {
//   // fetchToPost(queryParams)
  
//   const arrApartments = fetchToPost(queryParams);
//   console.log(arrApartments);
//   // event.preventDefault();
//   // const footerName = document.querySelector(".footer__input-name");
//   // const footerEmail = document.querySelector(".footer__input-email");
//   // const footerPhone = document.querySelector(".footer__input-phone");
//   // console.log(footerName.value);
//   // console.log(footerEmail.value);
//   // console.log(footerPhone.value);
//   // footerName.value = "";
//   // footerEmail.value = "";
//   // footerPhone.value = "";
//   // return false;
// });

// let postOptions = {
//   // опции для получения списка всех контрагентов
//   function: "getAll",
//   table: "apartments",
//   all: "*",
// };

// const arrApartments = await fetchToDB(options);
// console.log(arrApartments);

// console.log(options);
// await fetchToDB(options); 
// требуется подключить скрипт как модуль, иначе await не работает!!!

//--------------------------end Отправка формы на почту----------------------------

// -------------------------------------------- start Планы: ---------------------------------------------
//активные планировки:
// const plansItem = document.querySelectorAll(".plans__item");
// if (plansItem) {
//   plansItem.forEach((item) => {
//     item.addEventListener("click", (event) => {
//       plansItem.forEach((item) => {
//         item.classList.remove("plans__item_active");
//       });
//       item.classList.add("plans__item_active");
//     });
//   });
// }

document.addEventListener("click", (event) => {
  // if (!event.target.closest(".plans__item")) return;
  if (event.target.closest(".plans__item")) {
    const plansItem = document.querySelectorAll(".plans__item");
    plansItem.forEach((item) => {
      item.classList.remove("plans__item_active");
    });
    event.target.closest(".plans__item").classList.add("plans__item_active");
    const imgBox = document.querySelector(".plans__img").querySelector("img");
    const img = event.target.closest(".plans__item").querySelector("img").getAttribute("src");
    imgBox.setAttribute("src", img);
    const id = event.target.closest(".plans__item").getAttribute("data-id");
    // console.log(id);
    const title = document.querySelector(".plans__name");
    title.textContent = `${apartmentsForRender.filter(item => item.id == id)[0].number_of_rooms}-комнатная ${apartmentsForRender.filter(item => item.id == id)[0].area}м2`;
    const requestPopup = document.querySelector("#popup-request");
    const requestInput = requestPopup.querySelector(".request__input_apartment");
    requestInput.value = `${apartmentsForRender.filter(item => item.id == id)[0].number_of_rooms}-комнатная ${apartmentsForRender.filter(item => item.id == id)[0].area}м2`;
  };
});

// const previews = document.querySelectorAll(".plans__item");

// if (previews) {
//   previews.forEach((item) => {
//     item.addEventListener("click", function () {
//       const imgBox = document.querySelector(".plans__img").querySelector("img");
//       const img = item.querySelector("img").getAttribute("src");
//       imgBox.setAttribute("src", img);
//     });
//   });
// }

//активные кнопки фильтра планировок:
const plansFilterItem = document.querySelectorAll(".plans__filter-item");
if (plansFilterItem) {
  plansFilterItem.forEach((item) => {    
    item.addEventListener("click", (event) => {      
      plansFilterItem.forEach((item) => {
        item.classList.remove("plans__filter-item_active");
      });
      item.classList.add("plans__filter-item_active");
      // console.log(item.innerHTML);
      const key = item.innerHTML.trim();
      previewPlansRender(apartmentsForRender, key);
      // setInfo();
    });
  });
}


function filterPreviewArr (key, arr) {
  // console.log(key);
  // console.log(key === 'Студия');
  // console.log(arr);
  if (key === 'Студия') {
    // console.log('Студия');
    return arr.filter((obj) => obj.number_of_rooms === 1 && obj.studio === 1 && obj.commerce === 0);
  }
  if (key === '1') {
    return arr.filter((obj) => obj.number_of_rooms === 1 && obj.studio === 0 && obj.commerce === 0);
  }
  if (key === '2') {
    return arr.filter((obj) => obj.number_of_rooms === 2 && obj.studio === 0 && obj.commerce === 0);
  }
  if (key === '3') {
    return arr.filter((obj) => obj.number_of_rooms === 3 && obj.studio === 0 && obj.commerce === 0);
  }
  if (key === '3+') {
    return arr.filter((obj) => obj.number_of_rooms > 3 && obj.studio === 0 && obj.commerce === 0);
  }
  if (key === 'Коммерция') {
    return arr.filter((obj) => obj.commerce === 1);
  }
}

function previewPlansRender (arr, key='Студия') {
  const previewList = document.querySelector(".plans__list");
  previewList.innerHTML = "";
  let copyArr = [...arr];
  // console.log(copyArr);
  // Фильтрация массива по фильтру:
  copyArr = filterPreviewArr(key, copyArr);
  // console.log(copyArr);
  copyArr.forEach((obj) => {
    getPreviewPlansItem(obj);
  })
}

previewPlansRender (apartmentsForRender, 'Студия');

function getPreviewPlansItem (obj) {
  const previewList = document.querySelector(".plans__list");
  // console.log(previewList);
  const previewItem = document.createElement("li");
  previewItem.classList.add("plans__item");
  const id = obj.id;
  previewItem.setAttribute("data-id", id);
  const previewImg = document.createElement("img");
  previewImg.src = `img/${obj.image}`;
  previewImg.alt = "планировка квартиры";
  previewItem.append(previewImg);
  previewList.append(previewItem);
}

const plansItem = document.querySelector(".plans__item");

function setInfo() {
  // console.log('setInfo');
  // console.log(plansItem);

  plansItem.classList.add("plans__item_active");
  // console.log(plans__item);
  
  // title.innerHTML = "1-комнатная 60м2";
  // console.log(title);
  const imgBox = document.querySelector(".plans__img").querySelector("img");
  const img = plansItem.querySelector("img").getAttribute("src");
  imgBox.setAttribute("src", img);
  const title = document.querySelector(".plans__name");
  const id = plansItem.getAttribute("data-id");
  title.textContent = `${apartmentsForRender.filter(item => item.id == id)[0].number_of_rooms}-комнатная ${apartmentsForRender.filter(item => item.id == id)[0].area}м2`;
  
  const requestPopup = document.querySelector("#popup-request");
  const requestInput = requestPopup.querySelector(".request__input_apartment");
  requestInput.value = `${apartmentsForRender.filter(item => item.id == id)[0].number_of_rooms}-комнатная ${apartmentsForRender.filter(item => item.id == id)[0].area}м2`;
  // console.log(img);
    // imgBox.setAttribute("src", img);
  // console.log(imgBox);
  // plans__item.addEventListener("click", (event) => {
    // const imgBox = document.querySelector(".plans__img").querySelector("img");
    // const img = event.target.closest(".plans__item").querySelector("img").getAttribute("src");
    // imgBox.setAttribute("src", img);
  // });  
}
setInfo();

// }


// -------------------------------------------- end Планы ---------------------------------------------
