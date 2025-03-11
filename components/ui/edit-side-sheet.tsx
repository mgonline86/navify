"use client";

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import useEditingContext from "@/providers/EditingProvider";
import { LoaderIcon, MenuIcon } from "lucide-react";
import { useState } from "react";
import AsideBarHeader from "../aside-bar-header";
import LinksList from "../links/links-list";
import { Button } from "./button";

export default function EditSideSheet() {
	const [open, setOpen] = useState(false);
	const {
		isLoading,
		isError,
		isEditing,
		setIsEditing,
		setOriginalLinksTree,
		lastSavedLinks,
	} = useEditingContext();

	const handleCancelEdits = () => {
		setOriginalLinksTree(lastSavedLinks);
		setIsEditing(false);
	};
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger className="relative border w-14 h-14 rounded-xs flex items-center justify-center xl:hidden">
				<MenuIcon />
			</SheetTrigger>
			<SheetContent className="w-full max-h-dvh overflow-y-scroll bg-primary-foreground">
				<SheetHeader className="p-0">
					<SheetTitle className="px-6 pt-6">
						<AsideBarHeader closeSheet={() => setOpen(false)} />
					</SheetTitle>
					<div className="px-3.5 pb-9">
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
						{isEditing && (
							<div className="xl:hidden flex justify-center mt-11">
								<Button
									variant="link"
									size="icon"
									onClick={handleCancelEdits}
									className="text-destructive text-lg font-medium"
								>
									Cancel
								</Button>
							</div>
						)}
					</div>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
}
