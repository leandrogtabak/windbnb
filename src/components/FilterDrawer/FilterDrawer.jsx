import { Search, LocationOn } from '@material-ui/icons';
import { showFilterDrawer, userChoice, staysAvailable } from '../../Helper/Context';
import ItemCounter from '../ItemCounter/ItemCounter';
import { useState, useContext } from 'react';

import styles from './FilterDrawer.module.css';

const FilterDrawer = ({ stays }) => {
  const { showDrawer, setShowDrawer } = useContext(showFilterDrawer);
  const { stayChoice, setStayChoice } = useContext(userChoice);
  const { setStaysFiltered } = useContext(staysAvailable);

  const [filterLocation, setFilterLocation] = useState(null); //
  const [showFiltered, setShowFiltered] = useState(true); //Mostrar o no la lista de locaciones filtradas por el input del usuario
  const [adultGuests, setAdultGuests] = useState(0);
  const [childGuests, setChildGuests] = useState(0);

  const [onChangeValue, setOnChangeValue] = useState('');

  const getAdultGuests = (guests) => {
    setAdultGuests(guests);
    setStayChoice({ ...stayChoice, guests: childGuests + guests });
  };
  const getChildGuests = (guests) => {
    setChildGuests(guests);
    setStayChoice({ ...stayChoice, guests: adultGuests + guests });
  };

  const seen = new Set();

  const onFilterLocation = (e) => {
    setOnChangeValue(e.target.value);
    e.preventDefault();
    setFilterLocation(e.target.value.toLowerCase());
    setShowFiltered(true);
  };

  //aplicar outline a las cajas
  const addInputOutline = (e) => {
    e.preventDefault();
    e.target.parentNode.style.borderRadius = '16px';
    e.target.parentNode.style.border = '1px solid #333333';
  };
  //quitar outline a las cajas
  const removeInputOutline = (e) => {
    e.preventDefault();
    e.target.parentNode.style.border = '1px solid transparent';
  };

  const onSelectLocation = (e) => {
    e.preventDefault();
    setOnChangeValue(e.currentTarget.dataset.id);

    setStayChoice({ ...stayChoice, city: e.currentTarget.dataset.id.split(',')[0] });

    setShowFiltered(false);
  };

  const filteredStays = stays.filter((stay) => {
    return filterLocation && (stay.city.toLowerCase().includes(filterLocation) || stay.country.toLowerCase().includes(filterLocation));
  });

  const filterByLocation = (stays, city) => {
    const filtrados = stays.filter((stay) => {
      return city && stay.city.toLowerCase() === city.toLowerCase();
    });
    return filtrados;
  };

  const filterByGuests = (stays, guests) => {
    const filtrados = stays.filter((stay) => {
      return guests && stay.maxGuests >= guests;
    });
    return filtrados;
  };

  const onFilterStays = () => {
    const filteredStays = filterByLocation(stays, stayChoice.city);
    filteredStays = filterByGuests(filteredStays, stayChoice.guests);
    setShowDrawer(false);

    setStaysFiltered(filteredStays);
  };

  //otra solucion
  // const uniqueCities = Array.from(new Set(filteredApartments.map((a) => a.city))).map((id) => {
  //   return filteredApartments.find((a) => a.city === id);
  // });

  const uniqueCities = filteredStays.filter((el) => {
    const duplicate = seen.has(el.city);
    seen.add(el.city);
    return !duplicate;
  });

  //

  return (
    <div className={`${styles.container} ${showDrawer ? styles.containerShow : styles.containerHide}`}>
      <div className={styles.filterDrawerContainer}>
        <div className={styles.filterDrawer}>
          <div className={styles.filterDrawer_inputLocationContainer}>
            <div className={styles.filterDrawer_input}>
              <p>Location</p>
              <input
                type='text'
                className={styles.filterDrawer_inputLocation}
                placeholder='City or country...'
                onChange={onFilterLocation}
                onFocus={addInputOutline}
                onBlur={removeInputOutline}
                value={onChangeValue}
              />
            </div>
          </div>
          <div className={styles.filterDrawer_inputGuestsContainer}>
            <div className={styles.filterDrawer_input}>
              <p>Guests</p>
              <button className={styles.filterDrawer_guestsButton} onFocus={addInputOutline} onBlur={removeInputOutline}>
                {(adultGuests !== 0 ? `Adult guests: ${adultGuests}.\u00A0` : '') + (childGuests !== 0 ? `Child guests: ${childGuests}` : '') === ''
                  ? 'Add guests'
                  : (adultGuests !== 0 ? `Adult guests: ${adultGuests}.\u00A0` : '') + (childGuests !== 0 ? `Child guests: ${childGuests}` : '')}
              </button>
            </div>
          </div>
          <div className={styles.filterDrawer_buttonSearchContainer}>
            <div className={styles.filterDrawer_input}>
              <button className={styles.filterDrawer_searchButton} onClick={onFilterStays}>
                <Search />
                <p>Search</p>
              </button>
            </div>
          </div>
        </div>
        <div className={styles.filterLists}>
          <div className={styles.filterLists_locations}>
            <div className={styles.filterDrawer_input_cityList}>
              {uniqueCities.map(
                (stay) =>
                  showFiltered && (
                    <button
                      key={stay.title}
                      data-id={`${stay.city}, ${stay.country}`}
                      onClick={onSelectLocation}
                      className={styles.filterDrawer_input_cityList_item}
                    >
                      <LocationOn />
                      <p>
                        {stay.city}, {stay.country}
                      </p>
                    </button>
                  )
              )}
            </div>
          </div>
          <div className={styles.filterLists_guests}>
            <ItemCounter value={getAdultGuests} className={styles.itemCounter} item='Adults' subItem='Ages 13 or above' />
            <ItemCounter value={getChildGuests} item='Children' subItem='Ages 2-12' />
          </div>
          <div className={styles.filterLists_searchBlank}></div>
        </div>
      </div>
    </div>
  );
};

export default FilterDrawer;
