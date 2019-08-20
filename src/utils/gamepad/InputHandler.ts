import CustomGamepad from './CustomGamepad'
import {
  mapGamepadToJoy,
  mapGamepadToTwist,
  cmdVelTopic,
  joyTopic,
  spaceMouseTopic,
  mapSpaceMouseToTwist,
} from './RosGamepadUtils'
import { InputHandler, Dpad, GamepadBtn } from '@/utils/gamepad/@types'
import { isSpaceMouse } from '@/utils/gamepad/GamepadUtils'
import { rosClient } from '@/utils/ros/rosClient'
import { gamepadModule } from '@/store'

export class DefaultInputHandler implements InputHandler {
  handleGamepadInput(gamepad: CustomGamepad): void {
    if (isSpaceMouse(gamepad)) {
      this.handleSpaceMouse(gamepad)
    } else {
      this.handleGamepad(gamepad)
    }
  }

  private handleSpaceMouse(spaceMouse: CustomGamepad): void {
    rosClient.publish(spaceMouseTopic, mapSpaceMouseToTwist(spaceMouse.gamepad))
  }

  private handleGamepad(gamepad: CustomGamepad): void {
    if (gamepad.getTogglePressed(Dpad.Right)) {
      gamepadModule.toggleIsArmControlled()
      return
    }

    if (gamepadModule.isArmControlled) {
      this.handleArmControl(gamepad)
    } else {
      this.handleRobotControl(gamepad)
    }

    if (gamepad.getTogglePressed(Dpad.Left)) {
      rosClient.callService({ name: '/headlights', serviceType: '' }, '')
    }
  }

  private handleRobotControl(gamepad: CustomGamepad) {
    if (gamepad.getButtonPressed(GamepadBtn.A)) {
      rosClient.publish(cmdVelTopic, mapGamepadToTwist(gamepad))
    }
  }

  private handleArmControl(gamepad: CustomGamepad): void {
    rosClient.publish(joyTopic, mapGamepadToJoy(gamepad.gamepad))
  }
}
