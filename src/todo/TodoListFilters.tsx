import React from "react";
import { atom, useRecoilState } from "recoil";
// 1. 필터링 된 todo 리스트를 구현하기 위해서 우리는 atom에 저장될 수 있는 필터 기준을 선택해야 한다.
// 우리가 사용하게 될 필터 옵션은 "Show All", "Show Completed"과 "Show Uncompleted"가 있다.
// 기본값은 "Show All"이 될 것이다.
type FilterState = "Show Completed" | "Show All" | "Show Uncompleted";
export const todoListFilterState = atom<FilterState>({
  key: "todoListFilterState",
  default: "Show All",
});

const TodoListFilters = () => {
  const [filter, setFilter] = useRecoilState(todoListFilterState);
  const updateFilter: React.ChangeEventHandler<HTMLSelectElement> = ({
    target: { value },
  }) => {
    setFilter(value as FilterState);
  };

  return (
    <>
      Filter:
      <select value={filter} onChange={updateFilter}>
        <option value="Show All">All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show Uncompleted">Uncompleted</option>
      </select>
    </>
  );
};

export default TodoListFilters;
