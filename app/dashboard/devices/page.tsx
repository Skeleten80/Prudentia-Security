import { Header } from '@/components/layout/header';
import { DeviceTable } from '@/components/devices/device-table';
import { devices } from '@/lib/mock-data';

export default function DevicesPage() {
  return <>
    <Header title='Device Inventory' subtitle={`${devices.length} devices tracked across your organization`} />
    <DeviceTable devices={devices} />
  </>;
}
