import { ipcMain } from 'electron'
import { channels, TERMINNAL_STARTED } from './shared/constants'
import { Client } from 'ssh2'
import { getMainWindow } from './main'

export const initTerminalClient = () => {
  ipcMain.on(channels.TERMINAL_MAIN, (event, data, opts) => {
    if (data === TERMINNAL_STARTED) {
      ipcMain.removeAllListeners(channels.TERMINAL_MAIN)
      startTerminalClient(opts)
    }
  })
}

const startTerminalClient = (opts: {
  host: string
  port: number
  username: string
  password: string
}) => {
  const client = new Client()
  client
    .on('ready', () => {
      client.shell((err, stream) => {
        if (err) console.error('ERROR: Failed to start a shell\n', err)
        if (stream === undefined) {
          console.error('ERROR: stream is undefined\n', err)
          return
        }

        ipcMain.on(channels.TERMINAL_MAIN, (_, data) => {
          if (data === TERMINNAL_STARTED) return
          stream.write(data)
        })

        stream
          .on('close', () => client.end())
          .on('data', (data: unknown) =>
            getMainWindow()?.webContents.send(channels.TERMINAL_RENDERER, data)
          )
      })
    })
    .on('error', (err) => console.error('ERROR: Failed to connec\n', err))
    .connect(opts)
}
