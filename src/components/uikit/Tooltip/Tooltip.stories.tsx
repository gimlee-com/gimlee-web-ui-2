import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../Button/Button'
import { useUIKit } from '../../../hooks/useUIkit'
import UIkit from 'uikit'

const meta: Meta = {
  title: 'UIkit/Tooltip',
  tags: ['autodocs'],
}

export default meta

export const Declarative = {
  render: () => (
    <div className="uk-padding">
      <Button uk-tooltip="title: Hello from a declarative tooltip!; pos: top-center">
        Hover Me
      </Button>
    </div>
  ),
  name: '1. Declarative Attribute',
}

const ProgrammaticTooltipStory = () => {
    const { ref: tooltipRef, instance: tooltipInstance } = useUIKit<
        UIkit.UIkitTooltipElement,
        HTMLButtonElement
    >('tooltip', {
        title: 'Programmatically controlled!',
        pos: 'right',
    // We can pass any UIkit tooltip option here
    delay: 300,
  })

  const handleShow = () => tooltipInstance?.show()
  const handleHide = () => tooltipInstance?.hide()

  return (
    <div className="uk-padding">
      <p>This button uses our new `useUIKit` hook.</p>
      <Button ref={tooltipRef}>Hover or Click Buttons</Button>

      <div className="uk-margin-top">
        <Button onClick={handleShow} className="uk-margin-small-right">
          Show Tooltip
        </Button>
        <Button onClick={handleHide} variant="danger">
          Hide Tooltip
        </Button>
      </div>
    </div>
  )
}

export const Programmatic: StoryObj = {
  render: () => <ProgrammaticTooltipStory />,
  name: '2. Programmatic with useUIKit Hook',
}