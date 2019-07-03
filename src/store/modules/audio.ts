import { VuexModule, mutation, Module, action } from 'vuex-class-component'

@Module({ namespacedPath: 'audio/' })
export default class AudioModule extends VuexModule {
  audioInputDevice: string = 'default'
  audioOutputDevice: string = ''

  get audioInputDeviceID() {
    return this.audioInputDevice
  }

  get audioOutputDeviceID() {
    return this.audioOutputDevice
  }

  @mutation
  setAudioInputDeviceID(deviceId: string) {
    this.audioInputDevice = deviceId
  }

  @mutation
  setAudioOutputDeviceID(deviceId: string) {
    this.audioOutputDevice = deviceId
  }
}
