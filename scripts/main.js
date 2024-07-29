new WOW().init();

// slider menu+++-
$(".burger-slider").slick({
  lazyLoad: "ondemand",
  slidesToShow: 4,
  slidesToScroll: 2,
  arrows: true,
  responsive: [
    {
      breakpoint: 950,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,


      }
    }
 
 
  ]
 
});

$("#feedback-slider").slick({
  lazyLoad: "ondemand",
  slidesToShow: 4,
  slidesToScroll: 2,
  arrows: true,
  responsive: [
    {
      breakpoint: 950,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,


      }
    }
 
  ]
 
});
// переключения табов меню

document.addEventListener('DOMContentLoaded', function() {
  let sliderWrapper = document.getElementById('menu-burgers');
  let menuLinks = sliderWrapper.querySelectorAll('.menu-type');
  let menuSliders = sliderWrapper.querySelectorAll('.burger-slider');

  for (let i = 0; i < menuLinks.length; i++) {
      menuLinks[i].addEventListener('click', function() {
          let activeMenuLink = sliderWrapper.querySelector('.menu-type.visible-active');
          if (activeMenuLink) {
           
              activeMenuLink.classList.remove('visible-active');
          }

          let activeMenuSlider = sliderWrapper.querySelector('.burger-slider.visible-active');
          if (activeMenuSlider) {

              activeMenuSlider.classList.remove('visible-active');
          }

          menuLinks[i].classList.add('visible-active');
          menuSliders[i].classList.add('visible-active');
          $(menuSliders[i]).slick("setPosition");
      });
  }
});




// прокрутка к блоку заказа
document.getElementById("main-button").addEventListener("click", function () {
  document
    .getElementById("order-button")
    .scrollIntoView({ behavior: "smooth" });
});



// на нативном JS

let burger = document.querySelector('.burger-menu');
let menu = document.querySelector('.menu');
let close = document.querySelector('.close');
let body = document.querySelector('body');
let menuItems = document.querySelectorAll('.menu-item');

close.style.display = 'none';

burger.addEventListener('click', function() {
  menu.classList.add('active');
  if (menu.classList.contains('active')) {
    burger.style.display = 'none';
    close.style.display = 'block';
    body.classList.add('no-scroll');
  }
});

close.addEventListener('click', function() {
  menu.classList.remove('active');
  burger.style.display = 'block';
  close.style.display = 'none';
});

menuItems.forEach(function(item) {
  item.addEventListener('click', function() {
    menu.classList.remove('active');
    burger.style.display = 'block';
    close.style.display = 'none';
  });
});

// oбработка form и блока благодарности
$(".thanks-for-order").hide();
let customerNameInput = $(".customer-name input");
let customerName = $(".customer-name");
let customerPhoneInput = $(".customer-phone input");
let customerPhone = $(".customer-phone");
let invalidMessage = $(".not-valid-data");
let orderButton = $("#order-button");
let url = "https://testologia.ru/checkout";


customerPhoneInput.inputmask("+7(99)999-99-99");

// валидация полей формы и отправка на сервер
let loader = $('.loader-wrapper');
orderButton.on("click", function (e) {
  const regex = /^\+\d\(\d{2}\)\d{3}-\d{2}-\d{2}$/;
  e.preventDefault();
  let dataValid = true;
  if (!customerNameInput.val()) {
    customerName.next().fadeIn();
    customerName.addClass("invalid-data");
    dataValid = false;
  } else {
    customerName.removeClass("invalid-data");
    customerName.next().hide();
  }

  if (!customerPhoneInput.val() || !regex.test(customerPhoneInput.val()))  {
    customerPhone.next().fadeIn();
    customerPhone.addClass("invalid-data");
    dataValid = false;
  } else {
    customerPhone.removeClass("invalid-data");
    customerPhone.next().hide();
  }

  if (dataValid) {
    loader.css('display', 'flex')
    $.ajax({
      url: url,
      method: "post",
      data: { name: customerNameInput.val(), phone: customerPhoneInput.val() },
    }).done(function (message) {
      loader.hide()
      if (message.success === 0) {
        $(".order-content").hide();
        $(".thanks-for-order").fadeIn(1500);
      } else {
        alert(
          "Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ"
        );
      }
    });
  }
});

//таймер обратного отсчета

function StartCountDown() {
  let countDownItems = $(".order-counter-wrapper .counter");
  let secondsBlock = countDownItems.eq(4);
  let seconds = parseInt(secondsBlock.text());
  let secondsTensBlock = countDownItems.eq(3);
  let secondsTens = parseInt(secondsTensBlock.text());
  let minutesBlock = countDownItems.eq(1);
  let minutes = parseInt(minutesBlock.text());
  let minutesTensBlock = countDownItems.eq(0);
  let minutesTens = parseInt(minutesTensBlock.text());
  
  let pulsingPoints = countDownItems.eq(2).find("span");

  pulsingPoints.addClass("pulsing");

  let interval = setInterval(function () {
    seconds--;

    if (seconds < 0) {
      seconds = 9;
      secondsTens--;

      if (secondsTens < 0) {
        secondsTens = 5;
        minutes--;
        if (minutes < 0) {
          minutes = 9;
          minutesTens--;
          if (minutesTens < 0) {
            clearInterval(interval);
            pulsingPoints.removeClass("pulsing");
            return;
          }

          minutesTensBlock.text(minutesTens.toString());
        }
        minutesBlock.text(minutes.toString());
      }

      secondsTensBlock.text(secondsTens.toString());
    }

    secondsBlock.text(seconds.toString());
  }, 1000);
}

StartCountDown();

