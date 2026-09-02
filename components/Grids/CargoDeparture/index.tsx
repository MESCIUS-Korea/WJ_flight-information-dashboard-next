'use client';
import useEvent from 'react-use-event-hook';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import * as wjcCore from '@mescius/wijmo';
import { DataMap } from '@mescius/wijmo.grid';

import * as wjcGrid from '@mescius/wijmo.react.grid';
import * as wjGrid from '@mescius/wijmo.grid';

import * as wjInput from '@mescius/wijmo.react.input';
import * as wjcGridXlsx from '@mescius/wijmo.grid.xlsx';
import './style.css';
const strings = [
  '전체',
  '에어로로직',
  '유피에스항공',
  '아틀라스항공',
  '중국우정항공',
  '중국화물항공',
  '카고룩스항공',
  '캐세이퍼시픽항공',
  '디에이치엘항공',
  '에티오피아항공',
  'FedEX항공',
  '롱하오항공',
  '중국센트럴항공',
  '장쑤징동화물항공',
  '일본항공',
  '칼리타항공',
];
const cv = new wjcCore.CollectionView();
const CargoDeparture = () => {
  const [strVal, setStrVal] = useState('전체');

  const gridRef = useRef(null);

  // 초기 데이터 로드
  useEffect(() => {
    fetch('/departureData.json')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        cv.sourceCollection = data;

        requestAnimationFrame(() => {
          if (cv && strVal && strVal !== '전체') {
            cv.filter = (item: any) =>
              String(item?.['항공사'] ?? '') === String(strVal);
            cv.refresh();
          } else if (cv) {
            cv.filter = null;
            cv.refresh();
          }
        });
      })
      .catch((err) => console.error('데이터 로드 실패', err));
  }, []);

  const onInitialized = useEvent((grid) => {
    gridRef.current = grid;

    // create extra header row
    var extraRow = new wjGrid.Row();
    extraRow.allowMerging = true;
    //
    // add extra header row to the grid
    var panel = grid.columnHeaders;
    panel.rows.splice(0, 0, extraRow);
    //
    // populate the extra header row
    for (let colIndex = 4; colIndex <= 10; colIndex++) {
      panel.setCellData(0, colIndex, '운항요일');
    }
    //

    ['운항편명', '항공사', '출발시간', '목적지', '운항기간'].forEach(function (
      binding
    ) {
      let col = grid.getColumn(binding);
      col.allowMerging = true;
      panel.setCellData(0, col.index, col.header);
    });
    //
    grid.formatItem.addHandler(function (s, e) {
      if (e.panel == s.columnHeaders && e.range.rowSpan > 1) {
        var html = e.cell.innerHTML;
        e.cell.innerHTML = '<div class="v-center">' + html + '</div>';
      } else if (e.panel == s.cells) {
        let col = s.columns[e.col];
        let isInclude = col.binding.includes('요일');
        let val = s.getCellData(e.row, e.col);
        if (isInclude) {
          if (val === 'Y') {
            e.cell.innerHTML =
              "<div class='image_cell'><img src='/airplane_small.png' style='width:16px;height:16px;'/></div>";

            // s.get
          } else {
            e.cell.innerHTML = '';
          }
        }
      }
    });
  });

  const gridExport = (s, e) => {
    wjcGridXlsx.FlexGridXlsxConverter.saveAsync(
      gridRef.current,
      {
        includeColumnHeaders: true,
        includeStyles: false,
      },
      'FlexGrid.xlsx'
    );
  };

  const gridSearch = () => {
    const cv = gridRef.current.itemsSource;
    if (!cv) return;
    if (!strVal || strVal === '전체') {
      cv.filter = null; // 필터 해제
    } else {
      const target = String(strVal);
      cv.filter = (item: any) => String(item?.['항공사'] ?? '') === target;
    }
    cv.refresh();
  };

  // combobox
  const initComboString = useEvent((sender) => {
    setStrVal(sender.selectedValue);
  });

  const onStrValChanged = useEvent((sender) => {
    setStrVal(sender.selectedValue);
  });

  return (
    <div className="w-full  gap-4 m-3 p-2">
      <h1 style={{ fontWeight: 700 }}>화물 정기 운항 시간표</h1>
      <div
        className="grid-toolbar toolbar"
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <wjInput.ComboBox
          id="theComboString"
          itemsSource={strings}
          initialized={initComboString}
          selectedIndexChanged={onStrValChanged}
        />
        <div>
          <button onClick={gridSearch} style={{ margin: '0px 10px' }}>
            조회
          </button>
          <button className="primary" onClick={gridExport}>
            엑셀 다운로드
          </button>
        </div>
      </div>
      {/* FlexGrid 설정 */}
      <wjcGrid.FlexGrid
        ref={gridRef}
        id="cargoGrid"
        allowMerging="ColumnHeaders"
        itemsSource={cv}
        isReadOnly={true}
        autoGenerateColumns={false}
        initialized={onInitialized}
        style={{ height: '75vh' }}
      >
        <wjcGrid.FlexGridColumn binding="운항편명" />
        <wjcGrid.FlexGridColumn binding="항공사" width={160} />
        <wjcGrid.FlexGridColumn binding="출발시간" width={100} />
        <wjcGrid.FlexGridColumn binding="목적지" width={130} />

        <wjcGrid.FlexGridColumn binding="월요일" />
        <wjcGrid.FlexGridColumn binding="화요일" />
        <wjcGrid.FlexGridColumn binding="수요일" />
        <wjcGrid.FlexGridColumn binding="목요일" />
        <wjcGrid.FlexGridColumn binding="금요일" />
        <wjcGrid.FlexGridColumn binding="토요일" />
        <wjcGrid.FlexGridColumn binding="일요일" />

        <wjcGrid.FlexGridColumn binding="운항기간" width={200} />
      </wjcGrid.FlexGrid>
    </div>
  );
};

export default CargoDeparture;
