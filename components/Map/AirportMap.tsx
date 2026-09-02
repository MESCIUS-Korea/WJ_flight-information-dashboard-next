import React from 'react';
import useEvent from 'react-use-event-hook';
import {
  FlexMap,
  GeoMapLayer,
  GeoGridLayer,
  ScatterMapLayer,
} from '@mescius/wijmo.react.chart.map';
import * as wjc from '@mescius/wijmo'; // Point, Rect 등
import '@mescius/wijmo.chart';

import './style.css';

// 원하는 초기 영역(BBOX: west, south, east, north)
const KOREA_BBOX = { west: 124.0, south: 33.0, east: 131.0, north: 38.7 };
const toRect = ({ west, south, east, north }: typeof KOREA_BBOX) =>
  new wjc.Rect(west, north, east - west, south - north);

export default function AirPortMap({ className = '' }: { className?: string }) {
  const initMap = useEvent((map: any) => {});
  console.log('>>>', className);
  return (
    <div className={`container-fluid ${className}`}>
      <FlexMap
        initialized={initMap}
        zoom={5}
        tooltipContent="&#9992; <b>{iata_code}</b><br>{name}"
      >
        <GeoMapLayer url="/land.json" style={{ fill: 'rgba(200,200,200,1)' }} />
        <ScatterMapLayer
          url="/airports.json"
          style={{ fill: 'rgba(10,10,10,1)' }}
          binding="coordinates"
        />
        <GeoGridLayer />
      </FlexMap>
    </div>
  );
}
