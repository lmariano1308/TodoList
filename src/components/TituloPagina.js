import React from 'react';
import style from '../styles/modules/titulo.module.scss';

function TituloPagina({ children, ...rest }) {
  return (
    <p className={style.titulo} {...rest}>
      {children}
    </p>
  );
}

export default TituloPagina;
