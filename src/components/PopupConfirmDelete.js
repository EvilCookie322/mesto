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

	setSubmitAction(action) {
		const submitAction = (e) => {
			e.preventDefault();
			this.#submitbutton.setAttribute('disabled', true);
			action().then((ok) => {
				if (ok) {
					this.closePopup();
				}
				this.#submitbutton.removeAttribute('disabled');
			});

		}
		this.submitAction = submitAction.bind(this);
		this.#form.addEventListener('submit', this.submitAction);
	}

	removeSubmitAction() {
		this.#form.removeEventListener('submit', this.submitAction);

	}

	closePopup() {
		super.closePopup();
		this.removeSubmitAction();
	}
}

export { PopupConfirmDelete };