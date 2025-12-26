import type { Meta, StoryObj } from '@storybook/react'
import { Pagination, PaginationItem, PaginationPrevious, PaginationNext } from './Pagination'

const meta: Meta<typeof Pagination> = {
  title: 'UIkit/Pagination',
  component: Pagination,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Pagination>

export const Basic: Story = {
  render: () => (
    <nav aria-label="Pagination">
      <Pagination>
        <PaginationItem><a href="#"><PaginationPrevious /></a></PaginationItem>
        <PaginationItem><a href="#">1</a></PaginationItem>
        <PaginationItem disabled><span>...</span></PaginationItem>
        <PaginationItem><a href="#">4</a></PaginationItem>
        <PaginationItem><a href="#">5</a></PaginationItem>
        <PaginationItem><a href="#">6</a></PaginationItem>
        <PaginationItem active><span aria-current="page">7</span></PaginationItem>
        <PaginationItem><a href="#">8</a></PaginationItem>
        <PaginationItem><a href="#">9</a></PaginationItem>
        <PaginationItem><a href="#">10</a></PaginationItem>
        <PaginationItem disabled><span>...</span></PaginationItem>
        <PaginationItem><a href="#">20</a></PaginationItem>
        <PaginationItem><a href="#"><PaginationNext /></a></PaginationItem>
      </Pagination>
    </nav>
  ),
}

export const Alignment: Story = {
  render: () => (
    <div>
      <nav aria-label="Pagination">
        <Pagination className="uk-flex-center">
          <PaginationItem><a href="#"><PaginationPrevious /></a></PaginationItem>
          <PaginationItem><a href="#">1</a></PaginationItem>
          <PaginationItem disabled><span>...</span></PaginationItem>
          <PaginationItem active><span aria-current="page">7</span></PaginationItem>
          <PaginationItem><a href="#">20</a></PaginationItem>
          <PaginationItem><a href="#"><PaginationNext /></a></PaginationItem>
        </Pagination>
      </nav>
      <nav aria-label="Pagination" className="uk-margin-top">
        <Pagination className="uk-flex-right">
          <PaginationItem><a href="#"><PaginationPrevious /></a></PaginationItem>
          <PaginationItem><a href="#">1</a></PaginationItem>
          <PaginationItem disabled><span>...</span></PaginationItem>
          <PaginationItem active><span aria-current="page">7</span></PaginationItem>
          <PaginationItem><a href="#">20</a></PaginationItem>
          <PaginationItem><a href="#"><PaginationNext /></a></PaginationItem>
        </Pagination>
      </nav>
    </div>
  ),
}

export const PreviousNextOnly: Story = {
  name: 'Previous and Next Only',
  render: () => (
    <nav aria-label="Pagination">
      <Pagination>
        <PaginationItem>
          <a href="#"><PaginationPrevious className="uk-margin-small-right" /> Previous</a>
        </PaginationItem>
        <PaginationItem className="uk-margin-auto-left">
          <a href="#">Next <PaginationNext className="uk-margin-small-left" /></a>
        </PaginationItem>
      </Pagination>
    </nav>
  ),
}
