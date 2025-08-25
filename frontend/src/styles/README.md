# Styles Directory

This directory contains SCSS stylesheets for the Meter System application.

## Structure

- `_variables.scss` - CSS custom properties and variables
- `_mixins.scss` - SCSS mixins and functions
- `_utilities.scss` - Utility classes
- `_components.scss` - Component-specific styles
- `_layout.scss` - Layout and grid styles
- `_themes.scss` - Theme variations (light/dark)
- `main.scss` - Main stylesheet that imports all others

## Usage

The main stylesheet (`main.scss`) is imported in `angular.json` and automatically compiled.

### Importing Styles

```scss
// In component styles
@import 'src/styles/variables';
@import 'src/styles/mixins';
```

## Guidelines

- Use CSS custom properties for theming
- Follow BEM methodology for class naming
- Keep styles modular and reusable
- Use SCSS features appropriately
- Maintain consistent spacing and formatting
- Document complex CSS logic





