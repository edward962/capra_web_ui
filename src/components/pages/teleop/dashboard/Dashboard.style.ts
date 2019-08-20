import styled from 'vue-styled-components'

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-rows: auto 15px;
  grid-template-columns: auto 15px;
  grid-template-areas:
    'a b'
    'c b';
`

export const DataArea = styled.div`
  grid-area: a;
  font-family: monospace;
  line-height: 1em;
`

export const SpeedProgressArea = styled.div`
  grid-area: b;
  display: grid;
  grid-template-rows: 1fr 1fr;
`

export const DirectionProgressArea = styled.div`
  grid-area: a;
  font-family: monospace;
  line-height: 1em;
`
