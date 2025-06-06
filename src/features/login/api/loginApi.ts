import { LoginResponse } from '../types';

const REST_API_URL = fetch('/api/rest-api-url');

export async function getAccessToken(code: string): Promise<LoginResponse> {
  const urlResponse = await (await REST_API_URL).json();

  const response = await fetch(urlResponse.url + '/api/v1/member/login/google', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });

  if (response.ok) return await response.json();

  throw new Error('Failed to fetch user data');
}
