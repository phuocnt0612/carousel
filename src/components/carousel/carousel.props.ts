import { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { BaseProps } from '~/components/base.props';

export interface CarouselProps extends BaseProps, HTMLAttributes<HTMLDivElement> {
  onChange?: () => any;
  containerStyle?: CSSProperties;
  children: ReactNode;
}
