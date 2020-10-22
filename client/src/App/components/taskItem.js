import React from 'react'
import { todoItem } from '../css/visuals'

export default function TodoItem (props) {
  const completedStyle = {
    fontFamily: 'Orbitron',
    fontStyle: 'italic',
    color: '#cdcdcd',
    textDecoration: 'line-through'
  }

  const uncompletedStyle = {
    fontFamily: 'Orbitron'
  }

  return (
    <div className={todoItem.todoItem}>
      <input
        type='checkbox'
        onChange={() => props.handleChange(props.item.id)}
        checked={props.item.completed}
      />
      <label style={props.item.completed ? completedStyle : uncompletedStyle}>{props.item.title}</label>
      <span
        onClick={() => props.handleClick(props.item.id)}
      > {'\u00D7'}
      </span>
    </div>
  )
}
