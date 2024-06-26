# TSE Constellation

TSE Constellation is a unified set of components aiming to give TSE projects a cohesive look and feel.

It is implemented as a [React](https://react.dev) component library written using [TypeScript](https://typescriptlang.org) and built using [Vite](https://vitejs.dev).

## Documentation and Demo

For easy-to-navigate and fully interactive documentation, please visit the [Constellation Storybook](https://tritonse.github.io/TSE-Constellation/?path=/docs/welcome--documentation).

Examples and prop configurations are provided for each component exported by Constellation.

## Using in a Project

To add Constellation to a new or existing React project, first install it via:

```sh
$ npm install --save-dev @tritonse/tse-constellation
```

Then in a top-level component (e.g. `App.tsx`), wrap the entire app in a `ThemeProvider` via:

```tsx
// ...

import { ThemeProvider } from "@tritonse/tse-constellation";

// ...

function App() {
  return (
    <ThemeProvider>
      <MyReactApp />
    </ThemeProvider>
  );
}
```

At this point, any components displayed on the [Constellation Storybook](https://tritonse.github.io/TSE-Constellation/?path=/docs/welcome--documentation) can be imported and used.

## Development

To develop components for TSE Constellation, first install development dependencies with:

```sh
$ npm install
```

Start the development server with:

```sh
$ npm run dev
```

This will automatically rebuild the library upon changes to the `lib/` directory.

Open [localhost:5173](http://localhost:5173) to view the development site.

Start Storybook with:

```sh
$ npm run storybook
```

Open [localhost:6006](http://localhost:6006) to view Storybook.

Changes to stories will be automatically reflected in Storybook.

### Development Approach and Style Considerations

Components are split up into atoms, molecules, and organisms. When adding a new component, create a subdirectory under the relevant classification (i.e. `/lib/atoms/MyAtom/`, `/lib/molecules/MyMolecule/`, etc.). Within this directory, put (at minimum):

- `index.tsx`: Component entry point
- `styles.module.css`: Component styles, imported in `index.tsx` via `import styles from './styles.module.css';`

---

To access theme data from within a component, do the following:

```jsx
import { useTheme } from "../../assets/ThemeProvider";

export function MyAtom() {
  const { colors, fonts } = useTheme();

  // colors.primary_dark
  // fonts.primary
  // ...
}
```

This may be necessary for styling, but basics such as fonts should be set globally and do not need to be manually specified for each component.

To access theme configuration from `styles.module.css`, use CSS variables:

```css
span.my_custom_atom {
  background-color: var(--tse-constellation-color-primary-dark);
  font-family: var(--tse-constellation-font-primary);
}
```

---

To use assets such as images or icons, place them into a subdirectory (e.g. `/lib/atoms/MyAtom/assets/`) and import them with:

```jsx
import myImage from "./assets/myImage.svg";
```

### Publishing

For those with write access to the `@tritonse` NPM account, a new version can be published via:

```sh
$ npm publish --access public
```
