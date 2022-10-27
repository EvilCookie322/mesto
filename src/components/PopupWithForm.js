import { Popup } from "./Popup";

class PopupWithForm extends Popup {

	#handleSubmit;
	#form;

	constructor(selector, handleSubmit) {
		super(selector);
		this.#handleSubmit = handleSubmit;
		this.#form = this.popup.querySelector('.form');
		this.addEventListeners();
	}

	#getInputValues() {
		const inputs = Array.from(this.#form.querySelectorAll('.form__input'));
		const inputValues = {};
		inputs.forEach(input => inputValues[input.name] = input.value);
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
}

export { PopupWithForm };