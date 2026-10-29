/**
 * Adam Beránek — QA Automation Engineer Portfolio
 * Interactive client-side enhancements: tab switching, interactive pytest simulator, copy email.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCodeTabs();
  initTestRunner();
  initCopyEmail();
  initDynamicYear();
  initKeyboardShortcuts();
});

/* --------------------------------------------------------------------------
   1. Interactive Code Tabs
   -------------------------------------------------------------------------- */
function initCodeTabs() {
  const tabs = document.querySelectorAll('.code-tab');
  const panels = {
    'test-spec': document.getElementById('tab-test-spec'),
    'page-object': document.getElementById('tab-page-object'),
    'ci-pipeline': document.getElementById('tab-ci-pipeline'),
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-tab');

      // Update tab active states & ARIA
      tabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Update tab panels
      Object.entries(panels).forEach(([key, panel]) => {
        if (!panel) return;
        if (key === targetId) {
          panel.classList.add('active');
          panel.removeAttribute('hidden');
        } else {
          panel.classList.remove('active');
          panel.setAttribute('hidden', 'true');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   2. Interactive Hero Terminal Test Runner
   -------------------------------------------------------------------------- */
function initTestRunner() {
  const runBtn = document.getElementById('run-tests-btn');
  const screen = document.getElementById('terminal-screen');
  if (!runBtn || !screen) return;

  let isRunning = false;

  const testSteps = [
    { text: '$ pytest tests/ -v --browser=chromium', cls: 'term-line', isCmd: true },
    { text: 'platform linux -- Python 3.14.7, pytest-8.3.3, playwright-1.48.0', cls: 'term-line term-muted' },
    { text: 'rootdir: /home/adam/sauce-demo-playwright-automation', cls: 'term-line term-muted' },
    { text: 'plugins: playwright, xdist, html', cls: 'term-line term-muted' },
    { text: '', cls: 'term-line term-space' },
    {
      html: '<span class="term-check">✓</span> tests/test_login.py::test_sucesful_login <span class="term-badge-pass">PASSED</span> <span class="term-percent">[ 25%]</span>',
      cls: 'term-line term-test-pass',
      delay: 240
    },
    {
      html: '<span class="term-check">✓</span> tests/test_login.py::test_unsucesful_login <span class="term-badge-pass">PASSED</span> <span class="term-percent">[ 50%]</span>',
      cls: 'term-line term-test-pass',
      delay: 280
    },
    {
      html: '<span class="term-check">✓</span> tests/test_homepage.py::test_add_to_cart_dynamic <span class="term-badge-pass">PASSED</span> <span class="term-percent">[ 75%]</span>',
      cls: 'term-line term-test-pass',
      delay: 320
    },
    {
      html: '<span class="term-check">✓</span> tests/test_checkout_page.py::test_full_checkout <span class="term-badge-pass">PASSED</span> <span class="term-percent">[100%]</span>',
      cls: 'term-line term-test-pass',
      delay: 360
    },
    { text: '', cls: 'term-line term-space' },
    {
      html: '<span class="term-summary-text">======== <span class="term-green font-bold">4 passed</span> in 1.38s (Playwright Chromium) ========</span>',
      cls: 'term-line term-summary',
      delay: 200
    }
  ];

  runBtn.addEventListener('click', runSuite);

  function runSuite() {
    if (isRunning) return;
    isRunning = true;
    runBtn.disabled = true;
    runBtn.innerHTML = `
      <svg class="spin-icon" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
      <span>Executing...</span>
    `;

    // Clear terminal screen
    screen.innerHTML = '';

    let cumulativeDelay = 0;

    testSteps.forEach((step, index) => {
      const stepDelay = step.delay || (index === 0 ? 50 : 120);
      cumulativeDelay += stepDelay;

      setTimeout(() => {
        const lineEl = document.createElement('div');
        lineEl.className = step.cls;

        if (step.isCmd) {
          lineEl.innerHTML = `<span class="term-prompt">$</span> <span class="term-command">${step.text.replace('$ ', '')}</span>`;
        } else if (step.html) {
          lineEl.innerHTML = step.html;
        } else {
          lineEl.textContent = step.text;
        }

        screen.appendChild(lineEl);
        screen.scrollTop = screen.scrollHeight;

        // On final step
        if (index === testSteps.length - 1) {
          setTimeout(() => {
            isRunning = false;
            runBtn.disabled = false;
            runBtn.innerHTML = `
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Passed (100%)</span>
            `;
            setTimeout(() => {
              runBtn.innerHTML = `
                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                <span>Re-run Suite</span>
              `;
            }, 3000);
          }, 300);
        }
      }, cumulativeDelay);
    });
  }
}

/* --------------------------------------------------------------------------
   3. Copy Email to Clipboard
   -------------------------------------------------------------------------- */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const copyText = document.getElementById('copy-text');
  if (!copyBtn) return;

  const email = copyBtn.getAttribute('data-email') || 'adamberanek.qa@gmail.com';

  copyBtn.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = email;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      // Visual feedback
      if (copyText) copyText.textContent = 'Copied!';
      showToast(`Copied ${email} to clipboard!`);

      setTimeout(() => {
        if (copyText) copyText.textContent = 'Copy Email';
      }, 2500);
    } catch (err) {
      console.error('Failed to copy email:', err);
      window.location.href = `mailto:${email}`;
    }
  });
}

function showToast(message) {
  // Remove existing toast if any
  const existingToast = document.querySelector('.toast-msg');
  if (existingToast) existingToast.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.setAttribute('role', 'status');
  toast.innerHTML = `
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#10b981" stroke-width="2">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

/* --------------------------------------------------------------------------
   4. Current Year
   -------------------------------------------------------------------------- */
function initDynamicYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* --------------------------------------------------------------------------
   5. Keyboard Shortcuts
   -------------------------------------------------------------------------- */
function initKeyboardShortcuts() {
  window.addEventListener('keydown', (e) => {
    // Ignore if user is inside an input or textarea
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    if (e.key === 'r' || e.key === 'R') {
      const runBtn = document.getElementById('run-tests-btn');
      if (runBtn && !runBtn.disabled) {
        runBtn.click();
      }
    } else if (e.key === 'c' || e.key === 'C') {
      const copyBtn = document.getElementById('copy-email-btn');
      if (copyBtn) {
        copyBtn.click();
      }
    }
  });
}
