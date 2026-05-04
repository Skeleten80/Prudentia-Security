import { Header } from '@/components/layout/header';
import { GlassCard } from '@/components/ui/glass-card';
import { devices } from '@/lib/mock-data';

export default function DevicesPage(){return <><Header title='Devices' subtitle='Sensors and endpoints status' /><GlassCard className='p-6'><div className='grid md:grid-cols-2 gap-3'>{devices.map(d=><div key={d.id} className='rounded-lg p-3 bg-white/5'><p>{d.name}</p><p className='text-sm text-white/70'>{d.type} · {d.zone}</p><p className='text-xs text-white/60'>Battery {d.battery} · {d.health}</p></div>)}</div></GlassCard></>}
