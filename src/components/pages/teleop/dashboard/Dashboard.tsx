import _ from 'lodash-es'

import { dashboardModule } from '@/store'
import { rosClient } from '@/utils/ros/rosClient'

import {
  DashboardGrid,
  DataArea,
  SpeedProgressArea,
  DirectionProgressArea,
} from '@/components/pages/teleop/dashboard/Dashboard.style'
import {
  createComponent,
  computed,
  onMounted,
  reactive,
  onBeforeUnmount,
} from '@vue/composition-api'

const Dashboard = createComponent({
  // name: 'Dashboard',
  setup() {
    const orientation = computed(() => {
      const data = dashboardModule.orientation.data
      rosClient.subscribe(
        { name: '/vectornav/IMU', messageType: 'sensor_msgs/Imu' },
        (data: string) => console.log(data) //eslint-disable-line
      )
      const mapDirection = (dir: number) => dir.toFixed(4).padStart(6)
      return _.mapValues(data, mapDirection)
    })

    const temp = computed(() => dashboardModule.temperature.data)

    onMounted(() => {
      rosClient.subscribe(
        dashboardModule.orientation.topic,
        dashboardModule.setOrientation
      )

      rosClient.subscribe(
        dashboardModule.temperature.topic,
        dashboardModule.setTemperature
      )
    })

    onBeforeUnmount(() => {
      rosClient.unsubscribe(dashboardModule.orientation.topic)
      rosClient.unsubscribe(dashboardModule.temperature.topic)
    })

    return (
      <DashboardGrid>
        <DataArea>
          <div>x: {orientation.value.x}</div>
          <div>y: {orientation.value.y}</div>
          <div>z: {orientation.value.z}</div>
          <div>temp: {temp}</div>
        </DataArea>
        <SpeedProgressArea>
          {/* <ProgressBar value={this.data.forward} fill-parent vertical /> */}
          {/* <ProgressBar
            value={this.data.backward}
            fill-parent
            vertical
            reverse
          /> */}
        </SpeedProgressArea>
        <DirectionProgressArea>
          {/* <ProgressBar value={this.data.left} reverse fill-parent /> */}
          {/* <ProgressBar value={this.data.right} fill-parent /> */}
        </DirectionProgressArea>
      </DashboardGrid>
    )
  },
})

export default Dashboard
