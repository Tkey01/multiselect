import React from 'react';
import './App.css';
import { Multiselect } from './Multiselect';

import { countries, randomOptions } from './options'

function App() {
  return (
    <div style={{ width: '400px', margin: '200px auto' }}>
      <Multiselect
        containerClassName={'top'}
        placeholder='Выберите страны'
        options={countries}
        onChange={(selectedOptions) => { console.log('Selected countries - ', selectedOptions)}}
      />

      <Multiselect
        containerClassName={'bottom'}
        placeholder='Рандомные опции'
        options={randomOptions}
        onChange={(selectedOptions) => { console.log('Selected random options - ', selectedOptions)}}
      />
    </div>
  );
}

export default App;
