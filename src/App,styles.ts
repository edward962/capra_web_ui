import { injectGlobal } from 'vue-styled-components'

injectGlobal`
  body {
      background: ${(props: any) => props.theme.colors.background};
      color: white;
      height: 100vh;
  }

  * {
      box-sizing: border-box;
  }
`
