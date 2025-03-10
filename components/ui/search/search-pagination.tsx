import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../button";

export default function SearchPagination() {
	return (
		<div className="mx-auto flex gap-2 justify-center items-center">
			<Button variant="outline" size="icon" className="rounded-sm cursor-pointer">
				<ChevronLeftIcon />
			</Button>
			<Button variant="outline" size="icon" className="rounded-sm cursor-pointer">
				1
			</Button>
			<Button variant="outline" size="icon" className="rounded-sm bg-accent text-accent-foreground cursor-pointer">
				2
			</Button>
			<Button variant="outline" size="icon" className="rounded-sm cursor-pointer">
				3
			</Button>
			<Button variant="outline" size="icon" className="rounded-sm cursor-pointer">
				<ChevronRightIcon />
			</Button>
		</div>
	);
}
