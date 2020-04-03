import styled from 'styled-components'

export const MultiselectContainer = styled.div`
  width: 400px;
  outline: 1px solid #5f6caf;
  margin: 0 0 40px 0;
  padding: 5px;
  position: relative;
`

export const SelectedOption = styled.span`
  display: inline-block;
  border: 1px solid #0f4c75;
  background-color: #3282b8;
  padding: 6px 25px 6px 6px;
  margin: 2px 5px;
  border-radius: 5px;
  color: #fff;
  position: relative;
`

export const CloseBtn = styled.button`
  position: absolute;
  right: 0px;
  top: 7px;
  background: #3282b8;
  border: none;
  cursor: pointer;
  color: #a2c3da;
  &:hover {
    color: #fff
  }
`

export const FilteredOptions = styled.div`
  display: block;
  position: absolute;
  width: 100%;
  max-height: 200px;
  left: 0;
  top: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid #0f4c75;
  z-index: 1;
`

export const FilteredOption = styled.span<{ isHighlight: boolean }>`
  display: block;
  padding: 5px;
  border-bottom: 1px solid #cee6f7;
  background-color: ${props => props.isHighlight ? '#3282b8' : '#fff'};
  color: ${props => props.isHighlight ? '#fff' : '#333'};
  cursor: pointer;

  &:last-of-type {
    border: none;
  }
`

export const TextField = styled.input`
  width: 150px;
  height: 30px;
  font-size: 16px;
  margin-top: 5px;
  margin-left: 5px;
  border: none;
  outline: none;
`
