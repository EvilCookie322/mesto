class FormValidator {

	#settings;
	#form;
	#inputList;
	#buttonSubmit;

	constructor(settings, formSelector) {
		this.#settings = settings;
		this.#form = formSelector;
		this.#inputList = Array.from(this.#form.querySelectorAll(this.#settings.inputSelector));
		this.#buttonSubmit = this.#form.querySelector(this.#settings.submitButtonSelector);
	}

	#showInputError(input, errorMessage) {
		const errorElement = this.#form.querySelector(`.${input.id}-error`);
		input.classList.add(this.#settings.inputErrorClass);
		errorElement.textContent = errorMessage;
		errorElement.classList.add(this.#settings.errorClass);
	}

	#hideInputError(input) {
		const errorElement = this.#form.querySelector(`.${input.id}-error`);
		input.classList.remove(this.#settings.inputErrorClass);
		errorElement.classList.remove(this.#settings.errorClass);
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
		buttonSubmit.classList.add(this.#settings.inactiveButtonClass);
		buttonSubmit.setAttribute('disabled', true);
	}

	#disableSubmitButton(buttonSubmit) {
		buttonSubmit.classList.remove(this.#settings.inactiveButtonClass);
		buttonSubmit.removeAttribute('disabled');
	}

	#setEventListeners() {
		this.#inputList.forEach(input => input.addEventListener('input', () => {
			this.#checkInputValidity(input);
			if (this.#hasInvalidInput(this.#inputList)) {
				this.#enableSubmitButton(this.#buttonSubmit);
			} else {
				this.#disableSubmitButton(this.#buttonSubmit);
			}
		}));
	}

	resetFormErrors() {
		this.#inputList.forEach((input) => {
			this.#checkInputValidity(input);
			this.#hideInputError(input);
		});
		if (this.#hasInvalidInput(this.#inputList)) {
			this.#enableSubmitButton(this.#buttonSubmit);
		} else {
			this.#disableSubmitButton(this.#buttonSubmit);
		}
	}

	enableValidation() {
		this.#form.addEventListener('submit', event => event.preventDefault());
		this.#setEventListeners();
	}
}

export { FormValidator };