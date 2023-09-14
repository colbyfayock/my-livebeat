import { ReactNode } from 'react';

interface ContainerProps {
  children?: ReactNode;
  className?: string;
}

const Container = ({ children, className = '' }: ContainerProps) => {
  return (
    <div className={`w-full max-w-7xl my-0 mx-auto px-5 ${className}`}>
      { children }
    </div>
  )
}

export default Container;