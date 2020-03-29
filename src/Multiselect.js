import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Multiselect extends Component {
  constructor(props) {
    super(props);

    const { options } = this.props;

    const newOptionsArray = options.map((option, index) => ({ id: index, name: option }));

    this.state = {
      options: newOptionsArray,
      selectedOptions: [],
      filteredOptions: newOptionsArray,
      isOptionsListOpen: false,
      inputValue: '',
      highlightOptionIndex: 0,
      scrollPos: 0,
      scrollMaxPos: 6,
      isScrollingByKeyboard: false
    }

    this.inputRef = React.createRef();
  }

  getResetScrollState = () => ({
    highlightOptionIndex: 0,
    scrollPos: 0
  })

  toggleOptionsList = (event) => {
    this.setState(prevState => ({
      isOptionsListOpen: !prevState.isOptionsListOpen,
      ...this.getResetScrollState()
    }))
  }

  scrollAtOption = (scrollPos, index) => {
    const element = document.querySelectorAll('.filtered-options span')[index];
    const { scrollMaxPos } = this.state

    if (element) {
      if (scrollPos === 0) {
        element.scrollIntoView(true);
      }
      if (scrollPos === scrollMaxPos) {
        element.scrollIntoView(false);
      }
    }
  }

  scrollManaging = (event) => {
    const {
      scrollMaxPos,
      highlightOptionIndex,
      filteredOptions
    } = this.state;

    // Если нажали стрелку вверх
    if (event.keyCode === 38) {
      if (highlightOptionIndex > 0) {
        this.setState(previousState => {
          const highlightOptionIndex = previousState.highlightOptionIndex - 1;
          const scrollPos = previousState.scrollPos === 0 ? previousState.scrollPos : previousState.scrollPos - 1

          this.scrollAtOption(scrollPos, highlightOptionIndex);

          return {
            highlightOptionIndex,
            scrollPos,
            isScrollingByKeyboard: true
          };
        });
      }
    }
    // Если нажали стрелку вниз
    else if (event.keyCode === 40) {
      if (highlightOptionIndex < filteredOptions.length - 1) {
        this.setState(previousState => {
          const highlightOptionIndex = previousState.highlightOptionIndex + 1;
          const scrollPos = previousState.scrollPos === scrollMaxPos ? previousState.scrollPos : previousState.scrollPos + 1

          this.scrollAtOption(scrollPos, highlightOptionIndex);

          return {
            highlightOptionIndex,
            scrollPos,
            isScrollingByKeyboard: true
          };
        });
      }
    }
  }

  getArrayOfValues = (options) => options.map(option => option.name)

  selectOption = (newOption) => {
    const { inputValue } = this.state;

    const newSelectedOptions = this.getNewSelectedOptions({ type: 1, newOption })

    this.setState({
      selectedOptions: newSelectedOptions,
      filteredOptions: this.getNewFilteredOptions({ type: 1, inputValue, changeableOption: newOption }),
      inputValue: '',
      ...this.getResetScrollState()
    });

    this.scrollAtOption(0, 0)

    const arrayOfValues = this.getArrayOfValues(newSelectedOptions)
    this.props.onChange(arrayOfValues)
  }

  unselectOption = (option, deletedIndex) => {
    const { inputValue } = this.state;

    const newSelectedOptions = this.getNewSelectedOptions({ type: 2, deletedIndex })

    this.setState({
      selectedOptions: newSelectedOptions,
      filteredOptions: this.getNewFilteredOptions({ type: 3, inputValue, changeableOption: option }),
    });

    const arrayOfValues = this.getArrayOfValues(newSelectedOptions)
    this.props.onChange(arrayOfValues)
  }

  getNewSelectedOptions = ({ type, deletedIndex, newOption }) => {
    const { selectedOptions } = this.state

    let newSelectedOptions = [...selectedOptions]

    // В случае добавления опции в список (параметр deletedIndex не нужен, добавляем в конец массива)
    if (type === 1) {
      newSelectedOptions.push(newOption)
    }
    // В случае удаления опции из списка выбранных
    else if (type === 2) {
      newSelectedOptions.splice(deletedIndex, 1);
    }

    return newSelectedOptions
  }

  getNewFilteredOptions = ({ type, inputValue, changeableOption }) => {
    const { options, filteredOptions, selectedOptions } = this.state;
    let newFilteredOptions = []

    // В случае добавления опции в список выбранных
    if (type === 1) {
      newFilteredOptions = filteredOptions
        .filter(option => option.id !== changeableOption.id)
    }
    // В случае изменения значения инпута (3-й параметр не нужен)
    else if (type === 2) {
      let newSelectedOptionsIds = selectedOptions.map(option => option.id)

      newFilteredOptions = options
        .filter(option => option.name.toUpperCase().includes(inputValue.toUpperCase()))
        .filter(option => !newSelectedOptionsIds.includes(option.id))
    }
    // В случае удаления опции из списка выбранных
    else if (type === 3) {
      newFilteredOptions = [...filteredOptions];

      if (changeableOption.name.includes(inputValue)) {
        let insertIndex = newFilteredOptions.findIndex((filteredOption) => filteredOption.id > changeableOption.id);

        if (insertIndex !== -1) {
          newFilteredOptions.splice(insertIndex, 0, { id: changeableOption.id, name: changeableOption.name });
        } else {
          newFilteredOptions.push({ id: changeableOption.id, name: changeableOption.name });
        }
      }
    }

    return newFilteredOptions
  }

  onInputChange = (event) => {
    const inputValue = event.target.value

    this.setState({
      filteredOptions: this.getNewFilteredOptions({ type: 2, inputValue }),
      inputValue,
      ...this.getResetScrollState()
    });

    this.scrollAtOption(0, 0)
  }

  onMouseOverFilteredOption = (index) => {
    const {
      scrollMaxPos,
      isScrollingByKeyboard
    } = this.state;

    if (isScrollingByKeyboard) return

    this.setState(previousState => {
      let newScrollPos = previousState.scrollPos + (index - previousState.highlightOptionIndex);
      if (newScrollPos < 0) {
        newScrollPos = 0;
      } else if (newScrollPos > scrollMaxPos) {
        newScrollPos = scrollMaxPos;
      }

      return {
        highlightOptionIndex: index,
        scrollPos: newScrollPos
      }
    });
  }

  onInputKeyDown = (event) => {
    const {
      highlightOptionIndex,
      filteredOptions,
      selectedOptions,
      inputValue
    } = this.state;

    if (event.keyCode === 8 && !inputValue && selectedOptions.length) {
      const lastIndex = selectedOptions.length - 1;
      this.unselectOption(selectedOptions[lastIndex], lastIndex);
    }

    if (event.key === 'Escape') {
      this.inputRef.current.blur();
    }

    if ((event.keyCode === 38 || event.keyCode === 40) && filteredOptions.length > 1) {
      event.preventDefault()

      this.scrollManaging(event);
    }

    if (event.key === "Enter" && filteredOptions.length) {
      this.selectOption(filteredOptions[highlightOptionIndex], highlightOptionIndex);
    }
  }

  onClickSelectedOptions = () => {
    this.inputRef.current.focus();
  }

  onMouseDownSelectedOption = (event, option, index) => {
    event.preventDefault()

    if (event.button === 1) {
      this.unselectOption(option, index)
    }
  }

  onClickSelectedOptionCloseBtn = (event, option, index) => {
    event.stopPropagation();

    this.unselectOption(option, index)
  }

  onMouseDownFilteredOption = (event, option) => {
    event.preventDefault()

    this.selectOption(option)
  }

  onMouseMoveFilteredOptions = () => {
    const { isScrollingByKeyboard } = this.state
    if (isScrollingByKeyboard) {
      this.setState({
        isScrollingByKeyboard: false
      })
    }
  }

  renderSelectedOptions = () => {
    const { selectedOptions, inputValue } = this.state;

    return (
      <div
        className="selected-options"
        onClick={this.onClickSelectedOptions}
      >
        {selectedOptions.map((option, index) => (
          <span
            key={option.id}
            onMouseDown={(event) => this.onMouseDownSelectedOption(event, option, index)}
          >
            {option.name}
            <button onClick={(event) => this.onClickSelectedOptionCloseBtn(event, option, index)}>✖</button>
          </span>
        ))}
        <input
          type="text"
          onChange={this.onInputChange}
          onFocus={this.toggleOptionsList}
          onBlur={this.toggleOptionsList}
          onKeyDown={this.onInputKeyDown}
          value={inputValue}
          ref={this.inputRef}
          className="input"
        />
      </div>
    );
  }

  renderFilteredOptions = () => {
    const {
      filteredOptions,
      isOptionsListOpen,
      highlightOptionIndex
    } = this.state;

    return isOptionsListOpen && (
      <div
        className="filtered-options"
        onMouseMove={this.onMouseMoveFilteredOptions}
      >
        {filteredOptions.map((option, index) => (
          <span
            key={option.id}
            onMouseDown={(event) => this.onMouseDownFilteredOption(event, option)}
            className={highlightOptionIndex === index ? 'highlight' : null}
            onMouseOver={() => this.onMouseOverFilteredOption(index)}
          >{option.name}</span>
        ))}
      </div>
    );
  }

  render() {
    const { placeholder } = this.props;

    return (
      <React.Fragment>
        <h2>{placeholder}</h2>
        <div className={`multiselect-container ${this.props.containerClassName || ''}`}>
          {this.renderSelectedOptions()}
          {this.renderFilteredOptions()}
        </div>
      </React.Fragment>
    );
  }
}

Multiselect.propTypes = {
  containerClassName: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired
}

Multiselect.defaultProps = {
  placeholder: 'Multiselect dropdown',
  options: [],
  onChange: () => {}
}
