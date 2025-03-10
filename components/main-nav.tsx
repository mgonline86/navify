import type { NavItem } from "@/models/nav-item";
import Image from "next/image";
import Link from "next/link";
import jobsIcon from "../public/icons/bag.svg";
import notificationsIcon from "../public/icons/bell.svg";
import homeIcon from "../public/icons/home.svg";
import messagingIcon from "../public/icons/message.svg";
import searchIcon from "../public/icons/search.svg";
import employersIcon from "../public/icons/users-group.svg";
import Logo from "./logo";
import NavListItem from "./nav-list-item";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import UserNav from "./user-nav";

const pagesLinks: NavItem[] = [
	{
		label: "Home",
		href: "/",
		iconURL: homeIcon,
		iconAlt: "home-icon",
	},
	{
		label: "Jobs",
		href: "/jobs",
		iconURL: jobsIcon,
		iconAlt: "jobs-icon",
	},
	{
		label: "Employers",
		href: "/employers",
		iconURL: employersIcon,
		iconAlt: "employers-icon",
	},
];
const profileLinks: NavItem[] = [
	{
		label: "Notifications",
		href: "/notifications",
		iconURL: notificationsIcon,
		iconAlt: "notifications-icon",
	},
	{
		label: "Messaging",
		href: "/messaging",
		iconURL: messagingIcon,
		iconAlt: "messaging-icon",
	},
];

export default function MainNav() {
	return (
		<nav className="flex items-center justify-between gap-4 bg-primary text-primary-foreground h-[var(--main-nav-h)] py-4 px-24 space-x-4 lg:space-x-6">
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
