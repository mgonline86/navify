"use client";

import useEditingContext from "@/providers/EditingProvider";
import { LoaderIcon } from "lucide-react";
import AsideBarHeader from "./aside-bar-header";
import LinksList from "./links/links-list";

export default function AsideBar() {
	const { isLoading, isError } = useEditingContext();
	return (
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
	);
}
