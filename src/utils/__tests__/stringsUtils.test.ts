import { stringUtils } from '@utils'

describe('stringUtils', () => {
  describe('capitalizeFirstLetter', () => {
    it('should capitalize the first letter of each word', () => {
      expect(stringUtils.capitalizeFirstLetter('Ronald tomaz')).toBe(
        'Ronald Tomaz'
      )

      expect(stringUtils.capitalizeFirstLetter('ronald')).toBe('Ronald')

      expect(stringUtils.capitalizeFirstLetter('ronald tomaz')).toBe(
        'Ronald Tomaz'
      )
    })

    it('should remove leading/traling spaces', () => {
      expect(stringUtils.capitalizeFirstLetter(' Ronald tomaz')).toBe(
        'Ronald Tomaz'
      )

      expect(stringUtils.capitalizeFirstLetter('Ronald tomaz ')).toBe(
        'Ronald Tomaz'
      )
    })
  })
})
