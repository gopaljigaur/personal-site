import type { NextApiRequest, NextApiResponse } from 'next';
import funfact from 'lib/funfact';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const apiResponse = await funfact();
    res.setHeader(
      'Content-Type',
      'application/json'
    );
    res.setHeader(
      'X-Content-Type-Options',
      'nosniff'
    );
    return res.status(200).json(apiResponse);
  }
  catch (e) {
    return res.status(e.statusCode || 500).json({error: e.message});
  }
}
