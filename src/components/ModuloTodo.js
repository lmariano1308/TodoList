import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdOutlineClose, MdTitle } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { adicionarTodo, editarTodo } from '../Slices/todoSlice';
import styles from '../styles/modules/modulo.module.scss';
import Botao from './Botao';

const dropIn = {
  hidden: {
    opacity: 0,
    transform: 'scale(0.9)',
  },
  visible: {
    transform: 'scale(1)',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: 'scale(0.9)',
    opacity: 0,
  },
};

function ModuloTodo({ type, abrirModulo, setAbrirModulo, todo }) {
  const [titulo, setTitulo] = useState('');
  const [status, setStatus] = useState('incompleto');
  const despachar = useDispatch();

  useEffect(() => {
    if (type === 'editar' && todo) {
      setTitulo(todo.titulo);
      setStatus(todo.status);
    } else {
      setTitulo('');
      setStatus('incompleto');
    }
  }, [type, todo, abrirModulo]);

  const posEnvio = (e) => {
    e.preventDefault();
    if (titulo === '') {
      toast.error('Por Favor, Adicione um Título');
      return;
    }
    if (titulo && status) {
      if (type === 'adicionar') {
        despachar(
          adicionarTodo({
            id: uuid(),
            titulo,
            status,
            horario: new Date().toLocaleString(),
          })
        );
        toast.success('Tarefa Adicionada!');
      }
      if (type === 'editar') {
        if (todo.titulo !== titulo || todo.status !== status) {
          despachar(
            editarTodo({
              ...todo,
              titulo,
              status,
            })
          );
        } else {
          toast.error('Nenhuma Mudança Feita');
          return;
        }
      }
      setAbrirModulo(false);
    }
  };
  return (
    <AnimatePresence>
      {abrirModulo && (
        <motion.div
          className={styles.wrapper}
          initial={{
            opacity: 0,
          }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.container}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={styles.closeButton}
              onClick={() => setAbrirModulo(false)}
              onKeyDown={() => setAbrirModulo(false)}
              tabIndex={0}
              role="button"
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
            >
              <MdOutlineClose />
            </motion.div>
            <form className={styles.form} onSubmit={(e) => posEnvio(e)}>
              <h1 className={styles.formTitle}>
                {type === 'editar' ? 'Editar' : 'Adicionar'} Tarefa
              </h1>
              <label htmlFor="titulo">
                Titulo
                <input
                  type="text"
                  id="titulo"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
              </label>
              <label htmlFor="status">
                Status
                <select
                  name="status"
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="incompleto">Incompleto</option>
                  <option value="completo">Completo</option>
                </select>
              </label>
              <div className={styles.buttonContainer}>
                <Botao type="submit" variant="primario">
                  {type === 'editar' ? 'Editar' : 'Adicionar'} Tarefa
                </Botao>
                <Botao
                  type="button"
                  variant="secundario"
                  onClick={() => setAbrirModulo(false)}
                  onKeyDown={() => setAbrirModulo(false)}
                >
                  Cancelar
                </Botao>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ModuloTodo;
