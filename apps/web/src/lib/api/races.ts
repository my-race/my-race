import raceData from '../../../output.merged.json';

export interface Race {
  title: string;
  date: string;
  host: string;
  location: string;
  homepage: string;
  phone: string;
  detailUrl: string;
  period: string;
  category: string[];
}

/**
 * 홈화면용 레이스 목록 상위 5개 조회 (Mock API)
 */
export const getTopRaces = async (): Promise<Race[]> => {
  // 실제 API 호출을 시뮬레이션하기 위한 딜레이
  await new Promise(resolve => setTimeout(resolve, 300));

  return raceData.slice(0, 5) as Race[];
};
