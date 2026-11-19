(()=>{
const host=document.getElementById('car3d');if(!host)return;
const K=6,X0=-2.5;
const stage=document.createElement('div');stage.className='c3-stage';
const world=document.createElement('div');world.className='c3-world';
stage.appendChild(world);host.appendChild(stage);
const shade=(hex,f)=>{const n=parseInt(hex.slice(1),16);const c=[n>>16,n>>8&255,n&255].map(v=>Math.max(0,Math.min(255,Math.round(v*f))));return'rgb('+c.join(',')+')'};
const el=(cls,css,parent)=>{const d=document.createElement('div');d.className=cls;if(css)d.style.cssText=css;(parent||world).appendChild(d);return d};
const place=(x,y,z,rz,ry)=>'translate3d('+((x+X0)*K)+'px,'+(-y*K)+'px,'+(z*K)+'px)'+(rz?' rotateZ('+(-rz)+'deg)':'')+(ry?' rotateY('+ry+'deg)':'');
function box(x,y,z,L,H,W,rz,col,o={}){
 const g=el('c3-g','transform:'+place(x,y,z,rz));
 const l=L*K,h=H*K,w=W*K;
 const f=[[l,h,'translateZ('+w/2+'px)',1],[l,h,'rotateY(180deg) translateZ('+w/2+'px)',.8],[w,h,'rotateY(90deg) translateZ('+l/2+'px)',.7],[w,h,'rotateY(-90deg) translateZ('+l/2+'px)',.7],[l,w,'rotateX(90deg) translateZ('+h/2+'px)',1.25],[l,w,'rotateX(-90deg) translateZ('+h/2+'px)',.5]];
 f.forEach(([a,b,t,s],i)=>{const d=el('c3-f','width:'+a+'px;height:'+b+'px;margin:'+(-b/2)+'px 0 0 '+(-a/2)+'px;transform:'+t+';background:'+shade(col,s)+(o.tex&&i<2?';background-image:'+o.tex:''),g)});
 return g;
}
function disc(x,y,z,r,kind){
 const g=el('c3-g','transform:'+place(x,y,z));
 const layers=kind==='vinyl'?[-.12,0,.12]:[-.06,.06];
 layers.forEach((dz,i)=>{
  const d=el('c3-disc '+kind+(i===layers.length-1||i===0?' face':''),'width:'+2*r*K+'px;height:'+2*r*K+'px;margin:'+(-r*K)+'px 0 0 '+(-r*K)+'px;transform:translateZ('+dz*K+'px)',g);
  if(kind==='vinyl'&&(i===0||i===layers.length-1)){el('c3-label','',d)}
 });
 return g;
}
const a=Math.atan2(6-15,30),deg=a*180/Math.PI,dir=[Math.cos(a),Math.sin(a)],nrm=[-Math.sin(a),Math.cos(a)];
const at=(u,v)=>[0+u*dir[0]+v*nrm[0],10.5+u*dir[1]+v*nrm[1]];
for(const z of[-4.5,4.5]){const[p,q]=at(0,0);box(p,q,z,40,4,.9,deg,'#17181d')}
{const[p,q]=at(2,2.3);box(p,q,0,15,.5,10,deg,'#b98d57')}
{const[p,q]=at(4,3.1);box(p,q,0,10,1,4.6,deg,'#d9c08f')}
{const[p,q]=at(4,3.75);box(p,q,0,9,.3,4.2,deg,'#c7ccd4')}
const ha=deg+14,hr=ha*Math.PI/180,[hx,hy]=at(5.5,4);
const AL=26,ax=hx+Math.cos(hr)*AL/2,ay=hy+Math.sin(hr)*AL/2;
box(ax,ay,0,AL,.55,.55,ha,'#f2c321');
const tx=hx+Math.cos(hr)*AL,ty=hy+Math.sin(hr)*AL,sx=-15,sy=15.6;
const SL=Math.hypot(tx-sx,ty-sy),sa=Math.atan2(ty-sy,tx-sx)*180/Math.PI;
box((tx+sx)/2,(ty+sy)/2,0,SL,.14,.14,sa,'#f4f1e6');
box(-15,15,0,17,1,1,0,'#e9e3d3').style.transform+=' rotateY(90deg)';
box(15,6,0,15,.6,.6,0,'#d8d8d8').style.transform+=' rotateY(90deg)';
for(const z of[-7.6,7.6])disc(-15,15,z,15,'vinyl');
for(const z of[-6.8,6.8])disc(15,6,z,6,'cd');
const fl=el('c3-floor','width:'+90*K+'px;height:'+60*K+'px;margin:'+(-30*K)+'px 0 0 '+(-45*K)+'px;transform:translate3d('+X0*K+'px,0,0) rotateX(90deg)');
const spinners=[...world.querySelectorAll('.c3-disc')];
let ry=-28,rx=-13,dragging=false,lx=0,ly=0,last=performance.now(),spin=0,idle=0;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
function fit(){const w=host.clientWidth,h=host.clientHeight;const s=Math.min(w/(84*K),h/(52*K));world.style.setProperty('--s',s.toFixed(3))}
new ResizeObserver(fit).observe(host);fit();
function frame(t){const dt=Math.min(64,t-last);last=t;
 if(!dragging&&!reduce&&t>idle)ry+=dt*.018;
 if(!reduce)spin=(spin+dt*.09)%360;
 world.style.transform='translate3d(0,'+(9*K)+'px,0) scale(var(--s)) rotateX('+rx+'deg) rotateY('+ry+'deg)';
 for(const d of spinners){const b=d.style.transform.split(' rotateZ')[0];d.style.transform=b+' rotateZ('+(-spin*(d.classList.contains('cd')?2.5:1))+'deg)'}
 requestAnimationFrame(frame)}
requestAnimationFrame(frame);
host.addEventListener('pointerdown',e=>{dragging=true;lx=e.clientX;ly=e.clientY;host.setPointerCapture(e.pointerId)});
host.addEventListener('pointermove',e=>{if(!dragging)return;ry+=(e.clientX-lx)*.45;rx=Math.max(-40,Math.min(8,rx-(e.clientY-ly)*.25));lx=e.clientX;ly=e.clientY});
const end=()=>{dragging=false;idle=performance.now()+1500};
host.addEventListener('pointerup',end);host.addEventListener('pointercancel',end);
host.classList.add('on');
})();
