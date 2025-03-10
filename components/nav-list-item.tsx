import type { NavItem } from "@/models/nav-item";
import Image from "next/image";
import Link from "next/link";

export default function NavListItem({ navItem }: { navItem: NavItem }) {
	return (
		<li>
			<Link
				href={navItem.href}
				className="flex flex-col items-center group hover:-translate-y-0.5 duration-100 ease-in-out transform"
			>
				<div className="relative">
					{navItem.label === "Messaging" && (
						<div className="absolute -top-1.5 -right-1.5 w-4 h-4 flex items-center justify-center bg-destructive rounded-full text-[9px]">
							1
						</div>
					)}
					<Image
						src={navItem.iconURL}
						alt={navItem.iconAlt || "icon"}
						className="w-6 h-6"
					/>
				</div>
				<span className="text-lg group-hover:underline group-hover:underline-offset-4">
					{navItem.label}
				</span>
			</Link>
		</li>
	);
}
