import React from 'react';
import './App.css';
import { Multiselect } from './components/Multiselect';

import { countries, randomOptions } from './mocks/options'

export const App = () => (
  <div className="app-wrapper">
    <Multiselect
      containerClassName={'top'}
      placeholder='Выберите страны'
      options={countries}
      onChange={(selectedOptions) => { console.log('Selected countries - ', selectedOptions) }}
    />

    <Multiselect
      containerClassName={'bottom'}
      placeholder='Рандомные опции'
      options={randomOptions}
      onChange={(selectedOptions) => { console.log('Selected random options - ', selectedOptions) }}
    />
  </div>
);
