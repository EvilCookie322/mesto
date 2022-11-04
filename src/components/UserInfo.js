class UserInfo {

	#userName;
	#userDescription;
	#userAvatar;

	constructor({ nameSelector, descriptionSelector, avatarSelector }) {
		this.#userName = document.querySelector(nameSelector);
		this.#userDescription = document.querySelector(descriptionSelector);
		this.#userAvatar = document.querySelector(avatarSelector);
	}

	getUserInfo() {
		return { name: this.#userName.textContent, description: this.#userDescription.textContent };
	}

	setUserInfo(name, description) {
		this.#userName.textContent = name;
		this.#userDescription.textContent = description;
	}

	setUserAvatar(link) {
		this.#userAvatar.src = link;
	}
}

export { UserInfo };