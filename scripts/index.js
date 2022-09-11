const profileEditButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup-edit');
const editForm = document.querySelector('.form-edit-profile');
const popupCloseButton = document.querySelectorAll('.popup__close-button');
const nameInputElement = document.querySelector('.edit-form__input_el_name');
const descriptionInputElement = document.querySelector('.edit-form__input_el_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const likeButton = document.querySelectorAll('.element__button-like');

const popupAdd = document.querySelector('.popup-add');
const placeAddButton = document.querySelector('.profile__add-button');
const addForm = document.querySelector('.form-add-element');
const addElementName = document.querySelector('.add-form__input_el_name');
const addElementLink = document.querySelector('.add-form__input_el_link')

const elementTemplate = document.querySelector('#element').content;
const elements = document.querySelector('.elements');

const popupPicture = document.querySelector('.popup-picture');

const popup = document.querySelectorAll('.popup');

const initialCards = [
	{
		name: 'Архыз',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
		name: 'Челябинская область',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
		name: 'Иваново',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
		name: 'Камчатка',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
		name: 'Холмогорский район',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
		name: 'Байкал',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	}
];

initialCards.forEach(e => addElement(e.link, e.name));

function addElement(link, name) {
	const element = elementTemplate.querySelector('.element').cloneNode(true);
	element.querySelector('.element__image').src = link;
	element.querySelector('.element__image').alt = name;
	element.querySelector('.element__name').textContent = name;
	element.querySelector('.element__button-like').addEventListener('click', e => {
		e.target.classList.toggle('element__button-like_active');
	});
	element.querySelector('.element__button-trash').addEventListener('click', e => {
		e.target.closest('.element').remove();
	});
	element.querySelector('.element__image').addEventListener('click', e => openPicture(e.target.closest('.element')));
	elements.prepend(element);
}

function openPicture(e) {
	popupPicture.querySelector('.popup__image').src = e.querySelector('.element__image').src;
	popupPicture.querySelector('.popup__image').alt = e.querySelector('.element__image').alt;
	popupPicture.querySelector('.popup__name').textContent = e.querySelector('.element__name').textContent;
	togglePopup(popupPicture);
}

function togglePopup(element) {
	element.classList.toggle('popup_opened');
}

function editSubmitHandler(event) {
	event.preventDefault();
	profileName.textContent = nameInputElement.value;
	profileDescription.textContent = descriptionInputElement.value;
	togglePopup(popupEdit);
}

function addSubmitHandler(event) {
	event.preventDefault();
	addElement(addElementLink.value, addElementName.value);
	togglePopup(popupAdd);
	addElementName.value = '';
	addElementLink.value = '';
}

function openEditForm() {
	nameInputElement.value = profileName.textContent;
	descriptionInputElement.value = profileDescription.textContent;
	togglePopup(popupEdit);
}

profileEditButton.addEventListener('click', openEditForm);

popupCloseButton.forEach(btn => btn.addEventListener('click', (e) => {
	togglePopup(e.target.closest('.popup'));
	console.log(e);
}));

// popup.forEach(e => {
// 	e.addEventListener('click', (event) => togglePopup(event.target));
// });

editForm.addEventListener('submit', editSubmitHandler);
addForm.addEventListener('submit', addSubmitHandler);

placeAddButton.addEventListener('click', () => togglePopup(popupAdd));

