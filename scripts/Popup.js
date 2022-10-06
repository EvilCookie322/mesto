class Popup {

	popup;
	#buttonClose;

	constructor(selector) {
		this.popup = document.querySelector(selector);
		this.#buttonClose = this.popup.querySelector('.popup__close-button');
		this.#addEventListeners();
	}

	#addEventListeners() {
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
		document.addEventListener('keydown', (e) => this.#handleClosePopupPressEsc(e));
	}

	closePopup() {
		this.popup.classList.remove('popup_opened');
		document.removeEventListener('keydown', () => this.#handleClosePopupPressEsc());
	}
}

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

class PopupTypeAddCard extends Popup {

	#createCard;

	constructor(createCard, cardTemplate, container, popupPreview) {
		super('.popup_type_add-card');
		this.#createCard = createCard;
		this.container = container;
		this.popupPreview = popupPreview;
		this.cardTemplate = cardTemplate;
		this.#addEventListeners();
	}

	#addEventListeners() {
		this.popup.addEventListener('submit', () => this.#handleSubmit());
	}

	#handleSubmit() {
		const nameInputValue = this.popup.querySelector('#place-name-input').value;
		const linkInputValue = this.popup.querySelector('#link-input').value;
		this.#createCard(nameInputValue, linkInputValue, this.cardTemplate)
			.render(this.container, this.popupPreview);
		this.closePopup();
	}
}

class PopupTypePreviewPicture extends Popup {

	#image;
	#name;

	constructor() {
		super('.popup_type_preview-picture');
		this.#image = this.popup.querySelector('.popup__image');
		this.#name = this.popup.querySelector('.popup__name');
	}

	openPopup(name, link) {
		this.#name.textContent = name;
		this.#image.src = link;
		this.#image.alt = name;
		super.openPopup();
	}
}

export { PopupTypePreviewPicture, PopupTypeAddCard, PopupTypeEditProfile };