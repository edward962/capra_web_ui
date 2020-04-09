import React from 'react'
import { TerminalWrapper } from 'components/Terminal/TerminalWrapper'
import { StyledOverlay } from 'components/Terminal/Terminal.styles'
import { useService } from '@xstate/react'
import { terminalService } from 'state/terminal'

export const TerminalOverlay = () => {
  const [state] = useService(terminalService)
  return (
    <StyledOverlay hidden={state.matches('hidden')}>
      <TerminalWrapper hidden={state.matches('hidden')} />
    </StyledOverlay>
  )
}
