function capitalizeFirstLetter(value: string) {
  return value
    .split(' ')
    .map(word => word.charAt(0).toLocaleUpperCase() + word.slice(1))
    .join(' ')
    .trim()
}

export const stringUtils = { capitalizeFirstLetter }
