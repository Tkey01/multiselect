import React from 'react';
import './App.css';
import { Multiselect } from './components/Multiselect/Multiselect';

import { countries, randomOptions } from './mocks/options'

export const App = () => (
  <div style={{ width: '400px', margin: '200px auto' }}>
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
