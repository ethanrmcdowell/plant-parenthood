import { sql } from '@vercel/postgres';
import { VercelRequest, VercelResponse } from '@vercel/node';
 
export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  try {
    const email = request.query['email'] as string;
    const favPlant = request.query['favPlant'] as string;
    if (!email || !favPlant) throw new Error('Email and plant type required!');
    await sql`INSERT INTO plant_users (email, favPlant) VALUES (${email}, ${favPlant});`;
  } catch (error) {
    return response.status(500).json({ error });
  }
 
  const plants = await sql`SELECT * FROM plant_users;`;
  return response.status(200).json({ plants });
}