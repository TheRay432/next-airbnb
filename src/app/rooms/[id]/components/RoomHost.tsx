import React from 'react';
import Image from 'next/image';
import { Medal } from 'lucide-react';
import { RoomHost as RoomHostType } from '@/lib/constant/rooms';
import { BLUR_DATA_URL } from '@/lib/utils';

interface RoomHostProps {
  host: RoomHostType;
}

const RoomHost = ({ host }: RoomHostProps) => {
  return (
    <div className="py-8 border-b border-lightgray">
      <h2 className="text-xl font-semibold mb-6">認識你的房東</h2>
      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        <div className="flex items-center gap-4">
          <Image
            className="rounded-full object-cover"
            src={host.avatar}
            alt={host.name}
            width={72}
            height={72}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
          <div>
            <h3 className="text-lg font-semibold">{host.name}</h3>
            {host.isSuperhost && (
              <p className="flex items-center gap-1 text-sm text-darkgray">
                <Medal size={14} />
                超讚房東
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-8 sm:pl-8 sm:border-l sm:border-lightgray">
          <div>
            <p className="font-semibold">{host.reviewCount}</p>
            <p className="text-xs text-darkgray">則評價</p>
          </div>
          <div>
            <p className="font-semibold">{host.yearsHosting} 年</p>
            <p className="text-xs text-darkgray">主辦經驗</p>
          </div>
          <div>
            <p className="font-semibold">{host.responseRate}%</p>
            <p className="text-xs text-darkgray">回覆率</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomHost;
