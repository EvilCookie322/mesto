class Card {

	static myId = 'f138201691f64b3e6a5a34c5';

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


	constructor(openCardPreview, template, handleDelete, handleLike, { likes, _id, name, link, owner }) {
		this.#openCardPreview = openCardPreview;
		this.#handleDelete = handleDelete;
		this.#handleLike = handleLike;
		this.#name = name;
		this.#link = link;
		this.id = _id;
		this.#owner = owner;
		this.#element = document.querySelector(template).content
			.querySelector('.element').cloneNode(true);
		this.#elementImage = this.#element.querySelector('.element__image');
		this.#buttonLike = this.#element.querySelector('.element__button-like');
		this.#likes = likes;
		this.likeCount = this.#element.querySelector('.element__like-count');
		this.likeCount.textContent = likes.length;
		this.isLiked = false;
	}

	#addEventListeners() {
		this.#elementImage.addEventListener('click', () => this.#openCardPreview(this.#name, this.#link));
		this.#buttonLike.addEventListener('click', () => {
			this.#handleLike(this.isLiked, this.id)
				.then((data) => {
					this.likeCount.textContent = data.likes.length;
					this.#toggleLike();
				})
				.catch(error => console.log('Error while toggling like', error));
		});
		if (this.#owner._id == Card.myId) {
			this.#element.querySelector('.element__button-trash').style.display = 'block';
			this.#element.querySelector('.element__button-trash').addEventListener('click', () => this.#handleDeleteCard());
		}
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
			if (like._id == Card.myId) {
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