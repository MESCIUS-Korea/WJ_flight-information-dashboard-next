// 샘플 데이터 (네가 준 그대로)
export function getPassengerData(count = 150) {
  const airlines = [
    '대한항공',
    '아시아나',
    '제주항공',
    '진에어',
    '에어부산',
    '티웨이항공',
    '에어서울',
  ];
  const terminals = ['T1', 'T2'];
  const gates = [
    'A01',
    'A02',
    'A03',
    'A04',
    'A05',
    'B01',
    'B02',
    'C01',
    'C02',
    'D01',
  ];
  const nationalities = [
    '대한민국',
    '미국',
    '일본',
    '중국',
    '독일',
    '영국',
    '호주',
    '캐나다',
    '베트남',
  ];
  const flightPrefixes = ['KE', 'OZ', '7C', 'LJ', 'BX', 'TW', 'RS'];
  const today = new Date();
  const data: any[] = [];

  for (let i = 0; i < count; i++) {
    const hour = Math.floor(Math.random() * 24);
    const date = new Date(today);
    date.setDate(today.getDate() - Math.floor(Math.random() * 7)); // 최근 7일

    const hourRange =
      hour < 6
        ? '00:00~05:59'
        : hour < 12
        ? '06:00~11:59'
        : hour < 18
        ? '12:00~17:59'
        : '18:00~23:59';

    const timeOfDay =
      hour < 6 ? '심야' : hour < 12 ? '오전' : hour < 18 ? '오후' : '야간';

    data.push({
      date: date.toISOString().split('T')[0],
      hour: hour.toString().padStart(2, '0'),
      hourRange,
      timeOfDay,
      terminal: terminals[Math.floor(Math.random() * terminals.length)],
      gate: gates[Math.floor(Math.random() * gates.length)],
      flightNo:
        flightPrefixes[Math.floor(Math.random() * flightPrefixes.length)] +
        (100 + Math.floor(Math.random() * 900)),
      airline: airlines[Math.floor(Math.random() * airlines.length)],
      passengerCount: Math.floor(Math.random() * 300 + 50),
      nationality:
        nationalities[Math.floor(Math.random() * nationalities.length)],
    });
  }
  return data;
}
