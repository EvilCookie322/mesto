import { Popup } from "./Popup";

class PopupConfirmDelete extends Popup {

	#form;
	#submitbutton;
	#submitButtonText;
	#handleSubmit;
	#popupContainer;

	constructor(selector, handleSubmit) {
		super(selector);
		this.#handleSubmit = handleSubmit;
		this.#popupContainer = this.popup.querySelector('.popup__container');
		this.#form = this.popup.querySelector('.form');
		this.#submitbutton = this.#form.querySelector('.form__confirm-button');
		this.#submitButtonText = this.#submitbutton.textContent;
		this.addEventListeners();
	}

	addEventListeners() {
		super.addEventListeners();
		this.#form.addEventListener('submit', (e) => {
			e.preventDefault();
			this.#handleSubmit(this.cardToRemove);
		})
		this.#popupContainer.addEventListener('click', () => this.#submitbutton.focus());
	}

	openPopup(card) {
		super.openPopup();
		this.cardToRemove = card;
		this.#submitbutton.focus();
	}

	deleting(isDeleting) {
		if (isDeleting) {
			this.#submitbutton.textContent = 'Удаление...';
			this.#submitbutton.setAttribute('disabled', true);
		} else {
			this.#submitbutton.removeAttribute('disabled');
			this.#submitbutton.textContent = this.#submitButtonText;
		}
	}
}

export { PopupConfirmDelete };