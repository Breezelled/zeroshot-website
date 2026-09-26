# Local font subsets

These are subsets of the Geist 1.7.2 fonts distributed by the installed `geist` package, under the included SIL Open Font License. The sans font keeps its variable weight axis; the mono font uses the 500 weight used by the site's eyebrows.

Coverage: Latin U+0000–024F, general punctuation U+2000–206F, the euro sign, and arrows U+2190–21FF. Current English content and relevant punctuation are checked against the font cmap. For future languages outside these ranges, regenerate a suitable subset or add a language-specific font.

The generated WOFF2 files are committed assets: production builds do not run Python or download fonts. To regenerate after a font update, install `fonttools` and `brotli` into an isolated Python environment, then run `python scripts/subset-fonts.py` from the project root. Retain LICENSE.txt with the font files.
