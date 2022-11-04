import { Popup } from "./Popup";

class PopupWithForm extends Popup {

	#handleSubmit;
	#form;
	#formInputs;
	#submitbutton;
	#submitButtonText;

	constructor(selector, handleSubmit) {
		super(selector);
		this.#handleSubmit = handleSubmit;
		this.#form = this.popup.querySelector('.form');
		this.#formInputs = Array.from(this.#form.querySelectorAll('.form__input'));
		this.#submitbutton = this.#form.querySelector('.form__submit-button');
		this.#submitButtonText = this.#submitbutton.textContent;
		this.addEventListeners();
	}

	#getInputValues() {
		const inputValues = {};
		this.#formInputs.forEach(input => inputValues[input.name] = input.value);
		return inputValues;
	}

	addEventListeners() {
		super.addEventListeners();
		this.#form.addEventListener('submit', (e) => {
			e.preventDefault();
			this.#handleSubmit(this.#getInputValues());
			this.closePopup();
		});
	}

	closePopup() {
		super.closePopup();
		this.#form.reset();
	}

	loading(isLoading) {
		if (isLoading) {
			this.#submitbutton.textContent = 'Сохранение...';
			this.#submitbutton.setAttribute('disabled', true);
		} else {
			this.#submitbutton.removeAttribute('disabled');
			this.#submitbutton.textContent = this.#submitButtonText;
		}
	}
}

export { PopupWithForm };