import { Switch } from "../switch";

export default function SearchHeader() {
	return (
		<div className="flex justify-between items-center gap-2 px-4 py-2.5 rounded-xs xl:px-10 xl:py-6 xl:rounded-sm bg-accent text-accent-foreground grow">
			<div className="xl:space-y-2">
				<h2 className="text-sm xl:text-2xl font-semibold">UI Designer in Egypt</h2>
				<p className="text-xs font-light xl:text-lg">70 job positions</p>
			</div>
			<div className="flex items-center gap-3 max-xl:self-end">
				<label className="text-xs xl:text-xl" htmlFor="set-alert">
					Set alert
				</label>
				<Switch id="set-alert" className="data-[state=unchecked]:bg-muted/50 cursor-pointer" />
			</div>
		</div>
	);
}
