# Adam Beránek — QA Automation Engineer Portfolio

> A modern, minimalistic, single-page developer portfolio designed specifically for a **QA Automation Engineer**, featuring a dark slate/zinc aesthetic, subtle terminal accents, and clean typography.

![Test Suite Status](https://img.shields.io/badge/Playwright%20Tests-6%20Passed-10b981?style=flat-square&logo=pytest)
![Python Version](https://img.shields.io/badge/Python-3.12%2B-38bdf8?style=flat-square&logo=python)
![Aesthetic](https://img.shields.io/badge/Theme-Dark%20Slate%20%2F%20Zinc-0f172a?style=flat-square)

---

## 🧭 Live Sections & Content Structure

1. **Hero Section**:
   - Status Indicator: `● Available for Junior QA Opportunities`
   - Name: **Adam Beránek**
   - Headline: **Aspiring QA Automation Engineer**
   - Bio: *"Building robust E2E testing frameworks using Python and Playwright. Focused on writing clean, scalable, and maintainable automated tests."*
   - **Interactive Terminal Simulator**: Includes a live test suite preview (`$ pytest tests/ -v --browser=chromium`) with an executable `"Run Suite"` button and authentic execution progress.

2. **Tech Stack & Tooling (Grid Layout)**:
   - **Python** (OOP, Scripting, Type Hints)
   - **Playwright** (Sync API, Headless & Cross-Browser, Auto-waiting)
   - **pytest** (Fixtures, Parametrization, Assertions)
   - **Page Object Model (POM)** (Separation of Concerns, DRY Maintainability)
   - **ISTQB** (Test Design, Boundary Value Analysis, Equivalence Partitioning)
   - **Git** (Version Control, Branching, CI/CD Pipelines)
   - **Linux (Arch)** (Terminal Environments, Bash/Zsh Scripting, CLI Tooling)

3. **Featured Project Card**:
   - Title: **SauceDemo Playwright Automation**
   - Description: *"An automated E2E testing framework for a demo e-commerce platform. Built with Python, Playwright, and pytest utilizing the Page Object Model (POM), dynamic locators, and test parametrizations."*
   - Architecture & Feature Highlights: Independent page objects, dynamic locators via f-strings, GitHub Actions CI regression workflow.
   - **Interactive Code Tabs**: Inspect real test code (`test_login.py`), page objects (`Log_in_page.py`), and CI workflow configurations without leaving the page.
   - Primary Action: `View Source on GitHub` pointing to [github.com/Ad4mB3/sauce-demo-playwright-automation](https://github.com/Ad4mB3/sauce-demo-playwright-automation).

4. **Contact & Call to Action**:
   - Direct CTA for Junior QA Automation Engineer opportunities.
   - `Get in Touch` mailto action with pre-filled subject line.
   - Link to GitHub profile ([github.com/Ad4mB3](https://github.com/Ad4mB3)).
   - Quick one-click `Copy Email` button with visual confirmation toast.
   - Keyboard shortcuts: `R` to run test suite, `C` to copy email.

---

## 📁 Repository Structure

```text
adam-beranek-portfolio/
├── index.html           # Semantic, accessible HTML5 single-page document
├── styles.css           # Slate/zinc CSS tokens, grid/flex layouts & terminal styling
├── script.js            # Tab switcher, pytest terminal simulator, copy email
├── pytest.ini           # Pytest configuration file
├── tests/
│   └── test_portfolio.py # Real Playwright E2E tests validating the portfolio itself
└── README.md            # Documentation & deployment guide
```

---

## ⚡ Quick Start & Local Preview

You can open `index.html` directly in any web browser, or launch a lightweight local server:

### Option A: Open directly
Double-click `index.html` or open via browser:
```bash
# On Linux / Arch:
xdg-open index.html

# On Windows (PowerShell):
Invoke-Item index.html
```

### Option B: Local Python HTTP Server
```bash
python -m http.server 8080
```
Then visit: `http://localhost:8080`

---

## 🧪 Automated Testing (Playwright + pytest)

Because this portfolio is built for a QA Automation Engineer, it comes with its own **automated end-to-end test suite** written with `pytest` and `playwright`:

```bash
# Install test dependencies (if not already installed)
pip install pytest pytest-playwright
playwright install chromium

# Run all portfolio E2E tests
pytest
```

---

## 🚀 How to Deploy to GitHub Pages (Free Hosting)

### Method 1: User Site (`Ad4mB3.github.io`)
1. Create a new GitHub repository named `Ad4mB3.github.io`.
2. Push the files in this directory to the repository:
   ```bash
   git init
   git add .
   git commit -m "feat: initial release of QA automation engineer portfolio"
   git branch -M main
   git remote add origin https://github.com/Ad4mB3/Ad4mB3.github.io.git
   git push -u origin main
   ```
3. Your site will automatically go live at: **`https://Ad4mB3.github.io`**

### Method 2: Project Repository (`portfolio`)
1. Create a repository named `portfolio`.
2. Push your files to `main`.
3. In GitHub: go to **Settings** &rarr; **Pages** &rarr; Under **Build and deployment**, choose **Deploy from a branch** &rarr; Select `main` / `/(root)` &rarr; Click **Save**.
4. Your site will be live at: **`https://Ad4mB3.github.io/portfolio`**

---

## ⚙️ Customization

- **Email Address**: Configured to `adam.beranek10@gmail.com` in `index.html` (lines 476 & 497) and `script.js`.
- **Social / LinkedIn Links**: You can add your LinkedIn profile button alongside the GitHub button in the `#contact` section.
- **Projects**: To add additional projects in the future, replicate the `<article class="project-card">` block inside `#projects`.
