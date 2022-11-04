const validationSet = {
	inputSelector: '.form__input',
	submitButtonSelector: '.form__submit-button',
	inactiveButtonClass: 'form__submit-button_disabled',
	inputErrorClass: 'form__input_type_error',
	errorClass: 'form__error_visible'
}

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const avatarEditButton = document.querySelector('.profile__edit-avatar-button');
const cardTemplate = '#element';
const formTypeAdd = document.forms['add-form'];
const formTypeEdit = document.forms['edit-form'];
const formTypeEditAvatar = document.forms['edit-avatar-form'];
const cardsContainer = document.querySelector('.elements');
const profileNameInput = document.querySelector('#name-input');
const profileDescriptionInput = document.querySelector('#description-input');

const API_CONFIG = {
	url: 'https://mesto.nomoreparties.co/v1/cohort-52',

	headers: {
		authorization: 'ed068a2f-c117-42a5-a232-1e0db66110be',
		'Content-Type': 'application/json',
	},
}

export {
	validationSet, profileEditButton, profileAddButton, cardTemplate,
	formTypeAdd, formTypeEdit, cardsContainer, profileNameInput, profileDescriptionInput,
	avatarEditButton, formTypeEditAvatar, API_CONFIG
};