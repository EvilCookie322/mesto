import { Popup } from "./Popup.js";



class PopupTypeAddCard extends Popup {

	#createCard;
	#renderCard;

	constructor(createCard, renderCard) {
		super('.popup_type_add-card');
		this.#createCard = createCard;
		this.#renderCard = renderCard;
		this.#addEventListeners();
	}

	#addEventListeners() {
		this.popup.addEventListener('submit', () => this.#handleSubmit());
	}

	#handleSubmit() {
		const nameInputValue = this.popup.querySelector('#place-name-input').value;
		const linkInputValue = this.popup.querySelector('#link-input').value;
		const card = this.#createCard(nameInputValue, linkInputValue);
		this.#renderCard(card);
		this.closePopup();
	}
}

export { PopupTypeAddCard };