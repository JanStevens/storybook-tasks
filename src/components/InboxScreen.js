import React from 'react'
import TaskList from './TaskList'
import { useSelector } from 'react-redux'

export const PureInboxScreen = ({ error }) => {
  if (error) {
    return (
      <div className="page lists-show">
        <div className="wrapper-message">
          <span className="icon-face-sad" />
          <div className="title-message">Oh no!</div>
          <div className="subtitle-message">Something went wrong</div>
        </div>
      </div>
    )
  }

  return (
    <div className="page lists-show">
      <nav>
        <h1 className="title-page">
          <span className="title-wrapper">Taskbox</span>
        </h1>
      </nav>
      <TaskList />
    </div>
  )
}

const InboxScreen = () => {
  const error = useSelector((state) => state.error)

  return <PureInboxScreen error={error} />
}

export default InboxScreen
