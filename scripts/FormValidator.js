class FormValidator {

	#set;
	#form;

	constructor(set, formSelector) {
		this.#set = set;
		this.#form = formSelector;
	}

	#showInputError(input, errorMessage) {
		const errorElement = this.#form.querySelector(`.${input.id}-error`);
		input.classList.add(this.#set.inputErrorClass);
		errorElement.textContent = errorMessage;
		errorElement.classList.add(this.#set.errorClass);
	}

	#hideInputError(input) {
		const errorElement = this.#form.querySelector(`.${input.id}-error`);
		input.classList.remove(this.#set.inputErrorClass);
		errorElement.classList.remove(this.#set.errorClass);
		errorElement.textContent = '';
	}

	#checkInputValidity(input) {
		if (!input.validity.valid) {
			this.#showInputError(input, input.validationMessage);
		} else {
			this.#hideInputError(input);
		}
	}

	#hasInvalidInput(inputList) {
		return inputList.some(input => {
			return !input.validity.valid;
		});
	}

	#enableSubmitButton(buttonSubmit) {
		buttonSubmit.classList.add(this.#set.inactiveButtonClass);
		buttonSubmit.setAttribute('disabled', true);
	}

	#disableSubmitButton(buttonSubmit) {
		buttonSubmit.classList.remove(this.#set.inactiveButtonClass);
		buttonSubmit.removeAttribute('disabled');
	}

	#setEventListeners() {
		const inputList = Array.from(this.#form.querySelectorAll(this.#set.inputSelector));
		const buttonSubmit = this.#form.querySelector(this.#set.submitButtonSelector);
		inputList.forEach(input => input.addEventListener('input', () => {
			this.#checkInputValidity(input);
			if (this.#hasInvalidInput(inputList)) {
				this.#enableSubmitButton(buttonSubmit);
			} else {
				this.#disableSubmitButton(buttonSubmit);
			}
		}));
	}

	resetFormErrors() {
		const inputList = Array.from(this.#form.querySelectorAll(this.#set.inputSelector));
		const buttonSubmit = this.#form.querySelector(this.#set.submitButtonSelector);
		inputList.forEach((input) => {
			this.#checkInputValidity(input);
			this.#hideInputError(input);
		});
		if (this.#hasInvalidInput(inputList)) {
			this.#enableSubmitButton(buttonSubmit);
		} else {
			this.#disableSubmitButton(buttonSubmit);
		}
	}

	enableValidation() {
		this.#form.addEventListener('submit', event => event.preventDefault());
		this.#setEventListeners();
	}
}

export { FormValidator };