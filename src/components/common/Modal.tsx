import React from "react";

interface IModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}
const Modal = (props: IModalProps) => {
  const { isOpen, onClose, children, ...rest } = props;

  return (
    <div
      className={`absolute w-screen h-screen top-0 left-0 z-50 bg-white/60 flex items-center justify-center
    ${!isOpen && "hidden"}`}
      onClick={() => {
        onClose();
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Modal;
