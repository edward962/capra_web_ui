import React, { FC } from 'react'
import { Feed } from 'components/Feed/Feed'
import { styled } from 'globalStyles/styled'
import { controlService } from 'state/control'

const StyledPIP = styled.div`
  position: absolute;
  width: 380px;
  height: 200px;
  z-index: 2;
  left: 15px;
  bottom: 35px;
  /* top: 0px; */
  /* margin-bottom: 150px; */
`

export const Teleop: FC = () => {
  controlService.send({ type: 'CONTROL_FLIPPER' })
  return (
    <>
      <Feed id="teleop_main" defaultFeed="camera_3d_rgb" />
      <StyledPIP>
        <Feed id="teleop_main_2" defaultFeed="camera_3d_rgb" />
      </StyledPIP>
    </>
  )
}
