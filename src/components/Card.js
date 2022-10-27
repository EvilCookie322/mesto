class Card {

	#openCardPreview;
	#name;
	#link;
	#element;
	#elementImage;
	#buttonLike;

	constructor(openCardPreview, template, { name, link }) {
		this.#openCardPreview = openCardPreview;
		this.#name = name;
		this.#link = link;
		this.#element = document.querySelector(template).content
			.querySelector('.element').cloneNode(true);
		this.#elementImage = this.#element.querySelector('.element__image');
		this.#buttonLike = this.#element.querySelector('.element__button-like');
	}

	#addEventListeners() {
		this.#elementImage.addEventListener('click', () => this.#openCardPreview(this.#name, this.#link));
		this.#buttonLike.addEventListener('click', () => this.#handleLike());
		this.#element.querySelector('.element__button-trash').addEventListener('click', () => this.#handleDeleteCard());
	}

	#handleDeleteCard() {
		this.#element.remove();
		this.#element = null;
	}

	#handleLike() {
		this.#buttonLike.classList.toggle('element__button-like_active');
	}

	create() {
		this.#elementImage.src = this.#link;
		this.#elementImage.alt = this.#name;
		this.#element.querySelector('.element__name').textContent = this.#name;
		this.#addEventListeners();
		return this.#element;
	}
}

export { Card };