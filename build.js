import { evaluate } from '@mdx-js/mdx';
import matter from 'gray-matter';
import { readFile, writeFile, mkdir, cp } from 'fs/promises';
import { existsSync } from 'fs';
import { readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import * as runtime from './src/jsx-runtime.js';
import { renderComponentPage, renderTopPage } from './src/template.js';
import { renderCodeBlock } from './src/components/CodeBlock.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function compileMDX(filePath) {
  const source = await readFile(filePath, 'utf-8');
  const { content, data: frontmatter } = matter(source);

  const mod = await evaluate(content, {
    ...runtime,
    baseUrl: new URL(path.basename(filePath), `file://${path.dirname(filePath)}/`).href,
  });

  return { frontmatter, ...mod };
}

async function buildComponents() {
  const mdxDir = path.join(__dirname, 'src/mdx');
  const files = (await readdir(mdxDir)).filter(f => f.endsWith('.mdx'));

  const components = [];

  for (const file of files) {
    const filePath = path.join(mdxDir, file);
    console.log(`  Compiling ${file}...`);

    const mod = await compileMDX(filePath);
    const { frontmatter, sections = [], componentCSS = '' } = mod;

    const html = renderComponentPage({ frontmatter, sections, componentCSS });

    const outPath = path.join(__dirname, 'dist/components', `${frontmatter.slug}.html`);
    await mkdir(path.dirname(outPath), { recursive: true });
    await writeFile(outPath, html, 'utf-8');

    // Also write to refactor/components/ to replace placeholder files
    const refactorPath = path.join(__dirname, 'refactor/components', `${frontmatter.slug}.html`);
    await mkdir(path.dirname(refactorPath), { recursive: true });
    await writeFile(refactorPath, html, 'utf-8');

    components.push(frontmatter);
    console.log(`  ✓ dist/components/${frontmatter.slug}.html`);
  }

  return components;
}

function groupComponents(components) {
  const groups = {};
  for (const c of components) {
    const g = c.group || 'Other';
    if (!groups[g]) groups[g] = [];
    groups[g].push(c);
  }
  return groups;
}

async function buildElementsIndex(components) {
  const groups = groupComponents(components);

  const groupOrder = [
    'Buttons & Actions',
    'Forms',
    'Data Display',
    'Feedback & Status',
    'Labels & Taxonomy',
    'Overlays',
    'Identity & Media',
    'Navigation',
    'Layout & Dividers',
    'Typography',
  ];

  const sortedGroups = [
    ...groupOrder.filter(g => groups[g]),
    ...Object.keys(groups).filter(g => !groupOrder.includes(g)),
  ];

  const gridHTML = sortedGroups.map(groupName => {
    const items = groups[groupName];
    const cards = items.map(c => `<a href="components/${c.slug}.html" class="card">
  <div class="card-title">${c.title}</div>
  <div class="card-desc">${c.description}</div>
</a>`).join('\n');

    return `<section class="section">
  <div class="section-label">${groupName}</div>
  <div class="card-grid">
    ${cards}
  </div>
</section>`;
  }).join('\n');

  const html = renderTopPage({
    title: 'Elements',
    h1: 'Elements <span>&amp; Components</span>',
    description: 'A complete reference of all UI elements and patterns.',
    breadcrumbs: [
      { label: 'AquaDrive', href: 'index.html' },
      { label: 'Elements' },
    ],
    bodyHTML: gridHTML,
    base: './',
  });

  await writeFile(path.join(__dirname, 'dist/elements.html'), html, 'utf-8');
  await writeFile(path.join(__dirname, 'refactor/elements.html'), html, 'utf-8');
  console.log('  ✓ dist/elements.html + refactor/elements.html');
}

function upgradeCodeBlocks(html) {
  return html
    .replace(/onclick="switchTab\(this,\s*'(\w+)'\)"/g, 'data-lang="$1"')
    .replace(/onclick="copyCode\(this\)"/g, '');
}

