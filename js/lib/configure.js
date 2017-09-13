export default function configure(element, userOptions, defaultOptions) {
  return Object.keys(defaultOptions).reduce((options, key) => {
    const attrValue = element.getAttribute(`data-${key.toLowerCase()}`);

    // eslint-disable-next-line no-param-reassign
    options[key] = attrValue || userOptions[key] || defaultOptions[key];

    return options;
  }, {});
}
