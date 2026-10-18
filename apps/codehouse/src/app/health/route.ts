export function GET(): Response {
  return Response.json({ ok: true });
}

export function HEAD(): Response {
  return new Response(null, { status: 200 });
}
