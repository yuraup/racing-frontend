export default function Button({
  children,
  type = 'button',
  onClick,
  disabled = false,
  className = '',
}) {
  const baseStyle = `text-ink bg-pink-300 rounded-md font-basic disabled:opacity-50 hover:cursor-pointer disabled:cursor-not-allowed shrink-0`;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${className}`}
    >
      {children}
    </button>
  );
}
