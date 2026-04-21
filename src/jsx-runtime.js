const VOID = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);

function renderChildren(c) {
  if (c === null || c === undefined) return '';
  if (Array.isArray(c)) return c.map(renderChildren).join('');
  return String(c);
}

function renderAttrs(attrs) {
  return Object.entries(attrs)
    .filter(([k, v]) => k !== '__source' && k !== '__self' && v !== undefined && v !== null && v !== false)
    .map(([k, v]) => {
      if (v === true) return k;
      const key = k === 'className' ? 'class' : k === 'htmlFor' ? 'for' : k;
      return `${key}="${String(v).replace(/"/g, '&quot;')}"`;
    })
    .join(' ');
}

export const Fragment = ({ children }) => renderChildren(children);

export function jsx(type, props) {
  if (typeof type === 'function') return type(props);
  if (type === Fragment) return renderChildren((props || {}).children);

  const { children, ...attrs } = props || {};
  const attrStr = renderAttrs(attrs);
  const open = attrStr ? `<${type} ${attrStr}>` : `<${type}>`;

  if (VOID.has(type)) return open;
  return `${open}${renderChildren(children)}</${type}>`;
}

export const jsxs = jsx;
