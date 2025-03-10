import { ChevronRightIcon } from "lucide-react";
import avatarImage from "../../public/img/avatar.png";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

export default function UserNavLabel() {
	return (
		<div className="flex items-center gap-4">
			<Avatar className="h-[4.375rem] w-[4.375rem]">
				<AvatarImage src={avatarImage.src} alt="avatar" />
				<AvatarFallback>AA</AvatarFallback>
			</Avatar>
			<div className="flex flex-col grow">
				<span className="text-lg">Ahmed Amar</span>
				<span className="text-sm text-secondary font-normal">
					UX UI Designer
				</span>
			</div>
			<ChevronRightIcon strokeWidth={1.5} className="text-muted-foreground" />
		</div>
	);
}
