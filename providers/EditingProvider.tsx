"use client";

import type { LinkItem } from "@/models/link-item";
import { useQuery } from "@tanstack/react-query";
import { type ReactNode, createContext, useContext, useState } from "react";

const EditingContext = createContext<{
	isEditing: boolean;
	setIsEditing: (isEditing: boolean) => void;
	originalLinksTree: LinkItem[];
	setOriginalLinksTree: (linksTree: LinkItem[]) => void;
	lastSavedLinks: LinkItem[];
	setLastSavedLinks: (lastSavedLinks: LinkItem[]) => void;
	isLoading?: boolean;
	isError?: boolean;
}>({
	isEditing: false,
	setIsEditing: () => {},
	originalLinksTree: [] as LinkItem[],
	setOriginalLinksTree: () => {},
	lastSavedLinks: [] as LinkItem[],
	setLastSavedLinks: () => {},
	isLoading: false,
	isError: false,
});

export function EditingProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [isEditing, setIsEditing] = useState(false);
	const [originalLinksTree, setOriginalLinksTree] = useState<LinkItem[]>([]);
	const [lastSavedLinks, setLastSavedLinks] = useState<LinkItem[]>([]);

	const { isLoading, isError } = useQuery({
		queryKey: ["links-tree"],
		queryFn: async (): Promise<LinkItem[] | null> => {
			const res = await fetch("/api/nav");
			if (!res.ok) {
				throw new Error("Failed to fetch links tree");
			}
			const initialLinks = await res.json();
			setOriginalLinksTree(initialLinks);
			setLastSavedLinks(initialLinks);
			return initialLinks;
		},
	});
	return (
		<EditingContext.Provider
			value={{
				isEditing,
				setIsEditing,
				originalLinksTree,
				setOriginalLinksTree,
				lastSavedLinks,
				setLastSavedLinks,
				isLoading,
				isError,
			}}
		>
			{children}
		</EditingContext.Provider>
	);
}

export default function useEditingContext() {
	const context = useContext(EditingContext);

	if (!context) {
		throw new Error("useEditingContext must be used within a EditingProvider");
	}

	return context;
}
