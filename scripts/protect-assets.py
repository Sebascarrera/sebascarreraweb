#!/usr/bin/env python3
"""
Protege los medios del portafolio: reduce resolución y estampa una marca de agua incrustada
(etiqueta de autoría abajo a la derecha + trama diagonal casi invisible).
Uso (desde la raíz del repo):  python3 scripts/protect-assets.py
Es idempotente: guarda en scripts/.protected.json lo ya procesado y no lo vuelve a marcar.
IMPORTANTE: ejecútalo sobre los ORIGINALES. Nunca lo corras dos veces sobre el mismo archivo.
"""
import os, sys, json, subprocess, glob, hashlib, tempfile, shutil
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
A = os.path.join(ROOT, 'src', 'assets')
MANIFEST = os.path.join(ROOT, 'scripts', '.protected.json')
LABEL = '© Sebastián Carrera Moya · sebastiancarreramoya.com'
TILE = 'JSCM · SCM'
FONTS = ['/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', '/System/Library/Fonts/Supplemental/Arial Bold.ttf',
         '/usr/share/fonts/dejavu/DejaVuSans-Bold.ttf']

def font(sz):
    for f in FONTS:
        if os.path.exists(f):
            return ImageFont.truetype(f, sz)
    return ImageFont.load_default()

def overlay(w, h):
    """Capa RGBA con la etiqueta y la trama."""
    lay = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    base = min(w, 1400) if h > w * 2.5 else w          # piezas muy altas: tamaño según ancho
    fs = max(11, round(base * 0.0165))
    # trama diagonal muy tenue
    tf = font(max(16, round(min(w, 1600) * 0.034)))
    tw = int(tf.getlength(TILE)) + 20
    th = int(tf.size * 1.6)
    tile = Image.new('RGBA', (tw, th), (0, 0, 0, 0))
    ImageDraw.Draw(tile).text((10, 4), TILE, font=tf, fill=(255, 255, 255, 20))
    tile = tile.rotate(24, expand=True, resample=Image.BICUBIC)
    stepx = int(tile.width * 1.9); stepy = int(tile.height * 1.5)
    n = 0
    for y in range(-tile.height, h, stepy):
        for x in range(-tile.width + (n % 2) * stepx // 2, w, stepx):
            lay.alpha_composite(tile, (max(0, x), max(0, y))) if x >= 0 and y >= 0 else None
        n += 1
    # etiqueta de autoría
    d = ImageDraw.Draw(lay)
    f = font(fs)
    tw = int(f.getlength(LABEL))
    mx = max(10, round(w * 0.012)); my = max(8, round(min(w, h) * 0.014))
    x = w - tw - mx; y = h - fs - my - 4
    d.text((x + 1, y + 1), LABEL, font=f, fill=(0, 0, 0, 150))
    d.text((x, y), LABEL, font=f, fill=(255, 255, 255, 170))
    return lay

def load():
    return json.load(open(MANIFEST)) if os.path.exists(MANIFEST) else {}

def save(m):
    json.dump(m, open(MANIFEST, 'w'), indent=1, sort_keys=True)

def do_image(p):
    im = Image.open(p)
    fmt = im.format
    has_a = im.mode in ('RGBA', 'LA') or 'transparency' in im.info
    im = im.convert('RGBA' if has_a else 'RGB')
    w, h = im.size
    if w > 1800:                                          # menos resolución utilizable
        h = round(h * 1600 / w); w = 1600
        im = im.resize((w, h), Image.LANCZOS)
    rgba = im.convert('RGBA'); rgba.alpha_composite(overlay(w, h))
    out = rgba if has_a else rgba.convert('RGB')
    ext = p.lower().rsplit('.', 1)[-1]
    if ext == 'webp':   out.save(p, 'WEBP', quality=80, method=6)
    elif ext in ('jpg', 'jpeg'): out.save(p, 'JPEG', quality=82, optimize=True, progressive=True)
    else:               out.save(p, 'PNG', optimize=True)

def do_video(p):
    pr = subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height',
                         '-of', 'csv=p=0', p], capture_output=True, text=True).stdout.strip().split(',')
    w, h = int(pr[0]), int(pr[1])
    if w >= h: tw = min(w, 1280)
    else:      tw = min(w, 720)
    tw -= tw % 2
    th = round(h * tw / w); th -= th % 2
    lay = overlay(tw, th)
    tmp = tempfile.mkdtemp()
    png = os.path.join(tmp, 'wm.png'); lay.save(png)
    out = os.path.join(tmp, 'out.mp4')
    cmd = ['ffmpeg', '-v', 'error', '-y', '-i', p, '-i', png, '-filter_complex',
           f'[0:v]scale={tw}:{th}[v];[v][1:v]overlay=0:0:format=auto,format=yuv420p[o]',
           '-map', '[o]', '-map', '0:a?', '-c:v', 'libx264', '-preset', 'slow', '-crf', '29',
           '-maxrate', '1400k', '-bufsize', '2800k', '-c:a', 'aac', '-b:a', '64k', '-movflags', '+faststart', out]
    subprocess.run(cmd, check=True)
    shutil.copyfile(out, p)
    os.remove(out)

def targets():
    imgs = []
    for sub in ('mentor', 'projects', 'juegos'):
        imgs += glob.glob(os.path.join(A, sub, '*.webp'))
    imgs += glob.glob(os.path.join(A, 'videos', '*.webp'))
    imgs += [os.path.join(A, 'design', 'screen1.png'), os.path.join(A, 'design', 'screen2.png'),
             os.path.join(A, 'img', 'jornada-ciberseguridad-2026-cover.jpg')]
    vids = glob.glob(os.path.join(A, 'videos', '*.[mM][pP]4')) + [os.path.join(A, 'background-portfolio-web-4.mp4')]
    return sorted(set(imgs)), sorted(set(vids))

if __name__ == '__main__':
    only = sys.argv[1] if len(sys.argv) > 1 else 'all'
    man = load(); imgs, vids = targets()
    if only in ('all', 'img'):
        for p in imgs:
            k = os.path.relpath(p, ROOT)
            if k in man or not os.path.exists(p): continue
            before = os.path.getsize(p); do_image(p)
            man[k] = {'bytes': os.path.getsize(p)}; save(man); print('img', k, before, '->', os.path.getsize(p), flush=True)
    if only in ('all', 'vid'):
        for p in vids:
            k = os.path.relpath(p, ROOT)
            if k in man or not os.path.exists(p): continue
            before = os.path.getsize(p); do_video(p)
            man[k] = {'bytes': os.path.getsize(p)}; save(man); print('vid', k, before, '->', os.path.getsize(p), flush=True)
    print('listo')
