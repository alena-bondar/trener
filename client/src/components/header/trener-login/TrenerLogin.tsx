import { useForm } from "react-hook-form";
import { FormDataLogin } from "types/FormDataLogin";
import React from "react";
import { login } from "api/login";
import { useDispatch } from "react-redux";
import { newLogin } from "toolkit-redux/toolkitSlice";

export const TrenerLogin: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: {},
    watch,
  } = useForm<FormDataLogin>();

  const dispatch = useDispatch();
  dispatch(newLogin(watch("email")));

  return (
    <div>
      <form onSubmit={handleSubmit(login)}>
        <label htmlFor="email">email</label>
        <br />

        <input type="text" id="email" {...register("email")} />
        <br />
        <label htmlFor="pass">password</label>
        <br />
        <input type="password" id="pass" {...register("password")} />
        <br />
        <input type="submit" value="login" className="login" />
        <br />
      </form>
    </div>
  );
};
