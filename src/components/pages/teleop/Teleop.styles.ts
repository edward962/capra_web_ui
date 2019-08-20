import styled from 'vue-styled-components'

export const TeleopGrid = styled.div`
  height: 100%;
  display: grid;
  align-content: stretch;
  grid-template-rows: 70% 30%;
`

export const TopGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  > div {
    box-shadow: inset 0 0 0 0.5px #000000;
  }
`

export const BottomGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  > div {
    box-shadow: inset 0 0 0 0.5px #000000;
  }
`
