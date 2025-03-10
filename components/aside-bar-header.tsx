import { saveLinksTree } from "@/app/apiCalls";
import useEditingContext from "@/providers/EditingProvider";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { toast } from "sonner";
import saveIcon from "../public/icons/check.svg";
import closeIcon from "../public/icons/close.svg";
import settingIcon from "../public/icons/settings.svg";
import { Button } from "./ui/button";
import { ArrowLeftIcon } from "lucide-react";

export default function AsideBarHeader({
	closeSheet,
}: { closeSheet?: () => void }) {
	const {
		isEditing,
		setIsEditing,
		originalLinksTree,
		setOriginalLinksTree,
		lastSavedLinks,
		setLastSavedLinks,
	} = useEditingContext();

	const handleCancelEdits = () => {
		setOriginalLinksTree(lastSavedLinks);
		setIsEditing(false);
	};

	const { mutate, isPending } = useMutation({
		mutationFn: () => saveLinksTree(originalLinksTree),
		onSuccess: () => {
			setLastSavedLinks(originalLinksTree);
			setIsEditing(false);
			toast.success("Changes saved successfully!");
		},
		onError: () => {
			toast.error("Sorry, failed to save changes. Please try again.");
		},
	});
	return (
		<div className="bg-primary-foreground">
			<div className="py-5 xl:px-3.5 xl:py-9">
				<div className="flex justify-between xl:px-7">
					<div className="text-lg font-normal xl:text-2xl flex items-center gap-3">
						<ArrowLeftIcon
							onClick={closeSheet ?? undefined}
							className="xl:hidden"
						/>{" "}
						Menu
					</div>
					{isEditing ? (
						<div className="flex items-center gap-2">
							<Button
								asChild
								variant="link"
								size="icon"
								onClick={handleCancelEdits}
								disabled={isPending}
								className="hidden xl:block hover:scale-105 duration-300 ease-in-out transform cursor-pointer"
							>
								<Image src={closeIcon} alt="close-icon" className="w-10 h-10" />
							</Button>
							<Button
								asChild
								variant="link"
								size="icon"
								disabled={isPending}
								onClick={() => mutate()}
								className="hover:scale-105 duration-300 ease-in-out transform cursor-pointer"
							>
								<Image src={saveIcon} alt="save-icon" className="w-10 h-10" />
							</Button>
						</div>
					) : (
						<Button
							variant="link"
							size="icon"
							onClick={() => setIsEditing(true)}
							className="hover:scale-105 duration-300 ease-in-out transform cursor-pointer"
						>
							<Image src={settingIcon} alt="setting-icon" className="w-7 h-7" />
						</Button>
					)}
				</div>
			</div>
			<hr className="hidden xl:block" />
		</div>
	);
}
