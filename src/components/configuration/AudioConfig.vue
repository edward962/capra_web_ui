<template>
  <b-section>
    <b-title>Audio</b-title>
    <hr />

    <b-field>
      <b-label>Mic</b-label>
      <b-control>
        <b-select is-small>
          <select v-model="InputDevice">
            <option
              v-for="(key, index) in inputdeviceList"
              :key="key.label || 'Micro' + index"
              :value="key.deviceId"
              :disabled="key.disabled"
              >{{ key.label || 'Micro' + index }}</option
            >
          </select>
        </b-select>
      </b-control>
    </b-field>
    <b-field>
      <b-label>Output Device</b-label>
      <b-control>
        <b-select is-small>
          <select v-model="OutputDevice">
            <option
              v-for="(key, index) in outputdeviceList"
              :key="key.label || 'Speaker' + index"
              :value="key.deviceId"
              :disabled="key.disabled"
              >{{ key.label || 'Speaker' + index }}</option
            >
          </select>
        </b-select>
      </b-control>
    </b-field>
  </b-section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { audioModule } from '@/store'
import { promises } from 'fs'

interface audioDevice {
  label: string
  deviceId: string
}

@Component
export default class AudioConfig extends Vue {
  temp = 1

  inputdeviceList = new Array<MediaDeviceInfo>()
  outputdeviceList = new Array<MediaDeviceInfo>()

  created() {
    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .enumerateDevices()
        .then(function(infos) {
          return infos.filter(deviceInfo => deviceInfo.kind === 'audioinput')
        })
        .then(infos => (this.inputdeviceList = infos))
        .then(infos => console.log(infos))
      navigator.mediaDevices
        .enumerateDevices()
        .then(function(infos) {
          return infos.filter(deviceInfo => deviceInfo.kind === 'audiooutput')
        })
        .then(infos => (this.outputdeviceList = infos))
    }
  }

  async audioInputDeviceForSelect() {
    if (navigator.mediaDevices) {
      const result = await navigator.mediaDevices.enumerateDevices()
      return result.filter(deviceInfo => deviceInfo.kind === 'audiooutput')
    }
    return new Array<MediaDeviceInfo>()
  }

  get InputDevice() {
    return audioModule.audioInputDeviceID
  }

  set InputDevice(value: string) {
    audioModule.setAudioInputDeviceID(value)
  }

  get OutputDevice() {
    return audioModule.audioOutputDeviceID
  }

  set OutputDevice(value: string) {
    audioModule.setAudioOutputDeviceID(value)
  }

  // get audioOutputDeviceForSelect() {
  //   if (navigator.mediaDevices) {

  //     return (await navigator.mediaDevices.enumerateDevices()).filter(deviceInfo => deviceInfo.kind === 'audiooutput' )
  //   }
  //   return new Array<MediaDeviceInfo>();

  // }
}
</script>

<style lang="scss" scoped></style>
