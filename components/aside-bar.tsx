"use client";

import type { LinkItem } from "@/models/link-item";
import { EditingProvider } from "@/providers/EditingProvider";
import { useQuery } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import { useState } from "react";
import AsideBarHeader from "./aside-bar-header";
import LinksList from "./links/links-list";

export default function AsideBar() {
	const [linksTree, setLinksTree] = useState<LinkItem[]>([]);
	const [lastSavedLinks, setLastSavedLinks] = useState<LinkItem[]>([]);

	const { isLoading, isError } = useQuery({
		queryKey: ["links-tree"],
		queryFn: async (): Promise<LinkItem[] | null> => {
			const res = await fetch("/api/nav");
			if (!res.ok) {
				throw new Error("Failed to fetch links tree");
			}
			const initialLinks = await res.json();
			setLinksTree(initialLinks);
			setLastSavedLinks(initialLinks);
			return initialLinks;
		},
	});

	return (
		<EditingProvider
			originalLinksTree={linksTree}
			setOriginalLinksTree={setLinksTree}
			lastSavedLinks={lastSavedLinks}
			setLastSavedLinks={setLastSavedLinks}
		>
			<aside className="hidden xl:block w-1/4 max-w-[27.5rem] min-w-fit bg-primary-foreground overflow-auto">
				<AsideBarHeader />
				<div className="px-3.5 py-9">
					{isLoading ? (
						<div className="flex items-center justify-between gap-2 px-7 py-5 bg-background rounded-lg">
							<span className="text-2xl">Loading</span>
							<LoaderIcon className="animate-spin" />
						</div>
					) : isError ? (
						<div className="px-7 py-5 bg-destructive text-destructive-foreground rounded-lg">
							Sorry, there was an error
						</div>
					) : (
						<LinksList />
					)}
				</div>
			</aside>
		</EditingProvider>
	);
}
