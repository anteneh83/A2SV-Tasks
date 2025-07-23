import { useState, type FC } from "react";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";
import { type Todo } from "../types";

interface Props {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

const TodoItem: FC<Props> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    onEdit(todo.id, editText);
    setIsEditing(!isEditing);
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => {
              setEditText(e.target.value);
            }}
          />

          <button onClick={handleEdit}>
            {" "}
            <FaCheck />{" "}
          </button>
        </>
      ) : (
        <>
          <span onClick={() => onToggle(todo.id)}>{todo.text}</span>
          <div>
            <button onClick={() => setIsEditing(!isEditing)}>
              <FaEdit />
            </button>
            <button onClick={() => onDelete(todo.id)}>
              <FaTrash />
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;
