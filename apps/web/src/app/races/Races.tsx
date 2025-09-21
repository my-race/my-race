'use client';

import ContentLayout from '../../components/layouts/ContentLayout';
import RaceCard from '../../components/RaceCard';
import { Race } from '../../lib/api/races';

interface RacesProps {
  races: Race[];
}

const Races = ({ races }: RacesProps) => {
  if (!races || races.length === 0) {
    return (
      <ContentLayout>
        <div className="text-center py-8">
          <p className="text-lg text-gray-500">등록된 대회가 없습니다</p>
        </div>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout>
      <div className="flex flex-col gap-4 pb-4">
        {races.map((race, index) => (
          <RaceCard key={index} race={race} />
        ))}
      </div>
    </ContentLayout>
  );
};

export default Races;
