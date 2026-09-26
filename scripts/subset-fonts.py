"""Regenerate committed English-site fonts with fonttools and brotli installed."""
from pathlib import Path
from shutil import copyfile
from fontTools import subset

root = Path(__file__).resolve().parents[1]
source = root / 'node_modules/geist'
target = root / 'src/app/fonts'
target.mkdir(exist_ok=True)
for original, output in [
    ('geist-sans/Geist-Variable.woff2', 'geist-sans-latin.woff2'),
    ('geist-mono/GeistMono-Medium.woff2', 'geist-mono-latin-500.woff2'),
]:
    subset.main([
        str(source / 'dist/fonts' / original),
        f'--output-file={target / output}',
        '--unicodes=U+0000-024F,U+2000-206F,U+20AC,U+2190-21FF',
        '--layout-features=*', '--flavor=woff2',
    ])
    print(f'{output}: {(target / output).stat().st_size:,} bytes')
copyfile(source / 'LICENSE.txt', target / 'LICENSE.txt')
