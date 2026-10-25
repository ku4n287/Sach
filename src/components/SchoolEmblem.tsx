import React from 'react';

interface SchoolEmblemProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
}

export const SchoolEmblem: React.FC<SchoolEmblemProps> = ({
  className = '',
  size = 'md',
  showLabel = true,
}) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div className={`relative ${sizeMap[size]} shrink-0 drop-shadow-[0_4px_12px_rgba(220,38,38,0.35)]`}>
        {/* SVG Huy hiệu Trường Sĩ quan Pháo binh */}
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="shieldGrad" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="70%" stopColor="#991b1b" />
              <stop offset="100%" stopColor="#450a0a" />
            </radialGradient>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#a16207" />
            </linearGradient>
            <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="50%" stopColor="#ca8a04" />
              <stop offset="100%" stopColor="#854d0e" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Vòng ngoài vàng kim */}
          <circle cx="100" cy="100" r="95" stroke="url(#goldGrad)" strokeWidth="4" fill="#0f291e" />
          <circle cx="100" cy="100" r="88" stroke="#166534" strokeWidth="2" strokeDasharray="4 2" fill="none" />

          {/* Lá nguyệt quế bao quanh */}
          <g stroke="url(#goldGrad)" strokeWidth="2.5" fill="none" strokeLinecap="round">
            {/* Nhánh trái */}
            <path d="M 40 135 C 28 105 32 68 54 44" />
            <path d="M 36 120 Q 46 116 48 106" />
            <path d="M 32 98 Q 44 94 44 84" />
            <path d="M 35 76 Q 48 74 46 64" />
            <path d="M 44 56 Q 56 56 52 46" />

            {/* Nhánh phải */}
            <path d="M 160 135 C 172 105 168 68 146 44" />
            <path d="M 164 120 Q 154 116 152 106" />
            <path d="M 168 98 Q 156 94 156 84" />
            <path d="M 165 76 Q 152 74 154 64" />
            <path d="M 156 56 Q 144 56 148 46" />
          </g>

          {/* Chiếc khiên đỏ quân kỳ */}
          <path
            d="M 64 52 L 136 52 C 136 52 142 100 100 148 C 58 100 64 52 64 52 Z"
            fill="url(#shieldGrad)"
            stroke="url(#goldGrad)"
            strokeWidth="3.5"
          />

          {/* Hai nòng pháo đan chéo biểu tượng Binh chủng Pháo binh */}
          <g transform="rotate(38 100 95)" filter="url(#glow)">
            {/* Nòng pháo 1 */}
            <rect x="94" y="38" width="12" height="114" rx="2" fill="url(#brassGrad)" stroke="#713f12" strokeWidth="1" />
            <circle cx="100" cy="40" r="7" fill="#fef08a" />
            <rect x="92" y="142" width="16" height="8" rx="2" fill="#854d0e" />
          </g>

          <g transform="rotate(-38 100 95)" filter="url(#glow)">
            {/* Nòng pháo 2 */}
            <rect x="94" y="38" width="12" height="114" rx="2" fill="url(#brassGrad)" stroke="#713f12" strokeWidth="1" />
            <circle cx="100" cy="40" r="7" fill="#fef08a" />
            <rect x="92" y="142" width="16" height="8" rx="2" fill="#854d0e" />
          </g>

          {/* Ngôi sao vàng năm cánh trung tâm */}
          <polygon
            points="100,68 106,86 125,86 110,97 116,115 100,104 84,115 90,97 75,86 94,86"
            fill="url(#goldGrad)"
            stroke="#b45309"
            strokeWidth="1.2"
          />

          {/* Dải ruy băng đỏ bên dưới mang dòng chữ SQPB */}
          <path
            d="M 32 152 Q 100 166 168 152 L 174 172 Q 100 186 26 172 Z"
            fill="#991b1b"
            stroke="url(#goldGrad)"
            strokeWidth="2"
          />
          <text
            x="100"
            y="167"
            textAnchor="middle"
            fill="#fef08a"
            fontSize="10"
            fontWeight="bold"
            letterSpacing="2"
            fontFamily="sans-serif"
          >
            SQPB · PHÁO BINH
          </text>
        </svg>
      </div>

      {showLabel && (
        <div className="flex flex-col text-left">
          <span className="text-[10px] tracking-wider uppercase font-semibold text-amber-300/90 leading-tight">
            Bộ Tư lệnh Pháo binh – Tên lửa
          </span>
          <span className="text-xs md:text-sm font-black tracking-wide uppercase text-white leading-tight">
            Trường Sĩ quan Pháo binh
          </span>
        </div>
      )}
    </div>
  );
};
