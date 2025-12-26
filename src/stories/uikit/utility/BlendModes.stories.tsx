import type { Meta, StoryObj } from '@storybook/react'
import { Grid } from '../../../components/uikit/Grid/Grid'

const meta: Meta = {
  title: 'UIkit/Utility/Blend Modes',
  parameters: { controls: { hideNoControlsWarning: true } },
}
export default meta
type Story = StoryObj

const blendItem = (cls: string, label: string) => (
  <div className="uk-inline uk-background-primary">
    <img
      className={cls}
      src="https://getuikit.com/docs/images/dark.jpg"
      width={400}
      height={266}
      alt={label}
    />
    <div className="uk-position-center uk-light uk-text-center">
      <p className="uk-h5 uk-margin-remove">{label}</p>
    </div>
  </div>
)

export const CommonBlendModes: Story = {
  name: 'Blend modes',
  render: () => (
    <div className="uk-padding">
      <Grid className="uk-child-width-1-2 uk-child-width-1-3@m" gap="small">
        <div>{blendItem('uk-blend-multiply', 'Multiply')}</div>
        <div>{blendItem('uk-blend-screen', 'Screen')}</div>
        <div>{blendItem('uk-blend-overlay', 'Overlay')}</div>
        <div>{blendItem('uk-blend-darken', 'Darken')}</div>
        <div>{blendItem('uk-blend-lighten', 'Lighten')}</div>
        <div>{blendItem('uk-blend-color-dodge', 'Color Dodge')}</div>
        <div>{blendItem('uk-blend-color-burn', 'Color Burn')}</div>
        <div>{blendItem('uk-blend-hard-light', 'Hard Light')}</div>
        <div>{blendItem('uk-blend-soft-light', 'Soft Light')}</div>
        <div>{blendItem('uk-blend-difference', 'Difference')}</div>
        <div>{blendItem('uk-blend-exclusion', 'Exclusion')}</div>
        <div>{blendItem('uk-blend-hue', 'Hue')}</div>
        <div>{blendItem('uk-blend-saturation', 'Saturation')}</div>
        <div>{blendItem('uk-blend-color', 'Color')}</div>
        <div>{blendItem('uk-blend-luminosity', 'Luminosity')}</div>
      </Grid>
    </div>
  ),
}