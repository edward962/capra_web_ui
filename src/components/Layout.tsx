import {
  StyledLayoutWrapper,
  StyledLayout,
  StyledContent,
} from '@/components/Layout.styles'

import EStop from '@/components/EStop.vue'
import StatusBar from '@/components/ui/layout/StatusBar/StatusBar.vue'
import Tabs from '@/components/ui/layout/Tabs.vue'
import Vue, { VNode } from 'vue'

const Layout = Vue.extend({
  name: 'Layout',
  render(): VNode {
    return (
      <StyledLayoutWrapper>
        <StyledLayout>
          <Tabs />
          <StyledContent>
            <router-view />
          </StyledContent>
          <StatusBar />
        </StyledLayout>
        <EStop />
      </StyledLayoutWrapper>
    )
  },
})

export default Layout
