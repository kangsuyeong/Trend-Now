import { InternalServerError } from '@/shared/error/error';

export async function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;
  const scope = 'email profile';
  const responseType = 'code';

  if (!clientId) {
    throw new InternalServerError('Missing client ID');
  }

  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

  return Response.json({ url });
}
