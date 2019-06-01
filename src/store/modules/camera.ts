import { VuexModule, mutation, Module, action } from 'vuex-class-component'
import { CameraMap, CameraType, Camera } from './camera.types'

@Module({ namespacedPath: 'camera/' })
export default class CameraModule extends VuexModule {
  videoServerPort = '8080'

  cameras: CameraMap = {
    camera1: {
      type: CameraType.MJPEG,
      topic: '/camera_3d/rgb/image_raw',
    },
    camera2: {
      type: CameraType.MJPEG,
      topic: '/camera_3d/depth/image',
    },
  }

  typesForSelect = [
    { disabled: false, value: CameraType.MJPEG },
    { disabled: false, value: CameraType.PNG },
    { disabled: false, value: CameraType.VP8 },
    { disabled: true, value: CameraType.WEB_RTC },
  ]

  get camerasForSelect() {
    return Object.entries(this.cameras).map(entry => {
      return { name: entry[0], ...entry[1] }
    })
  }

  get getCamera() {
    return (cameraName: string) => {
      const cam = this.cameras[cameraName]
      if (cam === undefined) return this.cameras[0]
      return cam
    }
  }

  @mutation
  setVideoServerPort(port: string) {
    this.videoServerPort = port
  }

  @mutation
  setTopic(payload: { cameraName: string; topic: string }) {
    this.cameras[payload.cameraName].topic = payload.topic
  }

  @mutation
  setType(payload: { cameraName: string; type: CameraType }) {
    this.cameras[payload.cameraName].type = payload.type
  }

  @mutation
  addCamera(payload: Camera) {
    const { type = CameraType.MJPEG, topic = '' } = payload.options
    this.cameras = { ...this.cameras, [payload.cameraName]: { type, topic } }
  }

  @mutation
  deleteCamera(payload: { cameraName: string }) {
    delete this.cameras[payload.cameraName]
    this.cameras = { ...this.cameras }
  }
}
