import sys,json,re,os
from bs4 import BeautifulSoup
SRC=sys.argv[1]; OUT=sys.argv[2]
slugs=['zen','eden','pearl','garden','fusion','melody','point']
def cell(td):
    img=td.find('img')
    if img and not td.get_text(strip=True): return {'Yes':'yes','No':'no','Add':'opt'}.get(img.get('alt'),img.get('alt'))
    return td.get_text(' ',strip=True)
def table(div):
    t=div.find('table')
    if not t: return None
    rows=t.find_all('tr'); head=[th.get_text(strip=True) for th in rows[0].find_all('th')][1:]
    out=[]
    for r in rows[1:]:
        tds=r.find_all('td'); vals=[]
        for td in tds[1:]:
            vals += [cell(td)]*int(td.get('colspan',1))
        out.append({'label':tds[0].get_text(' ',strip=True),'values':vals})
    return {'columns':head,'rows':out}
prods=[]
for i,sl in enumerate(slugs):
    s=BeautifulSoup(open(f'{SRC}/sr/djakuzi-spa-kade-i-cene/{sl}/index.html',encoding='utf-8'),'html.parser')
    mi=s.select_one('#model-info')
    line=mi.select_one('p.grupa').get_text(strip=True)
    tag=s.select_one('.main-title h1 span').get_text(strip=True)
    det=[li.get_text(' ',strip=True) for li in mi.select('.det li')]
    colors=[{'name':a.get('title'),'image':a.get('href'),'thumb':a.find('img').get('src')} for a in mi.select('.boja a')]
    gal=[a.get('href') for a in mi.select('.galerija a')]
    pk=[]
    navs=s.select('#proizvod .nav li')
    for n,li in zip(navs,s.select('#proizvod li.proizvod')):
        spans=n.find_all('span')
        price=spans[-1].get_text(strip=True); old=spans[0].get_text(strip=True) if len(spans)>1 else None
        num=lambda x: int(re.sub(r'\D','',x)) if x else None
        feats=[{'name':l.find('img').get('alt'),'icon':l.find('img').get('src'),'on':'yes' in l.get('class',[])} for l in li.select('.funkcije li')]
        pk.append({'name':n.find('strong').get_text(strip=True),'price':num(price),'oldPrice':num(old),'jets':int(li.select_one('.mlaznice .val').get_text(strip=True)),'image':li.select_one('.im img').get('src'),'features':feats})
    meta=s.find('meta',attrs={'name':'description'})
    dl=s.select_one('.tehnicki-crtez a')
    prods.append({'slug':sl,'name':mi.select_one('.head h1').get_text(strip=True),'order':i,'line':line,'tagline':tag,
      'fromPrice':int(re.sub(r'\D','',mi.select_one('.cena').get_text())),'description':mi.select_one('.body').get_text(' ',strip=True),
      'dimensions':det[0],'persons':int(re.sub(r'\D','',det[1])),'jets':int(re.sub(r'\D','',det[2])),
      'hero':s.select_one('.slider img').get('src'),'colors':colors,'gallery':gal,'packages':pk,
      'standard':table(s.select_one('#tehnicke-karakteristike')),'extras':table(s.select_one('#opcije')),
      'drawing':dl.get('href') if dl else None,'seo':{'title':s.title.get_text(strip=True),'description':meta.get('content') if meta else ''}})
os.makedirs(OUT,exist_ok=True)
for p in prods: json.dump(p,open(f'{OUT}/{p["slug"]}.json','w'),ensure_ascii=False,indent=1)
print(json.dumps([{k:p[k] for k in('slug','line','fromPrice','persons','jets','dimensions','hero','drawing')}|{'pk':[(x['name'],x['price'],x['oldPrice'],x['jets']) for x in p['packages']],'ncol':len(p['colors']),'ngal':len(p['gallery']),'cols':p['standard']['columns']} for p in prods],ensure_ascii=False,indent=0))
