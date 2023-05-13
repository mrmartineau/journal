import { parseForm } from '@formdata-helper/base';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({
  params,
  locals: { supabase },
  parent
}) => {
  const { session } = await parent();
  if (!session) {
    throw redirect(303, '/');
  }

  const { data: journals } = await supabase.from('journals').select('*');
  const { data: entry } = await supabase
    .from('journal_entries')
    .select(`*, journals(name, id)`)
    .match({ id: params.id, status: 'active' })
    .single();

  return {
    journals,
    entry
  };
};

export const actions = {
  default: async ({ params, request, locals: { supabase } }) => {
    const formData = await request.formData();
    const formDataObject = parseForm(formData);

    const { data: updatedEntry, error } = await supabase
      .from('journal_entries')
      .update({ ...formDataObject })
      .eq('id', params.id)
      .select();

    if (error) {
      console.error(`🚀 ~ edit action: ~ error`, error);
      throw error;
    }
    if (updatedEntry?.length) {
      throw redirect(303, `/entry/${updatedEntry[0].id}`);
    }
  }
};
