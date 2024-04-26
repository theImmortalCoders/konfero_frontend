"use client";
import React, {useMemo} from "react";
import {QueryClient, QueryClientProvider} from "react-query";

export function QueryProvider({children}: React.PropsWithChildren) {
    const client = useMemo(() => {
        return new QueryClient({
            defaultOptions: {
                queries: {
                    staleTime: 5 * 60 * 1000,
                },
            },
        });
    }, []);

    return (
        <QueryClientProvider client={client} contextSharing={true}>
            {children}
            {/*<ReactQueryDevtools initialIsOpen={false} />*/}
        </QueryClientProvider>
    );
}
