import Vue, { CreateElement } from 'vue'
import Router, { RouteConfig } from 'vue-router'
import { LoadingComponent, ErrorComponent } from '@/components/async'
import { AsyncComponentFactory, RenderContext } from 'vue/types/options'

const ifProduction = (a: any, b: any) =>
  process.env.NODE_ENV === 'production' ? a : b

const routes: RouteConfig[] = [
  {
    path: '/',
    redirect: 'teleop',
  },
  {
    path: '/teleop',
    name: 'teleop',
    component: () => asyncComponent('pages/teleop/Teleop.tsx'),
  },
  {
    path: '/victim',
    component: () => asyncComponent('tabs/Victim.vue'),
  },
  {
    path: '/configuration',
    component: () => asyncComponent('pages/config/GlobalConfig.vue'),
    children: <RouteConfig[]>[
      {
        path: 'ros',
        component: () => asyncComponent('pages/config/RosConfig.vue'),
      },
      {
        path: 'teleop',
        component: () => asyncComponent('pages/config/TeleopConfig.vue'),
      },
      {
        path: 'camera',
        component: () => asyncComponent('pages/config/camera/CameraConfig.vue'),
      },
      {
        path: 'gamepad',
        component: () => asyncComponent('pages/config/GamepadConfig'),
      },
      {
        path: 'victim',
        component: () => asyncComponent('pages/config/VictimConfig'),
      },
    ],
  },
]

/**
 * Dynamically loads a component and shows a loading bar while loading.
 *
 * @param componentPath relative to @/components/ and adds .vue at the end
 *
 * @remarks
 * Components loaded with this strategy DO NOT have access
 * to in-component guards, such as beforeRouteEnter,
 * beforeRouteUpdate, and beforeRouteLeave. You must either use
 * route-level guards instead or lazy-load the component directly
 */
function asyncComponent(componentPath: string) {
  const asyncComponentFactory: AsyncComponentFactory = () => ({
    component: import(
      /* webpackChunkName: "[request]" */
      `@/components/${componentPath}`
    ) as any,
    loading: LoadingComponent,
    error: ErrorComponent,
    delay: 0,
    timeout: 5000,
  })

  return Promise.resolve({
    functional: true,
    render: (h: CreateElement, { data, children }: RenderContext) =>
      h(asyncComponentFactory, data, children),
  })
}

Vue.use(Router)
export default new Router({ base: ifProduction('/capra_web_ui', '/'), routes })
