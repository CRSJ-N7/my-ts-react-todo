import c from "./TodoFooter.module.css";
import { FC } from "react";
import type { FilterType } from "../TodoApp";

type Props = {
  onToggleFilter: (value: FilterType) => void;
  onPageClick: (value: number) => void;
  setTodoPerPage: (value: number) => void;
  todoPerPage: number;
  maxPages: number;
};

const TodoFooter: FC<Props> = (props) => {
  const handleTodoPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = parseInt(event.target.value, 10);
    props.setTodoPerPage(value);
  };

  return (
    <div>
      <div className={c.pagination}>
        {Array(props.maxPages)
          .fill(undefined)
          .map((_, i) => (
            <button key={i} onClick={() => props.onPageClick(i)}>
              {++i}
            </button>
          ))}
      </div>
      <div className={c.filter}>
        <button onClick={() => props.onToggleFilter("all")}>All todos</button>
        <button onClick={() => props.onToggleFilter("active")}>
          Active todos
        </button>
        <button onClick={() => props.onToggleFilter("completed")}>
          Completed todos
        </button>
        <div className={c.todoPerPage}>
          <select
            id="tasksPerPage"
            value={props.todoPerPage}
            onChange={handleTodoPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TodoFooter;
