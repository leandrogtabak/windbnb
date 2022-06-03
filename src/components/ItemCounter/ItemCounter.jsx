import styles from './ItemCounter.module.css';
import { AddRounded, RemoveRounded } from '@material-ui/icons';
import { useState } from 'react';

const ItemCounter = ({ item, subItem, value, startValue, ...props }) => {
  const [count, setCount] = useState(startValue);

  /* Comentarios:
Nunca poner esto aca afuera

  props.value(count);
  
  Siempre ponerlo en las funciones, sino traera problemas en su padre al pasar la funcion
  
  */

  const increaseCounter = () => {
    setCount(count + 1);
    value(count + 1);
  };
  const decreaseCounter = () => {
    if (count > 0) {
      setCount(count - 1);
      value(count - 1);
    }
  };

  return (
    <div className={`${styles.container} ${props.className}`}>
      <div className={styles.details}>
        <p>{item}</p>
        <p>{subItem}</p>
      </div>
      <div className={styles.counter}>
        <button className={styles.counterButton} onClick={decreaseCounter}>
          <RemoveRounded style={{ fontSize: '16px' }} />
        </button>
        <p className={styles.counterAmount}>{count}</p>
        <button className={styles.counterButton} onClick={increaseCounter}>
          <AddRounded style={{ fontSize: '16px' }} />
        </button>
      </div>
    </div>
  );
};

export default ItemCounter;
