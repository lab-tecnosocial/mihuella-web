export function Button3DWater({
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
          : 'bg-[#2178BD] hover:opacity-90 active:translate-y-1 cursor-pointer'
      } ${className}`}
      style={{
        fontFamily: "'Quicksand', sans-serif",
        fontWeight: 700,
        fontSize: '20px',
        letterSpacing: '-0.02em',
        lineHeight: '28px',
        boxShadow: disabled ? '0px 5px 0px #A0A0A0' : '0px 5px 0px #224B6D',
        color: '#FAFAFA',
        width,
        height,
      }}
    >
      {children}
    </button>
  );
}