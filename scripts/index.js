import { PopupTypePreviewPicture, PopupTypeAddCard, PopupTypeEditProfile } from './Popup.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './cards.js';
import {
	validationSet, profileAddButton, profileEditButton,
	cardTemplate, formTypeAdd, formTypeEdit, cardsContainer
}
	from './data.js';

const createCard = (...args) => new Card(...args);

const popupTypePreviewPicture = new PopupTypePreviewPicture();
const popupTypeEditProfile = new PopupTypeEditProfile();
const popupTypeAddCard = new PopupTypeAddCard(createCard, cardTemplate, cardsContainer, popupTypePreviewPicture);

const validatorFormTypeAdd = new FormValidator(validationSet, formTypeAdd);
const validatorFormTypeEdit = new FormValidator(validationSet, formTypeEdit);
validatorFormTypeAdd.enableValidation();
validatorFormTypeEdit.enableValidation();

profileEditButton.addEventListener('click', () => {
	validatorFormTypeEdit.resetFormErrors();
	popupTypeEditProfile.openPopup();
});

profileAddButton.addEventListener('click', () => {
	validatorFormTypeAdd.resetFormErrors();
	formTypeAdd.reset();
	popupTypeAddCard.openPopup();
});

initialCards.forEach(card => new Card(card.name, card.link, '#element').render(cardsContainer, popupTypePreviewPicture));