
import ClientProviders from './ClientProviders';

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {

    return (
        <html lang="en" suppressHydrationWarning={true}>
            <head> </head>
            <body>
                <>
                    <ClientProviders>
                        {children}
                    </ClientProviders>
                </>
            </body>
        </html>
    );
}