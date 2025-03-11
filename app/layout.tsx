import AsideBar from "@/components/aside-bar";
import MainNav from "@/components/main-nav";
import SortDropDown from "@/components/sort-dropdown";
import EditSideSheet from "@/components/ui/edit-side-sheet";
import SearchHeader from "@/components/ui/search/search-header";
import { EditingProvider } from "@/providers/EditingProvider";
import QueryProvider from "@/providers/QueryProvider";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const dmSans = DM_Sans({
	variable: "--font-dm-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Navify",
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
							<div className="pt-2 xl:pt-4 pb-9 px-5 xl:ps-6 xl:pe-14 grow flex flex-col">
								<div className="hidden xl:flex justify-end">
									<SortDropDown />
								</div>
								<div className="xl:pe-20 mt-5">
									<div className="flex items-center justify-between gap-1.5 min-h-14 xl:min-h-28">
										<SearchHeader />
										<EditSideSheet />
									</div>
									{children}
								</div>
							</div>
						</main>
					</EditingProvider>
					<Toaster />
				</body>
			</QueryProvider>
		</html>
	);
}
