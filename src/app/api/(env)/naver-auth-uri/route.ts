import { InternalServerError } from '@/shared/error/error';
import { getSHA256 } from '@/shared/lib';

export async function GET() {
  const clientId = process.env.NAVER_CLIENT_ID;
  const redirectUri = process.env.NAVER_REDIRECT_URI;
  const responseType = 'code';
  const state = await getSHA256(new Date().getMilliseconds().toString());

  if (!clientId) {
    return new InternalServerError('Missing client ID');
  }

  const url = `https://nid.naver.com/oauth2.0/authorize?response_type=${responseType}&client_id=${clientId}&state=${state}&redirect_uri=${redirectUri}`;

  return Response.json({ url });
}
