import { VuexModule, Module, mutation } from 'vuex-class-component'

@Module({ namespacedPath: 'gamepad/' })
export default class GamepadModule extends VuexModule {
  isArmControlled = false
  spaceMouseIndex = 0
  currentGamepadIndex = 0

  @mutation
  toggleIsArmControlled() {
    this.isArmControlled = !this.isArmControlled
  }

  @mutation
  setIsArmControlled(value: boolean) {
    this.isArmControlled = value
  }

  @mutation
  setSpaceMouseIndex(value: number) {
    this.spaceMouseIndex = value
  }

  @mutation
  setCurrentGamepadIndex(value: number) {
    this.currentGamepadIndex = value
  }
}
