import React, {
  PureComponent,
  KeyboardEvent,
  MouseEvent,
  ChangeEvent,
  ReactNode,
  RefObject
} from 'react';

import {
  TMultiselectProps,
  TMultiselectState,
  TMultiselectOption,
  TMultiselectOptions,
  TGetNewSelectedOptionsParams,
  TGetNewFilteredOptionsParams
} from './Multiselect.types'

import {
  MultiselectContainer,
  TextField,
  FilteredOption,
  FilteredOptions,
  SelectedOption,
  CloseBtn
} from './Multiselect.styled'

export class Multiselect extends PureComponent<TMultiselectProps, TMultiselectState> {
  private inputRef: RefObject<HTMLInputElement>;
  private filteredOptionsRef: RefObject<HTMLDivElement>;

  constructor(props: TMultiselectProps) {
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

    this.inputRef = React.createRef<HTMLInputElement>();
    this.filteredOptionsRef = React.createRef<HTMLDivElement>();
  }

  static defaultProps = {
    placeholder: 'Multiselect dropdown',
    options: [],
    onChange: () => {}
  }

  getResetScrollState = () => ({
    highlightOptionIndex: 0,
    scrollPos: 0
  })

  toggleOptionsList = () => {
    this.setState(prevState => ({
      isOptionsListOpen: !prevState.isOptionsListOpen,
      ...this.getResetScrollState()
    }))
  }

