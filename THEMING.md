# Theming

The training site has three looks. A fixed control on `index.html` and `process_tracker.html` switches them. The choice is stored in `localStorage` as `invex_look` and applied before first paint, so a refresh does not flash the other look.

| Control | File | What it is |
| --- | --- | --- |
| Original | `themes/original.css` | The pre-redesign look: Sora and DM Mono, purple and teal, the original department colors, and the original confetti (`#7c6af7`, `#4fd1b0`, `#f7a76c`, `#e879b0`, `#60c0f5`). |
| Adele 1 | `themes/steel-warehouse-training.css` | The current Steel Warehouse training theme. This file is unchanged. Passing a quiz plays the check animation. Canvas confetti stays off. |
| Adele 2 | `themes/adele-2.css` | Warm paper, ink outlines, hard offset shadows, and Steel Warehouse red as the only loud accent. Passing a quiz plays red, ink, and cream confetti. |

Adele 1 is the default when nothing is saved.

Light and dark are separate from the look. The existing Dark / Light button still writes `invex_theme` (`light` or `dark`) and sets `data-theme`. Each look defines both.

## How a look is applied

`css/app.css` and `css/steel-look.css` read custom properties. They do not pick the brand. The active look is one stylesheet link, written before paint:

```html
<link id="invex-theme" rel="stylesheet" href="themes/steel-warehouse-training.css">
```

Switching sets that `href` and two attributes on `<html>`:

- `data-look`: `original`, `adele-1`, or `adele-2`
- `data-quiz-celebrate`: `original`, `spark`, or `confetti`

`spark` is Adele 1. The quiz check animation runs, and canvas confetti does not. `original` and `confetti` read `--celebrate-1` through `--celebrate-5`. `--confetti: off` or `--quiz-celebrate: spark` also keeps confetti off, so Adele 1 stays on the check animation even if the attribute is missing.

The control is a radiogroup. Arrow keys move between Original, Adele 1, and Adele 2. Each option is at least 44px.

## Add a look

1. Copy `themes/steel-warehouse-training.css` to a new file, for example `themes/other-brand.css`.
2. Change the token values. Keep the custom property names so `css/app.css` and `css/steel-look.css` keep working.
3. Add the file to the `LOOKS` map in the blocking script in both HTML files, and to `js/look-switch.js`.
4. Add a button to the `.look-switch` group on both pages.

Do not recolor `css/app.css` or `css/steel-look.css` for a new brand. If a component needs a new role, add a token in the theme file. The component CSS already falls back when a token is missing.

## Original

Original restores the look from before commit `4ee331bab3645e509ac09589761d50051328e05d`.

- Dark: background `#0b0c10`, surface `#13141a`, accent `#7c6af7`, second accent `#4fd1b0`, warn `#f7a76c`, danger `#e24b4a`.
- Light: background `#f4f3f8`, surface `#ffffff`, accent `#6054cc`, second accent `#2a9d84`, warn `#b86d10`, danger `#bf3232`.
- Department marks: sales `#7c6af7`, purchasing `#4fd1b0`, planning `#e879b0`, scheduling `#60c0f5`, recording `#a8e063`, transport `#f7a76c`, receiving `#fb923c`.
- The Steel Warehouse logo is hidden. The wordmark is the header, the same as the old top bar.
- A correct quiz answer uses teal. The check-word animation is off. Confetti uses the original five colors.

## Adele 1

`themes/steel-warehouse-training.css` is the friendlier sister of `themes/steel-warehouse.css`. It keeps the same palette, Roboto, and logo. It does not add hues.

Rules for this look:

- Radius is 6px everywhere, from `--radius`. Pills and chips use `--radius-pill`.
- Borders are 1px. Shadows stay `0 4px 8px rgba(0, 0, 0, 0.10)`.
- Red means correct. A correct answer uses a red border, a check icon, the word "Correct", and a short check animation. The animation is off when `prefers-reduced-motion` is set.
- A wrong answer is not red. It uses an ink or heading border, a ✗ icon, and the words "Not quite". Color is always paired with an icon and a word.
- Small red text uses `--red-dark` (`#C81017`). `#ED1C24` is for fills, borders, and large text.
- The day intro is an ink (`#17212E`) band. Dark mode uses the same palette: ink and black surfaces, white text, red accents.

Pointing the theme link at `themes/steel-warehouse.css` still restores the base Steel Warehouse theme. The switcher does not list that file. Adele 1 is the training sister.

## Adele 2

- Page `#F3EEE6`, cards `#FFFCF8`, fill `#EDE6DC`, ink `#17212E`, muted `#5C6570`.
- Outlines are 2px ink. Shadows are `4px 4px 0` ink. Radius is 14px. Pills are fully rounded.
- `#ED1C24` is the only loud accent: active pills, progress, the Day complete check, a correct answer, and the Continue button. Small red text uses `#C81017` in light mode.
- Roboto 400–800. The Steel Warehouse logo stays in the header.
- Day 1's visible headline is "Get comfortable in Invex." Topic tags are outlined pills. Concept cards keep the coil, sheet, rack, and forklift line drawings.
- Quiz answers are chunky lettered rows. The correct row is `#F8D6D7` with a red border and a "Nice work." box. A wrong row keeps an ink border, a ✗, and "Not quite". It is never red.
- A coil coach sits beside the quiz on wide screens.
- On Continue, Adele 2 shows that right or wrong state before the next question. Original and Adele 1 still move on as soon as an answer is selected.
- Dark mode keeps the red accent on a deep ink page, with cream text and cream offset shadows.
- Confetti is red, ink, and cream.

## Notes

- Media queries cannot read custom properties. `--bp-tablet` (1024px) and `--bp-phone` (767px) are the source of truth; the same numbers are written out in `css/steel-look.css`.
- `[data-theme="dark"]` restyles the active look. It is not a second brand.
- The default appearance is Adele 1 in light mode, including when the operating system is set to dark. Dark is an explicit choice.
