'use client';

import { Building2, Calendar, MapPin } from 'lucide-react';
import { Race } from '../lib/api/races';

interface RaceCardProps {
  race: Race;
}

export default function RaceCard({ race }: RaceCardProps) {
  return (
    <div
      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
      style={{ scrollSnapAlign: 'start', scrollMarginTop: '1rem' }}
    >
      <div className="flex flex-col space-y-3">
        <h2 className="text-xl font-semibold text-gray-900 line-clamp-2">
          {race.title}
        </h2>

        <div className="flex items-center text-gray-600 text-sm">
          <Calendar className="w-4 h-4 mr-2" />
          <span>대회일: {race.date}</span>
        </div>

        {race.period && (
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            <span>신청기간: {race.period}</span>
          </div>
        )}

        <div className="flex items-center text-gray-600 text-sm">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{race.location}</span>
        </div>

        <div className="flex items-center text-gray-600 text-sm">
          <Building2 className="w-4 h-4 mr-2" />
          <span>{race.host}</span>
        </div>

        {race.category && race.category.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {race.category.map((cat, catIndex) => (
              <span
                key={catIndex}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
          <div className="text-sm text-gray-500">
            {race.phone && <span>문의: {race.phone}</span>}
          </div>

          <div className="flex space-x-2">
            {race.homepage && (
              <a
                href={race.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors"
              >
                홈페이지
              </a>
            )}
            {race.detailUrl && (
              <a
                href={race.detailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 transition-colors"
              >
                상세보기
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
