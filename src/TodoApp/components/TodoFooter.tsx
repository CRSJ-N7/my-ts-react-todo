import { FC } from "react";
import type { FilterType } from "../TodoApp";
import c from "./TodoFooter.module.css";

type Props = {
  onToggleFilter: (value: FilterType) => void;
  onPageClick: (value: number) => void;
  setTodoPerPage: (value: number) => void;
  todoPerPage: number;
  maxPages: number;
  allTodosCount: number;
  activeTodosCount: number;
  completedTodosCount: number;
  filter: FilterType;
  currentPage: number;
};

const TodoFooter: FC<Props> = (props) => {
  const handleTodoPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = parseInt(event.target.value, 10);
    props.setTodoPerPage(value);
  };

  return (
    <>
      <div className={c.pagination}>
        {Array(props.maxPages)
          .fill(undefined)
          .map((_, i) => (
            <button
              key={i}
              className={
                props.currentPage === i + 1
                  ? `${c.paginationButton} ${c.paginationActiveButton}`
                  : c.paginationButton
              }
              onClick={() => props.onPageClick(i)}
            >
              {++i}
            </button>
          ))}
      </div>
      <div className={c.filterWrapper}>
        <button
          className={
            props.filter === "all"
              ? `${c.filterButton} ${c.filterActive}`
              : c.filterButton
          }
          onClick={() => props.onToggleFilter("all")}
        >
          All <p>todos</p> <p>({props.allTodosCount})</p>
        </button>
        <button
          className={
            props.filter === "active"
              ? `${c.filterButton} ${c.filterActive}`
              : c.filterButton
          }
          onClick={() => props.onToggleFilter("active")}
        >
          Active <p>todos</p> <p>({props.activeTodosCount})</p>
        </button>
        <button
          className={
            props.filter === "completed"
              ? `${c.filterButton} ${c.filterActive}`
              : c.filterButton
          }
          onClick={() => props.onToggleFilter("completed")}
        >
          Completed todos <p>({props.completedTodosCount})</p>
        </button>
      </div>
      <div className={c.todoPerPageWrapper}>
        Todo per page:
        <select
          className={c.todoPerPageOptions}
          id="tasksPerPage"
          value={props.todoPerPage}
          onChange={handleTodoPerPageChange}
        >
          <option className={c.option} value="5">
            5
          </option>
          <option className={c.option} value="10">
            10
          </option>
          <option className={c.option} value="15">
            15
          </option>
        </select>
      </div>
    </>
  );
};

export default TodoFooter;
