import React from 'react'
import { Flex } from '@metagg/mgg-uikit'
import Circle from '../Foundation/Circle'

const RenderCircles = () => (
  <Flex justifyContent="space-evenly">
    {['#4bdffe', '#ee89ff', '#95ff88'].map((clr) => (
      <Circle key={clr} color={clr} />
    ))}
  </Flex>
)

export default RenderCircles
