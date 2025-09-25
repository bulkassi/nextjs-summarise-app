export async function POST(request: Request) {
  return Response.json({ data: `Request is received for ${POST.name}!` });
}
