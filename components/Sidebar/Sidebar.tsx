'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';

import '@mescius/wijmo.cultures/wijmo.culture.ko';

type Item = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

const items: Item[] = [
  { label: '여객 도착 시간표', href: '/', icon: <HomeIcon /> },
  {
    label: '화물 출발 정기 시간표',
    href: '/departure',
    icon: <TableIcon />,
  },
  { label: '통계', href: '/gateInfo', icon: <ChartIcon /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 모바일 상단 토글 버튼 */}
      <div className="md:hidden w-full px-3 py-2">
        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50"
          aria-expanded={open}
          aria-controls="app-sidebar"
        >
          <MenuIcon />
          메뉴
        </button>
      </div>

      {/* 사이드바 */}
      <aside
        id="app-sidebar"
        className={[
          // base
          'md:sticky md:top-0 md:h-[calc(100vh-0px)] md:w-64 md:shrink-0',
          'border-r border-slate-200 bg-white',
          // mobile sheet style
          'md:block',
          open ? 'block' : 'hidden',
          'md:pt-6',
        ].join(' ')}
      >
        {/* 로고/타이틀 (원하면 교체) */}
        <div className="hidden md:flex items-center gap-2 px-4 pb-4">
          <PlaneIcon className="h-5 w-5 text-blue-600" />
          <span className="font-semibold text-slate-800">공항 운항정보</span>
        </div>

        <nav className="px-2 py-2">
          {items.map((it) => {
            const active =
              it.href === '/' ? pathname === '/' : pathname.startsWith(it.href);
            return (
              <a
                key={it.href}
                href={it.href}
                className={[
                  'group flex items-center gap-3 rounded-md px-3 py-2 text-sm',
                  active
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-slate-700 hover:bg-slate-50',
                ].join(' ')}
              >
                <span
                  className={[
                    'grid place-items-center',
                    active
                      ? 'text-blue-700'
                      : 'text-slate-500 group-hover:text-slate-700',
                  ].join(' ')}
                >
                  {it.icon}
                </span>
                <span className="truncate">{it.label}</span>
              </a>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

/* ==== Icons (inline SVG) ==== */
function HomeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 11l9-8 9 8" />
      <path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10" />
    </svg>
  );
}
function TableIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18M9 10v9M15 10v9" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M4 19V5M10 19V9M16 19V3M22 19H2" />
    </svg>
  );
}

function PlaneIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
    >
      <path d="M21 16l-8-5-2-7-2 7-8 5 8-2 2 4 2-4 8 2z" />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}
