class Section {

	#items;
	#renderer;
	#container;

	constructor({ renderer }, containerSelector) {
		this.#renderer = renderer;
		this.#container = containerSelector;
	}

	renderItems(items) {
		items.forEach(item => this.#renderer(item));
	}

	addItem(item) {
		this.#container.prepend(item);
	}
}

export { Section };