import { renderSection } from './components/CodeBlock.js';

const THEME_INIT = `(function(){var t=localStorage.getItem('aquadrive-theme');var a=localStorage.getItem('aquadrive-accent')||'blue';if(!t)t=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';if(t==='dark'){document.documentElement.setAttribute('data-theme','dark');}else{document.documentElement.removeAttribute('data-theme');}document.documentElement.setAttribute('data-accent',a);})()`

const NAVBAR_SVG = `<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 3C14 3 5 10 5 17C5 21.4183 9.02944 25 14 25C18.9706 25 23 21.4183 23 17C23 10 14 3 14 3Z" fill="var(--accent-500)"/><path d="M14 9C14 9 9 13.5 9 17C9 19.7614 11.2386 22 14 22C16.7614 22 19 19.7614 19 17C19 13.5 14 9 14 9Z" fill="var(--bg)" opacity="0.7"/></svg>`;

const SETTINGS_SVG = `<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;

const THEME_SVG = `<svg viewBox="0 0 16 16" fill="none"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Z" stroke="currentColor" stroke-width="1.5"/><path d="M8 3v10a5 5 0 0 0 0-10Z" fill="currentColor"/></svg>`;

const MOBILE_SVG = `<svg viewBox="0 0 16 16" fill="none"><rect x="4" y="1" width="8" height="14" rx="1.5" stroke="currentColor" stroke-width="1.5"/><line x1="6.5" y1="12.5" x2="9.5" y2="12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;

const PAGE_SCRIPT = `
function toggleTheme(){var d=document.documentElement.getAttribute('data-theme')==='dark';var n=d?'light':'dark';n==='dark'?document.documentElement.setAttribute('data-theme','dark'):document.documentElement.removeAttribute('data-theme');localStorage.setItem('aquadrive-theme',n);}
function toggleSettings(e){if(e)e.stopPropagation();document.getElementById('navSettingsDropdown').classList.toggle('open');}
document.addEventListener('click',function(e){var s=document.querySelector('.aqua-navbar-settings');if(s&&!s.contains(e.target)){document.getElementById('navSettingsDropdown').classList.remove('open');}});
function toggleNav(){document.querySelector('.aqua-navbar').classList.toggle('nav-open');}
function setAccent(c){document.documentElement.setAttribute('data-accent',c);localStorage.setItem('aquadrive-accent',c);updateAccentDots();}
function updateAccentDots(){var c=document.documentElement.getAttribute('data-accent')||'blue';document.querySelectorAll('.accent-dot').forEach(function(d){d.classList.toggle('active',d.getAttribute('data-color')===c);});}
function switchTab(btn,lang){var w=btn.closest('.code-wrapper');w.querySelectorAll('.code-tab').forEach(function(t){t.classList.remove('active');});btn.classList.add('active');w.querySelectorAll('.code-panel').forEach(function(p){p.classList.toggle('active',p.getAttribute('data-lang')===lang);});}
function copyCode(btn){var pre=btn.nextElementSibling;navigator.clipboard.writeText(pre.textContent).then(function(){btn.textContent='Copied!';setTimeout(function(){btn.textContent='Copy';},1500);});}
function toggleMobile(){var existing=document.querySelector('.mobile-preview-backdrop');if(existing){existing.classList.toggle('open');return;}var backdrop=document.createElement('div');backdrop.className='mobile-preview-backdrop open';backdrop.onclick=function(e){if(e.target===backdrop)backdrop.classList.remove('open');};var device=document.createElement('div');device.className='mobile-preview-device';var notch=document.createElement('div');notch.className='mobile-preview-notch';var screen=document.createElement('div');screen.className='mobile-preview-screen';var iframe=document.createElement('iframe');iframe.src=window.location.href;var close=document.createElement('button');close.className='mobile-preview-close';close.innerHTML='&times;';close.onclick=function(){backdrop.classList.remove('open');};var label=document.createElement('div');label.className='mobile-preview-label';label.textContent='390 × 844 — iPhone 14 Pro';screen.appendChild(iframe);device.appendChild(notch);device.appendChild(screen);device.appendChild(close);device.appendChild(label);backdrop.appendChild(device);document.body.appendChild(backdrop);}
document.querySelectorAll('.code-tab').forEach(function(btn){btn.addEventListener('click',function(){switchTab(btn,btn.getAttribute('data-lang'));});});
document.querySelectorAll('.code-copy').forEach(function(btn){btn.addEventListener('click',function(){copyCode(btn);});});
updateAccentDots();`;

function navbar(base) {
  return `<nav class="aqua-navbar">
  <a href="${base}index.html" class="aqua-navbar-brand">${NAVBAR_SVG}Aqua<span>Drive</span></a>
  <button class="aqua-navbar-toggle" onclick="toggleNav()" aria-label="Toggle menu"><span></span></button>
  <div class="aqua-navbar-collapse">
    <div class="aqua-navbar-links">
      <a href="${base}index.html">Colors</a>
      <a href="${base}typography.html">Typography</a>
      <a href="${base}elements.html">Elements</a>
      <a href="${base}ports.html">Ports</a>
    </div>
    <div class="aqua-navbar-actions">
      <div class="aqua-navbar-settings">
        <button class="aqua-navbar-settings-btn" onclick="toggleSettings(event)">${SETTINGS_SVG} Settings</button>
        <div class="aqua-navbar-dropdown" id="navSettingsDropdown">
          <div class="aqua-navbar-dropdown-label">Accent Color</div>
          <div class="aqua-navbar-dropdown-row">
            <button class="accent-dot" data-color="blue" onclick="setAccent('blue')" aria-label="Blue accent"></button>
            <button class="accent-dot" data-color="purple" onclick="setAccent('purple')" aria-label="Purple accent"></button>
            <button class="accent-dot" data-color="cyan" onclick="setAccent('cyan')" aria-label="Cyan accent"></button>
            <button class="accent-dot" data-color="rose" onclick="setAccent('rose')" aria-label="Rose accent"></button>
          </div>
          <div class="aqua-navbar-dropdown-divider"></div>
          <button class="aqua-navbar-dropdown-item" onclick="toggleTheme()">${THEME_SVG} <span class="theme-toggle-label">Toggle Theme</span></button>
          <button class="aqua-navbar-dropdown-item" onclick="toggleMobile()">${MOBILE_SVG} Mobile Preview</button>
        </div>
      </div>
    </div>
  </div>
