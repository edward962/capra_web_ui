import React, { FC, useRef, useEffect, useLayoutEffect, useState } from 'react'
import { styled } from '~globalStyles/styled'
import { NoFeed } from '~components/Feed/Feeds/NoFeed'
import { IUrdfFeed } from '~store/modules/feed/@types'
import { rosClient } from '~utils/ros/rosClient'
import * as ROS3D from 'ros3d'
import { TFClient } from 'roslib'
import { useRefSize } from '~utils/hooks/useRefSize'
import _ from 'lodash'
import { rosService } from '~state/ros'
import { useService } from '@xstate/react'

interface Props {
  feed: IUrdfFeed
}

const Grid = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-items: center;
  background-color: black;
`

const StyledViewer = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`

function useUrdfViewerRef(): [
  ROS3D.Viewer | undefined,
  string,
  React.RefObject<HTMLDivElement>
] {
  const id = _.uniqueId('urdf-viewer-')
  const ref = useRef<HTMLDivElement>(null)
  const [width, height] = useRefSize(ref)
  const [viewer, setViewer] = useState<ROS3D.Viewer>()
  const [isInit, setIsInit] = useState(false)

  useEffect(() => {
    if (isInit) return

    const localViewer = new ROS3D.Viewer({
      divID: id,
      width: width - 1,
      height: height - 1,
      antialias: true,
    })
    setViewer(localViewer)
    setIsInit(true)
  }, [height, id, isInit, width])

  useLayoutEffect(() => {
    viewer?.resize(width - 1, height - 1)
  }, [width, height, viewer])

  return [viewer, id, ref]
}

const View: FC<Props> = () => {
  const [viewer, id, ref] = useUrdfViewerRef()

  const [state] = useService(rosService)
  const { IP, descriptionServerPort, baseLinkName } = state.context

  useEffect(() => {
    if (!viewer) return

    const ros = rosClient.ros

    viewer.addObject(new ROS3D.Grid())

    const tfClient = new TFClient({
      ros: ros,
      angularThres: 0.01,
      transThres: 0.01,
      rate: 10.0,
      fixedFrame: baseLinkName,
    })

    new ROS3D.UrdfClient({
      ros: ros,
      tfClient: tfClient,
      path: `http://${IP}:${descriptionServerPort}`,
      rootObject: viewer.scene,
    })
  }, [IP, baseLinkName, descriptionServerPort, viewer])

  return <StyledViewer id={id} ref={ref} />
}

export const UrdfFeed: FC<Props> = ({ feed }) => {
  const [state] = useService(rosService)
  return (
    <Grid>
      {state.matches('connected') ? (
        <View feed={feed} />
      ) : (
        <NoFeed text="not connected" />
      )}
    </Grid>
  )
}
