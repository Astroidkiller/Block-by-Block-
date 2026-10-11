import {ReactNode} from "react";
export function Section({id,title,sub,children}:{id?:string;title:string;sub?:string;children:ReactNode}){
  return <section id={id} className="mx-auto max-w-6xl scroll-mt-20 px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
    <h2 className="max-w-3xl text-3xl font-bold tracking-tight md:text-5xl">{title}</h2>
    {sub&&<p className="mt-4 max-w-2xl text-slate">{sub}</p>}
    <div className="mt-12">{children}</div></section>;
}
