export default function button({
  children,
  type = 'button',
  onClick,
  disabled = false,
  className = '',
}) {
  const baseStyle = `w-60 h-12 text-ink bg-pink-300 rounded-md font-basic disabled:opacity-50 disabled:cursor-not-allowed shrink-0`;
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
