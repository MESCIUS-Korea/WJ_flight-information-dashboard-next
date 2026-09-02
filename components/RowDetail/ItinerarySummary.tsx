import React from 'react';
import * as wijmo from '@mescius/wijmo';
import CommonPopup from '@/components/Popups/CommonPopup'; // 경로는 프로젝트에 맞게 조정
import {
  CircleIcon,
  PlaneIcon,
  ShareIcon,
  TicketIcon,
  CloudIcon,
  SunIcon,
} from '@/components/Icons';

import './style.css';
import AirPortMap from '../Map/AirportMap';

/* ===== Page ===== */
export default function ItinerarySummary({ item }) {
  const dep = item?.['출발지'] ?? '-';
  const flightNo = item?.['운항편명'] ?? '-';
  const depTemp = wijmo.Globalize.format(Math.random() * 30, 'n1');
  const destTemp = wijmo.Globalize.format(Math.random() * 30, 'n1');
  const etaDate = item?.['도착시간'] ? new Date(item['도착시간']) : null;
  const etaTime = etaDate
    ? `${String(etaDate.getHours()).padStart(2, '0')}:${String(
        etaDate.getMinutes()
      ).padStart(2, '0')}`
    : '-';

  const dest = '인천(ICN)';

  // 팝업
  const popupRef = React.useRef(null);
  const openShare = () => {
    popupRef.current?.open('share', { flightNo, dep, dest, etaTime });
  };
  const openTicket = () => popupRef.current?.open('ticket', { flightNo });

  const openRoute = () =>
    popupRef.current?.open('route', {
      flightNo,
      dep,
      dest,
      steps: ['입국 심사', '수하물 찾기', '셔틀버스 탑승', '호텔 이동'],
    });
  const openMap = () => popupRef.current?.open('map', { dep, dest });

  return (
    <div className="it-wrap">
      {/* 헤더: 비행 정보 */}
      <header className="it-header">
        <div className="flight-info">
          <div className="flight-no">{flightNo}</div>
          <div className="flight-route">
            {dep} → {dest}
          </div>
          <div className="flight-time">
            {etaDate ? `도착 예정 ${etaTime}` : '도착 시간 -'}
          </div>
        </div>
        <div className="action-menu">
          <button className="icon-btn" onClick={openShare}>
            <ShareIcon /> 공유
          </button>
          <button className="icon-btn" onClick={openTicket}>
            <TicketIcon /> 티켓 보기
          </button>
        </div>
      </header>

      {/* 본문: 메인 그리드 */}
      <main className="it-body">
        {/* 좌상단: 진행 단계 타임라인 */}
        <section className="card timeline">
          <h2>여정 진행</h2>
          {/* data-progress: 1~5 (현재 3=비행 중) */}
          <ul className="steps" data-progress="3">
            <li className="done">
              <CircleIcon />
              <span>예약 완료</span>
            </li>
            <li className="done">
              <CircleIcon />
              <span>체크인</span>
            </li>
            <li className="current">
              <PlaneIcon />
              <span>비행 중</span>
            </li>
            <li>
              <CircleIcon />
              <span>도착</span>
            </li>
            <li>
              <CircleIcon />
              <span>입국 심사</span>
            </li>
          </ul>
        </section>

        {/* 우상단: 날씨 정보 */}
        <section className="card weather">
          <h2>공항 날씨</h2>
          <div className="weather-grid">
            <div>
              <div className="weather-city">{dep}</div>
              <div className="weather-info">
                {/* <TempIcon /> */}
                <span>{depTemp}℃</span>
                <CloudIcon />
              </div>
            </div>
            <div>
              <div className="weather-city">{dest}</div>
              <div className="weather-info">
                {/* <TempIcon /> */}
                <span>{destTemp}℃</span>
                <SunIcon />
              </div>
            </div>
          </div>
        </section>

        {/* 좌하단: 지도 미리보기 */}
        <aside className="card map-preview">
          <h2>지도 미리보기</h2>
          {/* <div> */}
          <AirPortMap className="map-placeholder" />
          {/* </div> */}
          <button className="ghost-btn" onClick={openMap}>
            전체 지도 보기
          </button>
        </aside>

        {/* 우하단: 상세 경로 카드 */}
        <section className="card route-detail">
          <h2>도착 후 경로</h2>
          <div className="route-steps">
            <p>1. 입국 심사</p>
            <p>2. 수하물 찾기</p>
            <p>3. 셔틀버스 탑승</p>
            <p>4. 호텔 이동</p>
          </div>
          <button className="primary-btn" onClick={openRoute}>
            경로 안내 상세
          </button>
        </section>
      </main>

      <CommonPopup ref={popupRef} />
    </div>
  );
}
