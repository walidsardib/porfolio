# Imágenes para compartir (Open Graph)

`og.html` → `public/og.png` (portfolio) y `og-larue.html` → `public/og-larue.png` (página de LaRue3x3).
Tamaño 1200×630. Para regenerarlas desde Git Bash, en la raíz del proyecto:

```bash
C="/c/Program Files/Google/Chrome/Application/chrome.exe"
"$C" --headless=new --hide-scrollbars --window-size=1200,630 --virtual-time-budget=15000 \
  --screenshot="$(cygpath -w $PWD/public/og.png)" "file:///$(cygpath -m $PWD/og/og.html)"
```
