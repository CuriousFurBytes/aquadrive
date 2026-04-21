/* ============================================================
   AquaDrive — Auto Syntax Highlighting & Line Numbers
   Processes all .code-panel pre elements on page load.
   Skips blocks that already contain manual highlighting.
   ============================================================ */
(function () {
    function esc(s) {
        return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    /* ---- HTML Highlighting ---- */
    function highlightHTML(text) {
        var s = esc(text);
        // Extract comments
        var comments = [];
        s = s.replace(/&lt;!--[\s\S]*?--&gt;/g, function (m) {
            comments.push(m);
            return '\x00C' + (comments.length - 1) + '\x00';
        });
        // Tags
        s = s.replace(/&lt;(\/?)([\w-]+)([\s\S]*?)(\/?)\s*&gt;/g, function (m, slash1, tag, attrs, slash2) {
            var h = '&lt;' + slash1 + '<span class="hl-tag">' + tag + '</span>';
            attrs = attrs.replace(/([\w-:@.]+)\s*=\s*("[^"]*"|'[^']*')/g,
                '<span class="hl-attr">$1</span>=<span class="hl-str">$2</span>');
            h += attrs + slash2 + '&gt;';
            return h;
        });
        // Restore comments
        s = s.replace(/\x00C(\d+)\x00/g, function (m, i) {
            return '<span class="hl-comment">' + comments[parseInt(i)] + '</span>';
        });
        return s;
    }

    /* ---- CSS Highlighting ---- */
    function highlightCSS(text) {
        var s = esc(text);
        // Extract strings
        var strings = [];
        s = s.replace(/"[^"]*"/g, function (m) {
            strings.push(m);
            return '\x00S' + (strings.length - 1) + '\x00';
        });
        // Comments
        s = s.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="hl-comment">$1</span>');
        // Selectors (lines ending with {)
        s = s.replace(/^([^\s{/@\x00][^{]*?)(\s*\{)/gm, '<span class="hl-prop">$1</span>$2');
        // @-rules
        s = s.replace(/^(@[\w-]+)/gm, '<span class="hl-keyword">$1</span>');
        // Custom properties
        s = s.replace(/(--[\w-]+)(\s*:\s*)([^;]+)(;)/g,
            '<span class="hl-prop">$1</span>$2<span class="hl-val">$3</span>$4');
        // Standard properties
        s = s.replace(/([ \t])([\w-]+)(\s*:\s*)([^;]+)(;)/g, function (m, ws, p, c, v, sc) {
            if (p.indexOf('--') === 0) return m;
            return ws + '<span class="hl-keyword">' + p + '</span>' + c + '<span class="hl-val">' + v + '</span>' + sc;
        });
        // Restore strings
        s = s.replace(/\x00S(\d+)\x00/g, function (m, i) {
            return '<span class="hl-str">' + strings[parseInt(i)] + '</span>';
        });
        return s;
    }

    /* ---- JS Highlighting ---- */
    function highlightJS(text) {
        var s = esc(text);
        // Extract strings (single, double quotes)
        var strings = [];
        s = s.replace(/(["'])(?:(?!\1|\\).|\\.)*\1/g, function (m) {
            strings.push(m);
            return '\x00S' + (strings.length - 1) + '\x00';
        });
        // Template literals (simplified — no nested expressions)
        s = s.replace(/`[^`]*`/g, function (m) {
            strings.push(m);
            return '\x00S' + (strings.length - 1) + '\x00';
        });
        // Line comments
        s = s.replace(/(\/\/[^\n]*)/g, '<span class="hl-comment">$1</span>');
        // Block comments
        s = s.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="hl-comment">$1</span>');
        // Keywords
        s = s.replace(/\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|this|class|extends|import|export|from|default|async|await|try|catch|finally|throw|typeof|instanceof|in|of|true|false|null|undefined|void)\b/g,
            '<span class="hl-keyword">$1</span>');
        // Numbers
        s = s.replace(/\b(\d+\.?\d*)\b/g, '<span class="hl-num">$1</span>');
        // Property/method access after dot
        s = s.replace(/\.([\w$]+)/g, '.<span class="hl-prop">$1</span>');
        // Restore strings
        s = s.replace(/\x00S(\d+)\x00/g, function (m, i) {
            return '<span class="hl-str">' + strings[parseInt(i)] + '</span>';
        });
        return s;
    }

    /* ---- Process all code blocks ---- */
    function processCodeBlocks() {
        document.querySelectorAll('.code-panel pre').forEach(function (pre) {
            // Skip already-highlighted blocks
            if (pre.classList.contains('code-line-numbers') || pre.querySelector('[class^="hl-"]')) return;

            var panel = pre.closest('.code-panel');
            var lang = panel ? panel.getAttribute('data-lang') : '';
            var text = pre.textContent;
            var highlighted;

            if (lang === 'html') {
                highlighted = highlightHTML(text);
            } else if (lang === 'css') {
                highlighted = highlightCSS(text);
            } else if (lang === 'js') {
                highlighted = highlightJS(text);
            } else {
                return;
            }

            // Split into lines, wrap each in <span class="line">
            var lines = highlighted.split('\n');
            if (lines.length > 1 && lines[lines.length - 1].trim() === '') {
                lines.pop();
            }

            pre.className = 'code-line-numbers';
            pre.innerHTML = lines.map(function (line) {
                return '<span class="line">' + (line || ' ') + '</span>';
            }).join('');
        });
    }

    /* ---- Patch copyCode for line-numbered blocks ---- */
    function patchCopyCode() {
        window.copyCode = function (btn) {
            var pre = btn.nextElementSibling;
            var code;
            if (pre && pre.classList.contains('code-line-numbers')) {
                code = Array.from(pre.querySelectorAll('.line')).map(function (l) {
                    return l.textContent;
                }).join('\n');
            } else {
                code = pre ? pre.textContent : '';
            }
            navigator.clipboard.writeText(code);
            btn.textContent = 'Copied!';
            setTimeout(function () { btn.textContent = 'Copy'; }, 1500);
        };
    }

    /* ---- Init ---- */
    function init() {
        processCodeBlocks();
        patchCopyCode();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
