import { parseForm } from '@formdata-helper/base';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({
  locals: { supabase },
  parent
}) => {
  const { session } = await parent();
  if (!session) {
    throw redirect(303, '/');
  }

  const { data: journals } = await supabase
    .from('journals')
    .select('*')
    .match({ status: 'active' });

  return {
    journals
  };
};

export const actions = {
  default: async ({ request, locals: { supabase, getSession } }) => {
    const session = await getSession();
    const formData = await request.formData();
    const formDataObject = parseForm(formData);

    const { data: newEntry, error } = await supabase
      .from('journal_entries')
      .insert([{ ...formDataObject, owner: session?.user.id }])
      .select();

    if (error) {
      console.error(`🚀 ~ default: ~ error`, error);
      throw error;
    }
    if (newEntry?.length) {
      throw redirect(303, `/entry/${newEntry[0].id}`);
    }
  }
};
