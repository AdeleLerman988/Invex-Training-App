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

## Sister theme: Steel Warehouse Training

`themes/steel-warehouse-training.css` is a friendlier sister of `themes/steel-warehouse.css`. It keeps the same palette, Roboto, and logo. It does not add hues.

Switch themes by changing one stylesheet link in both `index.html` and `process_tracker.html`:

```html
<!-- Friendlier training theme (current) -->
<link rel="stylesheet" href="themes/steel-warehouse-training.css">

<!-- Base Steel Warehouse theme -->
<link rel="stylesheet" href="themes/steel-warehouse.css">
```

Rules for the sister theme:

- Radius is 6px everywhere, from the single `--radius` token. Pills and chips use `--radius-pill` and may be fully rounded.
- Borders are 1px. Shadows stay the soft Steel Warehouse shadow, `0 4px 8px rgba(0, 0, 0, 0.10)`.
- Red means correct. A correct answer uses a red border, a check icon, the word "Correct", and a short check animation. The animation is off when `prefers-reduced-motion` is set.
- A wrong answer is not red. It uses an ink or heading border, a ✗ icon, and the words "Not quite". The right answer is then shown in the red correct style. Color is always paired with an icon and a word.
- Small red text uses `--red-dark` (`#C81017`) so it stays readable on white. `#ED1C24` is for fills, borders, and large text. On the ink hero band, small labels are white, with a red bar as the accent.
- The day intro is an ink (`#17212E`) band. Dark mode uses the same palette: ink and black surfaces, white text, red accents.

`css/app.css` and `css/steel-look.css` read these roles from tokens. When a token is missing, they fall back to the base Steel Warehouse values, so pointing the link back at `themes/steel-warehouse.css` restores that theme.

## Notes

- Media queries cannot read custom properties. `--bp-tablet` (1024px) and `--bp-phone` (767px) are the source of truth; the same numbers are written out in `css/steel-look.css`.
- The training app already has a light/dark control. `[data-theme="dark"]` in this file restyles surfaces with the same palette. It is not a second brand. A second brand is a second theme file and a different stylesheet link.
- The default appearance is the light Steel Warehouse theme, including when the operating system is set to dark.
