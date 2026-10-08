import {firebaseConfig} from './firebase-config.js';
const configured=!Object.values(firebaseConfig).some(v=>String(v).includes('PASTE_'));
let app=null,auth=null;
async function boot(){
 if(!configured){window.JarvisAuth={configured:false,user:null,signIn:async()=>{throw Error('Firebase is not configured yet. Add your Firebase web config in assets/firebase-config.js.')}};return}
 const [{initializeApp},{getApps}]=await Promise.all([import('https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js'),import('https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js')]);
 app=getApps().length?getApps()[0]:initializeApp(firebaseConfig);
 const a=await import('https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js');
 auth=a.getAuth(app);
 const emit=u=>{window.JarvisAuth.user=u||null;window.dispatchEvent(new CustomEvent('jarvis-auth',{detail:u||null}))};
 a.onAuthStateChanged(auth,emit);
 window.JarvisAuth={
  configured:true,get user(){return auth?.currentUser||null},
  google:async()=>{const p=new a.GoogleAuthProvider();return (await a.signInWithPopup(auth,p)).user},
  email:async(email,password)=>{return (await a.signInWithEmailAndPassword(auth,email,password)).user},
  signup:async(email,password)=>{return (await a.createUserWithEmailAndPassword(auth,email,password)).user},
  logout:()=>a.signOut(auth)
 };
}
boot().catch(e=>{window.JarvisAuth={configured:false,error:e.message,user:null};window.dispatchEvent(new CustomEvent('jarvis-auth-error',{detail:e.message}))});