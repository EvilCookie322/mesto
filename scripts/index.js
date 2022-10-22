import { PopupTypePreviewPicture } from './PopupTypePreviewPicture.js';
import { PopupTypeAddCard } from './PopupTypeAddCard.js'
import { PopupTypeEditProfile } from './PopupTypeEditProfile.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './cards.js';
import {
	validationSet, profileAddButton, profileEditButton,
	cardTemplate, formTypeAdd, formTypeEdit, cardsContainer
}
	from './data.js';

const createCard = (...args) => new Card(cardTemplate, ...args);
const renderCard = (card, container = cardsContainer, popupPreview = popupTypePreviewPicture) => {
	card.addEventListeners(popupPreview);
	container.prepend(card.create());
};

const popupTypePreviewPicture = new PopupTypePreviewPicture();
const popupTypeEditProfile = new PopupTypeEditProfile();
const popupTypeAddCard = new PopupTypeAddCard(createCard, renderCard);

const validatorFormTypeAdd = new FormValidator(validationSet, formTypeAdd);
const validatorFormTypeEdit = new FormValidator(validationSet, formTypeEdit);
validatorFormTypeAdd.enableValidation();
validatorFormTypeEdit.enableValidation();

profileEditButton.addEventListener('click', () => {
	popupTypeEditProfile.openPopup();
	validatorFormTypeEdit.resetFormErrors();
});

profileAddButton.addEventListener('click', () => {
	formTypeAdd.reset();
	validatorFormTypeAdd.resetFormErrors();
	popupTypeAddCard.openPopup();
});

initialCards.forEach(card => {
	renderCard(createCard(card.name, card.link));
});