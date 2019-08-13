import { createGlobalStyle } from 'styled-components'
import { Theme, styled } from 'globalStyles/styled'

/*
    Important note regarding tests :

    No test should include a render of the <GlobalStyles />.
    As of June 2019 this is not supported and will fail every time.
    Normal styled components should be fine.

*/

export const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  html { height: 100%; }

  body {
    background: ${props => props.theme.colors.background};
    min-height: 100%;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  #root {
    height: 100vh;
  }
`
