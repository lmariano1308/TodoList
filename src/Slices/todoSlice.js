import { createSlice } from '@reduxjs/toolkit';

const getTodosIniciais = () => {
  const localTodoList = window.localStorage.getItem('todoList');
  if (localTodoList) {
    return JSON.parse(localTodoList);
  }
  window.localStorage.setItem('todoList', JSON.stringify([]));
  return [];
};

const valorInicial = {
  filtroStatus: 'tudo',
  todoList: getTodosIniciais(),
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState: valorInicial,
  reducers: {
    adicionarTodo: (state, action) => {
      state.todoList.push(action.payload);
      const todoList = window.localStorage.getItem('todoList');
      if (todoList) {
        const todoListArray = JSON.parse(todoList);
        todoListArray.push({
          ...action.payload,
        });
        window.localStorage.setItem('todoList', JSON.stringify(todoListArray));
      } else {
        window.localStorage.setItem(
          'todoList',
          JSON.stringify([{ ...action.payload }])
        );
      }
    },
    deletarTodo: (state, action) => {
      const todoList = window.localStorage.getItem('todoList');
      if (todoList) {
        const todoListArray = JSON.parse(todoList);
        todoListArray.forEach((todo, index) => {
          if (todo.id === action.payload) {
            todoListArray.splice(index, 1);
          }
        });
        window.localStorage.setItem('todoList', JSON.stringify(todoListArray));
        state.todoList = todoListArray;
      }
    },
    editarTodo: (state, action) => {
      const todoList = window.localStorage.getItem('todoList');
      if (todoList) {
        const todoListArray = JSON.parse(todoList);
        todoListArray.forEach((todo, index) => {
          if (todo.id === action.payload.id) {
            todo.titulo = action.payload.titulo;
            todo.status = action.payload.status;
          }
        });
        window.localStorage.setItem('todoList', JSON.stringify(todoListArray));
        state.todoList = todoListArray;
      }
    },
    editarFiltroStatus: (state, action) => {
      state.filtroStatus = action.payload;
    },
  },
});

export const { adicionarTodo, deletarTodo, editarTodo, editarFiltroStatus } =
  todoSlice.actions;
export default todoSlice.reducer;
