# HDI-Predictor

## Introduction
HDI-Predictor is a professional academic AI/ML project that predicts the Human Development Index using key development indicators such as life expectancy, mean schooling, expected schooling, and GNI per capita. The project is designed as a polished, submission-ready repository that demonstrates software engineering, documentation, testing, and presentation practices for a college-level ML project.

## Problem Statement
The Human Development Index is a vital measure of a country’s development, but manually analyzing it can be time-consuming and difficult for students and beginners. This project provides an interactive platform to estimate HDI values quickly and visually understand how development indicators influence the final outcome.

## Objectives
- Build an interactive HDI prediction system
- Provide a simple and user-friendly interface for academic demonstration
- Organize the repository into a professional AI/ML project template
- Deliver documentation, testing, and presentation materials for submission

## Features
- Interactive sliders for development indicators
- Real-time HDI prediction and category display
- Dynamic chart visualization
- Quick scenario presets for different development levels
- Clean academic project structure and documentation

## Technologies Used
- HTML5
- CSS3
- JavaScript
- Chart.js
- Python
- Jupyter Notebook
- scikit-learn

## Dataset
The project includes a sample dataset in the development folder containing HDI-relevant features such as life expectancy, schooling, expected schooling, GNI, and HDI values.

## Installation
1. Clone the repository.
2. Open the project folder in your preferred editor.
3. Launch the application from the Source Code folder by opening the HTML file in a browser.
4. Optionally, run a local server:

```bash
python -m http.server 8000
```

## Usage
- Open the application from the Source Code folder.
- Adjust the indicator values using the sliders.
- Click Predict HDI to view the result.
- Review the chart and scenario buttons for additional insights.

## Project Structure
```text
HDI-Predictor/
├── 1. Brainstorming & Ideation/
├── 2. Requirement Analysis/
├── 3. Project Design Phase/
├── 4. Project Planning Phase/
├── 5. Project Development Phase/
│   ├── Dataset/
│   ├── Source Code/
│   ├── Model/
│   ├── Notebook/
│   └── requirements.txt
├── 6. Project Testing/
├── 7. Project Documentation/
├── 8. Project Demonstration/
└── README.md
```

## Model Training
This repository includes a sample model artifact and a development-ready structure for future training workflows. The prediction logic remains unchanged and is preserved in the existing JavaScript implementation.

## Prediction
The application predicts the HDI score based on the input indicators and displays the result along with the corresponding development category.

## Results
The project outputs a predicted HDI score, category, and visual comparison chart for the selected indicators.

## Future Scope
- Integrate a real machine learning model trained on a larger dataset
- Add notebook-based experimentation and evaluation
- Improve documentation and presentation quality
- Expand into deployment and cloud-based hosting

## Contributors
- HDI Predictor Project Team

## License
This project is licensed under the MIT License.
