import { InternalServerError } from '@/shared/error/error';

export async function GET() {
  const clientId = process.env.KAKAO_CLIENT_ID;
  const redirectUri = process.env.KAKAO_REDIRECT_URI;
  const responseType = 'code';

  if (!clientId) {
    return new InternalServerError('Missing client ID');
  }

  const url = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}`;

  return Response.json({ url });
}
