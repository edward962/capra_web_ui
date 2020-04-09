import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TerminalState } from 'store/modules/terminal/@types'

export const initialState: TerminalState = {
  isVisible: false,
  username: '',
  password: '',
}

export const terminalSlice = createSlice({
  name: 'terminal',
  initialState,
  reducers: {
    toggleTerminal: state => {
      state.isVisible = !state.isVisible
    },
    setUsername: (state, { payload }: PayloadAction<string>) => {
      state.username = payload
    },
    setPassword: (state, { payload }: PayloadAction<string>) => {
      state.password = payload
    },
  },
})
