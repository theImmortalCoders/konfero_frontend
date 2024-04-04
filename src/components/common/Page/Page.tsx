export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col min-h-max min-w-screen bg-black2darkblue-gradient text-close2White justify-center items-center">
      {children}
    </main>
  );
}
