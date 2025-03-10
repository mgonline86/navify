import type { LinkItem } from "@/models/link-item";
import useEditingContext from "@/providers/EditingProvider";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import { ChevronDownIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import dragIcon from "../../public/icons/drag.svg";
import editIcon from "../../public/icons/edit-pin.svg";
import eyeSlashIcon from "../../public/icons/eye-slash.svg";
import eyeIcon from "../../public/icons/eye.svg";
import saveIcon from "../../public/icons/check.svg";
import closeIcon from "../../public/icons/close.svg";
import { Button } from "../ui/button";
import { Collapsible, CollapsibleTrigger } from "../ui/collapsible";
import LinksList from "./links-list";

export default function LinkItemCard({
	item,
	linksTreeSlice,
	parentAddress = [],
}: { item: LinkItem; linksTreeSlice: LinkItem[]; parentAddress?: number[] }) {
	const [isOpen, setIsOpen] = useState(false);

	const { isEditing, originalLinksTree, setOriginalLinksTree } =
		useEditingContext();

	// prevent navigation if still Editing
	useEffect(() => {
		const handleBeforeUnload = (event: BeforeUnloadEvent) => {
			if (isEditing) {
				event.preventDefault();
			}
		};
		window.addEventListener("beforeunload", handleBeforeUnload);
		return () => window.removeEventListener("beforeunload", handleBeforeUnload);
	}, [isEditing]);

	const [editingTitle, setEditingTitle] = useState(false);

	const [title, setTitle] = useState(item.title);

	const newParentAddress = useMemo(() => {
		const index = linksTreeSlice?.findIndex((link) => link.id === item.id);
		if (index !== undefined) {
			return [...parentAddress, index];
		}
		return [...parentAddress];
	}, [linksTreeSlice, parentAddress, item]);

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: item.id });

	const style = {
		transition,
		transform: CSS.Translate.toString(transform),
	};

	if (item.visible === false && !isEditing) return null;

	const updateNestedItem = (
		tree: LinkItem[],
		address: number[],
		newData: Partial<LinkItem>, // Partial allows updating only specific properties
	): LinkItem[] => {
		if (address.length === 0) return tree; // No address, return unchanged

		const index = address[0];

		if (index >= tree.length) return tree; // Safety check

		return tree.map((item, i) =>
			i === index
				? {
						...item,
						...(address.length === 1
							? newData // Update the item at the final depth
							: {
									children: item.children
										? updateNestedItem(item.children, address.slice(1), newData)
										: [],
								}),
					}
				: item,
		);
	};

	const handleToggleVisibility = () => {
		const newVisible =
			item.visible === undefined || item.visible ? false : undefined;
		const updatedTree = updateNestedItem(originalLinksTree, newParentAddress, {
			visible: newVisible,
		});
		setOriginalLinksTree([...updatedTree]);
	};

	const handleCloseEditTitle = () => {
		setEditingTitle(false);
		setTitle(item.title);
	};

	const handleSaveTitle = () => {
		const updatedTree = updateNestedItem(originalLinksTree, newParentAddress, {
			title,
		});
		setOriginalLinksTree([...updatedTree]);
		setEditingTitle(false);
	};

	return (
		<Collapsible
			asChild
			open={!isDragging && (isEditing || isOpen)}
			onOpenChange={setIsOpen}
		>
			<li ref={setNodeRef} style={style} className="max-w-md">
				<div
					className={`flex gap-1.5 items-center px-7 py-5 rounded-lg touch-none min-w-fit${isDragging || item.visible === false ? " opacity-50" : ""}${parentAddress.length > 0 ? "" : " bg-background"}`}
				>
					{isEditing && (
						<Image
							src={dragIcon}
							alt="drag-icon"
							className="w-7 h-7 cursor-grab active:cursor-grabbing shrink-0"
							{...attributes}
							{...listeners}
						/>
					)}
					{isEditing && editingTitle ? (
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="text-lg xl:text-2xl w-full border border-border bg-background rounded-lg px-2 py-1 focus:outline-none focus:border-accent"
							required
						/>
					) : (
						<Link href={item.target || "#"} className="text-lg xl:text-2xl grow xl:truncate">
							{item.title}
						</Link>
					)}
					{isEditing && (
						<div className="flex items-center">
							{editingTitle ? (
								<div className="flex items-center gap-1 me-1">
									<Button
										variant="link"
										className="hover:scale-105 duration-300 ease-in-out transform cursor-pointer w-4 p-0"
										onClick={handleCloseEditTitle}
									>
										<Image src={closeIcon} alt="close-icon" className="h-4" />
									</Button>
									<Button
										variant="link"
										className="hover:scale-105 duration-300 ease-in-out transform cursor-pointer w-4 p-0"
										onClick={handleSaveTitle}
									>
										<Image src={saveIcon} alt="save-icon" className="h-4" />
									</Button>
								</div>
							) : (
								<Button
									variant="link"
									size="icon"
									className="hover:scale-105 duration-300 ease-in-out transform cursor-pointer"
									onClick={() => setEditingTitle(true)}
								>
									<Image src={editIcon} alt="edit-icon" className="w-6 h-6" />
								</Button>
							)}
							<Button
								variant="link"
								size="icon"
								className="hover:scale-105 duration-300 ease-in-out transform cursor-pointer"
							>
								<Image
									src={
										item.visible === undefined || item.visible
											? eyeIcon
											: eyeSlashIcon
									}
									alt="eye-icon"
									className="w-6 h-6"
									onClick={handleToggleVisibility}
								/>
							</Button>
						</div>
					)}
					{item.children && item.children.length > 0 && !isEditing && (
						<CollapsibleTrigger asChild>
							<Button variant="link" size="sm" className="cursor-pointer">
								<ChevronDownIcon
									className={`h-4 w-4${isOpen ? " rotate-180" : ""} transition`}
								/>
								<span className="sr-only">Toggle</span>
							</Button>
						</CollapsibleTrigger>
					)}
				</div>
				{item.children && item.children.length > 0 && (
					<CollapsibleContent className="space-y-2 ms-3.5">
						<LinksList parentAddress={newParentAddress} />
					</CollapsibleContent>
				)}
			</li>
		</Collapsible>
	);
}
