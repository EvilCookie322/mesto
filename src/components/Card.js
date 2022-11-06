class Card {

	#myID;

	#openCardPreview;
	#handleDelete;
	#handleLike;
	#buttonLike;
	#name;
	#link;
	#owner;
	#element;
	#elementImage;
	#likes;
	#buttonDelete;


	constructor(openCardPreview, template, handleDelete, handleLike, { likes, _id, name, link, owner, myID }) {
		this.#openCardPreview = openCardPreview;
		this.#handleDelete = handleDelete;
		this.#handleLike = handleLike;
		this.#name = name;
		this.#link = link;
		this.id = _id;
		this.#myID = myID;
		this.#owner = owner;
		this.#element = document.querySelector(template).content
			.querySelector('.element').cloneNode(true);
		this.#elementImage = this.#element.querySelector('.element__image');
		this.#buttonLike = this.#element.querySelector('.element__button-like');
		this.#buttonDelete = this.#element.querySelector('.element__button-trash');
		this.#likes = likes;
		this.likeCount = this.#element.querySelector('.element__like-count');
		this.likeCount.textContent = likes.length;
		this.isLiked = false;
	}

	#addEventListeners() {
		this.#elementImage.addEventListener('click', () => this.#openCardPreview(this.#name, this.#link));
		this.#buttonLike.addEventListener('click', () => {
			this.#handleLike(this.isLiked, this.id, this.setLike.bind(this));
		});
		if (this.#owner._id == this.#myID) {
			this.#buttonDelete.style.display = 'block';
			this.#buttonDelete.addEventListener('click', () => this.#handleDeleteCard());
		}
	}

	setLike(count) {
		this.likeCount.textContent = count;
		this.#toggleLike();
	}

	#handleDeleteCard() {
		this.#handleDelete(this);
	}

	removeCard() {
		this.#element.remove();
		this.#element = null;
	}

	#toggleLike() {
		this.isLiked = !this.isLiked;
		this.#buttonLike.classList.toggle('element__button-like_active');
	}

	haveMyLike() {
		this.#likes.forEach(like => {
			if (like._id == this.#myID) {
				this.#toggleLike();
			}
		});
	}

	create() {
		this.#elementImage.src = this.#link;
		this.#elementImage.alt = this.#name;
		this.#element.querySelector('.element__name').textContent = this.#name;
		this.#addEventListeners();
		this.haveMyLike();
		return this.#element;
	}
}

export { Card };