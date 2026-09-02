import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import ReactDOM from 'react-dom/client';
import useEvent from 'react-use-event-hook';
import * as wjInputCore from '@mescius/wijmo.input';
import { ShareIcon, TicketIcon } from '@/components/Icons';
import './style.css';
import AirPortMap from '../Map/AirportMap';
type OpenType = 'share' | 'ticket' | 'route' | 'map'; // ✅ 추가
type Payload = {
  flightNo?: string;
  dep?: string;
  dest?: string;
  etaTime?: string;
  steps?: string[]; // ✅ route용(선택)
} | null;

function SectionRow({
  label,
  value,
}: {
  label: string;
  value?: React.ReactNode;
}) {
  return (
    <div className="cp-row">
      <div className="cp-label">{label}</div>
      <div className="cp-value">{value ?? '-'}</div>
    </div>
  );
}

function PopupContent({
  type,
  payload,
  onClose,
}: {
  type: OpenType | null;
  payload: Payload;
  onClose: () => void;
}) {
  const title =
    type === 'share'
      ? '공유'
      : type === 'ticket'
      ? '티켓 보기'
      : type === 'route'
      ? '경로 안내 상세'
      : type === 'map'
      ? '전체 지도'
      : '알림';

  const Icon =
    type === 'share' ? ShareIcon : type === 'ticket' ? TicketIcon : undefined;

  return (
    <div className={`cp-wrap ${type === 'map' ? 'map-mode' : ''}`}>
      <header className="cp-header">
        <div className="cp-title">
          {Icon && <Icon size={18} className="cp-title-icon" />}
          <span>{title}</span>
        </div>
        <button className="cp-close wj-hide" aria-label="닫기">
          &times;
        </button>
      </header>

      <main className={`cp-body ${type === 'map' ? 'cp-body--map' : ''}`}>
        {type === 'share' && (
          <>
            <SectionRow label="편명" value={payload?.flightNo} />
            <SectionRow
              label="경로"
              value={
                <>
                  {payload?.dep ?? '-'} <span className="cp-arrow">→</span>{' '}
                  {payload?.dest ?? '-'}
                </>
              }
            />
            <SectionRow label="도착 예정" value={payload?.etaTime} />
            <p className="cp-hint">
              아래 버튼을 눌러 정보를 복사하거나 공유할 수 있어요.
            </p>
          </>
        )}

        {type === 'ticket' && (
          <>
            <SectionRow label="편명" value={payload?.flightNo} />
            <div className="cp-empty">
              티켓 정보는 준비 중입니다. 곧 확인하실 수 있어요.
            </div>
          </>
        )}

        {/* ✅ 경로 안내 상세 */}
        {type === 'route' && (
          <>
            <SectionRow label="편명" value={payload?.flightNo} />
            <SectionRow
              label="구간"
              value={
                <>
                  {payload?.dep ?? '-'} <span className="cp-arrow">→</span>{' '}
                  {payload?.dest ?? '-'}
                </>
              }
            />
            <div className="cp-list">
              {(
                payload?.steps ?? [
                  '입국 심사',
                  '수하물 찾기',
                  '셔틀버스 탑승',
                  '호텔 이동',
                ]
              ).map((t, i) => (
                <div key={i} className="cp-list-item">
                  {i + 1}. {t}
                </div>
              ))}
            </div>
          </>
        )}

        {/* ✅ 전체 지도 보기 */}
        {type === 'map' && (
          <>
            <SectionRow
              label="구간"
              value={
                <>
                  {payload?.dep ?? '-'} <span className="cp-arrow">→</span>{' '}
                  {payload?.dest ?? '-'}
                </>
              }
            />
            <AirPortMap className="cp-map" />
            {/* <p className="cp-hint">
              실제 지도 연동은 원하는 맵 SDK를 붙여서 구현하세요(Google, Kakao
              등).
            </p> */}
          </>
        )}
      </main>

      <footer className="cp-footer">
        <button className="cp-btn ghost wj-hide" onClick={onClose}>
          닫기
        </button>
        <button className="cp-btn primary" onClick={onClose}>
          확인
        </button>
      </footer>
    </div>
  );
}
export type CommonPopupHandle = {
  open: (type: OpenType, payload?: Payload) => void;
  close: () => void;
};

const CommonPopup = forwardRef<CommonPopupHandle, {}>(function CommonPopup(
  _,
  ref
) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const ctlRef = useRef<wjInputCore.Popup | null>(null);
  const holderRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<ReturnType<typeof ReactDOM.createRoot> | null>(null);

  const stateRef = useRef<{ type: OpenType | null; payload: Payload }>({
    type: null,
    payload: null,
  });
  const pendingOpenRef = useRef<{ type: OpenType; payload?: Payload } | null>(
    null
  );

  const onClose = useEvent(() => ctlRef.current?.hide());
  const renderContent = useEvent(() => {
    if (!rootRef.current) return;
    const { type, payload } = stateRef.current;
    rootRef.current.render(
      <PopupContent type={type} payload={payload} onClose={onClose} />
    );
  });

  useEffect(() => {
    if (!hostRef.current || ctlRef.current) return;

    const ctl = new wjInputCore.Popup(hostRef.current);
    ctlRef.current = ctl;

    const body =
      (hostRef.current.querySelector('.modal-body') as HTMLDivElement) ||
      hostRef.current;
    const holder = document.createElement('div');
    holder.id = 'popup-react-root';
    body.prepend(holder);
    holderRef.current = holder;

    const root = ReactDOM.createRoot(holder);
    rootRef.current = root;
    renderContent();

    if (pendingOpenRef.current) {
      const { type, payload } = pendingOpenRef.current;
      pendingOpenRef.current = null;
      setTimeout(() => {
        stateRef.current = { type, payload: payload ?? null };
        renderContent();
        ctl.show(true);
      }, 0);
    }

    return () => {
      ctl.dispose();
      root.unmount();
      ctlRef.current = null;
      rootRef.current = null;
      holderRef.current = null;
    };
  }, [renderContent]);

  const open = useEvent((type: OpenType, payload?: Payload) => {
    if (!ctlRef.current) {
      pendingOpenRef.current = { type, payload };
      return;
    }
    stateRef.current = { type, payload: payload ?? null };
    renderContent();
    ctlRef.current.show(true);
  });
  const close = useEvent(() => ctlRef.current?.hide());
  useImperativeHandle(ref, () => ({ open, close }), [open, close]);

  return (
    <div ref={hostRef} className="modal-content wj-popup custom-popup">
      <div className="modal-header" />
      <div className="modal-body" />
      <div className="modal-footer" />
    </div>
  );
});

export default CommonPopup;
