export default function GradientBackground() {
  return (
    <div
      className="absolute inset-0 z-0"
      style={{ background: '#020617' }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 90% 70% at 50% -10%, rgba(139,92,246,0.35), transparent)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 90%, rgba(34,197,94,0.2), transparent)',
        }}
      />
    </div>
  );
}
