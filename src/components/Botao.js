import React, { Children } from 'react';
import styles from '../styles/modules/botao.module.scss';
import { pegarClasses } from '../utils/pegarClasses';

const TiposBotao = {
  primario: 'primario',
  secundario: 'secundario',
};

function Botao({ children, type, variant, ...rest }) {
  return (
    <button
      className={pegarClasses([
        styles.botao,
        styles[`botao--${TiposBotao[variant]}`],
      ])}
      type={type === 'submit' ? 'submit' : 'button'}
      {...rest}
    >
      {children}
    </button>
  );
}

function SelectButton({ children, id, ...rest }) {
  return (
    <select
      id={id}
      className={pegarClasses([styles.botao, styles.botao__selecionar])}
      {...rest}
    >
      {children}
    </select>
  );
}

export { SelectButton };
export default Botao;
