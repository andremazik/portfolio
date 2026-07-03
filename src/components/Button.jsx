import classnames from "classnames";

export default function Button({ children, size, background, ...rest }) {
  let sizeClass = size && `button-${size}`;
  let backgroundClass = background && `${background}`;
  const allClasses = classnames(sizeClass, backgroundClass);

  return (
    <button className={allClasses} {...rest}>
      {children}
    </button>
  );
}
