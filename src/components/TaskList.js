import React from 'react'
import PropTypes from 'prop-types'
import Task from './Task'
import { useDispatch, useSelector } from 'react-redux'
import { pinTask, archiveTask } from '../lib/redux'
import { createSelector } from '@reduxjs/toolkit'

const LoadingRow = () => (
  <div className="loading-item">
    <span className="glow-checkbox" />
    <span className="glow-text">
      <span>Loading</span> <span>cool</span> <span>state</span>
    </span>
  </div>
)

export const PureTaskList = ({ loading, tasks, onPinTask, onArchiveTask }) => {
  const events = {
    onPinTask,
    onArchiveTask,
  }

  if (loading) {
    return (
      <div className="list-items">
        <LoadingRow />
        <LoadingRow />
        <LoadingRow />
        <LoadingRow />
        <LoadingRow />
        <LoadingRow />
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="list-items">
        <div className="wrapper-message">
          <span className="icon-check" />
          <div className="title-message">You have no tasks</div>
          <div className="subtitle-message">Sit back and relax</div>
        </div>
      </div>
    )
  }

  const tasksInOrder = [
    ...tasks.filter((t) => t.state === 'TASK_PINNED'),
    ...tasks.filter((t) => t.state !== 'TASK_PINNED'),
  ]

  return (
    <div className="list-items">
      {tasksInOrder.map((task) => (
        <Task key={task.id} task={task} {...events} />
      ))}
    </div>
  )
}

const filteredTasks = createSelector(
  (state) => state.tasks,
  (tasks) =>
    tasks.filter((t) => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED')
)

const TaskListContainer = () => {
  const dispatch = useDispatch()
  const tasks = useSelector(filteredTasks)

  return (
    <PureTaskList
      tasks={tasks}
      onArchiveTask={(id) => dispatch(archiveTask(id))}
      onPinTask={(id) => dispatch(pinTask(id))}
    />
  )
}

PureTaskList.propTypes = {
  /** Checks if it's in loading state */
  loading: PropTypes.bool,
  /** The list of tasks */
  tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
  /** Event to change the task to pinned */
  onPinTask: PropTypes.func,
  /** Event to change the task to archived */
  onArchiveTask: PropTypes.func,
}
PureTaskList.defaultProps = {
  loading: false,
}

export default TaskListContainer
