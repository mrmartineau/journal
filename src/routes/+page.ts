import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
  const { supabase, session } = await parent();
  const { data: entries } = await supabase
    .from('journal_entries')
    .select(`*, journals(name, id)`)
    .order('date', { ascending: false })
    .match({ status: 'active' });

  const { data: journals } = await supabase
    .from('journals')
    .select('*')
    .match({ owner: session?.user.id });
  return {
    entries,
    journals
  };
};
