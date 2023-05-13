import type { RequestHandler } from './$types';
import { json, error } from '@sveltejs/kit';

export const GET: RequestHandler = async ({
  locals: { supabase, getSession }
}) => {
  const session = await getSession();
  if (!session) {
    // the user is not signed in
    throw error(401, { message: 'Unauthorised' });
  }
  const { data } = await supabase.from('test').select('*');

  return json({ data });
};
