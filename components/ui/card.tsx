import { ReactNode } from 'react';
export function Card({title,children,sub}:{title:string;children:ReactNode;sub?:string}){return <section className='glass p-4 md:p-5'><div className='mb-3'><h3 className='font-semibold'>{title}</h3>{sub?<p className='text-sm text-white/60'>{sub}</p>:null}</div>{children}</section>}
