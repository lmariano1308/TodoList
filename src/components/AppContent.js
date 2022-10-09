import React from 'react';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import TodoItem from './todoItem';
import styles from '../styles/modules/app.module.scss';

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function AppContent() {
  const todoList = useSelector((state) => state.todo.todoList);
  const filtroStatus = useSelector((state) => state.todo.filtroStatus);

  const sortedTodoList = [...todoList];
  sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));

  const todoListFiltrado = sortedTodoList.filter((item) => {
    if (filtroStatus === 'tudo') {
      return true;
    }
    return item.status === filtroStatus;
  });

  return (
    <motion.div
      className={styles.content__wrapper}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {todoListFiltrado && todoListFiltrado.length > 0 ? (
          todoListFiltrado.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        ) : (
          <motion.p className={styles.emptyText} variants={child}>
            Nenhum Todo encontrado
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AppContent;
