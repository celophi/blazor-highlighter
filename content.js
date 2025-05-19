(function () {
  function isBlazorElement(el) {
    return Array.from(el.attributes).some(attr => /^b-[a-z0-9]{10}$/i.test(attr.name));
  }

  function highlightBlazorElements() {
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      if (isBlazorElement(el)) {
        el.style.backgroundColor = '#FFD700'; // Gold Background
        el.setAttribute('title', 'Blazor Zone Detected');
      }
    });
  }

  // Prevent duplicate observers by checking a global flag
  if (!window.__blazorHighlighterInitialized) {
    window.__blazorHighlighterInitialized = true;

    // Initial scan
    highlightBlazorElements();

    // Watch for future DOM changes (like Blazor rendering more components)
    const observer = new MutationObserver(() => {
      highlightBlazorElements();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Optional: save reference in case you want to disconnect it later
    window.__blazorObserver = observer;
  }
})();