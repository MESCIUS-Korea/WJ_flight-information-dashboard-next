import Image from 'next/image';
import './style.css';
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <div className="company-info">
          <div className="img-wrap">
            <a
              href="http://mescius.co.kr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://assets.codepen.io/975719/MESCIUS_Logo_white.png"
                alt="MESCIUS 로고"
                width={150}
                height={30}
              />
            </a>
          </div>
          <p>&copy; {currentYear} MESCIUS Inc. All Rights Reserved.</p>
          <ul className="sns">
            <li>
              <a
                href="https://www.facebook.com/MESCIUS.KOREA/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-facebook" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/channel/UChn5GSeq6vxg0xvQwNFhLHQ"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-youtube-play" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a
                href="https://pf.kakao.com/_ClxiWxb"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-comment" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="site-nav">
          <ul className="col">
            <li>
              <h4>제품</h4>
              <ul>
                <li>
                  <a
                    href="https://www.mescius.co.kr/web"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    For Web 개발자
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.mescius.co.kr/dotnet"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    For .NET 개발자
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.mescius.co.kr/solutions"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    비즈니스 WEB 개발 솔루션
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <ul className="col">
            <li>
              <h4>고객 서비스</h4>
              <ul>
                <li>
                  <a
                    href="https://www.mescius.co.kr/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    개발자 문서
                  </a>
                </li>
                <li>
                  <a
                    href="https://dev.mescius.co.kr"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    개발자 포럼
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/MESCIUS.KOREA/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    페이스북
                  </a>
                </li>
                <li>
                  <a
                    href="https://pf.kakao.com/_ClxiWxb"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    카카오톡 채널 추가
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <ul className="col">
            <li>
              <h4>메시어스 정보</h4>
              <ul>
                <li>
                  <a
                    href="https://www.mescius.com/ko/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    MESCIUS 알아보기
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.mescius.com/ko/recruit/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    MESCIUS 채용
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <ul className="col">
            <li>
              <h4>정책(Policy)</h4>
              <ul>
                <li>
                  <a
                    href="https://www.mescius.co.kr/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    EULA
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.mescius.co.kr/%EA%B0%9C%EC%9D%B8%EC%A0%95%EB%B3%B4-%EC%88%98%EC%A7%91-%EB%B0%8F-%EC%9D%B4%EC%9A%A9-%EB%8F%99%EC%9D%98"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    개인정보 수집 및 이용 동의
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
