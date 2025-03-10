import Image from "next/image";
import dropdown from "../public/icons/dropdown.svg";
import avatarImage from "../public/img/avatar.png";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import UserNavLabel from "./ui/user-nav-label";

export default function UserNav() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				asChild
				className="hover:-translate-y-0.5 duration-100 ease-in-out transform"
			>
				<div className="flex flex-col items-center cursor-pointer">
					<Button
						variant="ghost"
						className="relative h-8 w-8 rounded-full cursor-pointer"
					>
						<Avatar className="h-8 w-8">
							<AvatarImage src={avatarImage.src} alt="avatar" />
							<AvatarFallback>AA</AvatarFallback>
						</Avatar>
					</Button>
					<div className="flex items-center gap-1 justify-center">
						<span className="text-lg group-hover:underline group-hover:underline-offset-4">
							Profile
						</span>
						<Image src={dropdown} alt="dropdown" className="w-auto h-auto" />
					</div>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-80 max-w-full" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<UserNavLabel />
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup className="py-5 px-6">
					<DropdownMenuItem className="cursor-pointer text-lg font-medium text-secondary">
						Setting and privacy
					</DropdownMenuItem>
					<DropdownMenuItem className="cursor-pointer text-lg font-medium text-secondary">
						Language
					</DropdownMenuItem>
					<DropdownMenuItem className="cursor-pointer text-lg font-medium text-secondary">
						Help
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="py-5 px-8 cursor-pointer text-lg font-medium text-destructive focus:text-destructive hover:text-destructive focus:bg-destructive/10 hover:bg-destructive/10">
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
