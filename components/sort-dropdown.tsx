"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

const options = [
	{
		value: "top",
		label: "Top match",
	},
	{
		value: "new",
		label: "Newest",
	},
	{
		value: "latest",
		label: "Latest",
	},
];

export default function SortDropDown() {
	const [value, setValue] = useState<string>("top");

	return (
		<Select value={value} onValueChange={setValue}>
			<SelectTrigger
				icon={
					<ChevronDownIcon className="size-5 stroke-accent group-data-[state=open]:rotate-180" />
				}
				className="w-full max-w-[19.125rem] h-16 px-7 py-5 bg-transparent data-[state=open]:bg-primary-foreground data-[state=open]:rounded-b-none group cursor-pointer"
			>
				<div className="flex items-center gap-2 text-xl font-medium text-accent">
					<span className="shrink text-primary">Sorting by:</span>
					<SelectValue />
				</div>
			</SelectTrigger>
			<SelectContent
				className="data-[side=bottom]:translate-y-0 rounded-t-none w-full px-0 pt-0 pb-4 max-w-[19.125rem]"
				viewPortClassName="p-0"
			>
				{options.map((option) => (
					<SelectItem
						key={option.value}
						value={option.value}
						className={`text-xl text-secondary px-7 py-5 rounded-none focus:bg-background focus:underline focus:text-accent hover:bg-background hover:text-accent cursor-pointer${
							option.value === value ? " bg-background text-accent" : ""
						}`}
					>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
