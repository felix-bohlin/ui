# Open Props UI

A CSS UI library exploring how next-gen HTML & CSS features can change the way we create components. Designed to be used by professional teams as well as tinkering hobbyists. Everything is made with **ease-of-use** and **scalability** in mind. Last but not least - you **copy and paste** the components into your repo. It's the best way to have a complete **understanding** and **ownership** over your stuff.

https://open-props-ui.netlify.app/

## Getting started

Check out the [getting started guide](https://open-props-ui.netlify.app/guide/getting-started.html).

## Backstory

Practically all established UI libraries need to take older browser versions into account. Some have only just dropped Internet Explorer. Some have barely discovered the power of CSS grid. Open Props UI starts from a blank slate and re-imagines how a component library could be built if you used the most modern features.

## The goal of the component library

> "If you only use the latest features, that means this is can never enter production"

Yes and no. Right now that's true for most components. The point is to let the spec and the components mature alongside each other and in time the library will be ready for production.

- Have sensible defaults without sacrificing flexibility and control
- Use modern HTML & CSS features
- Follow accessibility guidelines
- Serve as an inspiration
- Be scalable

## Development

```bash
# Install dependencies
pnpm i

# Build all themes (outputs to dist/)
pnpm build

# Build themes in watch mode (rebuilds on file changes)
pnpm dev

# Clean the dist folder
pnpm clean
```

### Theme Building

The build system automatically processes all themes in the `src/themes/` folder out to `/dist`.

## Documentation

```
pnpm docs:dev
```
