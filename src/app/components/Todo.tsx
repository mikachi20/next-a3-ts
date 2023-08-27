"use client";

import { deleteTodo, editTodo } from "@/api";
import { TodoType } from "@/types";
import React, { ChangeEvent, useState, useRef, useEffect } from "react";

interface TodoProps {
  todo: TodoType;
}

const Todo = ({ todo }: TodoProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const [IsEditing, setIsEditing] = useState(false);
  const [editedTodoTitle, setEditedTodoTitle] = useState(todo.text);

  useEffect(() => {
    if (IsEditing) {
      ref.current?.focus();
    }
  }, [IsEditing]);

  const handleEdit = async () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsEditing(false);
    await editTodo(todo.id, editedTodoTitle);
  };

  const handleDelete = async () => {
    await deleteTodo(todo.id);
  };

  return (
    <li
      key={todo.id}
      className="flex justify-between p-4 bg-white border-l-4 border-blue-500 rounded shadow"
    >
      {IsEditing ? (
        <input
          ref={ref}
          type="text"
          className="mr-2 py-1 px-2 rounded border-gray-400 border"
          value={editedTodoTitle}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEditedTodoTitle(e.target.value)
          }
        />
      ) : (
        <span>{todo.text}</span>
      )}
      <div>
        {IsEditing ? (
          <button className="text-blue-500 mr-3" onClick={handleSave}>
            save
          </button>
        ) : (
          <button className="text-green-500 mr-3" onClick={handleEdit}>
            edit
          </button>
        )}

        <button className="text-red-500" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default Todo;
