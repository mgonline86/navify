"use client";

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import avatarImage from "../../public/img/avatar.png";
import { pagesLinks, profileLinks } from "../main-nav";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Separator } from "./separator";
import UserNavLabel from "./user-nav-label";

export default function MobileNav() {
	const [open, setOpen] = useState(false);
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger className="relative xl:hidden">
				<Avatar className="h-11 w-11">
					<AvatarImage src={avatarImage.src} alt="avatar" />
					<AvatarFallback>AA</AvatarFallback>
				</Avatar>
				<span className="absolute -bottom-1 -right-1 rounded-full bg-muted h-5 w-5 flex items-center justify-center">
					<MenuIcon size={12} className="stroke-primary" />
				</span>
			</SheetTrigger>
			<SheetContent onClick={() => setOpen(false)} className="bg-primary-foreground max-h-dvh overflow-y-scroll">
				<SheetHeader className="p-0">
					<SheetTitle className="p-6">
						<UserNavLabel />
					</SheetTitle>
					<ul className="flex flex-col gap-5 justify-between p-6">
						{[...pagesLinks, ...profileLinks].map((link) => (
							<li key={link.href}>
								<Link href={link.href} className="flex items-center gap-2.5">
									<div className="relative">
										{link.label === "Messaging" && (
											<div className="absolute -top-1.5 -right-1.5 w-4 h-4 flex items-center justify-center text-primary-foreground bg-destructive rounded-full text-[9px]">
												1
											</div>
										)}
										<Image
											src={link.iconMobURL}
											alt={link.iconAlt || "icon"}
											className="w-6 h-6"
										/>
									</div>
									<span className="text-sm font-medium text-secondary">
										{link.label}
									</span>
								</Link>
							</li>
						))}
						<Separator className="bg-muted/50" />
						<li>
							<Link
								href="/settings"
								className="text-sm font-medium text-secondary"
							>
								Setting and privacy
							</Link>
						</li>
						<li>
							<Link
								href="/language"
								className="text-sm font-medium text-secondary"
							>
								Language
							</Link>
						</li>
						<li>
							<Link href="/help" className="text-sm font-medium text-secondary">
								Help
							</Link>
						</li>
						<Separator className="bg-muted/50" />
						<li>
							<Link href="/" className="text-sm font-medium text-destructive">
								Logout
							</Link>
						</li>
					</ul>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
}
