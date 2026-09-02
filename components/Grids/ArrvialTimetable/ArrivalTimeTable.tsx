'use client';
import useEvent from 'react-use-event-hook';

import React, { useState, useRef, useEffect } from 'react';
import * as wjcCore from '@mescius/wijmo';

import * as wjGrid from '@mescius/wijmo.react.grid';
import * as wjcGridXlsx from '@mescius/wijmo.grid.xlsx';
import { FlexGridDetail } from '@mescius/wijmo.react.grid.detail';
import { getFlightArrivalData } from './data';
import './style.css';
import ItinerarySummary from '@/components/RowDetail/ItinerarySummary';

function formatDateTime(date: Date) {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const day = days[date.getDay()];
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${yyyy}.${mm}.${dd} (${day}) ${hh}:${min}`;
}

const ArrivalTimeTable = ({ filters }: { filters: any }) => {
  // ✅ 데이터는 state로 관리
  const [rawData, setRawData] = useState<any[]>(getFlightArrivalData());
  const [lastUpdate, setLastUpdate] = useState(formatDateTime(new Date()));

  // ✅ CollectionView는 한 번만 생성
  const [cv] = useState(
    () =>
      new wjcCore.CollectionView(getFlightArrivalData(), {
        sortDescriptions: ['도착시간'],
      })
  );

  const gridRef = useRef(null);

  // ✅ rawData나 filters가 바뀔 때마다 cv 갱신
  useEffect(() => {
    cv.sourceCollection = Array.isArray(rawData) ? rawData : [];
    applyFilter(filters);
  }, [rawData, filters, cv]);

  const initGrid = useEvent((flex) => {
    gridRef.current = flex;
  });

  const applyFilter = (f: any) => {
    cv.filter = (item: any) => {
      if (
        f.terminal &&
        f.terminal !== '전체 터미널' &&
        item['터미널'] !== f.terminal
      )
        return false;

      if (
        f.gate &&
        f.gate !== '전체 도착게이트' &&
        item['도착게이트'] !== f.gate
      )
        return false;

      // 날짜
      if (f.dateVal) {
        const d1 = new Date(item['도착시간']);
        if (d1.toDateString() !== f.dateVal.toDateString()) return false;
      }

      // 시간 구간
      if (f.startDate && f.endDate) {
        const t = new Date(item['도착시간']);
        const toMin = (d: Date) => d.getHours() * 60 + d.getMinutes();
        const tm = toMin(t);
        const sm = toMin(f.startDate);
        const em = toMin(f.endDate);
        if (tm < sm || tm > em) return false;
      }

      if (f.from && f.from !== '전체 출발지' && item['출발지'] !== f.from)
        return false;

      if (
        f.airline &&
        f.airline !== '전체 항공사' &&
        item['항공사'] !== f.airline
      )
        return false;
      if (f.flightNumTxt != null && f.flightNumTxt.trim() !== '') {
        const query = f.flightNumTxt.trim().toLowerCase();

        if (
          !String(item['운항편명'] ?? '')
            .toLowerCase()
            .includes(query)
        ) {
          return false;
        }
      }

      return true;
    };
    cv.refresh();
  };

  const gridExport = () => {
    if (!gridRef.current) return;
    wjcGridXlsx.FlexGridXlsxConverter.saveAsync(
      gridRef.current,
      {
        includeColumnHeaders: true,
        includeStyles: false,
      },
      'FlexGrid.xlsx'
    );
  };

  const gridGetData = () => {
    const data = getFlightArrivalData();
    setRawData(Array.isArray(data) ? data : []);
    setLastUpdate(formatDateTime(new Date()));
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case '지연':
        return { color: '#d97706', fontWeight: 'bold' }; // 주황
      case '도착':
        return { color: '#15803d', fontWeight: 'bold' }; // 초록
      case '결항':
        return { color: '#b91c1c', fontWeight: 'bold' }; // 빨강
      default:
        return {};
    }
  };

  return (
    <div>
      <div
        className="toolbar"
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <div>마지막 업데이트 : {lastUpdate}</div>
        <div className="grid-toolbar">
          <button className="default-btn" onClick={gridGetData}>
            새로고침
          </button>
          <button
            className="primary"
            style={{ marginLeft: '10px' }}
            onClick={gridExport}
          >
            엑셀 다운로드
          </button>
        </div>
      </div>

      <wjGrid.FlexGrid
        ref={gridRef}
        id="arrivalTimeGrid"
        itemsSource={cv}
        isReadOnly
        autoGenerateColumns={false}
        initialized={initGrid}
        style={{ height: '75vh' }}
      >
        <wjGrid.FlexGridColumn binding="도착시간" format="HH:mm" />
        <wjGrid.FlexGridColumn binding="출발지" width={160} />
        <wjGrid.FlexGridColumn binding="운항편명" width={100} />
        <wjGrid.FlexGridColumn binding="항공사" width={130} />

        <wjGrid.FlexGridColumn binding="터미널" />
        <wjGrid.FlexGridColumn binding="도착게이트" />
        <wjGrid.FlexGridColumn binding="수하물수취대" />
        <wjGrid.FlexGridColumn binding="입국장출구" />
        <wjGrid.FlexGridColumn binding="도착현황">
          <wjGrid.FlexGridCellTemplate
            cellType="Cell"
            template={(ctx) => {
              const style = getStatusStyle(ctx.item['도착현황']);
              return <span style={style}>{ctx.item['도착현황']}</span>;
            }}
          />
        </wjGrid.FlexGridColumn>
        <wjGrid.FlexGridColumn header="운항속보" />

        <FlexGridDetail
          isAnimated
          template={(ctx) => (
            <React.Fragment>
              <ItinerarySummary item={ctx.item} />
            </React.Fragment>
          )}
        />
      </wjGrid.FlexGrid>
    </div>
  );
};

export default ArrivalTimeTable;
