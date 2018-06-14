import React from 'react';

const TodoItem = (props) => {
  const { item, index } = props;
  const { onRemove, onToggleIsDone } = props;

  return(<div style={{paddingTop: 8, paddingBottom: 8}}>
      <div style={{
        wordWrap: 'break-word',
        display: 'inline-block',
        width: 165,
        textDecoration: item.isDone ? 'line-through' : '' }}>
        {item.label}
      </div>
      <div style={{display: 'inline-block'}}>
        <button onClick={onRemove(item)}>X</button>
        <button onClick={onToggleIsDone(item)}>
          {item.isDone ? 'Undone' : 'Done'}
        </button>
      </div>
  </div>);
};

export default TodoItem;
