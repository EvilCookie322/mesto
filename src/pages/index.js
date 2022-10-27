import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';

import { initialCards } from '../utils/cards.js';
import {
	validationSet, profileAddButton, profileEditButton,
	cardTemplate, formTypeAdd, formTypeEdit, cardsContainer,
	profileDescriptionInput, profileNameInput,
}
	from '../utils/data.js';

//стили by webpack
import '../pages/index.css';

const openCardPreview = (name, link) => popupTypePreviewPicture.openPopup(name, link);
const createCard = (data) => {
	const card = new Card(openCardPreview, cardTemplate, data.name, data.link).create();
	cardsSection.addItem(card);
};

const cardsSection = new Section({ items: initialCards, renderer: createCard }, cardsContainer);
cardsSection.renderItems();
const popupTypeAddCard = new PopupWithForm('.popup_type_add-card', createCard);

profileAddButton.addEventListener('click', () => {
	validatorFormTypeAdd.resetFormErrors();
	popupTypeAddCard.openPopup();
});

const popupTypePreviewPicture = new PopupWithImage();

const userInfo = new UserInfo({ nameSelector: '.profile__name', descriptionSelector: '.profile__description' });
const popupTypeEditProfile = new PopupWithForm('.popup_type_edit-profile', ({ name, description }) => {
	userInfo.setUserInfo(name, description);
})

profileEditButton.addEventListener('click', () => {
	({ name: profileNameInput.value, description: profileDescriptionInput.value } = userInfo.getUserInfo());
	popupTypeEditProfile.openPopup();
	validatorFormTypeEdit.resetFormErrors();
});

const validatorFormTypeAdd = new FormValidator(validationSet, formTypeAdd);
const validatorFormTypeEdit = new FormValidator(validationSet, formTypeEdit);
validatorFormTypeAdd.enableValidation();
validatorFormTypeEdit.enableValidation();


