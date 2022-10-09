import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Botao, { SelectButton } from './Botao';
import styles from '../styles/modules/app.module.scss';
import ModuloTodo from './ModuloTodo';
import { editarFiltroStatus } from '../Slices/todoSlice';

function AppHeader() {
  const [abrirModulo, setAbrirModulo] = useState(false);
  const filtroStatus = useSelector((state) => state.todo.filtroStatus);
  const dispatch = useDispatch();

  const updateFilter = (e) => {
    dispatch(editarFiltroStatus(e.target.value));
  };
  return (
    <div className={styles.appCabecario}>
      <Botao variant="primario" onClick={() => setAbrirModulo(true)}>
        Adicionar Tarefa
      </Botao>
      <SelectButton
        variant="secundario"
        id="status"
        value={filtroStatus}
        onChange={updateFilter}
      >
        <option value="tudo">Tudo</option>
        <option value="incompleto">Incompletos</option>
        <option value="completo">Completos</option>
      </SelectButton>
      <ModuloTodo
        type="adicionar"
        abrirModulo={abrirModulo}
        setAbrirModulo={setAbrirModulo}
      />
    </div>
  );
}

export default AppHeader;
