import React, { Dispatch } from "react";
import { useForm } from "react-hook-form";
import { FormDataLogin } from "types/FormDataLogin";
import { login } from "api/login";
import { useDispatch } from "react-redux";
import { newLogin } from "toolkit-redux/toolkitSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../../helpers/validationShema";
import "./style.scss";
import { GoogleLogin } from "../google-login/GoogleLogin";
import classNames from "classnames";

type Props = {
  isLoginVisible: boolean;
  setIsLoginVisible: Dispatch<React.SetStateAction<boolean>>;
};

export const TrenerLogin: React.FC<Props> = ({
  isLoginVisible,
  setIsLoginVisible,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormDataLogin>({
    resolver: yupResolver(validationSchema),
  });

  const dispatch = useDispatch();
  dispatch(newLogin(watch("email")));

  return (
    <div className="login-modal">
      <div className="login">
        <div>
          <div className="reg__header">
            <span className="reg__tittle">увійти</span>
            <button
              className="reg__close-btn"
              onClick={() => setIsLoginVisible(false)}
            >
              X
            </button>
          </div>
        </div>
        <div className="login__container">
          <form className="login__form" onSubmit={handleSubmit(login)}>
            <i
              className="fa fa-envelope-o fa-2x reg__icon reg__icon--down"
              aria-hidden="true"
            />
            <div className="reg__inlet">
              <span className="error">{errors.email?.message}</span>

              <input
                className={classNames("input", {
                  "input--orange": errors.email,
                })}
                placeholder="Ваш e-mail"
                type="text"
                id="email"
                {...register("email")}
              />
            </div>

            <i
              className="fa fa-key fa-2x reg__icon reg__icon--down"
              aria-hidden="true"
            />
            <div className="reg__inlet">
              <span className="error">{errors.password?.message}</span>

              <input
                className={classNames("input", {
                  "input--orange": errors.password,
                })}
                placeholder="Пароль"
                type="password"
                id="pass"
                {...register("password")}
              />
            </div>

            <div className="login__enter">
              <div className="login__enter__cont">
                <button
                  type="submit"
                  value="login"
                  className="registration-btn"
                >
                  Увійти
                </button>
              </div>
              <button type="submit" className="login__forgot-pass">
                Забули пароль?
              </button>
            </div>

            <br />
          </form>
          <p className="login__other-way">або увійти за допомогою</p>
          <GoogleLogin />
        </div>
      </div>
    </div>
  );
};
