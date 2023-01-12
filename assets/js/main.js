const navShow = () => {
	const navBar = document.querySelector('.nav-bar');
	const menuList = document.querySelector('.menu-list');

	navBar.addEventListener('click', () => {
		menuList.classList.toggle('nav-active');

		navBar.classList.toggle('close')
	});
}
navShow();

$('.owl-carousel').owlCarousel({
	loop: true,
	margin: 40,
	nav: false,
	autoplay: true,
	autoplayTimeout: 2000,
	autoplayHoverPause: true,
	responsiveClass: true,
	responsive: {
		0: {
			items: 1,
		},
		768: {
			items: 2,
		},
		991: {
			items: 3,
		},
		1024: {
			items: 4,
		},
		1200: {
			items: 4
		},

	},
});

function getPageList(totalPages, page, maxLength) {
	function range(start, end) {
		return Array.from(Array(end - start + 1), (_, i) => i + start);
	}

	var sideWidth = maxLength < 9 ? 1 : 2;
	var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
	var rightWidth = (maxLength - sideWidth * 2 - 3) >> 1;

	if (totalPages <= maxLength) {
		return range(1, totalPages);
	}

	if (page <= maxLength - sideWidth - 1 - rightWidth) {
		return range(1, maxLength - sideWidth - 1).concat(0, range(totalPages - sideWidth + 1, totalPages));
	}

	if (page >= totalPages - sideWidth - 1 - rightWidth) {
		return range(1, sideWidth).concat(0, range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages));
	}

	return range(1, sideWidth).concat(0, range(page - leftWidth, page + rightWidth), 0, range(totalPages - sideWidth + 1, totalPages));
}

$(function () {
	var numberOfItems = $(".card-wrapper .card-item").length;
	var limitPerPage = 9;
	var totalPages = Math.ceil(numberOfItems / limitPerPage);
	var paginationSize = 4;
	var currentPage;

	function showPage(whichPage) {
		if (whichPage < 1 || whichPage > totalPages) return false;

		currentPage = whichPage;

		$(".card-wrapper .card-item").hide().slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage).show();

		$(".pagination li").slice(1, -1).remove();

		getPageList(totalPages, currentPage, paginationSize).forEach(item => {
			$("<li>").addClass("page-item").addClass(item ? "current-page" : "dots")
				.toggleClass("active", item === currentPage).append($("<a>").addClass("page-link")
					.attr({ href: "javascript:void(0)" }).text(item || "...")).insertBefore(".next-page");
		});

		$(".previous-page").toggleClass("disable", currentPage === 1);
		$(".next-page").toggleClass("disable", currentPage === totalPages);
		return true;
	}

	$(".pagination").append(
		$("<li>").addClass("page-item").addClass("previous-page").append($("<a>").addClass("page-link").attr({ href: "javascript:void(0)" }).text("<")),
		$("<li>").addClass("page-item").addClass("next-page").append($("<a>").addClass("page-link").attr({ href: "javascript:void(0)" }).text(">")),
	);

	$(".card-wrapper").show();
	showPage(1);

	$(document).on("click", ".pagination li.current-page:not(.active)", function () {
		return showPage(+$(this).text());
	});

	$(".next-page").on("click", function () {
		return showPage(currentPage + 1);
	});

	$(".previous-page").on("click", function () {
		return showPage(currentPage - 1);
	});
});


const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
	const select = dropdown.querySelector('.select');
	const caret = dropdown.querySelector('.caret');
	const menu = dropdown.querySelector('.dropdown-menu');
	const options = dropdown.querySelectorAll('.dropdown-menu li');
	const selected = dropdown.querySelector('.selected');

	select.addEventListener('click', () => {
		caret.classList.toggle('caret-rotate');
		menu.classList.toggle('menu-open');
	});

	options.forEach(option => {
		option.addEventListener('click', () => {
			selected.innerText = option.innerText;
			caret.classList.remove('caret-rotate');
			menu.classList.remove('menu-open');
		});
	});
});

window.onload = function () {
	slideOne();
	slideTwo();
};

let sliderOne = document.getElementById('slider1');
let sliderTwo = document.getElementById('slider2');
let displayValOne = document.getElementById('range1');
let displayValTwo = document.getElementById('range2');

let minGap = 5;

function slideOne() {
	if (slideOne) {
		if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
			sliderOne.value = parseInt(sliderTwo.value) - minGap;
		}
		displayValOne.textContent = sliderOne.value;
		fillColor();
	}
};
function slideTwo() {
	if (slideTwo) {
		if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
			sliderTwo.value = parseInt(sliderOne.value) + minGap;
		}
		displayValTwo.textContent = sliderTwo.value;
		fillColor();
	}
};
function fillColor() {
	if (slideOne) {
		let sliderTrack = document.querySelector('.slider-track');
		let sliderMaxValue = document.getElementById('slider1').max;
		percent1 = (sliderOne.value / sliderMaxValue) * 100;
		percent2 = (sliderTwo.value / sliderMaxValue) * 100;
		sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}%, #fc8410 ${percent1}%, #fc8410 ${percent2}%,
		#dadae5 ${percent2}%)`;
	}
}

let i;

$(function () {
	$('#plus').click(function () {
		i = parseInt($('.number').text())
		i = i + 1;
		$('.number').text(i);
	});

	$('#minus').click(function () {
		i = parseInt($('.number').text())
		i = i - 1;
		if (i == -1) {
			i = 0;
		}
		$('.number').text(i);
	});
})

let valueCounter = 1;
let decrement = document.querySelector('.btn-decrement');
let increment = document.querySelector('.btn-increment');
let count = document.querySelector('#quantity');
let totalPrice = document.querySelector('#total-price');
let price = document.querySelector('#price');
let basketSubtotal = document.querySelector('#subtotal');

if (increment && decrement) {
	let priceNum = parseFloat(price.textContent);

	increment.addEventListener('click', () => {
		let add = valueCounter++;
		count.value = add;
		totalPrice.innerHTML = add * priceNum;
		basketSubtotal.innerHTML = add * priceNum;
	});

	decrement.addEventListener('click', () => {
		if (valueCounter >= 2) {
			let sub = --valueCounter;
			count.value = sub;
			totalPrice.innerHTML = sub * priceNum;
			basketSubtotal.innerHTML = sub * priceNum;
		}
	});
}

$(document).ready(function () {

	$(".btn-remove").on("click", function () {
		$(this).closest(".basket-wrapper").remove();

	});
});

function xZoomImg(smallImg) {

	var fullImg = document.getElementById("imageBox");
	fullImg.src = smallImg.src;

};



