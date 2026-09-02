'use client';
import useEvent from 'react-use-event-hook';
import { useState, useRef } from 'react';
import * as wjInput from '@mescius/wijmo.react.input';
import './style.css';
const terminalInfo = ['전체 터미널', 'T1', 'T2'];
const gateInfo = ['전체 도착게이트', 'A', 'B', 'C', 'D', 'E', 'F'];
// 시간 데이터
const initStart = new Date();
initStart.setHours(9, 0, 0);
const initEnd = new Date();
initEnd.setHours(23, 59, 59);
const FromComboData = [
  '전체 출발지',
  '도쿄 (NRT)',
  '베이징 (PEK)',
  '상하이 (PVG)',
  '방콕 (BKK)',
  '쿠알라룸푸르 (KUL)',
  '하노이 (HAN)',
  '홍콩 (HKG)',
  '싱가포르 (SIN)',
  '하얼빈 (HRB)',
  '마닐라 (MNL)',
  '타이베이 (TPE)',
];

const airplaneInfo = [
  '전체 항공사',
  '대한항공',
  '아시아나항공',
  '싱가포르항공',
  'ANA',
  'JAL',
  '중국국제항공',
  '델타항공',
  '에미레이트',
];
const InputContainer = ({ filters, onChange }) => {
  const set = (patch) => onChange({ ...filters, ...patch });

  const [termiVal, setTermiVal] = useState();

  const [gateVal, setGateVal] = useState();
  const [dateVal, setDateValue] = useState(null);

  const [fromVal, setFromVal] = useState();

  const [startDate, setStartDate] = useState(initStart);
  const [endDate, setEndDate] = useState(initEnd);

  const [airVal, setAirVal] = useState();

  const [flightNum, setFlightNum] = useState();

  const searchRef = useRef(null);
  const searchGrid = () => {
    onChange({
      terminal: termiVal ?? '',
      gate: gateVal ?? '',
      dateVal: dateVal ?? null,
      startDate,
      endDate,
      from: fromVal ?? '',
      airline: airVal ?? '',
      flightNumTxt: flightNum ?? '',
    });
  };
  // 터미널 정보
  const initTerminal = useEvent((sender) => {
    setTermiVal(sender.selectedValue);
  });
  const termiValChanged = useEvent((sender) => {
    setTermiVal(sender.selectedValue);
  });
  // 게이트 정보

  const initGate = useEvent((sender) => {
    setGateVal(sender.selectedValue);
  });
  const gateValChanged = useEvent((sender) => {
    setGateVal(sender.selectedValue);
  });
  // 날짜 선택
  const renderInput = () => {
    let curr = new Date();
    const lastDay = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6));

    return (
      <wjInput.InputDate
        style={{ width: '160px' }}
        id="theDate"
        min={new Date()}
        max={lastDay}
        initialized={initDate}
        valueChanged={onDateValueChanged}
      />
    );
  };

  const initDate = useEvent((sender) => {
    setDateValue(sender.value);
  });
  const onDateValueChanged = useEvent((sender) => {
    setDateValue(sender.value);
  });
  // 시간 선택

  const handleStartChange = (s) => {
    const newStart = s.value ? new Date(s.value.getTime()) : null; // 복제해서 보관
    setStartDate(newStart);
  };

  const handleEndChange = (s) => {
    const newEnd = s.value ? new Date(s.value.getTime()) : null; // 복제해서 보관
    setEndDate(newEnd);
  };

  // 출발지

  const onFromValChanged = useEvent((sender) => {
    setFromVal(sender.selectedValue);
  });

  // 항공사
  const initComboAirplane = useEvent((sender) => {
    setAirVal(sender.selectedValue);
  });
  const onAirValChanged = useEvent((sender) => {
    setAirVal(sender.selectedValue);
  });
  // 편명검색
  const onValueChanged = useEvent((sender) => {
    setFlightNum(sender.value);
  });
  return (
    <div className="inputContainer toolbar" style={{}}>
      <wjInput.ComboBox
        style={{ width: '110px' }}
        id="Terminal"
        itemsSource={terminalInfo}
        initialized={initTerminal}
        selectedIndexChanged={termiValChanged}
      />
      <wjInput.ComboBox
        style={{ width: '130px' }}
        id="Gate"
        itemsSource={gateInfo}
        initialized={initGate}
        selectedIndexChanged={gateValChanged}
      />

      {renderInput()}

      <wjInput.InputTime
        style={{ width: '120px' }}
        id="startTime"
        value={startDate}
        format="h:mm tt"
        max={endDate ? new Date(endDate.getTime()) : null}
        step={30}
        isEditable={true}
        valueChanged={handleStartChange}
      ></wjInput.InputTime>
      <wjInput.InputTime
        style={{ width: '120px' }}
        id="endTime"
        value={endDate}
        format="h:mm tt"
        min={startDate ? new Date(startDate.getTime()) : null}
        step={30}
        isEditable={true}
        valueChanged={handleEndChange}
      ></wjInput.InputTime>

      <wjInput.ComboBox
        id="FromCombo"
        itemsSource={FromComboData}
        selectedIndexChanged={onFromValChanged}
        placeholder="출발지"
      />
      <wjInput.ComboBox
        id="Airplane"
        itemsSource={airplaneInfo}
        initialized={initComboAirplane}
        selectedIndexChanged={onAirValChanged}
      />

      <wjInput.InputMask
        style={{ width: '120px' }}
        ref={searchRef}
        placeholder="편명입력"
        valueChanged={onValueChanged}
      />
      <button id="confirmBtn" onClick={searchGrid}>
        조회하기
      </button>
    </div>
  );
};

export default InputContainer;
