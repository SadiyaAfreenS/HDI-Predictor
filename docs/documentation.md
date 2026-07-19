# Project Documentation

## Overview
This project is a front-end web application for predicting the Human Development Index (HDI) based on a set of development indicators. The app provides an interactive UI where users can adjust values, preview the prediction instantly, and compare result categories.

## Architecture
The project has been organized into three main areas:

- HTML: semantic structure and content in index.html
- CSS: visual styling, animations, and responsive layout in css/style.css
- JavaScript: prediction logic, chart updates, theme switching, and interactivity in js/script.js

## Workflow
1. The user adjusts development indicators using the slider controls.
2. The JavaScript reads the current slider values and updates the UI.
3. The HDI score is calculated using the prediction formula.
4. The result summary, comparison cards, and chart are refreshed in real time.
5. The theme toggle updates the visual palette without changing the underlying logic.

## Key Files
- index.html: page structure and content
- css/style.css: all visual rules and animations
- js/script.js: all interactive behavior
- assets/: media files and screenshots for future use

## Future Maintenance Tips
- Keep styling changes inside css/style.css
- Keep app behavior changes inside js/script.js
- Preserve the existing IDs and class names unless you are updating the HTML structure intentionally
- Add screenshots and project assets to the assets folders for better documentation

## Deployment Notes
This project is compatible with GitHub Pages because it uses static HTML, CSS, and JavaScript files only. Upload the project root to GitHub and enable GitHub Pages from the repository settings.
