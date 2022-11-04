import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import { PopupConfirmDelete } from '../components/PopupConfirmDelete.js';

import {
	validationSet, profileAddButton, profileEditButton,
	cardTemplate, formTypeAdd, formTypeEdit, cardsContainer,
	profileDescriptionInput, profileNameInput,
	avatarEditButton, formTypeEditAvatar, API_CONFIG
}
	from '../utils/data.js';

//стили by webpack
import '../pages/index.css';

import { Api } from '../components/Api.js';

let MY_ID;

const api = new Api(API_CONFIG);

const userInfo = new UserInfo({ nameSelector: '.profile__name', descriptionSelector: '.profile__description', avatarSelector: '.profile__photo' });

const cardsSection = new Section({
	renderer: (data) => {
		cardsSection.addItem(createCard(data));
	}
}, cardsContainer);

const getUserInformation = api.getUserInformation()
	.then(information => {
		userInfo.setUserInfo(information.name, information.about);
		userInfo.setUserAvatar(information.avatar);
		MY_ID = information._id;
	})
	.catch(error => console.log('Error while getting user information', error));

const getInitialCards = api.getInitialCards()
	.then(cards => {
		cardsSection.renderItems(cards);
	})
	.catch(error => console.log('Error while getting initial cards', error));

Promise.all([getUserInformation, getInitialCards])
	.catch(error => console.error(error));

const popupTypeConfirm = new PopupConfirmDelete('.popup_type_confirm-delete');
const handleDeleteCard = (card) => {
	popupTypeConfirm.openPopup();
	popupTypeConfirm.setSubmitAction(() => {
		api.deleteCard(card.id)
			.then(() => card.removeCard())
			.then(() => popupTypeConfirm.closePopup())
			.catch(error => console.log('Error while deleting card', error))
			.finally(() => {
				setTimeout(() => {
					popupTypeConfirm.removeSubmitAction();
				}, 1000);
			});
	});
};

const handleLikeCard = (liked, id) => {
	if (liked) {
		return api.removeLike(id);
	} else {
		return api.setLike(id);
	}
}

const popupTypePreviewPicture = new PopupWithImage();

const openCardPreview = (name, link) => popupTypePreviewPicture.openPopup(name, link);
const createCard = (data) => {
	data.myID = MY_ID;
	return new Card(openCardPreview, cardTemplate, handleDeleteCard, handleLikeCard, data)
		.create();
};

const popupTypeAddCard = new PopupWithForm('.popup_type_add-card', (data) => {
	popupTypeAddCard.loading(true);
	api.createCard(data)
		.then((newData) => {
			cardsSection.addItem(createCard(newData));
		})
		.catch(error => console.log('Error while creating card', error))
		.finally(() => popupTypeAddCard.loading(false));
});

profileAddButton.addEventListener('click', () => {
	validatorFormTypeAdd.resetFormErrors();
	popupTypeAddCard.openPopup();
});

const popupTypeEditProfile = new PopupWithForm('.popup_type_edit-profile', ({ name, description }) => {
	popupTypeEditProfile.loading(true);
	api.updateUserInformation(name, description)
		.then(() => userInfo.setUserInfo(name, description))
		.catch(error => console.log('Error while updating user information', error))
		.finally(() => popupTypeEditProfile.loading(false));
})

const popupTypeEditAvatar = new PopupWithForm('.popup_type_edit-avatar', ({ link }) => {
	popupTypeAddCard.loading(true);
	api.updateAvatar(link)
		.then(() => userInfo.setUserAvatar(link))
		.catch(error => console.log('Error while updating avatar', error))
		.finally(() => popupTypeAddCard.loading(false));
})

avatarEditButton.addEventListener('click', () => {
	popupTypeEditAvatar.openPopup();
	validatorFormTypeEditAvatar.resetFormErrors();
})

profileEditButton.addEventListener('click', () => {
	({ name: profileNameInput.value, description: profileDescriptionInput.value } = userInfo.getUserInfo());
	popupTypeEditProfile.openPopup();
	validatorFormTypeEdit.resetFormErrors();
});

const validatorFormTypeAdd = new FormValidator(validationSet, formTypeAdd);
const validatorFormTypeEdit = new FormValidator(validationSet, formTypeEdit);
const validatorFormTypeEditAvatar = new FormValidator(validationSet, formTypeEditAvatar);
validatorFormTypeAdd.enableValidation();
validatorFormTypeEdit.enableValidation();
validatorFormTypeEditAvatar.enableValidation();


