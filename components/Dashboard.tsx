'use client';
import {  useState } from 'react';

import '@mescius/wijmo.cultures/wijmo.culture.ko';
import ArrivalTimeTable from './Grids/ArrvialTimetable/ArrivalTimeTable';
import InputContainer from './Input/InputContainer';

const Dashboard = () => {
  const [filters, setFilters] = useState({
    terminal: '',
    gate: '',
    from: '',
    airline: '',
    startDate: null, 
    endDate: null, 
    flightNumTxt: '',
  });

  return (
    <div className="w-full  gap-4 m-3 p-2">
      <div className="header">
        <h1 style={{ fontWeight: 700 }}>인천공항 여객 도착 시간표</h1>
        <InputContainer
          filters={filters}
          onChange={setFilters} 
        />
        <hr className="my-6" />
        <ArrivalTimeTable filters={filters} />
      </div>
    </div>
  );
};

export default Dashboard;
