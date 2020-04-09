import { Machine, interpret, assign } from 'xstate'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TerminalContext {
  username: string
  password: string
}

interface TerminalStateSchema {
  states: {
    visible: {}
    hidden: {}
  }
}

type TerminalEvent =
  | { type: 'SHOW' }
  | { type: 'HIDE' }
  | { type: 'TOGGLE' }
  | { type: 'SET_USERNAME'; username: string }
  | { type: 'SET_PASSWORD'; password: string }

const setters = {
  SET_USERNAME: {
    actions: 'updateUsername',
  },
  SET_PASSWORD: {
    actions: 'updatePassword',
  },
}

export const terminalMachine = Machine<
  TerminalContext,
  TerminalStateSchema,
  TerminalEvent
>(
  {
    id: 'gamepad',
    initial: 'hidden',
    context: {
      username: '',
      password: '',
    },
    states: {
      visible: {
        on: {
          HIDE: 'hidden',
          TOGGLE: 'hidden',
          ...setters,
        },
      },
      hidden: {
        on: {
          SHOW: 'visible',
          TOGGLE: 'visible',
          ...setters,
        },
      },
    },
  },
  {
    actions: {
      updateUsername: assign({
        username: (_, event) => {
          if (event.type !== 'SET_USERNAME') throw new Error()
          else return event.username
        },
      }),
      updatePassword: assign({
        password: (_, event) => {
          if (event.type !== 'SET_PASSWORD') throw new Error()
          else return event.password
        },
      }),
    },
  }
)

export const terminalService = interpret(terminalMachine).start()
