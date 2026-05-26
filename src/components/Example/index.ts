import Example from './Example.astro';
import Preview from './Preview.astro';
import Code from './Code.astro';

export { Preview, Code };

export default Object.assign(Example, {
  Preview,
  Code,
});
