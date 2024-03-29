export default function Box({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main
      className={`items-start h-auto z-0 rounded-3xl px-8 py-8 text-close2White ${className}`}
    >
      {children}
    </main>
  );
}
