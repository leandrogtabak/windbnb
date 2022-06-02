import styles from './Card.module.css';
import { StarRateRounded } from '@material-ui/icons';

const Card = ({ stay }) => {
  return (
    <div className={styles.container}>
      <div>
        <img className={styles.cardImage} src={stay.photo} alt={stay.title} />
      </div>

      <div className={styles.details}>
        {stay.superHost && (
          <div className={styles.superhost}>
            <p>SUPERHOST</p>
          </div>
        )}
        <div className={styles.detailsContainer}>
          <p className={styles.detailsType}>{stay.type + (stay.beds ? '. ' + stay.beds + ' beds' : '')}</p>
          <div className={styles.rating}>
            <StarRateRounded style={{ fontSize: '30px' }} />
            <p>{stay.rating}</p>
          </div>
        </div>
      </div>
      <h4 className={styles.title}>{stay.title}</h4>
    </div>
  );
};

export default Card;
