import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import facebookImg from "images/facebook.min.svg";
import googleImg from "images/google.min.svg";

import "./style.scss";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
      className="blue"
    >
      {value === index && (
        <Box sx={{}}>
          <Typography component={"span"} variant={"body2"}>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const TabPanels: React.FC = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: "white" }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          className="tabpanel"
        >
          <Tab label="Про тренера" {...a11yProps(0)} />
          <Tab label="Місце роботи" {...a11yProps(1)} />
          <Tab label="Досягнення" {...a11yProps(2)} />
          <Tab label="Відгуки(0)" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <div className="tabpanel__about">
            <div className="tabpanel__about__tegs">
              <span className="tabpanel__about__param">
                <i
                  className="fa fa-tachometer fa-costum fa-costum--up fa-costum--center"
                  aria-hidden="true"
                />
                Вік
              </span>
              <span className="tabpanel__about__value">35 років</span>
            </div>
            <div className="tabpanel__about__tegs">
              <span className="tabpanel__about__param">
                <i
                  className="fa fa-arrows fa-costum fa-costum--up fa-costum--center"
                  aria-hidden="true"
                />
                Знання мов
              </span>
              <span className="tabpanel__about__value">
                Українська, Російська, English
              </span>
            </div>
            <div className="tabpanel__about__tegs">
              <span className="tabpanel__about__param">
                <i
                  className="fa fa-university fa-costum fa-costum--up fa-costum--center"
                  aria-hidden="true"
                />
                Освіта
              </span>
              <span className="tabpanel__about__value">
                Киевский техникум легкой промышленности (КТЛП)
              </span>
            </div>
            <div className="tabpanel__about__tegs">
              <span className="tabpanel__about__param">
                <i
                  className="fa fa-check-square-o fa-costum fa-costum--up fa-costum--center"
                  aria-hidden="true"
                />
                Курси
              </span>
              <span className="tabpanel__about__value">Механіка</span>
            </div>
            <div className="tabpanel__about__tegs">
              <span className="tabpanel__about__param">
                <i
                  className="fa fa-certificate fa-costum fa-costum--up fa-costum--center"
                  aria-hidden="true"
                />
                Сертифікати
              </span>
              <span className="tabpanel__about__value">CERTIFICATE T 1290</span>
            </div>
          </div>
        </TabPanel>

        <TabPanel value={value} index={1} dir={theme.direction}>
          <div className="tabpanel__about">
            <div className="tabpanel__about__tegs">
              <span className="tabpanel__about__param">
                <i
                  className="fa fa-tachometer fa-costum fa-costum--up fa-costum--center"
                  aria-hidden="true"
                />
                Сучасні танці
              </span>
              <span className="tabpanel__about__value">5 років</span>
            </div>

            <div className="tabpanel__about__tegs">
              <span className="tabpanel__about__param">
                <i
                  className="fa fa-tachometer fa-costum fa-costum--up fa-costum--center"
                  aria-hidden="true"
                />
                Фітнес
              </span>
              <span className="tabpanel__about__value">7 років</span>
            </div>
          </div>
        </TabPanel>

        <TabPanel value={value} index={2} dir={theme.direction}>
          <div className="tabpanel__about__tegs">
            <span className="tabpanel__about__param">
              <i
                className="fa fa-fire fa-costum fa-costum--up fa-costum--center"
                aria-hidden="true"
              />
              Захід і статус
            </span>
            <span className="tabpanel__about__value">
              Призер по рукопашному бою закрытого первенства ВС СССР среди
              подразделений ГРУ 1979 года
            </span>
          </div>
          <div className="tabpanel__about__tegs">
            <span className="tabpanel__about__param">
              <i
                className="fa fa-map fa-costum fa-costum--up fa-costum--center"
                aria-hidden="true"
              />
              Місце проведення
            </span>
            <span className="tabpanel__about__value">Псков</span>
          </div>
          <br />
          <div className="tabpanel__about__tegs">
            <span className="tabpanel__about__param">
              <i
                className="fa fa-fire fa-costum fa-costum--up fa-costum--center"
                aria-hidden="true"
              />
              Захід і статус
            </span>
            <span className="tabpanel__about__value">
              Кубок України з легкої атлетики в приміщенні 2020р -біг 1500м
              1місце
            </span>
          </div>
          <div className="tabpanel__about__tegs">
            <span className="tabpanel__about__param">
              <i
                className="fa fa-map fa-costum fa-costum--up fa-costum--center"
                aria-hidden="true"
              />
              Місце проведення
            </span>
            <span className="tabpanel__about__value">м. Київ</span>
          </div>
        </TabPanel>

        <TabPanel value={value} index={3} dir={theme.direction}>
          <div className="respond">
            <div className="respond__input-block">
              <div className="respond__container">
                <i
                  className="fa respond__container__icon fa-align-center"
                  aria-hidden="true"
                />
                <input
                  className="respond__input"
                  type="text"
                  placeholder="Напишіть Ваш відгук"
                />
                <div className="respond__container__likes">
                  <p className="respond__container__text">Оцінка</p>
                  <button className="respond__container__button button-up">
                    <i
                      className="fa fa-costum  fa-costum__response  fa-costum--up fa-thumbs-up"
                      aria-hidden="true"
                    />
                  </button>
                  <button className="respond__container__button button-down">
                    <i
                      className="fa fa-costum fa-costum__response fa-costum--down fa-thumbs-down"
                      aria-hidden="true"
                    />
                  </button>
                </div>
                <div className="respond__bottom">
                  <div>
                    <span className="respond__bottom__text">
                      Увійти за допомогою
                    </span>
                    <img
                      src={facebookImg}
                      className="respond__bottom__face"
                      alt="Facebook img"
                    />
                    <img
                      src={googleImg}
                      className="respond__bottom__google"
                      alt="Google img"
                    />
                  </div>
                  <button className="respond__bottom__button">
                    Опублікувати
                  </button>
                </div>
              </div>
            </div>
            <div className="respond__filtered-respond">
              <span className="respond__filtered-respond__text">
                Фільтрувати:{" "}
                <select className="respond__filters">
                  <option>усі</option>
                  <option>лише позитивні</option>
                  <option>лише негативні</option>
                </select>{" "}
              </span>
              <hr />
              <div className="filters-window"></div>
            </div>
          </div>
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
};

export default TabPanels;
