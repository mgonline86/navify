import { Switch } from "../switch";

export default function SearchHeader() {
	return (
		<div className="flex justify-between min-h-28 px-10 py-6 rounded-sm bg-accent text-accent-foreground">
			<div className="space-y-2">
				<h2 className="text-2xl font-bold">UI Designer in Egypt</h2>
				<p className="text-lg">70 job positions</p>
			</div>
			<div className="flex items-center gap-3">
				<label className="text-xl" htmlFor="set-alert">
					Set alert
				</label>
				<Switch id="set-alert" className="data-[state=unchecked]:bg-muted/50 cursor-pointer" />
			</div>
		</div>
	);
}
