import { cn } from "@/lib/utils";
import type { Job } from "@/models/job";
import { HeartIcon } from "lucide-react";
import Image from "next/image";
import calendarIcon from "../../../public/icons/calendar.svg";
import locationPinIcon from "../../../public/icons/location-pin.svg";
import { Separator } from "../separator";

const SearchResultTag = ({
	tag,
	className,
}: { tag: string } & React.ComponentProps<"div">) => {
	return (
		<div
			className={cn(
				"bg-muted/20 text-secondary py-1.5 px-5 rounded-sm font-medium leading-6",
				className,
			)}
		>
			{tag}
		</div>
	);
};

export default function SearchResultCard({ job }: { job: Job }) {
	return (
		<div className="min-h-72 bg-primary-foreground rounded-sm border cursor-pointer group hover:border-accent hover:bg-[#f3fdf3]">
			<div className="flex justify-between items-center gap-2 px-20 pt-9 pb-6">
				<div className="flex flex-col gap-5">
					<div className="flex items-center gap-5">
						<Image
							src={job.companyLogo}
							alt={job.company}
							width={70}
							height={70}
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="w-16 h-16"
						/>
						<div className="space-y-2">
							<h3 className="text-2xl font-medium leading-normal">
								{job.title}
							</h3>
							<p className="font-bold text-accent">{job.company}</p>
						</div>
					</div>
					<div className="flex items-center gap-3">
						<div className="flex items-center gap-1.5">
							<Image src={locationPinIcon} alt="location-icon" />
							<span className="text-secondary leading-6">{job.location}</span>
						</div>
						<div className="flex items-center gap-1.5">
							<Image src={calendarIcon} alt="calendar-icon" />
							<span className="text-secondary leading-6">{job.postDate}</span>
						</div>
					</div>
					<div className="flex items-center gap-1 flex-wrap">
						{job.tags.map((tag) => (
							<SearchResultTag
								key={tag}
								tag={tag}
								className="group-hover:bg-primary-foreground"
							/>
						))}
					</div>
				</div>
				<div className="self-start">
					<button
						type="button"
						className="bg-transparent border border-muted/50 rounded-full w-14 h-14 flex items-center justify-center cursor-pointer group/fav hover:border-accent"
					>
						<HeartIcon
							className="fill-muted stroke-muted group-hover/fav:fill-accent group-hover/fav:stroke-accent"
							size={20}
						/>
					</button>
				</div>
			</div>
			<Separator className="bg-muted/50" />
			<div className="px-20 py-6">{job.categories.join("/")}</div>
		</div>
	);
}
