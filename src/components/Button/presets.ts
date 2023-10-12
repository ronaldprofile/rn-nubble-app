import { ButtonPreset, TouchableOpacityBoxProps } from '@components'
import { ThemeColors } from '../../theme'

interface ButtonUI {
  container: TouchableOpacityBoxProps
  content: ThemeColors
}

export const buttonPresets: Record<
  ButtonPreset,
  {
    default: ButtonUI
    disabled: ButtonUI
  }
> = {
  primary: {
    default: {
      container: {
        backgroundColor: 'primary'
      },
      content: 'primaryContrast'
    },

    disabled: {
      container: {
        backgroundColor: 'gray4'
      },
      content: 'gray2'
    }
  },

  outline: {
    default: {
      container: {
        borderWidth: 2,
        borderColor: 'primary'
      },
      content: 'primary'
    },

    disabled: {
      container: {
        borderWidth: 2,
        borderColor: 'gray4'
      },
      content: 'gray2'
    }
  }
}
