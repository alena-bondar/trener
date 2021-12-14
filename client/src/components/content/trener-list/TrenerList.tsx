import React, { useEffect, useState } from "react";
import { treners } from "api/treners";
import trenerImg from "images/superman-icon.png";
import "./style.scss";
import { useLocation } from "react-router-dom";

type Props = {
  queryParams: any;
};

const TrenerList: React.FC<Props> = ({ queryParams }) => {
  const [trenersForShowing, setTrenersForShowing] = useState([]);
  const query = new URLSearchParams(useLocation().search);
  const sport = query.get("sport") ? `sport=${query.get("sport")}` : "";
  const price = query.get("priceFrom")
    ? `priceFrom=${query.get("priceFrom")}&priceTo=${query.get("priceTo")}`
    : "";

  useEffect(() => {
    treners(sport, price).then((treners) => {
      setTrenersForShowing(treners.data);
    });
  }, [queryParams.sport, queryParams.priceFrom, queryParams.priceTo]);

  console.log(trenersForShowing);

  return (
    <div>
      <div className="trener-cards">
        {trenersForShowing.map((trener: any) => {
          return (
            <div key={trener._id} className="trener-card">
              <div className="trener-card__info-block">
                <img
                  className="trener-card__img"
                  src={trenerImg}
                  alt="superman-icon"
                />
                <div className="trener-card__info">
                  <p className="trener-card__info__name">{`${trener.name} ${trener.lastName}`}</p>
                  <p className="trener-card__info__sport">{trener.sport}</p>
                </div>
              </div>
              <div className="trener-card__price-block">
                <div>
                  <p className="trener-card__price-block__price">
                    від ₴{trener.price}
                  </p>
                  <p className="trener-card__price-block__text">
                    за тренування
                  </p>
                </div>
                <button className="trener-card__write-to-trener">
                  Написати тренеру
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(TrenerList);
