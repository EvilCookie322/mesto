const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = document.querySelector('.form-edit-profile');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const inputElementName = document.querySelector('.edit-form__input_el_name');
const inputElementDescription = document.querySelector('.edit-form__input_el_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const popupAddCard = document.querySelector('.popup_type_add-card');
const cardAddButton = document.querySelector('.profile__add-button');
const addForm = document.querySelector('.add-form');
const addElementName = document.querySelector('#add-form__name');
const addElementLink = document.querySelector('#add-form__link');

const elementTemplate = document.querySelector('#element').content;
const elements = document.querySelector('.elements');

const popupPreviewPicture = document.querySelector('.popup_type_preview-picture');

const popups = document.querySelectorAll('.popup');

initialCards.forEach(e => addElement(e.name, e.link));

function createElement(name, link) {
	const element = elementTemplate.querySelector('.element').cloneNode(true);
	const elementImage = element.querySelector('.element__image');
	const elementName = element.querySelector('.element__name');
	elementImage.src = link;
	elementImage.alt = name;
	elementName.textContent = name;
	element.querySelector('.element__button-like').addEventListener('click', e => toggleClass(e.target, 'element__button-like_active'));
	element.querySelector('.element__button-trash').addEventListener('click', e => {
		e.target.closest('.element').remove();
	});
	elementImage.addEventListener('click', () => openPreviewPicture(elementName.textContent, elementImage.src));
	return element;
}

function addElement(name, link) {
	elements.prepend(createElement(name, link));
}

function openPreviewPicture(name, link) {
	const popupImage = popupPreviewPicture.querySelector('.popup__image');
	const popupName = popupPreviewPicture.querySelector('.popup__name');
	popupImage.src = link;
	popupImage.alt = name;
	popupName.textContent = name;
	openPopup(popupPreviewPicture);
}

function toggleClass(element, className) {
	element.classList.toggle(className);
}

function openPopup(popup) {
	toggleClass(popup, 'popup_opened');
}

function closePopup(popup) {
	toggleClass(popup, 'popup_opened');
}

function handleSubmitEditProfileForm(event) {
	event.preventDefault();
	profileName.textContent = inputElementName.value;
	profileDescription.textContent = inputElementDescription.value;
	closePopup(popupEditProfile);
}

function handleSubmitAddElementForm(event) {
	event.preventDefault();
	addElement(addElementLink.value, addElementName.value);
	closePopup(popupAddCard);
	addElementName.value = '';
	addElementLink.value = '';
}

function openEditForm() {
	inputElementName.value = profileName.textContent;
	inputElementDescription.value = profileDescription.textContent;
	openPopup(popupEditProfile);
}

profileEditButton.addEventListener('click', openEditForm);

popupCloseButtons.forEach(btn => btn.addEventListener('click', (e) => {
	closePopup(e.target.closest('.popup'));
}));

formEditProfile.addEventListener('submit', handleSubmitEditProfileForm);
addForm.addEventListener('submit', handleSubmitAddElementForm);

cardAddButton.addEventListener('click', () => openPopup(popupAddCard));

