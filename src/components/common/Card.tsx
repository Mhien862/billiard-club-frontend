import React from "react";

interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  title?: string;
  className?: string;
}
const Card = (props: ICardProps) => {
  const { children, title, className, ...rest } = props;
  return (
    <div
      className={`w-full flex flex-col items-center justify-center 
      cursor-pointer animated-card py-5 ${className}`}
      {...rest}
    >
      {children}
      {title && <h4>{title}</h4>}
    </div>
  );
};

export default Card;
