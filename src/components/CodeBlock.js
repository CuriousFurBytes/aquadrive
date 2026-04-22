function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function renderCodeBlock(tabs) {
  if (!tabs || !tabs.length) return '';

  tabs = tabs.filter(t => t.lang !== 'css');
  if (!tabs.length) return '';

  const tabsHTML = tabs.map((t, i) =>
    `<button class="code-tab${i === 0 ? ' active' : ''}" data-lang="${t.lang}">${t.label}</button>`
  ).join('');

  const panelsHTML = tabs.map((t, i) =>
    `<div class="code-panel${i === 0 ? ' active' : ''}" data-lang="${t.lang}">
      <button class="code-copy">Copy</button>
      <pre data-lang="${t.lang}">${escapeHtml(t.code.trim())}</pre>
    </div>`
  ).join('\n');

  return `<div class="code-wrapper">
  <div class="code-tabs">${tabsHTML}</div>
  ${panelsHTML}
</div>`;
}

export function renderSection({ label, demo, tabs }) {
  const codeBlock = tabs && tabs.length ? renderCodeBlock(tabs) : '';
  return `<section class="section">
  <div class="section-label">${label}</div>
  <div class="demo-box">${demo}</div>
  ${codeBlock}
</section>`;
}
