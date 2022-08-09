const edit = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const submit = document.querySelector('.popup__submit-button');
const editClose = document.querySelector('.popup__close-button');
const popupInputName = document.querySelector('.popup__input_el_name');
const popupInputDescription = document.querySelector('.popup__input_el_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

edit.addEventListener('click', () => {
	popup.classList.toggle('popup_opened');
});

editClose.addEventListener('click', () => {
	popup.classList.toggle('popup_opened');
});

submit.addEventListener('click', (event) => {
	if (popupInputName.value && popupInputDescription.value) {
		profileName.textContent = popupInputName.value;
		profileDescription.textContent = popupInputDescription.value;
	} else {
		return false;
	}
	event.preventDefault();
	popup.classList.toggle('popup_opened');
});


