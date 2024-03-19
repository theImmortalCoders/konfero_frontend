export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-max bg-yellow-300 z-0 item-center">
      {children}
    </main>
  );
}
