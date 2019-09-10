import { rosModule } from '@/store'
import { rosClient } from '@/utils/ros/rosClient'
import { defaultTheme } from '@/globalStyles/themes/defaultTheme'
import Layout from '@/components/Layout'
import { ThemeProvider } from 'vue-styled-components'
import Vue from 'vue'
import { onMounted } from '@vue/composition-api'

const App = Vue.extend({
  name: 'App',
  setup() {
    onMounted(() => {
      //TODO init in rosModule
      rosClient.setListeners({
        onConnection: rosModule.onConnect,
        onClose: rosModule.onDisconnect,
        onError: () => {},
      })

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
