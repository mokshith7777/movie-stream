export async function onRequest(context){
  const url=new URL(context.request.url);
  const path=url.pathname.replace(/^\/api\/tmdb\/?/,'');
  if(!path)return new Response(JSON.stringify({error:'TMDB endpoint required'}),{status:400,headers:{'content-type':'application/json'}});
  const target=new URL('https://api.themoviedb.org/3/'+path);
  url.searchParams.forEach((v,k)=>target.searchParams.set(k,v));
  const token=context.env.TMDB_READ_ACCESS_TOKEN;
  if(!token)return new Response(JSON.stringify({error:'TMDB backend credential is not configured'}),{status:503,headers:{'content-type':'application/json'}});
  const r=await fetch(target.toString(),{headers:{Authorization:'Bearer '+token,accept:'application/json'}});
  return new Response(r.body,{status:r.status,headers:{'content-type':r.headers.get('content-type')||'application/json','cache-control':'public, max-age=300'}});
}
