import styles from './SearchButton.module.css';
import { Search } from '@material-ui/icons';
import { useContext } from 'react';
import { showFilterDrawer, userChoice } from '../../Helper/Context';

//reemplazar los datos que figuran en el componente con los actuales seleccionados por el usuario, necesitare useContext

const SearchButton = () => {
  const { setShowDrawer } = useContext(showFilterDrawer);
  const { stayChoice } = useContext(userChoice);

  const showFilter = () => {
    setShowDrawer(true);
  };
  return (
    <button onClick={showFilter} className={styles.button}>
      <div className={styles.button_location}>{stayChoice.city !== undefined ? stayChoice.city + ', Finland' : 'Add location'}</div>
      <div className={styles.button_guests}>{stayChoice.guests !== undefined && stayChoice.guests !== 0 ? stayChoice.guests + ' guests' : 'Add gests'}</div>
      <Search className={styles.button_search} />
    </button>
  );
};

export default SearchButton;
