import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MdDelete, MdEdit } from 'react-icons/md';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { deletarTodo, editarTodo } from '../Slices/todoSlice';
import styles from '../styles/modules/todoItem.module.scss';
import { pegarClasses } from '../utils/pegarClasses';
import ModuloTodo from './ModuloTodo';
import BotaoCheckmark from './BotaoCheckmark';

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [editarModuloAberto, setEditarModuloAberto] = useState(false);

  useEffect(() => {
    if (todo.status === 'completo') {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);

  const paraDeletar = () => {
    dispatch(deletarTodo(todo.id));
    toast.success('Todo Deletado com Sucesso!');
  };
  const paraEditar = () => {
    setEditarModuloAberto(true);
  };

  const lidarComCheck = () => {
    setChecked(!checked);
    dispatch(
      editarTodo({
        ...todo,
        status: checked ? 'incompleto' : 'completo',
      })
    );
  };

  return (
    <>
      <motion.div className={styles.item} variants={child}>
        <div className={styles.todoDetalhes}>
          <BotaoCheckmark checked={checked} lidarComCheck={lidarComCheck} />
          <div className={styles.textos}>
            <p
              className={pegarClasses([
                styles.todoTexto,
                todo.status === 'completo' && styles['todoTexto--completo'],
              ])}
            >
              {todo.titulo}
            </p>
            <p className={styles.tempo}>{todo.horario}</p>
          </div>
        </div>
        <div className={styles.todoAcoes}>
          <div
            className={styles.icone}
            onClick={paraDeletar}
            onKeyDown={paraDeletar}
            role="button"
            tabIndex={0}
          >
            <MdDelete />
          </div>
          <div
            className={styles.icone}
            onClick={paraEditar}
            onKeyDown={paraEditar}
            role="button"
            tabIndex={0}
          >
            <MdEdit />
          </div>
        </div>
      </motion.div>
      <ModuloTodo
        type="editar"
        todo={todo}
        abrirModulo={editarModuloAberto}
        setAbrirModulo={setEditarModuloAberto}
      />
    </>
  );
}

export default TodoItem;
