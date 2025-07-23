import { useState, type FC, type FormEvent } from "react";
import { FaPlus } from "react-icons/fa";

interface TodoFormProps {
  onAdd: (text: string) => void;
}

const TodoForm: FC<TodoFormProps> = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };
  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="add a new todo"
      />
      <button type="submit">
        <FaPlus />
      </button>
    </form>
  );
};

export default TodoForm;
