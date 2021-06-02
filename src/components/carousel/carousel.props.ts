import { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { BaseProps } from '~/components/base.props';

export interface CarouselProps extends BaseProps, HTMLAttributes<HTMLDivElement> {
  onSlideChange: (newActiveSlideIndex: number) => any;
  activeIndex: number;
  jumpTo?: number;
  setActiveIndex: (newActiveIndex: number) => any;
  containerStyle?: CSSProperties;
  moveable?: boolean;
  threshold?: number;
  children: ReactNode[];
}
