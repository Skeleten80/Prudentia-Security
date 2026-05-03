export function EmptyState({title,message}:{title:string;message:string}){return <div className='rounded-lg border border-dashed border-white/20 p-6 text-center'><p className='font-medium'>{title}</p><p className='text-sm text-white/60 mt-1'>{message}</p></div>}
export function ErrorState({message}:{message:string}){return <div className='rounded-lg border border-bad/40 bg-bad/10 p-4 text-sm'>Unable to load data: {message}</div>}
export function LoadingState(){return <div className='animate-pulse rounded-lg bg-white/5 p-6 text-sm text-white/70'>Loading secure telemetry…</div>}
