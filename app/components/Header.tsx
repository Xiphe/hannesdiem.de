import { ComponentPropsWithoutRef } from 'react';
import Logo from '~/components/Logo';
import clsx from 'clsx';

export default function Header({
  children,
  className,
  ...rest
}: ComponentPropsWithoutRef<'div'>) {
  return (
    <header className={clsx(className, 'shadow-md h-20')} {...rest}>
      <div className="container mx-auto flex items-center">
        <div className="h-20">
          <Logo className="h-40 z-10 relative" />
        </div>
        <p className="text-3xl font-extralight">Hannes Diem</p>
      </div>
      {children}
    </header>
  );
}
