export async function GET() {
  const url = process.env.REST_API_URL;

  if (!url) {
    return new Response('Missing REST_API_URL', { status: 500 });
  }
  return Response.json({ url });
}
