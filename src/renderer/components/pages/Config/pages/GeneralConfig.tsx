import React, { FC, ChangeEvent } from 'react'
import { LabeledInput } from '~components/common/LabeledInput'
import { Button } from '~components/common/Button'
import { SectionTitle } from '~components/pages/Config/styles'
import { useService } from '@xstate/react'
import { rosService } from '~state/ros'
import { useDispatch } from 'react-redux'
import { terminalSlice } from 'store/modules/terminal/reducer'
import { useSelector } from 'utils/hooks/typedUseSelector'

const ConnectionSection = () => {
  const [state, send] = useService(rosService)
  const { IP, port } = state.context

  const updateIp = (e: ChangeEvent<HTMLInputElement>): void => {
    send('SET_IP', { IP: e.target.value })
  }

  const updatePort = (e: ChangeEvent<HTMLInputElement>): void => {
    send('SET_PORT', { port: e.target.value })
  }

  const connect = () => {
    send('CONNECT')
  }

  return (
    <>
      <SectionTitle>Connection</SectionTitle>
      <LabeledInput label="IP address" value={IP} onChange={updateIp} />
      <LabeledInput
        label="rosbrige_server port"
        value={port}
        onChange={updatePort}
      />
      <Button onClick={connect} disabled={state.matches('connecting')}>
        Connect
      </Button>
    </>
  )
}

const UrdfDescriptionSection = () => {
  const [state, send] = useService(rosService)
  const { descriptionServerPort, baseLinkName } = state.context

  const updateDescriptionPort = (e: ChangeEvent<HTMLInputElement>): void => {
    send('SET_DESCRIPTION_SERVER_PORT', { port: e.target.value })
  }

  const updateBaseLinkName = (e: ChangeEvent<HTMLInputElement>): void => {
    send('SET_BASE_LINK_NAME', { name: e.target.value })
  }

  return (
    <>
      <SectionTitle>Urdf Description</SectionTitle>

      <LabeledInput
        label="description server port"
        value={descriptionServerPort}
        onChange={updateDescriptionPort}
      />

      <LabeledInput
        label="base_link name"
        value={baseLinkName}
        onChange={updateBaseLinkName}
      />
    </>
  )
}

const TerminalConnection = () => {
  const dispatch = useDispatch()

  const username = useSelector((state) => state.terminal.username)
  const password = useSelector((state) => state.terminal.password)

  const updateUsername = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(terminalSlice.actions.setUsername(e.target.value))
  }

  const updatePassword = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(terminalSlice.actions.setPassword(e.target.value))
  }

  return (
    <>
      <SectionTitle>Terminal Connection Info</SectionTitle>
      <LabeledInput
        label="Username"
        value={username}
        onChange={updateUsername}
      />
      <LabeledInput
        label="Password"
        value={password}
        type="password"
        onChange={updatePassword}
      />
    </>
  )
}

const DetectedGamepad = () => {
  const gamepads = [...navigator.getGamepads()]
  return (
    <>
      <SectionTitle>Gamepads Detected</SectionTitle>
      <ul>{gamepads.map((g) => g && <li key={g?.id}>{g?.id}</li>)}</ul>
    </>
  )
}

export const GeneralConfig: FC = () => (
  <>
    <ConnectionSection />
    <TerminalConnection />
    <UrdfDescriptionSection />
    <DetectedGamepad />
  </>
)
