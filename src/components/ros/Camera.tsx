import styled from 'vue-styled-components'
import { cameraModule, rosModule } from '@/store'
import { CameraType } from '@/store/modules/camera.types.ts'
import { createComponent, computed } from '@vue/composition-api'

const CameraGrid = styled.div`
  display: grid;
  > * {
    display: grid;
    align-items: center;
    justify-items: center;
    height: 100%;
    width: 100%;
  }
`
interface Props {
  type: CameraType
  topic: string
}

export default createComponent<Props, JSX.Element>({
  name: 'Camera',
  setup({ type, topic }) {
    const connected = computed(() => rosModule.connected)
    const stream = computed(
      () =>
        `http://${rosModule.robotIP}:${cameraModule.videoServerPort}/stream` +
        `?topic=${topic}` +
        `&type=${type}`
    )

    const NoVideo = (context: any) => (
      <div class="no-video">
        <p>{context.props.text}</p>
      </div>
    )

    const Stream = () => {
      switch (type) {
        case CameraType.MJPEG:
        case CameraType.PNG:
          return <img src={stream.value} />
        case CameraType.VP8:
          return <video src={stream.value} autoplay preload="none" />
        default:
          return <NoVideo text="invalid type" />
      }
    }

    return (
      <CameraGrid>
        {connected ? <Stream /> : <NoVideo text="no video" />}
      </CameraGrid>
    )
  },
})
