import test from 'ava';

import configure from '../../js/lib/configure';
import defaultOptions from '../../js/lib/default-options';
import createContext from './helper/create-context';

import Collectorium from '../../js/lib/collectorium';

const defaultContext = createContext(defaultOptions);
const defaultDependencies = {
  configure,
  context: defaultContext,
  defaultOptions,
};

test(`Is a function.`, (t) => {
  t.true(typeof Collectorium === `function`);
});

test(`Returns an instance of itself if a single target is given.`, (t) => {
  const context = createContext(defaultOptions);
  const dependencies = Object.assign({}, defaultDependencies, { context });
  const collectoriumInstance = new Collectorium(dependencies, `.collectorium`);

  t.true(typeof collectoriumInstance === `object`);
  t.truthy(collectoriumInstance.context);
  t.truthy(collectoriumInstance.element);
  t.truthy(collectoriumInstance.options);
});

test(`Returns an array of Collectorium instances if a multi target is given.`, (t) => {
  const context = createContext(defaultOptions, 2);
  const dependencies = Object.assign({}, defaultDependencies, { context });
  const collectoriumInstances = new Collectorium(dependencies, `.collectorium`);

  t.true(Array.isArray(collectoriumInstances));
  t.true(typeof collectoriumInstances[0] === `object`);
  t.true(typeof collectoriumInstances[1] === `object`);
});

test(`Should add and remove active class on correct link and content elements.`, (t) => {
  const context = createContext(defaultOptions);
  const dependencies = Object.assign({}, defaultDependencies, { context });
  const collectoriumInstance = new Collectorium(dependencies, `.collectorium`);
  const links = context.querySelectorAll(`.collectorium__tab-link`);
  const contents = context.querySelectorAll(`.collectorium__content`);

  collectoriumInstance.activateTab(1);

  t.true(links[0].classList.contains(`is-active`));
  t.true(contents[2].classList.contains(`is-active`));

  collectoriumInstance.activateTab(2);

  t.true(links[1].classList.contains(`is-active`));
  t.true(contents[0].classList.contains(`is-active`));

  collectoriumInstance.activateTab(3);

  t.true(links[2].classList.contains(`is-active`));
  t.true(contents[1].classList.contains(`is-active`));
});
