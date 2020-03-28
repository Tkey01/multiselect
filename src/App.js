import React from 'react';
import './App.css';
import { Multiselect } from './Multiselect';

import { countries, randomOptions } from './options'

function App() {
  return (
    <div style={{ width: '400px', margin: '200px auto' }}>
      <Multiselect
        multiselectContainerClass={'top'}
        placeholder='Выберите страны'
        options={countries}
      />

      <Multiselect
        multiselectContainerClass={'bottom'}
        placeholder='Рандомные опции'
        options={randomOptions}
      />
    </div>
  );
}

export default App;
