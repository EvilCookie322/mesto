class Popup {

	popup;
	handleClosePopupPressEsc;
	#buttonClose;

	constructor(selector) {
		this.popup = document.querySelector(selector);
		this.#buttonClose = this.popup.querySelector('.popup__close-button');
		this.handleClosePopupPressEsc = this.#handleClosePopupPressEsc.bind(this);
	}

	addEventListeners() {
		this.#buttonClose.addEventListener('click', () => this.closePopup());
		this.popup.addEventListener('click', (e) => this.#handleClosePopupClickOverlay(e));
	}

	#handleClosePopupClickOverlay(event) {
		if (event.target.classList.contains('popup_opened')) {
			this.closePopup();
		}
	}

	#handleClosePopupPressEsc(event) {
		if (event.key === 'Escape') {
			this.closePopup();
		}
	}

	openPopup() {
		this.popup.classList.add('popup_opened');
		document.addEventListener('keydown', this.handleClosePopupPressEsc);
	}

	closePopup() {
		this.popup.classList.remove('popup_opened');
		document.removeEventListener('keydown', this.handleClosePopupPressEsc);
	}
}

export { Popup };