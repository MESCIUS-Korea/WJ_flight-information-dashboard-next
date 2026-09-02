import Image from 'next/image';
import './style.css';

const Header = () => {
  return (
    <header className="page__container__header">
      <div className="container page__header" style={{ margin: 'auto' }}>
        <div className="header__logo">
          <a
            className="header__logo_brand"
            href="https://www.mescius.co.kr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/MESCIUS_Logo.svg"
              alt="MESCIUS Logo"
              width={120}
              height={30}
            />
          </a>
          <div className="header__logo_divide"></div>
          <div className="header__logo_product">
            <a
              href="https://www.mescius.co.kr/wijmo/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="WJ_Logo.svg"
                alt="Wijmo Logo"
                width={85}
                height={15}
              />
            </a>
          </div>
        </div>
        <div className="header__links">
          <div className="site_hamburger-menu">
            <a
              className="link"
              href="https://demo.mescius.co.kr/wijmo/learn-wijmo/"
              target="_blank"
              rel="noopener noreferrer"
            >
              데모
            </a>
            <a
              className="link select"
              href="https://codepen.io/MESCIUS-Korea/live/MWMeOQm"
              target="_blank"
              rel="noopener noreferrer"
            >
              테마 디자이너
            </a>
            <a
              className="link select"
              href="https://demo.mescius.co.kr/wijmo/docs/GettingStarted/Introduction"
              target="_blank"
              rel="noopener noreferrer"
            >
              도움말
            </a>
            <a
              className="link"
              href="https://demo.mescius.co.kr/wijmo/api/Index.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              API
            </a>
          </div>
        </div>
        <div className="header__buttons">
          <a
            href="https://www.mescius.co.kr/wijmo/tutorial"
            className="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            다른 샘플
          </a>
          <a
            href="https://www.mescius.co.kr/wijmo/download"
            className="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            다운로드
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
