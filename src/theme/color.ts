import { palette } from './palette';

export const color = {
  palette,
  transparent: 'rgba(0, 0, 0, 0)',

  background: 'rgba(0, 0, 0, 0)',
  primaryBackground: palette.fadedJade,
  disabledBackground: `${palette.outerSpace}33`, // Opacity 0.2

  voidBackground: '#DCDCDC',
  text: palette.outerSpace,
  textSecondary: palette.blackSecondary,
  textDisabled: `${palette.outerSpace}66`, // Opacity 0.4
  dim: palette.lightGrey,
  error: palette.angry,
};
