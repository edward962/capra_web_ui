import { GlobalState } from 'store/rootReducer'
import { initialState as feedState } from 'store/modules/feed/initialState'
import { initialState as terminalState } from 'store/modules/terminal/reducer'

export const defaultState: GlobalState = {
  feed: feedState,
  terminal: terminalState,
}
