import type { Meta, StoryObj } from '@storybook/react'
import {
  Comment,
  CommentHeader,
  CommentAvatar,
  CommentTitle,
  CommentMeta,
  CommentBody,
  CommentList,
} from './Comment'
import { Grid } from '../Grid/Grid'
import { Subnav } from '../Subnav/Subnav'

const meta: Meta<typeof Comment> = {
  title: 'UIkit/Comment',
  component: Comment,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Comment>

export const Basic: Story = {
  render: () => (
    <Comment>
      <CommentHeader>
        <Grid gap="medium" className="uk-flex-middle">
          <div className="uk-width-auto">
            <CommentAvatar src="https://getuikit.com/docs/images/avatar.jpg" width="80" height="80" alt="Author" />
          </div>
          <div className="uk-width-expand">
            <CommentTitle><a className="uk-link-reset" href="#">Author</a></CommentTitle>
            <CommentMeta>
              <Subnav variant="divider">
                <li><a href="#">12 days ago</a></li>
                <li><a href="#">Reply</a></li>
              </Subnav>
            </CommentMeta>
          </div>
        </Grid>
      </CommentHeader>
      <CommentBody>
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
      </CommentBody>
    </Comment>
  ),
}

export const Primary: Story = {
  render: () => (
    <Comment primary>
      <CommentHeader>
        <Grid gap="medium" className="uk-flex-middle">
          <div className="uk-width-auto">
            <CommentAvatar src="https://getuikit.com/docs/images/avatar.jpg" width="80" height="80" alt="Author" />
          </div>
          <div className="uk-width-expand">
            <CommentTitle><a className="uk-link-reset" href="#">Author</a></CommentTitle>
            <CommentMeta>
              <Subnav variant="divider">
                <li><a href="#">12 days ago</a></li>
                <li><a href="#">Reply</a></li>
              </Subnav>
            </CommentMeta>
          </div>
        </Grid>
      </CommentHeader>
      <CommentBody>
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
      </CommentBody>
    </Comment>
  ),
}

export const List: Story = {
  render: () => (
    <CommentList>
      <li>
        <Comment>
          <CommentHeader>
            <Grid gap="medium" className="uk-flex-middle">
              <div className="uk-width-auto">
                <CommentAvatar src="https://getuikit.com/docs/images/avatar.jpg" width="80" height="80" alt="Author" />
              </div>
              <div className="uk-width-expand">
                <CommentTitle><a className="uk-link-reset" href="#">Author</a></CommentTitle>
                <CommentMeta><a className="uk-link-reset" href="#">12 days ago</a></CommentMeta>
              </div>
            </Grid>
          </CommentHeader>
          <CommentBody>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
          </CommentBody>
        </Comment>
        <ul>
          <li>
            <Comment primary>
              <CommentHeader>
                <Grid gap="medium" className="uk-flex-middle">
                  <div className="uk-width-auto">
                    <CommentAvatar src="https://getuikit.com/docs/images/avatar.jpg" width="80" height="80" alt="Author" />
                  </div>
                  <div className="uk-width-expand">
                    <CommentTitle><a className="uk-link-reset" href="#">Author</a></CommentTitle>
                    <CommentMeta><a className="uk-link-reset" href="#">12 days ago</a></CommentMeta>
                  </div>
                </Grid>
              </CommentHeader>
              <CommentBody>
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
              </CommentBody>
            </Comment>
          </li>
        </ul>
      </li>
    </CommentList>
  ),
}
