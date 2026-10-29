"""
Automated E2E Test Suite for Adam Beránek's QA Portfolio
Framework: pytest + Playwright (Sync API)
"""

import os
import pytest
from playwright.sync_api import Page, expect

@pytest.fixture(scope="session")
def portfolio_url():
    """Returns local file URL for portfolio index.html."""
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    html_path = os.path.join(base_dir, "index.html")
    return f"file:///{html_path.replace(os.sep, '/')}"

def test_hero_section_content(page: Page, portfolio_url: str):
    """Verify Hero section renders name, headline, bio, and status indicator."""
    page.goto(portfolio_url)
    
    # Assert Name & Headline
    expect(page.locator(".hero-name")).to_have_text("Adam Beránek")
    expect(page.locator(".hero-headline")).to_have_text("Aspiring QA Automation Engineer")
    
    # Assert Bio contains core technologies
    bio = page.locator(".hero-bio")
    expect(bio).to_be_visible()
    expect(bio).to_contain_text("Python")
    expect(bio).to_contain_text("Playwright")

    # Assert Status pill
    expect(page.locator(".status-pill")).to_be_visible()

def test_tech_stack_coverage(page: Page, portfolio_url: str):
    """Verify all 7 mandatory tech competencies are listed in the grid."""
    page.goto(portfolio_url)

    expected_technologies = [
        "Python",
        "Playwright",
        "pytest",
        "Page Object Model (POM)",
        "ISTQB",
        "Git",
        "Linux (Arch)"
    ]

    for tech in expected_technologies:
        tech_element = page.locator(f".tech-title:has-text('{tech}')")
        expect(tech_element).to_be_visible()

def test_featured_project_details_and_links(page: Page, portfolio_url: str):
    """Verify Featured Project title, description, and GitHub source link."""
    page.goto(portfolio_url)

    # Title & Description
    expect(page.locator("#project-title")).to_have_text("SauceDemo Playwright Automation")
    desc = page.locator(".project-description")
    expect(desc).to_contain_text("Page Object Model (POM)")
    expect(desc).to_contain_text("dynamic locators")

    # GitHub Action Button link inside project card
    gh_link = page.locator(".project-actions a[href='https://github.com/Ad4mB3/sauce-demo-playwright-automation']")
    expect(gh_link).to_be_visible()
    expect(gh_link).to_have_attribute("target", "_blank")

def test_interactive_code_tabs(page: Page, portfolio_url: str):
    """Verify switching between code tabs displays corresponding code blocks."""
    page.goto(portfolio_url)

    # Click POM Tab
    pom_tab = page.locator("button[data-tab='page-object']")
    pom_tab.click()
    expect(page.locator("#tab-page-object")).to_be_visible()
    expect(page.locator("#tab-test-spec")).to_be_hidden()

    # Click CI Tab
    ci_tab = page.locator("button[data-tab='ci-pipeline']")
    ci_tab.click()
    expect(page.locator("#tab-ci-pipeline")).to_be_visible()
    expect(page.locator("#tab-page-object")).to_be_hidden()

def test_interactive_terminal_suite_runner(page: Page, portfolio_url: str):
    """Verify executing the terminal test runner triggers pytest simulation and passes."""
    page.goto(portfolio_url)

    run_btn = page.locator("#run-tests-btn")
    expect(run_btn).to_be_visible()
    run_btn.click()

    # Wait for execution summary line to appear
    summary_line = page.locator(".term-summary")
    expect(summary_line).to_be_visible(timeout=5000)
    expect(summary_line).to_contain_text("4 passed")

def test_contact_section_and_cta(page: Page, portfolio_url: str):
    """Verify CTA for Junior QA opportunities and functional mailto & GitHub links."""
    page.goto(portfolio_url)

    # CTA Heading
    expect(page.locator(".contact-title")).to_contain_text("Junior QA Engineer")

    # Mailto Link
    get_in_touch = page.locator("#get-in-touch-btn")
    expect(get_in_touch).to_be_visible()
    href = get_in_touch.get_attribute("href")
    assert href.startswith("mailto:")

    # GitHub Link in footer / contact
    gh_profile = page.locator("a[href='https://github.com/Ad4mB3']")
    expect(gh_profile.first).to_be_visible()
