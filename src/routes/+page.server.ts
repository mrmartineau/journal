import type { PageServerLoad } from './$types';
import { parseForm } from '@formdata-helper/base';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
  const { supabase, getSession } = locals;
  const session = await getSession();
  const { data: entries } = await supabase
    .from('journal_entries')
    .select(`*, journals(name, id)`)
    .order('date', { ascending: false })
    .match({ status: 'active' });

  const { data: journals } = await supabase
    .from('journals')
    .select('*')
    .match({ owner: session?.user.id, status: 'active' });
  return {
    entries,
    journals
  };
};

export const actions = {
  save: async ({ request, locals: { supabase, getSession } }) => {
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
  },
  ai: async ({ request, locals: { supabase, getSession } }) => {
    const session = await getSession();
    const formData = await request.formData();
    const formDataObject = parseForm(formData);
    console.log(`🚀 ~ aiLookup: ~ formDataObject:`, formDataObject);

    // if (error) {
    //   console.error(`🚀 ~ default: ~ error`, error);
    //   throw error;
    // }
    // if (newEntry?.length) {
    //   throw redirect(303, `/entry/${newEntry[0].id}`);
    // }
  }
};
