'use strict';

class SliderCarousel {
	constructor({
		main,
		wrap,
		next, // стрелочки
		prev,
		infinity = false, // при последнем слайде возвр. к 1-му
		position = 0,
		slidesToShow = 3, // количество слайдов по умолчанию
	}) {
		this.main = document.querySelector(main);
		this.wrap = document.querySelector(wrap);
		this.slides = document.querySelector(wrap).children; // получаем детей, элементы слайда
		this.next = document.querySelector(next);
		this.prev = document.querySelector(prev);
		this.slidesToShow = slidesToShow;
		this.options = {
			position, // позиция слайдера
			infinity,
			widthSlide: Math.floor(100 / this.slidesToShow), // автоматич. вычисле-е ширины для слайда
		};
	}


	init() {
		this.addGloClass();
		this.addStyle();

		if (this.prev && this.next) { // если передали стрелки
			this.controlSlider();
		} else {
			this.addArrow();
			this.controlSlider();
		}
	}

	addGloClass() {
		this.main.classList.add('glo-slider'); // добавляем классы
		this.wrap.classList.add('glo-slider__wrap');
		for (const item of this.slides) {
			item.classList.add('glo-slider__item');
		}
	}

	// создаём элемент со стилями
	addStyle() {
		const style = document.createElement('style');
		style.setAttribute('id', 'sliderCarousel-style');
		style.textContent = `
			.glo-slider {
				overflow: hidden !important;
			}
			.glo-slider__wrap {
				display: flex !important;
				transition: transform 0.5s !important;
				will-change: transform !important;
			}
			.glo-slider__item {
				flex: 0 0 ${this.options.widthSlide}% !important; 
				margin: auto 0 !important; 
			}
		`;

		// добавляем элемент в head
		document.head.appendChild(style);
	}

	controlSlider() { // если стрелки передал пользователь
		this.prev.addEventListener('click', this.prevSlider.bind(this));
		this.next.addEventListener('click', this.nextSlider.bind(this));
	}

	prevSlider() {
		if (this.options.infinity || this.options.position > 0) { // чтобы не перемещались пустые элем.
			--this.options.position;
			console.log('this.options.position: ', this.options.position);
			if (this.options.position < 0) {
				this.options.position = this.slides.length - this.slidesToShow; // при нажатии влево прокруч. до 4 послед. слайдов
			}
			this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`; // сдвиг на ширину 1 слайда 
		}

	}

	nextSlider() {
		if (this.options.infinity || this.options.position < this.slides.length - this.slidesToShow) { // если меньше крутим вправо, иначе останавливается
			++this.options.position;
			console.log('this.options.position: ', this.options.position);
			if (this.options.position > this.slides.length - this.slidesToShow) {
				this.options.position = 0;
			}
			this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`; // т.к. position м.б. отрицательным
		}
	}


	addArrow() { // добавляем стрелки

	}
}