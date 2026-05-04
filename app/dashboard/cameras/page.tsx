import { Header } from '@/components/layout/header';
import { CameraGrid } from '@/components/cameras/camera-grid';

export default function CamerasPage() {
  return <><Header title='Cameras' subtitle='Live feed health and motion updates' /><CameraGrid /></>;
}
