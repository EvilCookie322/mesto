import { Popup } from "./Popup";

class PopupConfirmDelete extends Popup {

	#form;
	#submitbutton;
	#submitButtonText

	constructor(selector,) {
		super(selector);
		this.addEventListeners();
		this.#form = this.popup.querySelector('.form');
		this.#submitbutton = this.#form.querySelector('.form__confirm-button');
		this.#submitButtonText = this.#submitbutton.textContent;
	}

	setSubmitAction(action) {
		const submitAction = (e) => {
			e.preventDefault();
			action();
		}
		this.submitAction = submitAction.bind(this);
		this.#form.addEventListener('submit', this.submitAction);
	}

	removeSubmitAction() {
		this.#form.removeEventListener('submit', this.submitAction);
	}

	deleting(isDeleting) {
		if (isDeleting) {
			this.#submitbutton.textContent = 'Удаление...';
			this.#submitbutton.setAttribute('disabled', true);
		} else {
			this.#submitbutton.removeAttribute('disabled');
			this.#submitbutton.textContent = this.#submitButtonText;
		}
	}

	closePopup() {
		this.removeSubmitAction();
		super.closePopup();
	}
}

export { PopupConfirmDelete };