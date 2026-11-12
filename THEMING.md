# Theming

All visual tokens live in one file:

`themes/steel-warehouse.css`

That file defines color, font family, weights, type scale, radii, shadows, spacing, transitions, and the breakpoint values. `css/app.css` and `css/steel-look.css` reference those custom properties only. They do not set their own colors or fonts.

`index.html` and `process_tracker.html` each load the theme with a single stylesheet link:

```html
<link rel="stylesheet" href="themes/steel-warehouse.css">
```

## Add a theme

1. Copy `themes/steel-warehouse.css` to a new file, for example `themes/other-brand.css`.
2. Change the token values in the copy. Start with the `--sw-*` palette, type, radii, shadows, and spacing. Leave the custom property names in place so the component styles keep working.
3. In `index.html` and `process_tracker.html`, change the theme stylesheet link from `themes/steel-warehouse.css` to the new file.

Do not edit `css/app.css` or `css/steel-look.css` to recolor the app. If a component needs a new role, add a token in the theme file and use that variable in the component rule.

## Notes

- Media queries cannot read custom properties. `--bp-tablet` (1024px) and `--bp-phone` (767px) are the source of truth; the same numbers are written out in `css/steel-look.css`.
- The training app already has a light/dark control. `[data-theme="dark"]` in this file restyles surfaces with the same palette. It is not a second brand. A second brand is a second theme file and a different stylesheet link.
- The default appearance is the light Steel Warehouse theme, including when the operating system is set to dark.
