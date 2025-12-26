import type { Meta, StoryObj } from '@storybook/react'
import { useState, useEffect, useRef } from 'react'
import { Progress } from './Progress'
import { Button } from '../Button/Button'

const meta: Meta<typeof Progress> = {
  title: 'UIkit/Progress',
  component: Progress,
  argTypes: {
    value: { control: 'number' },
    max: { control: 'number' },
  },
  args: {
    value: 50,
    max: 100,
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Progress>

export const Default: Story = {}

export const Indeterminate: Story = {
  args: {
    value: undefined,
  },
}

// A story component to demonstrate the progress bar animation
const AnimatedProgressStory = () => {
  const [value, setValue] = useState(0)
  const intervalRef = useRef<number | null>(null)

  const startAnimation = () => {
    setValue(0) // Reset on start
    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = window.setInterval(() => {
      setValue((prevValue) => {
        if (prevValue >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          return 100
        }
        return prevValue + 10
      })
    }, 500)
  }

  // Clean up the interval on unmount
  useEffect(() => {
    const intervalId = intervalRef.current
    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [])

  return (
    <div>
      <Progress value={value} max={100} />
      <Button onClick={startAnimation} className="uk-margin-top">
        Animate
      </Button>
    </div>
  )
}

export const Animated: Story = {
  render: () => <AnimatedProgressStory />,
  args: {
    // Value is controlled by the story's state, so we don't set it here
    value: undefined,
  },
}