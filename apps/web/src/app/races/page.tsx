import PageLayout from '../../components/layouts/PageLayout';
import { getTopRaces } from '../../lib/api/races';
import Races from './Races';

export default async function RacesPage() {
  const races = await getTopRaces();

  return (
    <PageLayout title="마라톤 대회" subtitle="참가할 대회를 찾아보세요">
      <Races races={races} />
    </PageLayout>
  );
}
