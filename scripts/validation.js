const validationSet = {
	formSelector: '.form',
	inputSelector: '.form__input',
	submitButtonSelector: '.form__submit-button',
	inactiveButtonClass: 'form__submit-button_disabled',
	inputErrorClass: 'form__input_type_error',
	errorClass: 'form__error_visible'
}

function enableValidation(set) {
	const formList = Array.from(document.querySelectorAll(set.formSelector));
	formList.forEach(formElement => {
		formElement.addEventListener('submit', evt => evt.preventDefault());
		setEventListeners(formElement, set);
	});
}

function setEventListeners(form, set) {
	const inputList = Array.from(form.querySelectorAll(set.inputSelector));
	const buttonSubmit = form.querySelector(set.submitButtonSelector);
	inputList.forEach(input => input.addEventListener('input', () => {
		checkInputValidity(form, input, set);
		if (hasInvalidInput(inputList)) {
			enableSubmitButton(buttonSubmit, set);
		} else {
			disableSubmitButton(buttonSubmit, set);
		}
	}));
}

function resetFormErrors(form, set) {
	const inputList = Array.from(form.querySelectorAll(set.inputSelector));
	const buttonSubmit = form.querySelector(set.submitButtonSelector);
	inputList.forEach((input) => {
		checkInputValidity(form, input, set);
		hideInputError(form, input, set);
	});
	if (hasInvalidInput(inputList)) {
		enableSubmitButton(buttonSubmit, set);
	} else {
		disableSubmitButton(buttonSubmit, set);
	}
}

function checkInputValidity(form, input, set) {
	if (!input.validity.valid) {
		showInputError(form, input, input.validationMessage, set);
	} else {
		hideInputError(form, input, set);
	}
}

function enableSubmitButton(buttonSubmit, set) {
	buttonSubmit.classList.add(set.inactiveButtonClass);
	buttonSubmit.setAttribute('disabled', true);
}

function disableSubmitButton(buttonSubmit, set) {
	buttonSubmit.classList.remove(set.inactiveButtonClass);
	buttonSubmit.removeAttribute('disabled');
}

function showInputError(form, input, errorMessage, set) {
	const errorElement = form.querySelector(`.${input.id}-error`);
	input.classList.add(set.inputErrorClass);
	errorElement.textContent = errorMessage;
	errorElement.classList.add(set.errorClass);
}

function hideInputError(form, input, set) {
	const errorElement = form.querySelector(`.${input.id}-error`);
	input.classList.remove(set.inputErrorClass);
	errorElement.classList.remove(set.errorClass);
	errorElement.textContent = '';
}

function hasInvalidInput(inputList) {
	return inputList.some(input => {
		return !input.validity.valid;
	});
}

enableValidation(validationSet);