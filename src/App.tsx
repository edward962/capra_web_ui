import { rosModule } from '@/store'
import { rosClient } from '@/utils/ros/rosClient'
import { defaultTheme } from '@/globalStyles/themes/defaultTheme'
import Layout from '@/components/Layout'
import { ThemeProvider } from 'vue-styled-components'
import { onCreated } from 'vue-function-api'
import Vue from 'vue'

const App = Vue.extend({
  name: 'App',
  setup() {
    onCreated(() => {
      //TODO init in rosModule
      rosClient.setListeners(
        rosModule.onConnect,
        rosModule.onDisconnect,
        () => {}
      )

      rosModule.connect()
    })
    return {}
  },
  render() {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Layout />
      </ThemeProvider>
    )
  },
})

export default App
