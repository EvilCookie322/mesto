const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const editForm = document.querySelector('.edit-form');
const popupCloseButton = document.querySelector('.popup__close-button');
const nameInputElement = document.querySelector('.edit-form__input_el_name');
const descriptionInputElement = document.querySelector('.edit-form__input_el_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const likeButton = document.querySelectorAll('.element__button');

function togglePopup() {
	popup.classList.toggle('popup_opened');
}

function submitHandler(event) {
	event.preventDefault();
	profileName.textContent = nameInputElement.value;
	profileDescription.textContent = descriptionInputElement.value;
	togglePopup();
}

function openEditForm() {
	nameInputElement.value = profileName.textContent;
	descriptionInputElement.value = profileDescription.textContent;
	togglePopup();
}

likeButton.forEach((el) => {
	el.onclick = () => {
		el.classList.toggle('element__button_active');
	}
})

profileEditButton.addEventListener('click', openEditForm)

popupCloseButton.addEventListener('click', togglePopup);

editForm.addEventListener('submit', submitHandler);



