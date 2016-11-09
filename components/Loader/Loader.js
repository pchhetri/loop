import React from 'react';
import s from './Loader.css';
import {Spinner} from 'react-mdl';

const Loader = () => (
  <div className={s.loading}>
  {/* <img src="/img/loader.gif" className={s.loadingGif} /> */}
  <Spinner singleColor />
  </div>
);

export default Loader;
