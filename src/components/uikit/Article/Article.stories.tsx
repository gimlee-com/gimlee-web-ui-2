import type { Meta, StoryObj } from '@storybook/react'
import { Article, ArticleTitle, ArticleMeta } from './Article'
import { Button } from '../Button/Button'
import { Grid } from '../Grid/Grid'

const meta: Meta<typeof Article> = {
  title: 'UIkit/Article',
  component: Article,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Article>

export const Basic: Story = {
  render: () => (
    <Article>
      <ArticleTitle>
        <a className="uk-link-reset" href="#">
          Article Heading
        </a>
      </ArticleTitle>

      <ArticleMeta>
        Written by <a href="#">Super User</a> on 12 April 2012. Posted in{' '}
        <a href="#">Blog</a>
      </ArticleMeta>

      <p className="uk-text-lead">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
      </p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>

      <Grid gap="small" className="uk-child-width-auto">
        <div>
          <Button variant="text">Read more</Button>
        </div>
        <div>
          <Button variant="text">5 Comments</Button>
        </div>
      </Grid>
    </Article>
  ),
}
