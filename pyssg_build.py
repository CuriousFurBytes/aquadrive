"""Build hooks for AquaDrive.

Copies the `static/` directory into `output/` after each build so stylesheets
and fonts are served alongside the generated HTML. Also seeds a placeholder
markdown file so py-ssg always has something to parse.
"""

import shutil
from pathlib import Path


def _copy_static(project_dir: Path, output_dir: Path) -> None:
    src = project_dir / "static"
    if not src.exists():
        return
    for item in src.iterdir():
        dest = output_dir / item.name
        if item.is_dir():
            shutil.copytree(item, dest, dirs_exist_ok=True)
        else:
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(item, dest)


def before_markdown_parsing(context):
    content_dir = context.project_dir / "content"
    content_dir.mkdir(exist_ok=True)
    seed = content_dir / "_placeholder.md"
    if not seed.exists():
        seed.write_text(
            '---\ntitle: ""\ntimestamp: "2026-01-01"\n---\n',
            encoding="utf-8",
        )


def after_build(context):
    _copy_static(context.project_dir, context.output_dir)
