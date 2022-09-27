class Popup {

	#popup;//static???
	#buttonClose;

	constructor(selector) {
		this.#popup = document.querySelector(selector);
		this.#buttonClose = this.#popup.querySelector('.popup__close-button');
	}

	addEventListeners() {
		this.#buttonClose.addEventListener('click', () => this.#closePopup);
		this.#popup.addEventListener('click', () => this.#handleClosePopupClickOverlay);
	}

	#handleClosePopupClickOverlay() {
		if (this.#popup.classList.contains('popup_opened')) {
			this.#closePopup();
		}
	}

	#handleClosePopupPressEsc(event) {
		if (event.key === 'Escape') {
			const popup = document.querySelector('.popup_opened');
			this.#closePopup(popup);
		}
	}

	openPopup() {
		this.#popup.classList.add('popup_opened');
		document.addEventListener('keydown', this.#handleClosePopupPressEsc);
	}

	#closePopup(popup = this.#popup) {
		popup.classList.remove('popup_opened');
		document.removeEventListener('keydown', this.#handleClosePopupPressEsc);
	}
}

class PopupPreviewPicture extends Popup {

	#popup;
	#image;
	#name;

	constructor() {
		super('.popup_type_preview-picture');
		this.#popup = document.querySelector('.popup_type_preview-picture');
		this.#image = this.#popup.querySelector('.popup__image');
		this.#name = this.#popup.querySelector('.popup__name');
	}

	openPopup(name, link) {
		this.#name.textContent = name;
		this.#image.src = link;
		this.#image.alt = name;
		super.openPopup();
	}
}