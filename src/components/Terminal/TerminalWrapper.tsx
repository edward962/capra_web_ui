import React, { useRef, useEffect, FC, useState } from 'react'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'
import { channels, TERMINNAL_STARTED } from 'electron/shared/constants'
import { ipcRenderer } from 'electron'
import { StyledTerm } from 'components/Terminal/Terminal.styles'
import { useSelector } from 'utils/hooks/typedUseSelector'
import { useService } from '@xstate/react'
import { rosService } from 'state/ros'

interface Props {
  hidden: boolean
}

const term = new Terminal({
  allowTransparency: true,
  theme: { background: 'rgba(0, 0, 0, 0.6)' },
})
const fitAddon = new FitAddon()
term.loadAddon(fitAddon)

export const TerminalWrapper: FC<Props> = ({ hidden }) => {
  const terminalRef = useRef<HTMLDivElement>(null)
  const [state] = useService(rosService)
  const [isInit, setIsInit] = useState(false)
  const username = useSelector((state) => state.terminal.username)
  const password = useSelector((state) => state.terminal.password)
  const IP = state.context.IP

  useEffect(() => {
    if (terminalRef?.current && !isInit && !hidden) {
      term.open(terminalRef.current)
      fitAddon.fit()

      ipcRenderer.send(channels.TERMINAL_MAIN, TERMINNAL_STARTED, {
        host: IP,
        port: 22,
        username: username,
        password: password,
      })

      ipcRenderer.on(channels.TERMINAL_RENDERER, (_, data) => {
        term.write(data)
      })

      term.onKey(({ key }) => {
        const ESC = 27
        if (key.charCodeAt(0) === ESC) {
          term.blur()
          // TODO should ESC close the overlay?
        }

        ipcRenderer.send(channels.TERMINAL_MAIN, key)
      })

      setIsInit(true)
    }
  }, [IP, hidden, isInit, password, terminalRef, username])

  useEffect(() => {
    if (isInit) term.focus()
  }, [hidden, isInit])

  return <StyledTerm ref={terminalRef} hidden={hidden} />
}
