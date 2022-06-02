import Layout from '../components/Layout/Layout';
import CardList from '../components/CardList/CardList';
import FilterDrawer from '../components/FilterDrawer/FilterDrawer';
import { useState } from 'react';
import { showFilterDrawer, userChoice, staysAvailable } from '../Helper/Context';

export default function Home({ stays }) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [stayChoice, setStayChoice] = useState({});
  const [staysFiltered, setStaysFiltered] = useState(stays);

  return (
    <showFilterDrawer.Provider value={{ showDrawer, setShowDrawer }}>
      <userChoice.Provider value={{ stayChoice, setStayChoice }}>
        <staysAvailable.Provider value={{ staysFiltered, setStaysFiltered }}>
          <FilterDrawer stays={stays} />
          <Layout>
            <CardList />
          </Layout>
        </staysAvailable.Provider>
      </userChoice.Provider>
    </showFilterDrawer.Provider>
  );
}

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3000/stays.json');
  const stays = await res.json();

  return {
    props: {
      stays,
    },
  };
};
