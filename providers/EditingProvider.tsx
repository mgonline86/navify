"use client";

import type { LinkItem } from "@/models/link-item";
import { type ReactNode, createContext, useContext, useState } from "react";

const EditingContext = createContext<{
	isEditing: boolean;
	setIsEditing: (isEditing: boolean) => void;
	originalLinksTree: LinkItem[];
	setOriginalLinksTree: (linksTree: LinkItem[]) => void;
	lastSavedLinks: LinkItem[];
	setLastSavedLinks: (lastSavedLinks: LinkItem[]) => void;
}>({
	isEditing: false,
	setIsEditing: () => {},
	originalLinksTree: [] as LinkItem[],
	setOriginalLinksTree: () => {},
	lastSavedLinks: [] as LinkItem[],
	setLastSavedLinks: () => {},
});

export function EditingProvider({
	children,
	originalLinksTree,
	setOriginalLinksTree,
	lastSavedLinks,
	setLastSavedLinks,
}: {
	children: ReactNode;
	originalLinksTree: LinkItem[];
	setOriginalLinksTree: (linksTree: LinkItem[]) => void;
	lastSavedLinks: LinkItem[];
	setLastSavedLinks: (lastSavedLinks: LinkItem[]) => void;
}) {
	const [isEditing, setIsEditing] = useState(false);
	return (
		<EditingContext.Provider
			value={{
				isEditing,
				setIsEditing,
				originalLinksTree,
				setOriginalLinksTree,
				lastSavedLinks,
				setLastSavedLinks,
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
