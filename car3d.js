import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import {OrbitControls} from 'https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js';
const host=document.getElementById('car3d');
try{
const r=new THREE.WebGLRenderer({antialias:true,alpha:true});
r.setPixelRatio(Math.min(devicePixelRatio,2));
host.appendChild(r.domElement);
const scene=new THREE.Scene();
const cam=new THREE.PerspectiveCamera(38,1,1,500);
cam.position.set(46,30,58);
const ctl=new OrbitControls(cam,r.domElement);
ctl.enableZoom=false;ctl.enablePan=false;ctl.autoRotate=true;ctl.autoRotateSpeed=1.6;ctl.target.set(0,12,0);ctl.update();
scene.add(new THREE.HemisphereLight(0xffffff,0x202030,1.1));
const d=new THREE.DirectionalLight(0xffffff,1.6);d.position.set(40,70,30);scene.add(d);
const car=new THREE.Group();scene.add(car);
const M=(c,o={})=>new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.7,metalness:.05},o));
const box=(w,h,l,m,x,y,z)=>{const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,l),m);o.position.set(x,y,z);car.add(o);return o};
const cyl=(rt,rb,h,m,x,y,z,rot)=>{const o=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,48),m);o.position.set(x,y,z);if(rot==='z')o.rotation.x=Math.PI/2;car.add(o);return o};
const black=M(0x15161a),card=M(0xb98d57),vinyl=M(0x0b0b0d,{roughness:.35,metalness:.3}),blue=M(0x2a8fd6),cd=M(0xc9ccd6,{roughness:.25,metalness:.7}),wood=M(0xe0b878),steel=M(0xb9bcc4,{metalness:.8,roughness:.3});
const RR=15,RF=6,Y=RR,XR=-16,XF=14,TRACK=9;
box(40,6,1.2,black,0,Y,TRACK/2);box(40,6,1.2,black,0,Y,-TRACK/2);
box(40,.8,TRACK,card,0,Y-2.6,0);
const axleR=cyl(.5,.5,TRACK+16,wood,XR,Y,0,'z');
const axleF=cyl(.4,.4,TRACK+4,wood,XF,Y,0,'z');
for(const s of[1,-1]){
 for(const o of[0,1.2]){
  const z=s*(TRACK/2+3+o);
  cyl(RR,RR,.35,vinyl,XR,Y,z,'z');
  cyl(5,5,.38,blue,XR,Y,z,'z');
 }
 const zf=s*(TRACK/2+1.8);
 cyl(RF,RF,.25,cd,XF,Y,zf,'z');
 cyl(1.5,1.5,.3,steel,XF,Y,zf,'z');
}
box(10,.8,5,M(0xdfe3ea),6,Y+3.4,0);
box(10,.3,5,M(0xc78a4f),6,Y+3.9,0);
const arm=new THREE.Mesh(new THREE.CylinderGeometry(.35,.35,20,12),M(0xf0c02a));
arm.position.set(17,Y+13,0);arm.rotation.z=-Math.PI/2+.62;car.add(arm);
const tip=new THREE.Vector3(27,Y+20,0),back=new THREE.Vector3(XR,Y+.6,0);
car.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([tip,back]),new THREE.LineBasicMaterial({color:0xf7f7f4})));
car.position.y=0;
const ground=new THREE.Mesh(new THREE.CircleGeometry(60,64),new THREE.MeshBasicMaterial({color:0xffd126,transparent:true,opacity:.07}));
ground.rotation.x=-Math.PI/2;scene.add(ground);
const grid=new THREE.GridHelper(120,24,0xffd126,0x2d313b);grid.material.transparent=true;grid.material.opacity=.35;scene.add(grid);
const fit=()=>{const w=host.clientWidth,h=host.clientHeight;r.setSize(w,h,false);r.domElement.style.width='100%';r.domElement.style.height='100%';cam.aspect=w/h;cam.updateProjectionMatrix()};
new ResizeObserver(fit).observe(host);fit();
r.setAnimationLoop(()=>{ctl.update();r.render(scene,cam)});
host.classList.add('on');
}catch(e){console.warn('3D indisponível',e)}
