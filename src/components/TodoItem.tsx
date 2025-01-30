import { FC, useState, type ChangeEvent } from "react";
import type { TodoType } from "../App";
import c from "./TodoItem.module.css";

type Props = {
  todo: TodoType;
  onToggleTodo: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onUpdateTask: (id: string, text: string) => void;
};

const TodoItem: FC<Props> = (props) => {
  const [editing, setEditing] = useState(false);
  const [editingText, setEditingText] = useState(props.todo.text.trim());

  const saveChanges = (text: string) => {
    if (!text.trim()) {
      setEditingText(props.todo.text.trim());
      setEditing(false);
      alert(`You can't save an empty task`);
      return;
    }
    setEditing(false);
    props.onUpdateTask(props.todo.id, text);
  };

  return (
    <>
      {editing ? (
        <div className={c.todoItem} id={props.todo.id}>
          <input
            autoFocus
            value={editingText}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEditingText(e.target.value)
            }
            onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
              saveChanges(e.target.value)
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Escape") {
                setEditing(false);
                setEditingText(props.todo.text.trim());
              } else if (e.key === "Enter") {
                saveChanges(e.currentTarget.value);
              }
            }}
          />
        </div>
      ) : (
        <div className={c.todoItem} id={props.todo.id}>
          <div onDoubleClick={() => setEditing(true)}>{props.todo.text}</div>
          <input
            type="checkbox"
            checked={props.todo.isCompleted}
            onChange={() => props.onToggleTodo(props.todo.id)}
          />
          <button onClick={() => props.onDeleteTask(props.todo.id)}>
            Delete
          </button>
        </div>
      )}
    </>
  );
};

export default TodoItem;
