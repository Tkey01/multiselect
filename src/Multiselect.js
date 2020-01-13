import React from 'react';

export class Multiselect extends React.Component {
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
      scrollMaxPos: 6
    }
    
    this.inputRef = React.createRef();

    this.renderSelectedOptions = this.renderSelectedOptions.bind(this);
    this.renderOptionsList = this.renderOptionsList.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.getNewFilteredOptions = this.getNewFilteredOptions.bind(this);
    this.selectOption = this.selectOption.bind(this);
    this.unselectOption = this.unselectOption.bind(this);
    this.toggleOptionsList = this.toggleOptionsList.bind(this);
    this.onInputKeyDown = this.onInputKeyDown.bind(this);
    this.scrollManaging = this.scrollManaging.bind(this);
    this.scrollAtOption = this.scrollAtOption.bind(this);
    this.onMouseOverOption = this.onMouseOverOption.bind(this);
    this.onClickSelectedOptions = this.onClickSelectedOptions.bind(this);
  }

  onInputChange() {
    this.setState({
      inputValue: this.inputRef.current.value
    }, this.getNewFilteredOptions);
  }

  toggleOptionsList(event) {
    this.setState({
      isOptionsListOpen: !this.state.isOptionsListOpen,
      highlightOptionIndex: 0,
      scrollPos: 0
    });
  }

  scrollAtOption(scrollPos, scrollMaxPos, index) {
    const element = document.querySelectorAll('.filtered-options span')[index];

    if (element) {
      if (scrollPos === 0) {
        element.scrollIntoView(true);
      }
      if (scrollPos === scrollMaxPos) {
        element.scrollIntoView(false);
      }
    }
  }

  scrollManaging(event) {
    const {
      scrollMaxPos,
      highlightOptionIndex,
      filteredOptions
    } = this.state;

    if (event.keyCode === 38) {
      if (highlightOptionIndex > 0) {
        this.setState(previousState => {
          const highlightOptionIndex = previousState.highlightOptionIndex - 1;
          const scrollPos = previousState.scrollPos === 0 ? previousState.scrollPos : previousState.scrollPos - 1

          this.scrollAtOption(scrollPos, scrollMaxPos, highlightOptionIndex);

          return {
            highlightOptionIndex,
            scrollPos
          };
        });
      }
    } else if (event.keyCode === 40) {
      if (highlightOptionIndex < filteredOptions.length - 1) {
        this.setState(previousState => {
          const highlightOptionIndex = previousState.highlightOptionIndex + 1;
          const scrollPos = previousState.scrollPos === scrollMaxPos ? previousState.scrollPos : previousState.scrollPos + 1

          this.scrollAtOption(scrollPos, scrollMaxPos, highlightOptionIndex);

          return {
            highlightOptionIndex,
            scrollPos
          };
        });
      }
    }
  }

  onMouseOverOption(index) {
    const {
      scrollMaxPos
    } = this.state;

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

  onInputKeyDown(event) {
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

    if (event.keyCode === 38 || event.keyCode === 40) {
      this.scrollManaging(event);
    }

    if (event.key === "Enter") {
      this.selectOption(filteredOptions[highlightOptionIndex], highlightOptionIndex);
    }
  }

  selectOption(event, option, optionIndex) {
    event.preventDefault();
    const { filteredOptions, selectedOptions } = this.state;

    const newFilteredOptions = [...filteredOptions];
    newFilteredOptions.splice(optionIndex, 1);

    this.setState({
      filteredOptions: newFilteredOptions,
      selectedOptions: [
        ...selectedOptions,
        option
      ],
    }, () => {
      this.inputRef.current.focus();
    });
  }

  unselectOption(option, optionIndex) {
    const {
      filteredOptions,
      selectedOptions,
      inputValue
    } = this.state;

    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions.splice(optionIndex, 1);

    const newFilteredOptions = [...filteredOptions];

    if (option.name.includes(inputValue)) {
      let insertIndex = newFilteredOptions.findIndex((filteredOption) => filteredOption.id > option.id);
    
      if (insertIndex !== -1) {
        newFilteredOptions.splice(insertIndex, 0, { id: option.id, name: option.name });
      } else {
        newFilteredOptions.push({ id: option.id, name: option.name });
      }
    }
    
    this.setState({
      selectedOptions: newSelectedOptions,
      filteredOptions: newFilteredOptions,
    }, () => {
      this.inputRef.current.focus();
    })
  }

  getNewFilteredOptions() {
    const { options, inputValue, selectedOptions } = this.state;
    
    const newFilteredOptions = options
                                .filter(option => 
                                  selectedOptions.findIndex(selectedOption => selectedOption.id === option.id) === -1)
                                .filter(option => option.name.includes(inputValue));

    this.setState({
      filteredOptions: newFilteredOptions,
      highlightOptionIndex: 0,
      scrollPos: 0
    })
  }

  onClickSelectedOptions() {
    this.inputRef.current.focus();
  }

  renderSelectedOptions() {
    const { selectedOptions } = this.state;

    return (
      <div
        className="selected-options"
        onClick={this.onClickSelectedOptions}
      >
        {selectedOptions.map((option, index) => (
          <span key={option.id}>
            {option.name}
            <button onClick={() => this.unselectOption(option, index)}>✖</button>
          </span>
        ))}
        <input
          type="text"
          onChange={this.onInputChange}
          onFocus={this.toggleOptionsList}
          onBlur={this.toggleOptionsList}
          onKeyDown={this.onInputKeyDown}
          ref={this.inputRef}
          className="input"
        />
      </div>
    );
  }

  renderOptionsList() {
    const {
      filteredOptions,
      isOptionsListOpen,
      highlightOptionIndex
    } = this.state;

    return isOptionsListOpen && (
      <div className="filtered-options">
        {filteredOptions.map((option, index) => (
          <span
            key={option.id}
            onMouseDown={(event) => this.selectOption(event, option, index)}
            className={highlightOptionIndex === index ? 'highlight' : null}
            onMouseOver={() => this.onMouseOverOption(index)}
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
        <div className={`multiselect-container ${this.props.multiselectContainerClass || ''}`}>
          {this.renderSelectedOptions()}
          {this.renderOptionsList()}
        </div>
      </React.Fragment>
    );
  }
}