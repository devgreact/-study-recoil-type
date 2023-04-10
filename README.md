# TypeScript 적용

## todo/TodoItemCreator.tsx

```
npm install --save-dev --exact prettier
npm install --save-dev eslint
```

.prettierrc.json

```
{
  "singleQuote": false,
  "semi": true,
  "useTabs": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80,
  "arrowParens": "avoid",
  "endOfLine": "auto"
}

```

```
npm install eslint-config-prettier --save-dev
```

.eslintrc.js

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "standard-with-typescript", "prettier"],
  overrides: [],
  parserOptions: {
    project: "**/tsconfig.json",
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
  },
};
```

TodoItemCreator.tsx

```js
import React from "react";
import { atom, selector, useRecoilValue } from "recoil";
import TodoItemCreator from "./TodoItemCreator";
import TodoItem from "./TodoItem";
import TodoListFilters, { todoListFilterState } from "./TodoListFilters";
import TodoListStats from "./TodoListStats";

export interface Todo {
  id: number;
  text: string;
  isComplete: boolean;
}

export const todoListState = atom<Todo[]>({
  key: "todoListState",
  default: [],
});

export const filteredTodoListState = selector({
  key: "FilteredTodoList",
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case "Show Completed":
        return list.filter((item) => item.isComplete);
      case "Show Uncompleted":
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});

const TodoList = () => {
  //   const todoList = useRecoilValue(todoListState);
  const todoList = useRecoilValue(filteredTodoListState);
  return (
    <>
      <TodoListStats />
      <TodoListFilters />
      <TodoItemCreator />
      {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </>
  );
};

export default TodoList;

```

```js
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
```
