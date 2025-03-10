export default async function GeneralPage(props: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await props.params;
	return (
		<main className="pt-4 pb-9 ps-6 pe-14 grow flex flex-col items-center mt-14">
			<h1 className="capitalize text-6xl leading-loose font-bold bg-gradient-to-r from-cyan-500 to-accent bg-clip-text text-transparent animate-bounce">
				{slug.replaceAll("-", " ")}
			</h1>
		</main>
	);
}
