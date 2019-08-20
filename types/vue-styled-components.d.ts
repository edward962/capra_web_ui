type AnyIfEmpty<T extends object> = keyof T extends never ? any : T

declare module 'vue-styled-components' {
  export const ThemeProvider: any
  export const injectGlobal: any
  type StyledInterface = any
  const styled: StyledInterface
  export default styled
}
