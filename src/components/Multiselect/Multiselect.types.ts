export type TMultiselectProps = {
  containerClassName: string,
  placeholder: string,
  options: string[],
  onChange: (arg0: string[]) => void
}

export type TMultiselectOption = {
  id: number,
  name: string
}

export type TMultiselectOptions = Array<TMultiselectOption>

export type TMultiselectState = {
  options: TMultiselectOptions,
  selectedOptions: TMultiselectOptions,
  filteredOptions: TMultiselectOptions,
  isOptionsListOpen: boolean,
  inputValue: string,
  highlightOptionIndex: number,
  scrollPos: number,
  scrollMaxPos: number,
  isScrollingByKeyboard: boolean
}

export type TGetNewSelectedOptionsParams = {
  type: 1,
  newOption: TMultiselectOption,
} | {
  type: 2,
  deletedIndex: number
}

export type TGetNewFilteredOptionsParams = {
  type: 1,
  changeableOption: TMultiselectOption
} | {
  type: 2,
  inputValue: string
} | {
  type: 3,
  changeableOption: TMultiselectOption,
  inputValue: string
}
