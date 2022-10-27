import { Popup } from './Popup.js';

class PopupWithImage extends Popup {

	#image;
	#name;

	constructor() {
		super('.popup_type_preview-picture');
		this.#image = this.popup.querySelector('.popup__image');
		this.#name = this.popup.querySelector('.popup__name');
		this.addEventListeners();
	}

	openPopup(name, link) {
		this.#name.textContent = name;
		this.#image.src = link;
		this.#image.alt = name;
		super.openPopup();
	}
}

export { PopupWithImage };