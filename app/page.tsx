import SortDropDown from "@/components/sort-dropdown";
import EditSideSheet from "@/components/ui/edit-side-sheet";
import SearchHeader from "@/components/ui/search/search-header";
import SearchPagination from "@/components/ui/search/search-pagination";
import SearchResultCard from "@/components/ui/search/search-result-card";
import type { Job } from "@/models/job";

const searchResults: Job[] = [
	{
		id: 1,
		title: "Gaming UI designer",
		company: "Rockstar Games",
		companyLogo: "/img/search-result-1.png",
		location: "ElMansoura, Egypt",
		postDate: "10 days ago",
		tags: ["0 - 3y of exp", "Full time", "Remote"],
		link: "/",
		categories: ["Creative", "Design - IT", "Software development", "Gaming"],
	},
	{
		id: 2,
		title: "Senior UX UI Designer",
		company: "Egabi",
		companyLogo: "/img/search-result-2.png",
		location: "Cairo, Egypt",
		postDate: "month ago",
		tags: ["0 - 3y of exp", "Full time", "Hybrid"],
		link: "/",
		categories: ["Creative", "Design - IT", "Software development"],
	},
	{
		id: 3,
		title: "React Frontend developer",
		company: "Magara",
		companyLogo: "/img/search-result-3.png",
		location: "Cairo, Egypt",
		postDate: "month ago",
		tags: ["5 - 7y of exp", "Freelance", "Remote"],
		link: "/",
		categories: ["Creative", "Design - IT", "Software development"],
	},
	{
		id: 4,
		title: "Gaming UI designer",
		company: "Rockstar Games",
		companyLogo: "/img/search-result-1.png",
		location: "ElMansoura, Egypt",
		postDate: "10 days ago",
		tags: ["0 - 3y of exp", "Full time", "Remote"],
		link: "/",
		categories: ["Creative", "Design - IT", "Software development", "Gaming"],
	},
	{
		id: 5,
		title: "Senior UX UI Designer",
		company: "Egabi",
		companyLogo: "/img/search-result-2.png",
		location: "Cairo, Egypt",
		postDate: "month ago",
		tags: ["0 - 3y of exp", "Full time", "Hybrid"],
		link: "/",
		categories: ["Creative", "Design - IT", "Software development"],
	},
	{
		id: 6,
		title: "React Frontend developer",
		company: "Magara",
		companyLogo: "/img/search-result-3.png",
		location: "Cairo, Egypt",
		postDate: "month ago",
		tags: ["5 - 7y of exp", "Freelance", "Remote"],
		link: "/",
		categories: ["Creative", "Design - IT", "Software development"],
	},
];

export default function Home() {
	return (
		<main className="pt-2 xl:pt-4 pb-9 px-5 xl:ps-6 xl:pe-14 grow flex flex-col">
			<div className="hidden xl:flex justify-end">
				<SortDropDown />
			</div>
			<div className="xl:pe-20 mt-5">
				<div className="flex items-center justify-between gap-1.5 min-h-14 xl:min-h-28">
					<SearchHeader />
					<div className="border w-14 h-14 rounded-xs flex items-center justify-center xl:hidden">
						<EditSideSheet />
					</div>
				</div>
				<div className="mt-3 mb-4 xl:mt-6 xl:mb-9 space-y-1.5 xl:space-y-3.5">
					{searchResults.map((result) => (
						<SearchResultCard key={result.id} job={result} />
					))}
				</div>
				<SearchPagination />
			</div>
		</main>
	);
}
