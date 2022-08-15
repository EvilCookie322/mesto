const edit = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const submit = document.querySelector('.edit-form__submit-button');
const editClose = document.querySelector('.popup__close-button');
const popupInputName = document.querySelector('.edit-form__input_el_name');
const popupInputDescription = document.querySelector('.edit-form__input_el_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const likeButton = document.querySelectorAll('.element__button');

function popupOpen() {
	popup.classList.toggle('popup_opened');
}

likeButton.forEach((el) => {
	el.onclick = () => {
		el.classList.toggle('element__button_active');
	}
})

edit.addEventListener('click', () => {
	popupInputName.value = profileName.textContent;
	popupInputDescription.value = profileDescription.textContent;
	popupOpen();
})

editClose.addEventListener('click', popupOpen);

submit.addEventListener('click', (event) => {
	event.preventDefault();
	profileName.textContent = popupInputName.value;
	profileDescription.textContent = popupInputDescription.value;
	popupOpen();
})



