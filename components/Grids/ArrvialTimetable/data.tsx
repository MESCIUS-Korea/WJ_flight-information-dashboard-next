import * as wijmo from '@mescius/wijmo';

// flightData.ts
type ArrivalInfo = {
  도착시간: string;
  출발지: string;
  항공사: string;
  운항편명: string;
  터미널: string;
  도착게이트: string;
  수하물수취대: string;
  입국장출구: string;
  도착현황: string;
  nationality: string;
  CODESHARE: 'Master' | 'Slave' | '';
};

const airlines = [
  '대한항공',
  '아시아나항공',
  '싱가포르항공',
  'ANA',
  'JAL',
  '중국국제항공',
  '델타항공',
  '에미레이트',
];

const airlineCodes: Record<string, string> = {
  대한항공: 'KE',
  아시아나항공: 'OZ',
  싱가포르항공: 'SQ',
  ANA: 'NH',
  JAL: 'JL',
  중국국제항공: 'CA',
  델타항공: 'DL',
  에미레이트: 'EK',
};

const cities = [
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

const terminals = ['T1', 'T2'];
const gates = ['A', 'B', 'C', 'D', 'E', 'F'];
const carousels = ['5', '6', '7', '8', '9', '10'];
const exits = ['A', 'B', 'C'];
const statuses = ['도착', '지연', '결항'];
const nationalities = [
  '한국',
  '일본',
  '중국',
  '미국',
  '베트남',
  '태국',
  '필리핀',
  '말레이시아',
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pad(num: number): string {
  return num.toString().padStart(2, '0');
}

function generateFlightNumber(airline: string): string {
  const prefix = airlineCodes[airline] || 'XX';
  const number = Math.floor(100 + Math.random() * 9000);
  return `${prefix}${number}`;
}

function getRandomArrivalTime(startHour = 0, endHour = 23): Date {
  const today = new Date();
  const hour =
    Math.floor(Math.random() * (endHour - startHour + 1)) + startHour;
  const minute = Math.floor(Math.random() * 60);
  return new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    hour,
    minute
  );
}

export function getFlightArrivalData(count: number = 150): ArrivalInfo[] {
  const data: ArrivalInfo[] = [];

  for (let i = 0; i < count; i++) {

    const airline = getRandomItem(airlines);
    data.push({
      도착시간: getRandomArrivalTime(6, 23),
      출발지: getRandomItem(cities),
      항공사: airline,
      운항편명: generateFlightNumber(airline),
      터미널: getRandomItem(terminals),
      도착게이트: getRandomItem(gates),
      수하물수취대: getRandomItem(carousels),
      입국장출구: getRandomItem(exits),
      도착현황: getRandomItem(statuses),
      nationality: getRandomItem(nationalities),
      CODESHARE:
        Math.random() < 0.3 ? 'Slave' : Math.random() < 0.15 ? 'Master' : '',
    });
  }

  return data;
}
