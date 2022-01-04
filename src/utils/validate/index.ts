import { LocationQuery } from 'vue-router'
import { sortingDirections, sortingOptions } from '../../types/index'

// Validate url params
export const validateUrl = (urlParams: LocationQuery): any => {
  return Object.keys(urlParams)
    .map((key) => {
      if (validateParam(key, urlParams[key])) return { key, values: urlParams[key] }
    })
    .filter((x) => x !== undefined)
}
// Check exist url param
export const validateParam = (key: string, value: any): boolean => {
  return AvailableParam[key](value)
}

const AvailableParam: Record<string, (value: string) => boolean> = {
  sort: isSort,
  dir: isDir,
  etc: isDefault,
}

// Validate function
/////////////////////////////////////////////////////////////////////////////////

function isDefault(): boolean {
  return true
}

function isSort(value: any): boolean {
  if (Array.isArray(value)) return false

  return sortingOptions.includes(value)
}

function isDir(value: any): boolean {
  if (Array.isArray(value)) return false

  return sortingDirections.includes(value)
}
