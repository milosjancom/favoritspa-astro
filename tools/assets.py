import json,os,shutil,glob,sys
from PIL import Image
SRC='/home/claude/src'; P='/home/claude/favoritspa'
A=f'{P}/src/assets'; C=f'{P}/src/content/products'
os.makedirs(C,exist_ok=True)
def cp(src,dst):
    os.makedirs(os.path.dirname(dst),exist_ok=True); shutil.copy(SRC+src,dst)
for f in sorted(glob.glob('/home/claude/ext/products/*.json')):
    p=json.load(open(f)); sl=p['slug']; d=f'{A}/products/{sl}'; rel=lambda n:f'../../assets/products/{sl}/{n}'
    cp(p['hero'],f'{d}/hero.jpg'); p['hero']=rel('hero.jpg')
    im=Image.open(f'{SRC}/img/home-tri/{sl}.png').convert('RGBA'); im=im.crop(im.split()[-1].getbbox()); os.makedirs(d,exist_ok=True); im.save(f'{d}/plan.png'); p['plan']=rel('plan.png')
    for c in p['colors']:
        n='color-'+c['name'].lower().replace(' ','-')+'.jpg'; cp(c['image'],f'{d}/{n}'); c['image']=rel(n); del c['thumb']
    p['gallery']=[ (cp(g,f'{d}/gallery-{i+1}.jpg'), rel(f'gallery-{i+1}.jpg'))[1] for i,g in enumerate(p['gallery'])]
    for k in p['packages']:
        n='pkg-'+k['name'].lower()+'.jpg'; cp(k['image'],f'{d}/{n}'); k['image']=rel(n)
        k['features']=[{'name':x['name'],'on':x['on']} for x in k['features']]
    # drawing PDF -> public
    if p['drawing']:
        os.makedirs(f'{P}/public/download',exist_ok=True); shutil.copy(SRC+p['drawing'],f'{P}/public/download/{sl}-tehnicki-crtez.pdf'); p['drawing']=f'/download/{sl}-tehnicki-crtez.pdf'
    # dims numeric
    import re; nums=[int(x) for x in re.findall(r'\d{3,4}',p['dimensions'])]; p['dimsMm']=[nums[0],nums[-1]]; p['round']='∅' in p['dimensions']
    json.dump(p,open(f'{C}/{sl}.json','w'),ensure_ascii=False,indent=1)
for n in ['fspa-ilu-24','fspa-ilu-26','fspa-ilu-28','fspa-ilu-30','fspa-ilu-36']: cp(f'/img/home-spa/{n}.jpg',f'{A}/home/{n}.jpg')
cp('/img/home-about/djakuzi-spa-kade.jpg',f'{A}/home/about.jpg')
cp('/img/header/favorit-spa-logo.svg',f'{A}/logo.svg')
os.makedirs(f'{P}/public',exist_ok=True)
for s in ['16','32','192']: shutil.copy(f'{SRC}/file/favicon-{s}.png',f'{P}/public/favicon-{s}.png')
print('ok')
