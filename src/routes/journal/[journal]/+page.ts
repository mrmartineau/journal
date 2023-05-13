import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
  const { supabase } = await parent();
  const { data: entries } = await supabase
    .from('journal_entries')
    .select(`*, journals(name, id)`)
    .match({ journal: params.journal, status: 'active' })
    .order('date', { ascending: false });

  const { data: journal } = await supabase
    .from('journals')
    .select('*')
    .match({ id: params.journal })
    .single();

  return {
    entries,
    journal
  };
};
