import type { Meta, StoryObj } from '@storybook/react'
import { Icon } from './Icon'
import { useUIKit } from '../../../hooks/useUIkit'
import UIkit from 'uikit'
import { Button } from '../Button/Button'

const meta: Meta<typeof Icon> = {
  title: 'UIkit/Icon',
  component: Icon,
  argTypes: {
    icon: { control: 'text' },
    ratio: { control: 'number', min: 1, step: 0.5 },
    variant: {
      control: 'select',
      options: ['link', 'button', 'overlay', undefined],
    },
    href: { control: 'text' },
  },
  args: {
    icon: 'heart',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Icon>

export const Default: Story = {}

export const WithRatio: Story = {
  args: {
    ratio: 2,
  },
}

export const AsButton: Story = {
  args: {
    variant: 'button',
    href: '#',
  },
}

// This list is sourced from the UIkit documentation.
const iconList = [
  'home', 'sign-in', 'sign-out', 'user', 'users', 'lock', 'unlock',
  'settings', 'cog', 'nut', 'comment', 'commenting', 'comments',
  'hashtag', 'tag', 'cart', 'bag', 'credit-card', 'mail', 'receiver',
  'print', 'search', 'location', 'bookmark', 'code', 'paint-bucket',
  'camera', 'video-camera', 'bell', 'microphone', 'bolt', 'star',
  'heart', 'happy', 'lifesaver', 'rss', 'social', 'git-branch',
  'git-fork', 'world', 'calendar', 'clock', 'history', 'future',
  'crosshairs', 'pencil', 'trash', 'move', 'link', 'link-external',
  'eye', 'eye-slash', 'question', 'info', 'warning', 'image',
  'thumbnails', 'table', 'list', 'menu', 'grid', 'more', 'more-vertical',
  'plus', 'plus-circle', 'minus', 'minus-circle', 'close', 'check',
  'ban', 'refresh', 'play', 'play-circle', 'tv', 'desktop', 'laptop',
  'tablet', 'phone', 'tablet-landscape', 'phone-landscape', 'file',
  'file-text', 'file-pdf', 'copy', 'file-edit', 'folder', 'album',
  'push', 'pull', 'server', 'database', 'cloud-upload', 'cloud-download',
  'download', 'upload', 'reply', 'forward', 'expand', 'shrink',
  'arrow-up', 'arrow-down', 'arrow-left', 'arrow-right', 'chevron-up',
  'chevron-down', 'chevron-left', 'chevron-right', 'chevron-double-left',
  'chevron-double-right', 'triangle-up', 'triangle-down', 'triangle-left',
  'triangle-right', 'bold', 'italic', 'strikethrough', 'quote-right',
  '500px', 'android', 'apple', 'behance', 'discord', 'dribbble', 'etsy',
  'facebook', 'flickr', 'foursquare', 'github', 'github-alt', 'gitter',
  'google', 'instagram', 'joomla', 'linkedin', 'microsoft', 'pinterest',
  'reddit', 'soundcloud', 'telegram', 'tumblr', 'twitch', 'uikit', 'vimeo',
  'whatsapp', 'wordpress', 'xing', 'yelp', 'yootheme', 'youtube'
];

const IconLibrary = () => (
  <div
    className="uk-grid uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-5@m"
    uk-grid=""
  >
    {iconList.map((icon) => (
      <div key={icon} className="uk-text-center uk-margin">
        <Icon icon={icon} ratio={2} />
        <div className="uk-text-meta uk-text-truncate uk-margin-xsmall-top">{icon}</div>
      </div>
    ))}
  </div>
);

export const Library: Story = {
  render: () => <IconLibrary />,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
}

const IconWithTooltipStory = () => {
  const { ref: iconRef, instance: tooltipInstance } = useUIKit<
    UIkit.UIkitTooltipElement,
    HTMLAnchorElement
  >('tooltip', {
    title: 'Hello from a hook!',
    pos: 'top-center',
  })

  const handleShow = () => tooltipInstance?.show()
  const handleHide = () => tooltipInstance?.hide()

  return (
    <div className="uk-padding">
      <p>
        This icon has a tooltip attached programmatically using the `useUIKit`
        hook.
      </p>
      <Icon
        ref={iconRef}
        icon="heart"
        ratio={2.5}
        className="uk-margin-right"
      />
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

export const WithProgrammaticTooltip: Story = {
  render: () => <IconWithTooltipStory />,
}