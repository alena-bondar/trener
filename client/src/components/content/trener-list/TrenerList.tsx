import React, { useEffect, useState } from "react";
import { treners } from "api/treners";
import trenerImg from "images/superman-icon.png";
import "./style.scss";
import { Link, useLocation } from "react-router-dom";

type Props = {
  queryParams: { sport: string; priceFrom: string; priceTo: string };
};

const TrenerList: React.FC<Props> = ({ queryParams }) => {
  const [trenersForShowing, setTrenersForShowing] = useState([]);
  const query = new URLSearchParams(useLocation().search);
  const searchParams = {
    sport: query.get("sport"),
    priceFrom: query.get("priceFrom"),
    priceTo: query.get("priceTo"),
  };

  useEffect(() => {
    treners(searchParams).then((treners) => {
      setTrenersForShowing(treners.data);
    });
  }, [queryParams.sport, queryParams.priceFrom, queryParams.priceTo]);

  return (
    <div>
      <div className="trener-cards">
        {trenersForShowing.map(
          (trener: {
            _id: number;
            name: string;
            lastName: string;
            sport: string;
            price: number;
          }) => {
            return (
              <div key={trener._id} className="trener-card">
                <div className="trener-card__info-block">
                  <Link to={`/trainers/${trener._id}`}>
                    <img
                      className="trener-card__img"
                      src={trenerImg}
                      alt="superman-icon"
                    />
                  </Link>
                  <div className="trener-card__info">
                    <Link
                      className="trener-card__info__sport"
                      to={`/trainers/${trener._id}`}
                    >
                      <p className="trener-card__info__name">{`${trener.name} ${trener.lastName}`}</p>
                      <p className="trener-card__info__sport">{trener.sport}</p>
                    </Link>
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
          }
        )}
      </div>
    </div>
  );
};

export default React.memo(TrenerList);
