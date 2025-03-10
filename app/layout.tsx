import AsideBar from "@/components/aside-bar";
import MainNav from "@/components/main-nav";
import QueryProvider from "@/providers/QueryProvider";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { EditingProvider } from "@/providers/EditingProvider";

const dmSans = DM_Sans({
	variable: "--font-dm-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Navify"
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<QueryProvider>
				<body
					className={`${dmSans.variable} antialiased font-[family-name:var(--font-dm-sans)] flex flex-col min-h-svh`}
				>
					<EditingProvider>
						<MainNav />
						<main className="xl:flex grow">
							<AsideBar />
							{children}
						</main>
					</EditingProvider>
					<Toaster />
				</body>
			</QueryProvider>
		</html>
	);
}
