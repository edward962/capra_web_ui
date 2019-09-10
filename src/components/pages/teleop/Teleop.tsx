import {
  TeleopGrid,
  TopGrid,
  BottomGrid,
} from '@/components/pages/teleop/Teleop.styles'
import { Map2D } from '@/components'
import Camera from '@/components/ros/Camera'
import { cameraModule, teleopModule } from '@/store'
import Dashboard from '@/components/pages/teleop/dashboard/Dashboard'
import { createComponent, reactive } from '@vue/composition-api'

const Teleop = createComponent({
  setup() {
    const bottomCamera = reactive(
      cameraModule.getCamera(teleopModule.bottomCamera)
    )
    const leftCamera = reactive(cameraModule.getCamera(teleopModule.leftCamera))
    const rightCamera = reactive(
      cameraModule.getCamera(teleopModule.rightCamera)
    )

    return (
      <TeleopGrid>
        <TopGrid>
          <Camera type={leftCamera.type} topic={leftCamera.topic} />
          <Camera type={rightCamera.type} topic={rightCamera.topic} />
        </TopGrid>
        <BottomGrid>
          <Dashboard />
          <Map2D />
          <Camera type={bottomCamera.type} topic={bottomCamera.topic} />
        </BottomGrid>
      </TeleopGrid>
    )
  },
})

export default Teleop
