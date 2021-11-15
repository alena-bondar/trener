import React from 'react';
import './style.scss';

export const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="footer__box">
        <div className="footer__container">
          <div className="footer__contacts">
            <p className="contacts">Контакти</p>

            <div className="footer__elems">
              <div className="adress">
                <i className="fa fa-home icon" />
                <span className="contacts__data ">
                  03040, Україна, м Київ, <br /> вул. Васильківська, 14
                </span>
              </div>
            </div>

            <div className="footer__elems">
              <i className="fa fa-mobile fa-2x icon" aria-hidden="true" />
              <a className="contacts__data num" href="tel:+38 (123) 456-78-90">
                +38 (067) 123-45-67
              </a>
            </div>

            <div className="footer__elems">
              <i className="fa fa-envelope icon" aria-hidden="true" />
              <a className="contacts__data" href="mailto:info@trener.ua">
                info@trener.ua
              </a>
            </div>
          </div>

          <div className="footer__support">
            <p className="contacts">Підтримка клієнтів</p>

            <div className="footer__elems">
              <i className="fa fa-calendar icon" aria-hidden="true" />
              <span className="contacts__data">Пн.-Нд. з 08:00 до 21:00</span>
            </div>

            <div className="footer__elems">
              <i className="fa fa-mobile fa-2x icon" aria-hidden="true" />
              <a className="contacts__data num" href="tel:+38 (123) 456-78-90">
                +38 (067) 123-45-67
              </a>
            </div>

            <div className="footer__elems">
              <i className="fa fa-mobile fa-2x icon" aria-hidden="true"></i>
              <a className="contacts__data num" href="tel:+38 (123) 456-78-90">
                +38 (067) 123-45-67
              </a>
            </div>
          </div>
        </div>

        <div className="footer__social-networks">
          <p className="contacts">Ми в соцмережах:</p>
          <div>
            <a
              target="_blank"
              className="footer__social-networks--insta"
              href="https://www.instagram.com/trener.ua/"
              rel="noreferrer"
            />
          </div>

          <div>
            <a
              target="_blank"
              className="footer__social-networks--facebook"
              href="https://www.facebook.com/trenerua"
              rel="noreferrer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
