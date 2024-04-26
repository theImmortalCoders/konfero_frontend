export default function Page({
                                 className,
                                 children,
                             }: {
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <main
            className={`flex flex-col min-h-max min-w-screen bg-black2darkblue-gradient text-close2White items-center ${className}`}
        >
            {children}
        </main>
    );
}
