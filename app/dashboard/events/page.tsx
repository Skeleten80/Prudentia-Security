import { Header } from '@/components/layout/header';
import { RecentEvents } from '@/components/events/recent-events';

export default function EventsPage() {
  return <><Header title='Events' subtitle='Timeline of recent detections and alerts' /><RecentEvents /></>;
}
