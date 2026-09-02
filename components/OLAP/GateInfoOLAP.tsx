'use client';
import '@mescius/wijmo.styles/wijmo.css';
import React from 'react';
import * as wjcCore from '@mescius/wijmo';
import * as wjcOlap from '@mescius/wijmo.olap';
import * as Olap from '@mescius/wijmo.react.olap';
import * as wjGridXlsx from '@mescius/wijmo.grid.xlsx';
import './style.css';
import { getPassengerData } from './data';
import useEvent from 'react-use-event-hook';

export default function GateInfoOLAP() {
  /* ===== State ===== */
  // 단일 터미널 선택: 'T1' | 'T2' | undefined
  const [terminal, setTerminal] = React.useState<string | undefined>(undefined);
  // 시간대 다중 선택: ['오전', '오후', '심야', '야간']
  const [times, setTimes] = React.useState<string[]>([]);
  const [threshold, setThreshold] = React.useState(200);
  const [chartType, setChartType] = React.useState<'Column' | 'Bar' | 'Line'>(
    'Column'
  );

  /* ===== Data → CollectionView ===== */
  const items = React.useMemo(
    () =>
      getPassengerData().map((r: any) => ({
        ...r,
        date: new Date(r.date), // 문자열 → Date
        hour: +r.hour, // "00" → 0
      })),
    []
  );

  const viewRef = React.useRef<wjcCore.CollectionView | null>(null);
  if (!viewRef.current) viewRef.current = new wjcCore.CollectionView(items);
  const view = viewRef.current!;

  /* ===== PivotEngine (itemsSource: view) ===== */
  const engine = React.useRef<wjcOlap.PivotEngine | null>(null);
  if (!engine.current) {
    const e = new wjcOlap.PivotEngine({
      itemsSource: view,
      fields: [
        {
          binding: 'date',
          header: '날짜',
          dataType: wjcCore.DataType.Date,
          format: 'yyyy-MM-dd',
        },
        { binding: 'hour', header: '시간', dataType: wjcCore.DataType.Number },
        { binding: 'hourRange', header: '시간대 구간' },
        { binding: 'timeOfDay', header: '시간대 분류' },
        { binding: 'terminal', header: '터미널' },
        { binding: 'gate', header: '게이트 번호' },
        { binding: 'flightNo', header: '항공편명' },
        { binding: 'airline', header: '항공사' },
        { binding: 'passengerCount', header: '고객 수', aggregate: 'Sum' },
        { binding: 'nationality', header: '국적' },
        { binding: 'passengerCount', header: '평균 고객 수', aggregate: 'Avg' },
      ],
      rowFields: ['시간대 분류', '항공사'],
      columnFields: ['터미널', '날짜'],
      valueFields: ['고객 수'],
      showRowTotals: 'Subtotals',
    });

    // 값 필드: 항공편 수(Count)
    const fFlights = e.fields.getField('항공편명');
    fFlights.aggregate = 'Cnt';
    fFlights.header = '항공편 수';

    engine.current = e;
  }
  const eng = engine.current!;

  /* ===== CollectionView Filter (한 곳에서만 적용) ===== */
  const applyCvFilter = React.useCallback(() => {
    if ('filters' in view) {
      const v: any = view;
      v.filters.length = 0; // 기존 필터 모두 제거
      if (terminal) v.filters.push((it: any) => it.terminal === terminal);
      if (times.length)
        v.filters.push((it: any) => times.includes(it.timeOfDay));
    } else {
      view.filter = (it: any) =>
        (!terminal || it.terminal === terminal) &&
        (!times.length || times.includes(it.timeOfDay));
    }
    view.refresh();
  }, [view, terminal, times]);

  React.useEffect(() => {
    applyCvFilter();
  }, [applyCvFilter]);

  /* ===== Grid/Chart 보조 ===== */
  const gridRef = React.useRef<any>(null);
  const formatCell = React.useCallback(
    (s: any, e: any) => {
      if (e.panel === s.cells) {
        const v = s.getCellData(e.row, e.col, false);
        if (typeof v === 'number' && v >= threshold) {
          e.cell.style.background = '#fee2e2';
          e.cell.style.color = '#991b1b';
          e.cell.style.fontWeight = '600';
        }
      }
    },
    [threshold]
  );

  const exportExcel = () => {
    const flex = gridRef.current?.control;
    if (!flex) return;
    wjGridXlsx.FlexGridXlsxConverter.saveAsync(
      flex,
      {
        includeColumnHeaders: true,
        includeStyles: true,
        includeRowHeaders: true,
      },
      '게이트_혼잡도.xlsx'
    );
  };

  const resetView = () => {
    eng.deferUpdate = true;
    eng.rowFields.clear();
    eng.columnFields.clear();
    eng.valueFields.clear();
    eng.filterFields.clear();
    eng.rowFields.push('시간대 분류', '항공사');
    eng.columnFields.push('터미널', '날짜');

    eng.valueFields.push('고객 수');
    setTimes([]);
    setTerminal();
    eng.deferUpdate = false;
  };

  const saveView = () => {
    try {
      localStorage.setItem('gate-olap-view', eng.viewDefinition);
      localStorage.viewDefinition = eng.viewDefinition;
    } catch {}
  };
  const loadView = () => {
    try {
      const v = localStorage.getItem('gate-olap-view');
      if (v) {
        eng.viewDefinition = localStorage.viewDefinition;
      }
    } catch {}
  };

  /* ===== Handlers (state만 변경) ===== */
  const selectTerminal = (code?: string) => setTerminal(code); // 'T1' | 'T2' | undefined
  const filterTimeOfDay = (vals?: string[]) => setTimes(vals ?? []); // 다중 or 해제

  /* ===== Render ===== */

  const initPivotChart = useEvent((s, e) => {
    s.flexChart.palette = [
      '#3B82F6', // soft blue
      '#93C5FD', // light blue
      '#34D399', // mint green
      '#FCD34D', // soft yellow
      '#FB7185', // coral red
      '#C084FC', // light purple
      '#9CA3AF', // gray
    ];
    s.flexChart.tooltip.content = (hti) => {
      return `${hti.value}`;
    };
  });
  return (
    <div className="olap-wrap flex-1 flex flex-col">
      <h1 className="olap-title">게이트 혼잡도 분석</h1>

      {/* Toolbar */}
      <div className="olap-toolbar toolbar">

        <div className="grp">
          <label>차트</label>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value as any)}
          >
            <option>Column</option>
            <option>Bar</option>
            <option>Line</option>
          </select>
        </div>

        <div className="grp">
          <button className="default-btn" onClick={saveView}>
            필드 뷰 저장
          </button>
          <button className="default-btn" onClick={loadView}>
            필드 불러오기
          </button>
          <button className="default-btn" onClick={resetView}>
            초기화
          </button>
        </div>

        <div className="grp">
          <button className="default-btn" onClick={() => selectTerminal('T1')}>
            T1만
          </button>
          <button className="default-btn" onClick={() => selectTerminal('T2')}>
            T2만
          </button>
          <button
            className="default-btn"
            onClick={() => selectTerminal(undefined)}
          >
            터미널 전체
          </button>
        </div>

        <div className="grp">
          <button
            className="default-btn"
            onClick={() => filterTimeOfDay(['오전'])}
          >
            오전
          </button>
          <button
            className="default-btn"
            onClick={() => filterTimeOfDay(['오후'])}
          >
            오후
          </button>
          <button
            className="default-btn"
            onClick={() => filterTimeOfDay(['심야'])}
          >
            심야
          </button>
          <button
            className="default-btn"
            onClick={() => filterTimeOfDay(['야간'])}
          >
            야간
          </button>
          <button
            className="default-btn"
            onClick={() => filterTimeOfDay(undefined)}
          >
            시간대 전체
          </button>
        </div>

        <div className="grp">
          <button className="primary" onClick={exportExcel}>
            엑셀 다운로드
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="olap-body grid grid-cols-[30%_70%] grid-rows-[auto_1fr] gap-x-2 gap-y-5 flex-1 min-h-0">
        {/* PivotPanel */}
        <div className="min-h-0 h-[50vh] max-h-[50vh] ">
          <Olap.PivotPanel className="h-full w-full" itemsSource={eng} />
        </div>

        {/* PivotGrid */}
        <div className="min-h-0 h-[50vh] max-h-[50vh] ">
          <Olap.PivotGrid
            ref={gridRef}
            className="h-full w-full"
            itemsSource={eng}
            formatItem={formatCell}
            showDetailOnDoubleClick={true}
          />
        </div>

        {/* Chart (남은 공간 차지) */}
        <div className="col-span-2 min-h-0">
          <Olap.PivotChart
            itemsSource={eng}
            chartType={chartType}
            showTitle={false}
            showLegend="Never"
            showTotals={false}
            initialized={initPivotChart}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
