import { Popup } from './Popup.js';

class PopupTypeEditProfile extends Popup {

	#profileName;
	#profileDescription;
	#nameInput;
	#descriptionInput;

	constructor() {
		super('.popup_type_edit-profile');
		this.#profileName = document.querySelector('.profile__name');
		this.#profileDescription = document.querySelector('.profile__description');
		this.#nameInput = this.popup.querySelector('#name-input');
		this.#descriptionInput = this.popup.querySelector('#description-input');
		this.#addEventListeners();
	}

	#addEventListeners() {
		this.popup.addEventListener('submit', () => this.#handleSubmit());
	}

	#handleSubmit() {
		this.#profileName.textContent = this.#nameInput.value;
		this.#profileDescription.textContent = this.#descriptionInput.value;
		this.closePopup();
	}

	openPopup() {
		this.#nameInput.value = this.#profileName.textContent;
		this.#descriptionInput.value = this.#profileDescription.textContent;
		super.openPopup();
	}
}

export { PopupTypeEditProfile };