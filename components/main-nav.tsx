import type { NavItem } from "@/models/nav-item";
import Image from "next/image";
import Link from "next/link";
import jobsmobIcon from "../public/icons/bag-mob.svg";
import jobsIcon from "../public/icons/bag.svg";
import notificationsmobIcon from "../public/icons/bell-mob.svg";
import notificationsIcon from "../public/icons/bell.svg";
import homemobIcon from "../public/icons/home-mob.png";
import homeIcon from "../public/icons/home.svg";
import messagingmobIcon from "../public/icons/message-mob.svg";
import messagingIcon from "../public/icons/message.svg";
import searchIcon from "../public/icons/search.svg";
import employersmobIcon from "../public/icons/user-group-mob.svg";
import employersIcon from "../public/icons/users-group.svg";
import Logo from "./logo";
import NavListItem from "./nav-list-item";
import { Button } from "./ui/button";
import MobileNav from "./ui/mobile-nav";
import { Separator } from "./ui/separator";
import UserNav from "./user-nav";

export const pagesLinks: NavItem[] = [
	{
		label: "Home",
		href: "/",
		iconURL: homeIcon,
		iconMobURL: homemobIcon,
		iconAlt: "home-icon",
	},
	{
		label: "Jobs",
		href: "/jobs",
		iconURL: jobsIcon,
		iconMobURL: jobsmobIcon,
		iconAlt: "jobs-icon",
	},
	{
		label: "Employers",
		href: "/employers",
		iconURL: employersIcon,
		iconMobURL: employersmobIcon,
		iconAlt: "employers-icon",
	},
];
export const profileLinks: NavItem[] = [
	{
		label: "Notifications",
		href: "/notifications",
		iconURL: notificationsIcon,
		iconMobURL: notificationsmobIcon,
		iconAlt: "notifications-icon",
	},
	{
		label: "Messaging",
		href: "/messaging",
		iconURL: messagingIcon,
		iconMobURL: messagingmobIcon,
		iconAlt: "messaging-icon",
	},
];

export default function MainNav() {
	return (
		<nav className="flex items-center justify-between gap-4 bg-primary text-primary-foreground h-[var(--main-nav-h)] px-5 py-4 xl:px-24 gap-x-4 lg:gap-x-6">
			<MobileNav />
			<div className="flex items-center gap-11">
				<Link href="/">
					<Logo />
				</Link>
				<div className="hidden p-2 rounded-full bg-primary-foreground xl:flex items-center w-md max-full">
					<Button
						variant="accent"
						size="icon"
						className="rounded-full w-12 h-12 cursor-pointer"
					>
						<Image src={searchIcon} alt="search-icon" className="w-6 h-6" />
					</Button>
					<input
						type="search"
						placeholder="Search by name, job title, ..."
						id="search"
						name="search"
						className="grow px-4 py-1.5 text-xl text-primary focus:outline-none placeholder:text-muted-foreground"
					/>
				</div>
			</div>
			<ul className="hidden xl:flex items-center gap-4 justify-between grow max-w-3xl">
				{pagesLinks.map((link) => (
					<NavListItem key={link.href} navItem={link} />
				))}
				<span className="h-14">
					<Separator orientation="vertical" className="bg-muted/50" />
				</span>
				{profileLinks.map((link) => (
					<NavListItem key={link.href} navItem={link} />
				))}
				<UserNav />
			</ul>
		</nav>
	);
}
