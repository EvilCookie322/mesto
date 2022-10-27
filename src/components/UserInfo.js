class UserInfo {

	#userName;
	#userDescription;

	constructor({ nameSelector, descriptionSelector }) {
		this.#userName = document.querySelector(nameSelector);
		this.#userDescription = document.querySelector(descriptionSelector);
	}

	getUserInfo() {
		return { name: this.#userName.textContent, description: this.#userDescription.textContent };
	}

	setUserInfo(name, description) {
		this.#userName.textContent = name;
		this.#userDescription.textContent = description;
	}
}

export { UserInfo };