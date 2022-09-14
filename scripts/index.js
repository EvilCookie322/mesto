const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = document.querySelector('.form_type_edit');
const formEditProfileInputs = Array.from(formEditProfile.querySelectorAll('.form__input'));
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const formEditNameInput = formEditProfile.querySelector('#name-input');
const formEditDescriptionInput = formEditProfile.querySelector('#description-input');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const popupAddCard = document.querySelector('.popup_type_add-card');
const cardAddButton = document.querySelector('.profile__add-button');
const formAddElement = document.querySelector('.form_type_add');
const formAddNameInput = formAddElement.querySelector('#name-input');
const formAddLinkInput = formAddElement.querySelector('#link-input');

const elementTemplate = document.querySelector('#element').content;
const elements = document.querySelector('.elements');

const popupPreviewPicture = document.querySelector('.popup_type_preview-picture');
const popupImage = popupPreviewPicture.querySelector('.popup__image');
const popupName = popupPreviewPicture.querySelector('.popup__name');

const popups = Array.from(document.querySelectorAll('.popup'));

initialCards.forEach(element => addElement(element.name, element.link));

function createElement(name, link) {
	const element = elementTemplate.querySelector('.element').cloneNode(true);
	const elementImage = element.querySelector('.element__image');
	const elementName = element.querySelector('.element__name');
	elementImage.src = link;
	elementImage.alt = name;
	elementName.textContent = name;
	element.querySelector('.element__button-like').addEventListener('click', event => toggleClass(event.target, 'element__button-like_active'));
	element.querySelector('.element__button-trash').addEventListener('click', event => {
		event.target.closest('.element').remove();
	});
	elementImage.addEventListener('click', () => openPreviewPicture(elementName.textContent, elementImage.src));
	return element;
}

function addElement(name, link) {
	elements.prepend(createElement(name, link));
}

function openPreviewPicture(name, link) {
	popupImage.src = link;
	popupImage.alt = name;
	popupName.textContent = name;
	openPopup(popupPreviewPicture);
}

function toggleClass(element, className) {
	element.classList.toggle(className);
}

function openPopup(popup) {
	popup.classList.add('popup_opened');
	document.addEventListener('keydown', closePopupClickEsc);
}

function closePopup(popup) {
	popup.classList.remove('popup_opened');
	document.removeEventListener('keydown', closePopupClickEsc);
}

function handleSubmitEditProfileForm() {
	profileName.textContent = formEditNameInput.value;
	profileDescription.textContent = formEditDescriptionInput.value;
	closePopup(popupEditProfile);
}

function handleSubmitAddElementForm() {
	addElement(formAddNameInput.value, formAddLinkInput.value);
	closePopup(popupAddCard);
}

function openEditForm() {
	formEditNameInput.value = profileName.textContent;
	formEditDescriptionInput.value = profileDescription.textContent;
	openPopup(popupEditProfile);
}

function closePopupClickOverlay(target) {
	if (target.classList.contains('popup_opened')) {
		closePopup(target);
	}
}

function closePopupClickEsc() {
	const popup = document.querySelector('.popup_opened');
	if (event.key === 'Escape') {
		closePopup(popup);
	}
}

popups.forEach(popup => {
	popup.addEventListener('click', event => closePopupClickOverlay(event.target));
});

profileEditButton.addEventListener('click', openEditForm);

popupCloseButtons.forEach(btn => btn.addEventListener('click', (event) => {
	closePopup(event.target.closest('.popup'));
}));

formEditProfile.addEventListener('submit', handleSubmitEditProfileForm);
formAddElement.addEventListener('submit', handleSubmitAddElementForm);

cardAddButton.addEventListener('click', () => {
	openPopup(popupAddCard);
	formAddElement.reset();
});

