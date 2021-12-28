import React, { useState, useEffect, ChangeEvent } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormData } from "types/FormData";
import { validationSchema } from "helpers/validationShema";
import { fullNameMessage } from "helpers/fullNameMessage";
import { sports } from "api/sports";
import { useDispatch } from "react-redux";

import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";

import users from "api/users";
import kindsOfSport from "types/kindsOfSports";
import InputMask from "react-input-mask";

import "./style.scss";
import usePlacesAutocomplete from "use-places-autocomplete";
import { newUser } from "../../../toolkit-redux/toolkitSlice";

type Props = {
  setShowRegistration: (param: boolean) => void;
};

export const TrenerRegistration: React.FC<Props> = ({
  setShowRegistration,
}) => {
  const [kindsOfSport, setKindsOfSport] = useState<kindsOfSport[] | []>([]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete();

  const dispatch = useDispatch();

  const onSubmit = (data: FormData) => {
    const withoutDash = {
      ...data,

      phoneNumber: data.phoneNumber.split("-").join(""),
    };

    dispatch(newUser(withoutDash));
    users(withoutDash);
    reset();
  };

  const fetchKindsOfSports = async () => {
    const kindsOfSports = await sports();

    if (!kindsOfSports || kindsOfSports instanceof Error) {
      console.error("Error downloading kindsOfSports");
    } else {
      setKindsOfSport(kindsOfSports);
    }
  };

  useEffect(() => {
    fetchKindsOfSports();
  }, []);

  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const handleSelect = (val: string): void => {
    setValue(val, false);
  };

  const renderSuggestions = () => {
    return data.map(({ place_id, description }) => (
      <ComboboxOption key={place_id} value={description} />
    ));
  };

  return (
    <div className="reg">
      <div className="reg__header">
        <span className="reg__tittle">Реєстрація тренера</span>
        <button
          className="reg__close-btn"
          onClick={() => setShowRegistration(false)}
        >
          X
        </button>
      </div>

      <div className="reg__form-container">
        <form className="reg__form" onSubmit={handleSubmit(onSubmit)}>
          <i
            className="fa fa-envelope-o fa-2x reg__icon reg__icon--down"
            aria-hidden="true"
          />
          <div className="reg__inlet">
            <div className="error">
              <span>{errors.email?.message}</span>
            </div>
            <input
              type="text"
              className="input"
              placeholder="Ваш e-mail"
              {...register("email")}
            />
          </div>

          <i
            className="fa fa-address-card-o fa-2x reg__icon reg__icon--down"
            aria-hidden="true"
          />
          <div className="reg__inlet reg__inlet--for-two">
            <div className="reg__form__name">
              <div className="error">
                <span>
                  {fullNameMessage(watch)
                    ? fullNameMessage(watch)
                    : errors.name?.message}
                </span>
              </div>
              <input
                type="text"
                className="input input--short"
                placeholder="Ім'я"
                {...register("name")}
              />
            </div>
            <div className="reg__form__last-name">
              <input
                type="text"
                className="input input--short"
                placeholder="Прізвище"
                {...register("lastName", { minLength: 2 })}
              />
            </div>
          </div>

          <div className="reg__inlet--for-age-price reg__inlet">
            <div className="error error--up">
              <span>{errors.age?.message}</span>
            </div>
            <i
              className="fa fa-hourglass-start fa-2x reg__icon reg__icon--down reg__icon--dollar"
              aria-hidden="true"
            />
            <div>
              <input
                className="input input--code"
                placeholder="Вік"
                type="number"
                {...register("age", {
                  min: 16,
                  max: 80,
                })}
              />
            </div>

            <div className="error">
              <span>{errors.price?.message}</span>
            </div>
            <i
              className="fa fa-usd fa-2x reg__icon reg__icon--down reg__icon--dollar"
              aria-hidden="true"
            />
            <div>
              <input
                placeholder="Ціна послуг"
                className="input input--price"
                type="number"
                min="0"
                {...register("price")}
              />
            </div>
          </div>

          <i
            className="fa fa-futbol-o fa-2x reg__icon reg__icon--down"
            aria-hidden="true"
          />
          <div className="reg__inlet">
            {watch("sport") === "Основний вид спорту" && (
              <span className="error">Виберіть будь-ласка вид спорту</span>
            )}
            <select className="input" {...register("sport")}>
              <option disabled className="option">
                Основний вид спорту
              </option>
              {kindsOfSport.map((elem: kindsOfSport) => {
                return (
                  <option key={elem.value} value={elem.value}>
                    {elem.label}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="reg__info-text">
            <span>
              Після завершення реєстрації в особистому кабінеті Ви зможете
              додати ще 2 додаткових вида спорту
            </span>
          </div>
          <div>
            <div>
              <i
                className="fa fa-map-marker fa-2x reg__icon reg__icon--down"
                aria-hidden="true"
              />
              <Combobox onSelect={handleSelect} className="reg__inlet">
                <ComboboxInput
                  {...register("location")}
                  className="input"
                  value={value}
                  placeholder="Місце роботи"
                  onChange={handleInput}
                  disabled={!ready}
                />
                <ComboboxPopover>
                  <ComboboxList className="location">
                    {status === "OK" && renderSuggestions()}
                  </ComboboxList>
                </ComboboxPopover>
              </Combobox>
            </div>
          </div>
          <i className="fa fa-mobile fa-3x reg__icon" aria-hidden="true" />
          <div className="reg__inlet--for-two reg__inlet">
            {errors.phoneNumber && (
              <span className="error">Поле повинно мати значення</span>
            )}
            <div>
              <input className="input input--code" disabled placeholder="38" />
            </div>

            <div>
              <Controller
                render={({ field }) => (
                  <InputMask
                    placeholder="___-___-__-__"
                    className="input input--num"
                    {...field}
                    mask="999-999-99-99"
                  />
                )}
                control={control}
                name="phoneNumber"
              />
            </div>
          </div>

          <i
            className="fa fa-key fa-2x reg__icon reg__icon--down"
            aria-hidden="true"
          />
          <div className="reg__inlet">
            <span className="error">{errors.password?.message}</span>
            <input
              type="password"
              className="input"
              autoComplete="on"
              {...register("password", { minLength: 6 })}
              placeholder="Пароль"
            />
          </div>

          <i
            className="fa fa-key fa-2x reg__icon reg__icon--down"
            aria-hidden="true"
          />
          <div className="reg__inlet">
            <span className="error">{errors.submitPassword?.message}</span>
            <input
              type="password"
              className="input"
              autoComplete="on"
              {...register("submitPassword", { minLength: 6 })}
              placeholder="Підтвердіть пароль"
            />
          </div>

          <button className="registration-btn" type="submit">
            Зареєструватися
          </button>

          <div className="reg__choice-text">
            <span>або увійти з допомогою</span>
          </div>

          <div className="reg__by">
            <div>
              <a className="reg__by__netw reg__by__netw--facebook" />
            </div>
            <div>
              <a className="reg__by__netw reg__by__netw--google" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
