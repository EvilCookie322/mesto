const validationSet = {
	inputSelector: '.form__input',
	submitButtonSelector: '.form__submit-button',
	inactiveButtonClass: 'form__submit-button_disabled',
	inputErrorClass: 'form__input_type_error',
	errorClass: 'form__error_visible'
}

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const cardTemplate = '#element';
const formTypeAdd = document.forms['add-form'];
const formTypeEdit = document.forms['edit-form'];
const cardsContainer = document.querySelector('.elements');

export {
	validationSet, profileEditButton, profileAddButton, cardTemplate,
	formTypeAdd, formTypeEdit, cardsContainer
};