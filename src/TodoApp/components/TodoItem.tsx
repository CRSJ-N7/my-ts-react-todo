import { FC, useState, type ChangeEvent } from "react";
import type { TodoType } from "../TodoApp";
import c from "./TodoItem.module.css";
import deleteTask from "../assets/delete-task.png";
import blankCheckbox from "../assets/checkbox-blank.png";
import checkedCheckbox from "../assets/checkbox-completed.png";

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
      <div className={c.todoItem} id={props.todo.id}>
        {editing ? (
          <input
            className={c.todoTextEditing}
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
        ) : (
          <div className={c.todoText} onDoubleClick={() => setEditing(true)}>
            {props.todo.text}
          </div>
        )}

        {props.todo.isCompleted ? (
          <button className={c.todoItemButtons}>
            <img
              src={checkedCheckbox}
              alt="Completed"
              onClick={() => props.onToggleTodo(props.todo.id)}
            />
          </button>
        ) : (
          <button className={c.todoItemButtons}>
            <img
              src={blankCheckbox}
              alt="Not completed"
              onClick={() => props.onToggleTodo(props.todo.id)}
            />
          </button>
        )}

        <button
          className={c.todoItemButtons}
          onClick={() => props.onDeleteTask(props.todo.id)}
        >
          <img src={deleteTask}></img>
        </button>
      </div>
    </>
  );
};

export default TodoItem;
