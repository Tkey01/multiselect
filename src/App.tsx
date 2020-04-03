import React, { Fragment } from 'react'
import { Multiselect } from './components/Multiselect'

import { countries, randomOptions } from './mocks/options'
import { GlobalStyle, AppWrapper } from './App.styled'


export const App = () => (
  <Fragment>
    <GlobalStyle />
    <AppWrapper>
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
    </AppWrapper>
  </Fragment>
);
