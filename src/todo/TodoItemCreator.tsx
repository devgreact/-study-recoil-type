import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { todoListState } from "./TodoList";

// 3. 고유한 Id 생성을 위한 유틸리티
let id = 0;
function getId(): number {
  return id++;
}

const TodoItemCreator = () => {
  const [inputValue, setInputValue] = useState("");
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = () => {
    setTodoList(oldTodoList => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue("");
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setInputValue(value);
  };
  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
};
export default TodoItemCreator;