  scrollAtOption = (scrollPos: number, index: number): void => {
    if (this.filteredOptionsRef && this.filteredOptionsRef.current) {
      const element = this.filteredOptionsRef.current.querySelectorAll('span')[index];
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
  }

  scrollManaging = (event: KeyboardEvent) => {
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

  getArrayOfValues = (options: TMultiselectOptions): string[] => options.map(option => option.name)

  selectOption = (newOption: TMultiselectOption) => {
    const newSelectedOptions = this.getNewSelectedOptions({ type: 1, newOption })

    this.setState({
      selectedOptions: newSelectedOptions,
      filteredOptions: this.getNewFilteredOptions({ type: 1, changeableOption: newOption }),
      inputValue: '',
      ...this.getResetScrollState()
    });

    this.scrollAtOption(0, 0)

    const arrayOfValues = this.getArrayOfValues(newSelectedOptions)
    this.props.onChange(arrayOfValues)
  }

  unselectOption = (option: TMultiselectOption, deletedIndex: number): void => {
    const { inputValue } = this.state;

    const newSelectedOptions = this.getNewSelectedOptions({ type: 2, deletedIndex })

    this.setState({
      selectedOptions: newSelectedOptions,
      filteredOptions: this.getNewFilteredOptions({ type: 3, inputValue, changeableOption: option }),
    });

    const arrayOfValues = this.getArrayOfValues(newSelectedOptions)
    this.props.onChange(arrayOfValues)
  }

  getNewSelectedOptions = (params: TGetNewSelectedOptionsParams): TMultiselectOptions => {
    const { selectedOptions } = this.state

    let newSelectedOptions = [...selectedOptions]

    // В случае добавления опции в список (параметр deletedIndex не нужен)
    if (params.type === 1) {
      newSelectedOptions.push(params.newOption)
    }
    // В случае удаления опции из списка выбранных
    else if (params.type === 2) {
      newSelectedOptions.splice(params.deletedIndex, 1);
    }

    return newSelectedOptions
  }

  getOptionsWithoutSelected = (): TMultiselectOptions => {
    const { selectedOptions, options } = this.state

    let selectedOptionsIds = selectedOptions.map(option => option.id)
    const res = options.filter(option => !selectedOptionsIds.includes(option.id))

    return res
  }

  getNewFilteredOptions = (params: TGetNewFilteredOptionsParams): TMultiselectOptions => {
    const { filteredOptions } = this.state;
    let newFilteredOptions: TMultiselectOptions = []

    // В случае добавления опции в список выбранных
    if (params.type === 1) {
      newFilteredOptions = this.getOptionsWithoutSelected()
        .filter(option => option.id !== params.changeableOption.id)
    }
    // В случае изменения значения инпута (параметр changeableOption не нужен)
    else if (params.type === 2) {
      newFilteredOptions = this.getOptionsWithoutSelected()
        .filter(option => option.name.toUpperCase().includes(params.inputValue.toUpperCase()))
    }
    // В случае удаления опции из списка выбранных
    else if (params.type === 3) {
      newFilteredOptions = [...filteredOptions];

      if (params.changeableOption.name.includes(params.inputValue)) {
        let insertIndex = newFilteredOptions.findIndex((filteredOption) => filteredOption.id > params.changeableOption.id);

        if (insertIndex !== -1) {
          newFilteredOptions.splice(insertIndex, 0, { id: params.changeableOption.id, name: params.changeableOption.name });
        } else {
          newFilteredOptions.push({ id: params.changeableOption.id, name: params.changeableOption.name });
        }
      }
    }

    return newFilteredOptions
  }

  onInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const inputValue = event.target.value

    this.setState({
      filteredOptions: this.getNewFilteredOptions({ type: 2, inputValue }),
      inputValue,
      ...this.getResetScrollState()
    });

    this.scrollAtOption(0, 0)
  }

  onMouseOverFilteredOption = (index: number): void => {
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

  onInputKeyDown = (event: KeyboardEvent): void => {
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

    if (event.key === 'Escape' && this.inputRef && this.inputRef.current) {
      this.inputRef.current.blur();
    }

    if ((event.keyCode === 38 || event.keyCode === 40) && filteredOptions.length > 1) {
      event.preventDefault()

      this.scrollManaging(event);
    }

    if (event.key === "Enter" && filteredOptions.length) {
      this.selectOption(filteredOptions[highlightOptionIndex]);
    }
  }

  onClickSelectedOptions = (): void => {
    if (this.inputRef && this.inputRef.current) {
      this.inputRef.current.focus();
    }
  }

  onMouseDownSelectedOption = (event: MouseEvent, option: TMultiselectOption, index: number): void => {
    event.preventDefault()

    if (event.button === 1) {
      this.unselectOption(option, index)
    }
  }

  onClickSelectedOptionCloseBtn = (event: MouseEvent, option: TMultiselectOption, index: number): void => {
    event.stopPropagation();

    this.unselectOption(option, index)
  }

  onMouseDownFilteredOption = (event: MouseEvent, option: TMultiselectOption): void => {
    event.preventDefault()

    this.selectOption(option)
  }

  onMouseMoveFilteredOptions = (): void => {
    const { isScrollingByKeyboard } = this.state
    if (isScrollingByKeyboard) {
      this.setState({
        isScrollingByKeyboard: false
      })
    }
  }

  renderSelectedOptions = (): ReactNode => {
    const { selectedOptions, inputValue } = this.state;

    return (
      <div
        onClick={this.onClickSelectedOptions}
      >
        {selectedOptions.map((option, index) => (
          <SelectedOption
            key={option.id}
            onMouseDown={(event) => this.onMouseDownSelectedOption(event, option, index)}
          >
            {option.name}
            <CloseBtn
              onClick={(event) => this.onClickSelectedOptionCloseBtn(event, option, index)}
            >
              ✖
            </CloseBtn>
          </SelectedOption>
        ))}
        <TextField
          type="text"
          onChange={this.onInputChange}
          onFocus={this.toggleOptionsList}
          onBlur={this.toggleOptionsList}
          onKeyDown={this.onInputKeyDown}
          value={inputValue}
          ref={this.inputRef}
        />
      </div>
    );
  }

  renderFilteredOptions = (): ReactNode => {
    const {
      filteredOptions,
      isOptionsListOpen,
      highlightOptionIndex
    } = this.state;

    return isOptionsListOpen && (
      <FilteredOptions
        onMouseMove={this.onMouseMoveFilteredOptions}
        ref={this.filteredOptionsRef}
      >
        {filteredOptions.map((option, index) => (
          <FilteredOption
            key={option.id}
            onMouseDown={(event) => this.onMouseDownFilteredOption(event, option)}
            isHighlight={highlightOptionIndex === index}
            onMouseOver={() => this.onMouseOverFilteredOption(index)}
          >
            {option.name}
          </FilteredOption>
        ))}
      </FilteredOptions>
    );
  }

  render(): ReactNode {
    const { placeholder } = this.props;

    return (
      <React.Fragment>
        <h2>{placeholder}</h2>
        <MultiselectContainer>
          {this.renderSelectedOptions()}
          {this.renderFilteredOptions()}
        </MultiselectContainer>
      </React.Fragment>
    );
  }
}
