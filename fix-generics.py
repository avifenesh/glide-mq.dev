"""
Fix TypeDoc-generated markdown for VitePress compatibility.
Replaces escaped angle brackets \\< \\> with HTML entities &lt; &gt;
outside of code blocks and inline code.
"""
import re
import glob
import os

CODE_FENCE_RE = re.compile(r'(```[\s\S]*?```)')

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Split content by code fences to only process non-code parts
    parts = CODE_FENCE_RE.split(content)

    for i in range(len(parts)):
        if parts[i].startswith('```'):
            # Inside code blocks: escape bare angle brackets that look like HTML
            # VitePress still processes these through Vue compiler
            parts[i] = re.sub(
                r'<(string|number|boolean|void|null|undefined|any|never|unknown|object)',
                r'&lt;\1',
                parts[i]
            )
            parts[i] = re.sub(
                r'<(stream-id|job-id|queue-name)',
                r'&lt;\1',
                parts[i]
            )
            continue

        # Replace escaped angle brackets: \< -> &lt;  \> -> &gt;
        parts[i] = parts[i].replace('\\<', '&lt;').replace('\\>', '&gt;')

        # Replace bare angle-bracket tags outside code
        parts[i] = re.sub(
            r'<(stream-id|job-id|queue-name|[a-z][a-z0-9-]*)>',
            r'&lt;\1&gt;',
            parts[i]
        )

    content = ''.join(parts)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False


fixed = 0
for filepath in sorted(glob.glob('docs/api/**/*.md', recursive=True)):
    if fix_file(filepath):
        print(f'Fixed: {os.path.basename(filepath)}')
        fixed += 1

print(f'\nTotal: {fixed} files fixed')
