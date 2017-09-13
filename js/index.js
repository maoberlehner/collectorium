import configure from './lib/configure';
import defaultOptions from './lib/default-options';
import Collectorium from './lib/collectorium';

export default (selector, userOptions, context = document) =>
  new Collectorium({ configure, context, defaultOptions }, selector, userOptions);
