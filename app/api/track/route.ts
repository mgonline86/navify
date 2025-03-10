export async function POST(req: Request) {
  const { id, from = undefined, to = undefined } = await req.json();
  if (!id || typeof from === "undefined" || typeof to === "undefined")
    return new Response(null, { status: 400 });
  return new Response(null, { status: 204 });
}
