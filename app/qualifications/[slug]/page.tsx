export default async function QualificationPage(props: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await props.params;
	return (
		<div className="pt-4 pb-9 px-5 xl:ps-6 xl:pe-14 grow flex flex-col items-center mt-14">
			<h1 className="capitalize text-[clamp(2rem,3.5vw,3.5rem)] xl:text-6xl leading-loose font-bold bg-gradient-to-r from-cyan-500 to-accent bg-clip-text text-transparent animate-bounce">
				{slug.replaceAll("-", " ")}
			</h1>
		</div>
	);
}
