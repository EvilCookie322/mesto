class Card {

	#name;
	#link;
	#element;
	#elementImage;

	constructor(name, link, template) {
		this.#name = name;
		this.#link = link;
		this.#element = document.querySelector(template).content
			.querySelector('.element').cloneNode(true);
		this.#elementImage = this.#element.querySelector('.element__image');
	}

	#addEventListeners(popupPreview) {
		this.#elementImage.addEventListener('click', () => popupPreview.openPopup(this.#name, this.#link));
		this.#element.querySelector('.element__button-like').addEventListener('click', () => this.#handleLike());
		this.#element.querySelector('.element__button-trash').addEventListener('click', () => this.#handleDeleteCard());
	}

	#handleDeleteCard() {
		this.#element.remove();
	}

	#handleLike() {
		this.#element.querySelector('.element__button-like').classList.toggle('element__button-like_active');
	}

	create() {
		this.#elementImage.src = this.#link;
		this.#elementImage.alt = this.#name;
		this.#element.querySelector('.element__name').textContent = this.#name;
	}

	render(container, popupPreview) {
		this.#addEventListeners(popupPreview);
		this.create();
		container.prepend(this.#element);
	}
}

export { Card };