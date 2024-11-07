document.addEventListener('DOMContentLoaded', function() {
  const tocToggle = document.getElementById('toc-toggle');
  const tocMenu = document.getElementById('toc-menu');

  tocToggle.addEventListener('click', function() {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !expanded);
    tocMenu.hidden = expanded;
  });

  // Close the dropdown when clicking outside
  document.addEventListener('click', function(event) {
    if (!tocToggle.contains(event.target) && !tocMenu.contains(event.target)) {
      tocToggle.setAttribute('aria-expanded', 'false');
      tocMenu.hidden = true;
    }
  });

  // Handle keyboard navigation
  tocMenu.addEventListener('keydown', function(event) {
    const items = this.querySelectorAll('a');
    const currentIndex = Array.from(items).indexOf(document.activeElement);

    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        if (currentIndex > 0) items[currentIndex - 1].focus();
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (currentIndex < items.length - 1) items[currentIndex + 1].focus();
        break;
      case 'Escape':
        tocToggle.focus();
        tocToggle.setAttribute('aria-expanded', 'false');
        tocMenu.hidden = true;
        break;
    }
  });

  // Add event listeners for the accessibility control buttons
  document.getElementById('toggle-theme').addEventListener('click', toggleTheme);
  document.getElementById('increase-font').addEventListener('click', increaseFontSize);
  document.getElementById('decrease-font').addEventListener('click', decreaseFontSize);
});

function toggleTheme() {
  const body = document.body;
  const button = document.getElementById('toggle-theme');
  if (body.getAttribute('data-theme') === 'high-contrast') {
    body.removeAttribute('data-theme');
    button.setAttribute('aria-pressed', 'false');
  } else {
    body.setAttribute('data-theme', 'high-contrast');
    button.setAttribute('aria-pressed', 'true');
  }
}

function increaseFontSize() {
  const root = document.documentElement;
  const currentSize = parseFloat(getComputedStyle(root).fontSize);
  root.style.fontSize = (currentSize + 2) + 'px';
}

function decreaseFontSize() {
  const root = document.documentElement;
  const currentSize = parseFloat(getComputedStyle(root).fontSize);
  if (currentSize > 12) {
    root.style.fontSize = (currentSize - 2) + 'px';
  }
}

function showMessage(message) {
  const alert = document.createElement('div');
  alert.setAttribute('role', 'alert');
  alert.textContent = message;
  document.body.appendChild(alert);
  setTimeout(() => alert.remove(), 2000);
}