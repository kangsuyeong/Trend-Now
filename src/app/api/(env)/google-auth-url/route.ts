export async function GET() {
  const clientId = process.env.AUTH_GOOGLE_ID;
  const redirectUri = process.env.AUTH_REDIRECT_URL;
  const scope = 'email profile';
  const responseType = 'code';

  if (!clientId) {
    return new Response('Missing client ID', { status: 500 });
  }

  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

  return Response.json({ url });
}
