import React from 'react'
import { useSelector } from 'utils/hooks/typedUseSelector'
import { TerminalWrapper } from 'components/Terminal/TerminalWrapper'
import { StyledOverlay } from 'components/Terminal/Terminal.styles'

export const TerminalOverlay = () => {
  const isVisible = useSelector(state => state.terminal.isVisible)
  console.log('isVisible', isVisible)
  return (
    <StyledOverlay hidden={!isVisible}>
      <TerminalWrapper hidden={!isVisible} />
    </StyledOverlay>
  )
}
