export function Button3D({ 
  children, 
  onClick, 
  disabled = false, 
  width = '100%', 
  height = '51px',
  className = ''
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-lg text-white transition-all ${
        disabled
          ? 'bg-gray-300 cursor-not-allowed opacity-70'
          : 'bg-[#3ABA67] hover:opacity-90 active:translate-y-1 cursor-pointer'
      } ${className}`}
      style={{
        fontFamily: "'Quicksand', sans-serif",
        fontWeight: 700,
        fontSize: '16px',
        letterSpacing: '-0.02em',
        lineHeight: '1.2',
        boxShadow: disabled ? '0px 5px 0px #A0A0A0' : '0px 5px 0px #007558',
        width,
        height,
      }}
    >
      {children}
    </button>
  );
}