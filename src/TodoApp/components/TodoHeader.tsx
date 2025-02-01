import { useState, type ChangeEvent, type FC } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import addTask from "../assets/add-task.png";
import toggleAll from "../assets/toggle-all.png";
import deleteAllCompleted from "../assets/delete-all-completed.png";
import c from "./TodoHeader.module.css";

type Props = {
  onAddTodo: (text: string) => void;
  onRemoveCompleted: () => void;
  onToggleAllTasks: () => void;
};

const TodoAppHeader: FC<Props> = (props) => {
  const [todoText, setTodoText] = useState<string>("");

  const onAddTodo = () => {
    if (!todoText.trim()) {
      alert(`You can't create an empty task`);
      return;
    }
    props.onAddTodo(todoText);
    setTodoText("");
  };

  const onTodoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
  };

  return (
    <div className={c.headerWrapper}>
      <button
        className={c.headerButtons}
        onClick={onAddTodo}
        data-tooltip-id="add-task"
        data-tooltip-content="Click to add task"
        data-tooltip-class="addTaskTooltip"
      >
        <img src={addTask}></img>
        <ReactTooltip
          id="add-task"
          className="addTaskTooltip"
          place="left"
        ></ReactTooltip>
      </button>
      <input
        className={c.todoInput}
        placeholder="...what's next ?"
        value={todoText}
        onChange={(e) => onTodoChange(e)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onAddTodo();
          }
        }}
      />
      <button
        onClick={props.onToggleAllTasks}
        className={c.headerButtons}
        data-tooltip-id="toggle-all"
        data-tooltip-content="Click to toggle all task statuses"
        data-tooltip-class="toggleAllTooltip"
      >
        <img src={toggleAll}></img>
        <ReactTooltip
          id="toggle-all"
          className="toggleAllTooltip"
          place="top"
        ></ReactTooltip>
      </button>
      <button
        onClick={props.onRemoveCompleted}
        className={c.headerButtons}
        data-tooltip-id="delete-all-completed"
        data-tooltip-content="Click to delete all completed tasks"
        data-tooltip-class="toggleAllToolTip tooltip-class"
      >
        <img src={deleteAllCompleted} />
        <ReactTooltip
          id="delete-all-completed"
          className="deleteAllCompletedToolTip"
          place="right"
        ></ReactTooltip>
      </button>
    </div>
  );
};

export default TodoAppHeader;
