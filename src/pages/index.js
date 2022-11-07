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
		cardsSection.addServerItem(createCard(data));
	}
}, cardsContainer);

Promise.all([api.getUserInformation(), api.getInitialCards()])
	.then(([user, cards]) => {
		if (user) {
			userInfo.setUserInfo(user.name, user.about);
			userInfo.setUserAvatar(user.avatar);
			MY_ID = user._id;
		}
		if (cards) {
			cardsSection.renderItems(cards);
		}
	})
	.catch(error => console.error(error));

const popupTypeConfirm = new PopupConfirmDelete('.popup_type_confirm-delete', (card) => {
	popupTypeConfirm.deleting(true);
	return api.deleteCard(card.id)
		.then((requestStatus) => {
			if (requestStatus) {
				card.removeCard();
				popupTypeConfirm.closePopup();
			}
			setTimeout(() => {
				popupTypeConfirm.deleting(false);
			}, 500);
		})
		.catch(error => console.log('Error while deleting card', error))
		.finally(() => setTimeout(() => {
			popupTypeConfirm.deleting(false);
		}, 500));
});
const handleDeleteCard = (card) => {
	popupTypeConfirm.openPopup(card);
};

const changeLike = (fetch, setLike) => {
	fetch.then(data => {
		if (data) {
			setLike(data.likes.length)
		}
	})
		.catch(error => console.log('Error while toggling like', error));
}

const handleLikeCard = (liked, id, setLike) => {
	if (liked) {
		changeLike(api.removeLike(id), setLike);
	} else {
		changeLike(api.setLike(id), setLike);
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
	return api.createCard(data)
		.then((newData) => {
			if (newData) {
				cardsSection.addItem(createCard(newData));
				popupTypeAddCard.closePopup();
			}
		})
		.catch(error => console.log('Error while creating card', error))
		.finally(() =>
			setTimeout(() => {
				popupTypeAddCard.loading(false);
			}, 500)
		);
});

profileAddButton.addEventListener('click', () => {
	validatorFormTypeAdd.resetFormErrors();
	popupTypeAddCard.openPopup();
});

const popupTypeEditProfile = new PopupWithForm('.popup_type_edit-profile', ({ name, description }) => {
	popupTypeEditProfile.loading(true);
	return api.updateUserInformation(name, description)
		.then((requestStatus) => {
			if (requestStatus) {
				userInfo.setUserInfo(name, description);
				popupTypeEditProfile.closePopup();
			}
		})
		.catch(error => console.log('Error while updating user information', error))
		.finally(() =>
			setTimeout(() => {
				popupTypeEditProfile.loading(false);
			}, 500)
		);
})

const popupTypeEditAvatar = new PopupWithForm('.popup_type_edit-avatar', ({ link }) => {
	popupTypeEditAvatar.loading(true);
	return api.updateAvatar(link)
		.then((requestStatus) => {
			if (requestStatus) {
				userInfo.setUserAvatar(link);
				popupTypeEditAvatar.closePopup();
			}
		})
		.catch(error => console.log('Error while updating avatar', error))
		.finally(() =>
			setTimeout(() => {
				popupTypeEditAvatar.loading(false);
			}, 500)
		);
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


