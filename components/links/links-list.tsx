import { trackDragandDrop } from "@/app/apiCalls";
import type { LinkItem } from "@/models/link-item";
import useEditingContext from "@/providers/EditingProvider";
import {
	DndContext,
	type DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	TouchSensor,
	closestCorners,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	SortableContext,
	arrayMove,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useMemo } from "react";
import LinkItemCard from "./link-item-card";

export default function LinksList({
	parentAddress = [],
}: { parentAddress?: number[] }) {
	const { setOriginalLinksTree, originalLinksTree } = useEditingContext();

	const linksTreeSlice = useMemo(() => {
		let targetSlice = [...originalLinksTree];
		const addressCopy = [...parentAddress];

		while (addressCopy.length > 0) {
			targetSlice = [...(targetSlice[addressCopy[0]]?.children || [])];
			addressCopy.shift();
		}
		return targetSlice;
	}, [originalLinksTree, parentAddress]);

	const getLinkPos = (id: number) =>
		linksTreeSlice?.findIndex((link) => link.id === id);

	const updateOriginalLinksTree = (
		originalLinksTree: LinkItem[],
		parentAddress: number[],
		childUpdatedArray: LinkItem[],
	) => {
		const updateNestedLinks = (
			links: LinkItem[],
			address: number[],
		): LinkItem[] => {
			if (address.length === 0) {
				return childUpdatedArray || links;
			}

			const parentIndex = address[0];
			if (parentIndex >= links.length) return links;

			return links.map((link, index) =>
				index === parentIndex
					? {
							...link,
							children: link.children
								? updateNestedLinks(link.children, address.slice(1))
								: [],
						}
					: link,
			);
		};

		return updateNestedLinks(originalLinksTree, parentAddress);
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { over, active } = event;
		if (active.id === over?.id) return;

		const oldIndex = getLinkPos(Number(active.id));
		const newIndex = getLinkPos(Number(over?.id));
		const childUpdatedArray = arrayMove(linksTreeSlice, oldIndex, newIndex);

		const newOriginalLinks = updateOriginalLinksTree(
			originalLinksTree,
			parentAddress,
			childUpdatedArray,
		);
		setOriginalLinksTree(newOriginalLinks);

		// track drag and drop
		trackDragandDrop({ id: Number(active.id), from: oldIndex, to: newIndex });
	};

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(TouchSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	if (linksTreeSlice && linksTreeSlice.length < 0) return null;
	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCorners}
			onDragEnd={handleDragEnd}
		>
			<ul className="inline-flex flex-col gap-3.5 min-w-full">
				<SortableContext
					items={linksTreeSlice}
					strategy={verticalListSortingStrategy}
				>
					{linksTreeSlice?.map((item) => (
						<LinkItemCard
							key={item.id}
							item={item}
							linksTreeSlice={linksTreeSlice}
							parentAddress={parentAddress}
						/>
					))}
				</SortableContext>
			</ul>
		</DndContext>
	);
}