</nav>`;
}

function breadcrumb(crumbs) {
  const items = crumbs.map((c, i) => {
    if (i === crumbs.length - 1) return `<span class="current">${c.label}</span>`;
    return `<a href="${c.href}">${c.label}</a><span class="sep">/</span>`;
  }).join('');
  return `<nav class="breadcrumb">${items}</nav>`;
}

export function renderComponentPage({ frontmatter, sections = [], componentCSS = '' }) {
  const base = '../';
  const crumbs = [
    { label: 'AquaDrive', href: `${base}index.html` },
    { label: 'Elements', href: `${base}elements.html` },
    { label: frontmatter.title },
  ];

  const sectionsHTML = sections.map(s => renderSection(s)).join('\n');

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AquaDrive — ${frontmatter.title}</title>
    <link rel="icon" href="${base}assets/img/favicon.svg" type="image/svg+xml" />
    <script>${THEME_INIT}</script>
    <link rel="stylesheet" href="${base}assets/css/style.css" />
    ${componentCSS ? `<style>\n${componentCSS}\n    </style>` : ''}
    <script src="${base}assets/js/highlight.js" defer></script>
  </head>
  <body>
    ${navbar(base)}
    ${breadcrumb(crumbs)}
    <header>
      <div class="brand-tag">AquaDrive · Design System</div>
      <h1>${frontmatter.h1 || frontmatter.title}</h1>
      <p class="subtitle">${frontmatter.description}</p>
    </header>
    ${sectionsHTML}
    <script>${PAGE_SCRIPT}</script>
  </body>
</html>`;
}

export function renderTopPage({ title, h1, description, breadcrumbs, bodyHTML, css = '', base = './' }) {
  const crumbs = breadcrumbs || [{ label: 'AquaDrive' }];

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AquaDrive — ${title}</title>
    <link rel="icon" href="${base}assets/img/favicon.svg" type="image/svg+xml" />
    <script>${THEME_INIT}</script>
    <link rel="stylesheet" href="${base}assets/css/style.css" />
    ${css ? `<style>\n${css}\n    </style>` : ''}
    <script src="${base}assets/js/highlight.js" defer></script>
  </head>
  <body>
    ${navbar(base)}
    ${breadcrumb(crumbs)}
    <header>
      <div class="brand-tag">AquaDrive · Design System</div>
      <h1>${h1 || title}</h1>
      <p class="subtitle">${description}</p>
    </header>
    ${bodyHTML}
    <script>${PAGE_SCRIPT}</script>
  </body>
</html>`;
}
