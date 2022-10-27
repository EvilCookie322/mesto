class Section {

	#items;
	#renderer;
	#container;

	constructor({ items, renderer }, containerSelector) {
		this.#items = items;
		this.#renderer = renderer;
		this.#container = containerSelector;
	}

	renderItems() {
		this.#items.forEach(item => this.#renderer(item));
	}

	addItem(item) {
		this.#container.prepend(item);
	}
}

export { Section };