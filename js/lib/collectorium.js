export default function Collectorium(dependencies, target, userOptions = {}) {
  const { configure, context, defaultOptions } = dependencies;
  const elements = typeof target === `string`
    ? context.querySelectorAll(target)
    : target;

  if (elements.length > 1) {
    return [].slice.call(elements)
      .map(element => new Collectorium(dependencies, element, userOptions));
  }

  this.context = context;
  this.element = elements[0] || elements;
  this.options = configure(this.element, userOptions, defaultOptions);
  this.links = this.element.querySelectorAll(`.${this.options.classNames.link}`);
  this.contents = this.element.querySelectorAll(`.${this.options.classNames.content}`);

  // Activate the first tab if no tab is set active by default.
  if (!this.element.querySelector(`.${this.options.classNames.active}`)) {
    this.activateTab(1);
  }

  if (this.options.disableHistory) {
    for (let i = 1; i <= this.links.length; i += 1) {
      this.links[i - 1].addEventListener(`click`, (e) => {
        e.preventDefault();

        this.activateTab(i);
      });
    }
  }

  return this;
}

Collectorium.prototype.activateTab = function activateTab(n) {
  for (let i = 1; i <= this.links.length; i += 1) this.deactivateTab(i);

  this.links[n - 1].classList.add(this.options.classNames.active);
  this.nthContentElement(n).classList.add(this.options.classNames.active);
};

Collectorium.prototype.deactivateTab = function deactivateTab(n) {
  this.links[n - 1].classList.remove(this.options.classNames.active);
  this.nthContentElement(n).classList.remove(this.options.classNames.active);
};

Collectorium.prototype.nthContentElement = function nthContentElement(n) {
  if (n === 1) return this.contents[this.contents.length - 1];

  return this.contents[n - 2];
};
