import Card from '../Card/Card';
import styles from './CardList.module.css';
import { staysAvailable } from '../../Helper/Context';
import { useContext } from 'react';

const CardList = () => {
  const { staysFiltered } = useContext(staysAvailable);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Stays in Finland</h2>
        <p>{staysFiltered.length} stays</p>
      </div>

      <div className={styles.cardsContainer}>
        {staysFiltered.map((stay) => (
          <Card stay={stay} key={stay.title} />
        ))}
      </div>
    </div>
  );
};

export default CardList;
