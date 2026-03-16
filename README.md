# GreenSurfCo

An experimental testing repository exploring visual regression testing with Figma-exported design assets.

## About This Project

This is a proof-of-concept for comparing Angular component renders against Figma designs. Currently, the workflow involves manually exporting images from Figma for visual comparison.

### Current State

- Manual export of design images from Figma
- Visual regression tests compare rendered components against exported Figma assets

### Future Roadmap

- **Figma Connect Integration**: Link all components to their corresponding Figma designs
- **Automated Export**: Automate design asset export when syncing with new designs
- **Change Detection**: Investigate using Figma's "Ready for Dev" status to identify new designs available for sync
- **Version Tracking**: Determine how to detect if a design has changed since last download

---

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
