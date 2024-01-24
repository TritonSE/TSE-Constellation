# TSE Design System

The TSE Design System is a unified set of components aiming to give TSE projects a cohesive look and feel.

It is implemeneted as a [React](https://react.dev) component library written using [TypeScript](https://typescriptlang.org) and built using [Vite](https://vitejs.dev).

## Using in a Project

This section is still a TODO until we publish our first version of the library.

## Development

To develop components for the TSE Design System, first install development dependencies with:

```sh
$ npm install
```

Build the library with:

```sh
$ npm run build
```

Start the development server with:

```sh
$ npm run dev
```

Open [localhost:5173](http://localhost:5173) to view the development site.

### Development Approach and Style Considerations

Components are split up into atoms, molecules, and organisms.  When adding a new component, create a subdirectory under the relevant classification (i.e. `/lib/atoms/MyAtom`, `/lib/molecules/MyMolecule`, etc.).  Within this directory, put (at minimum):

- `index.tsx`:  Component entry point
- `styles.module.css`:  Component styles, imported in `index.tsx` via `import styles from './styles.module.css';`

---

To access theme data from within a component, do the following:

```jsx
import { useTheme } from '../../ThemeProvider';

export function MyAtom() {
    const { colors, fonts } = useTheme();

    // ...
}
```

This may be necessary for styling, but basics such as fonts should be set globally and do not need to be manually specified for each component.

To access theme configuration from `styles.module.css`, use CSS variables:

```css
span.my_custom_atom {
    background-color: var(--color-primary);
    font-family: var(--font-text);
}
```

---

To use assets such as images or icons, place them into `/lib/assets` and import them with:

```jsx
import myImage from '../../assets/myImage.svg';
```
