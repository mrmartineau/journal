import { parseForm } from '@formdata-helper/base';
import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({
  params,
  locals: { supabase },
  parent
}) => {
  const { session } = await parent();
  if (!session) {
    throw redirect(303, '/');
  }

  const { data: entry } = await supabase
    .from('journal_entries')
    .select(
      `id, entry, journal, date, end_date, time, journals(id, name, description)`
    )
    .match({ id: params.id, status: 'active' })
    .single();

  if (!entry) {
    throw error(404);
  }

  return {
    entry
  };
};

export const actions = {
  delete: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData();
    const formDataObject = parseForm(formData);

    const { error } = await supabase
      .from('journal_entries')
      .update({ status: 'deleted' })
      .eq('id', formDataObject.id);

    if (!error) {
      console.log(`🚀 ~ delete action: ~ error:`, error);
      throw redirect(303, '/');
    }
  }
};
