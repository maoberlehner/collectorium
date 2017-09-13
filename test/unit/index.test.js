import test from 'ava';

import createContext from './helper/create-context';

import defaultOptions from '../../js/lib/default-options';
import collectorium from '../../js/index';

const context = createContext(defaultOptions);

test(`Is a function.`, (t) => {
  t.true(typeof collectorium === `function`);
});

test(`Returns a new Collectorium instance.`, (t) => {
  const collectoriumInstance = collectorium(`.collectorium`, {}, context);

  t.true(typeof collectoriumInstance === `object`);
  t.truthy(collectoriumInstance.context);
  t.truthy(collectoriumInstance.element);
  t.truthy(collectoriumInstance.options);
});
