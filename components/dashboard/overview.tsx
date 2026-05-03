import { dashboard, cameras } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';

export function DashboardOverview(){
  return <div className='grid gap-4 lg:grid-cols-3'>
    <Card title='Security Score' sub='Household posture'>{` ${dashboard.score}/100 `}<div className='mt-2 h-2 rounded bg-white/10'><div className='h-2 rounded bg-good' style={{width:`${dashboard.score}%`}} /></div></Card>
    <Card title='Mode'>{dashboard.mode}</Card>
    <Card title='Network'>{dashboard.network}</Card>
    <Card title='Device Health' sub='Online status'><p>Cameras: {dashboard.camerasOnline}</p><p>Sensors: {dashboard.sensorsOnline}</p></Card>
    <Card title='Active Alerts'><p className='text-3xl font-semibold text-warn'>{dashboard.alerts}</p><p className='text-sm text-white/70 mt-1'>{dashboard.lastAlert}</p></Card>
    <Card title='AI Daily Summary'>{dashboard.dailySummary}<p className='text-sm text-white/70 mt-2'>{dashboard.recommendation}</p></Card>
    <Card title='Camera Preview Grid' sub='Mock snapshots'><div className='grid grid-cols-2 gap-2'>{cameras.slice(0,4).map(c=><div className='rounded bg-white/5 p-2 text-xs' key={c}>{c}</div>)}</div></Card>
    <Card title='Quick Actions'><div className='grid grid-cols-2 gap-2 text-sm'>{['Arm Home','Arm Away','Disarm','View Cameras','Review Alerts','Add Device','Create Automation','Generate AI Summary'].map(a=><button className='rounded bg-accent/20 px-2 py-1 hover:bg-accent/30' key={a}>{a}</button>)}</div></Card>
    <Card title='Recent Notification'>{dashboard.lastMotion}</Card>
  </div>
}
