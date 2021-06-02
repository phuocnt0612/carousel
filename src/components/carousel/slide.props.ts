import { HTMLAttributes, ReactNode } from 'react';
import { BaseProps } from '~/components/base.props';

export interface SlideProps extends BaseProps, HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  moveable?: boolean;
}
