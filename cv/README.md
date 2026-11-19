# CV

`cv.html` es la fuente del CV. Para actualizarlo, edita el HTML y vuelve a generar el PDF que descarga la web
(`public/cv/CV-Walid-Sardi.pdf`) con Chrome desde Git Bash, en la raíz del proyecto:

```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --no-pdf-header-footer \
  --virtual-time-budget=8000 \
  --print-to-pdf="$(cygpath -w $PWD/public/cv/CV-Walid-Sardi.pdf)" \
  "file:///$(cygpath -m $PWD/cv/cv.html)"
```

El CV debe caber en una sola página A4. Si al añadir contenido pasa a dos, reduce espaciados o acorta frases.
