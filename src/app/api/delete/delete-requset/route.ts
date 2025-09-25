export async function DELETE(request: Request) {
  return Response.json({ data: `Request is received for ${DELETE.name}!` });
}
