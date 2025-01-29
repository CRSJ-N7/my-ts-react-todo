import c from "./TodoFooter.module.css";

const TodoFooter = () => {
  return (
    <div>
      <div className={c.pagination}>
        <button>Page 1</button>
      </div>
      <div className={c.filter}>
        <button>All todos</button>
        <button>Active todos</button>
        <button>Completed todos</button>
      </div>
    </div>
  );
};

export default TodoFooter;