async function buildIndexPage() {
  const source = await readFile(path.join(__dirname, 'index.html'), 'utf-8');

  const headerEnd = source.indexOf('</header>') + '</header>'.length;
  const bodyEnd = source.lastIndexOf('<script>');
  const bodyContent = upgradeCodeBlocks(source.slice(headerEnd, bodyEnd).trim());

  const styleMatch = source.match(/<style>([\s\S]*?)<\/style>/);
  const inlineCSS = styleMatch ? styleMatch[1] : '';

  const html = renderTopPage({
    title: 'Colors',
    h1: 'Color <span>System</span>',
    description: 'Design tokens and color palettes for AquaDrive.',
    breadcrumbs: [{ label: 'AquaDrive' }],
    bodyHTML: bodyContent,
    css: inlineCSS,
    base: './',
  });

  await writeFile(path.join(__dirname, 'dist/index.html'), html, 'utf-8');
  console.log('  ✓ dist/index.html');
  // Note: refactor/index.html has different relative paths; dist/ is the canonical build
}

async function buildTypographyPage() {
  const source = await readFile(path.join(__dirname, 'typography.html'), 'utf-8');

  const headerEnd = source.indexOf('</header>') + '</header>'.length;
  const bodyEnd = source.lastIndexOf('<script>');
  const bodyContent = upgradeCodeBlocks(source.slice(headerEnd, bodyEnd).trim());

  const styleMatch = source.match(/<style>([\s\S]*?)<\/style>/);
  const inlineCSS = styleMatch ? styleMatch[1] : '';

  const html = renderTopPage({
    title: 'Typography',
    h1: 'Typo<span>graphy</span>',
    description: 'Font scales, weights, and text styles.',
    breadcrumbs: [
      { label: 'AquaDrive', href: 'index.html' },
      { label: 'Typography' },
    ],
    bodyHTML: bodyContent,
    css: inlineCSS,
    base: './',
  });

  await writeFile(path.join(__dirname, 'dist/typography.html'), html, 'utf-8');
  console.log('  ✓ dist/typography.html');
}

async function buildPortsPage() {
  const source = await readFile(path.join(__dirname, 'ports.html'), 'utf-8');

  const headerEnd = source.indexOf('</header>') + '</header>'.length;
  const bodyEnd = source.lastIndexOf('<script>');
  const bodyContent = upgradeCodeBlocks(source.slice(headerEnd, bodyEnd).trim());

  const styleMatch = source.match(/<style>([\s\S]*?)<\/style>/);
  const inlineCSS = styleMatch ? styleMatch[1] : '';

  const html = renderTopPage({
    title: 'Ports',
    h1: 'Ports <span>&amp; Integrations</span>',
    description: 'Available theme ports for different frameworks and tools.',
    breadcrumbs: [
      { label: 'AquaDrive', href: 'index.html' },
      { label: 'Ports' },
    ],
    bodyHTML: bodyContent,
    css: inlineCSS,
    base: './',
  });

  await writeFile(path.join(__dirname, 'dist/ports.html'), html, 'utf-8');
  console.log('  ✓ dist/ports.html');
}

async function copyAssets() {
  const src = path.join(__dirname, 'refactor/new/assets');
  const dest = path.join(__dirname, 'dist/assets');
  await cp(src, dest, { recursive: true });
  console.log('  ✓ dist/assets/ (copied from refactor/new/assets)');
}

async function main() {
  console.log('\n🔨 AquaDrive Build\n');

  await mkdir(path.join(__dirname, 'dist'), { recursive: true });

  console.log('▶ Copying assets...');
  await copyAssets();

  console.log('\n▶ Building component pages...');
  const components = await buildComponents();

  console.log('\n▶ Building index pages...');
  await buildElementsIndex(components);
  await buildIndexPage();
  await buildTypographyPage();
  await buildPortsPage();

  console.log(`\n✅ Build complete — ${components.length} components, 4 pages\n`);
}

main().catch(err => {
  console.error('Build failed:', err);
  process.exit(1);
});
