import * as React from "react";
import trenerImg from "images/superman-icon.png";
import TabPanels from "./tab panel/TabPanels";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getTrenerInfo } from "../../api/getTrenerInfo";

import "./style.scss";

import Map from "helpers/map";

const TrenersInfo: React.FC = () => {
  const preData = {
    name: "Name",
    lastName: "Surname",
    email: "e-mail",
    phoneNumber: "000",
    price: 0,
    sport: "sport",
    locationSport: { lat: 50.45466, lng: 30.5238 },
  };
  const [trenerInfo, setTrenerInfo] = useState(preData);

  const trenerId = useParams().id;

  useEffect(() => {
    getTrenerInfo(trenerId).then((info) => setTrenerInfo(info.data));
  }, []);

  return (
    <div className="treners-info">
      <div className="treners-info__left-size">
        <img className="treners-photo" src={trenerImg} alt="Trener photo" />

        <div className="treners-info__map">
          <div className="treners-info__google-map">
            <Map location={trenerInfo.locationSport} />
          </div>
        </div>
      </div>

      <div className="treners-info__right-size">
        <div className="information">
          <p className="information__full-name">
            {trenerInfo.name + " " + trenerInfo.lastName}
          </p>
          <div className="information__likes">
            <i
              className="fa fa-costum fa-costum--up fa-thumbs-up"
              aria-hidden="true"
            />{" "}
            <span className="information__likes__count">0</span>
            <i
              className="fa fa-costum fa-costum--down fa-thumbs-down"
              aria-hidden="true"
            />{" "}
            <span className="information__likes__count">0</span>
          </div>
          <p className="information__trener-id">Тренер ID: 321</p>

          <div className="information__contacts">
            <div className="information__contacts__numbers">
              <i className="fa fa-costum fa-mobile" aria-hidden="true" />
              <a
                href={`tel:${trenerInfo.phoneNumber}`}
                className="information__contacts__number"
              >
                {trenerInfo.phoneNumber}
              </a>
            </div>
            <div className="information__contacts__write-to-trener">
              <button className="button">Написати тренеру</button>
            </div>
          </div>
        </div>
        <div className="treners-info__tabs">
          <TabPanels />
        </div>
      </div>
    </div>
  );
};

export default React.memo(TrenersInfo);
