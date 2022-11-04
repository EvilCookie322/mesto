import { Popup } from "./Popup";

class PopupConfirmDelete extends Popup {

	#form;
	#submitbutton;

	constructor(selector,) {
		super(selector);
		this.addEventListeners();
		this.#form = this.popup.querySelector('.form');
		this.#submitbutton = this.#form.querySelector('.form__confirm-button');
	}

	addEventListeners() {
		super.addEventListeners();
	}

	setSubmitAction(action) {
		const submitAction = (e) => {
			e.preventDefault();
			this.#submitbutton.setAttribute('disabled', true);
			action();
		}
		this.submitAction = submitAction.bind(this);
		this.#form.addEventListener('submit', this.submitAction);
	}

	removeSubmitAction() {
		this.#form.removeEventListener('submit', this.submitAction);
		this.#submitbutton.removeAttribute('disabled');
	}
}

export { PopupConfirmDelete };