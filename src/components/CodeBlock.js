function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function renderCodeBlock(tabs) {
  if (!tabs || !tabs.length) return '';

  // #1: only keep non-CSS tabs
  const filteredTabs = tabs.filter(t => t.lang !== 'css');
  if (!filteredTabs.length) return '';

  const showTabs = filteredTabs.length > 1;

  const tabsHTML = filteredTabs.map((t, i) =>
    `<button class="code-tab${i === 0 ? ' active' : ''}" data-lang="${t.lang}">${t.label}</button>`
  ).join('');

  const panelsHTML = filteredTabs.map((t, i) => {
    // #11: build-time ol/li line structure — no JS or per-line spans for numbering
    const lines = t.code.trim().split('\n');
    const linesHTML = lines.map(line =>
      `<li>${escapeHtml(line === '' ? ' ' : line)}</li>`
    ).join('\n');

    // #10: optional filename header shown visually, not as a code comment
    const filenameHTML = t.filename
      ? `<div class="code-filename">${escapeHtml(t.filename)}</div>`
      : '';

    return `<div class="code-panel${i === 0 ? ' active' : ''}" data-lang="${t.lang}">
      ${filenameHTML}<button class="code-copy">Copy</button>
      <ol class="code-lines" data-lang="${t.lang}">${linesHTML}</ol>
    </div>`;
  }).join('\n');

  return `<div class="code-wrapper">
  ${showTabs ? `<div class="code-tabs">${tabsHTML}</div>` : ''}
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
