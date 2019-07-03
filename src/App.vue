<template>
  <div id="container">
    <tabs />
    <div id="view">
      <router-view />
      <status-bar class="status-bar" />
      <div class="right-sidebar">
        <e-stop />
      </div>
    </div>
    <audio/>
  </div>
</template>

<script lang="ts">
import 'reflect-metadata'
import { Vue, Component, Prop, Provide, Inject } from 'vue-property-decorator'
import Tabs from '@/components/ui/layout/Tabs.vue'
import StatusBar from '@/components/ui/layout/StatusBar/StatusBar.vue'
import GamepadManager from '@/utils/gamepad/GamepadManager'
import RosClient from '@/utils/ros/RosClient.ts'
import { TopicOptions } from '@/utils/ros/types'

import { rosModule, audioModule } from '@/store'
import EStop from '@/components/EStop.vue'

@Component({
  components: {
    Tabs,
    StatusBar,
    EStop,
  },
})

export default class App extends Vue {
  @Provide() gamepadManager = new GamepadManager()

  created() {
    //TODO init in rosModule
    RosClient.setListeners(
      rosModule.onConnect,
      rosModule.onDisconnect,
      () => {}
    )

    rosModule.connect()

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(function(stream) {
        const context = new AudioContext()
        const source = context.createMediaStreamSource(stream)
        const processor = context.createScriptProcessor(257, 1, 1)

        source.connect(processor)
        processor.connect(context.destination)

        const audioElement = document.querySelector('audio');
        const audioContext = new AudioContext();
        if(audioElement){
          const track = audioContext.createMediaElementSource(audioElement);

          processor.onaudioprocess = function(e) {
            // Do something with the data, i.e Convert this to WAV
            audioContext.decodeAudioData(e.inputBuffer.getChannelData(0))
            const n = e.inputBuffer.getChannelData(0).map(x => Math.round((x+1)/2*255))
            const n8 = new Uint8Array(n)
            RosClient.publish({
  name: '/audio/audio',
  messageType: 'audio_common_msgs/AudioData',
},n8)
            console.log(n8)
            //console.log(e.inputBuffer.getChannelData(0))
          }
        }

      })


  }
}
</script>

<style lang="scss">
$e-stop-width: 70px;

html {
  overflow-y: hidden !important;
}

body {
  display: grid;
  align-content: stretch;
}

#container {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
  overflow: auto;

  #view {
    overflow: auto;

    display: grid;
    grid-template-areas:
      'v e'
      'f e';
    grid-template-columns: auto $e-stop-width;
    grid-template-rows: auto 20px;

    &:first-child {
      grid-area: v;
    }
    .status-bar {
      grid-area: f;
    }
    .right-sidebar {
      grid-area: e;
    }
  }
}
</style>
