class Section {

	#renderer;
	#container;

	constructor({ renderer }, containerSelector) {
		this.#renderer = renderer;
		this.#container = containerSelector;
	}

	renderItems(items) {
		items.forEach(item => this.#renderer(item));
	}

	addServerItem(item) {
		this.#container.append(item);
	}

	addItem(item) {
		this.#container.prepend(item);
	}
}

export { Section };