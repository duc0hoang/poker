import React, { useState, useCallback } from "react";
import Game from "../Game";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";

const userSchema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().required().email(),
  phone: yup.string().required().matches(/^[0-9]+$/),
});

const Home = () => {
  const [isStarted, setIsStarted] = useState(false);
  const dispatch = useDispatch();

  const { handleChange, values, errors, isValid, handleBlur, touched, setValues } = useFormik({
    initialValues: {
      username: '',
      email: '',
      phone: '',
      totalPoint: 25000,
      cards: [],
    },
    validationSchema: userSchema,
    validateOnMount: true,
  });

  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    if (!isValid) return;

    dispatch({ type: "ADD_PLAYER", payload: values });

    setIsStarted(true);
  }, [touched, errors, isValid, dispatch, values, setIsStarted]);

  // const setAllTouched = () => {
  //   const fields = ['username', 'email', 'phone']
  // };

  const handleSetDefaultPlayer = useCallback(() => {
    const defaultPlayer = {
      username: 'hoang',
      email: 'hoang@gmail.com',
      phone: '123123123',
      totalPoint: 25000,
      cards: [],
    }

    setValues(defaultPlayer);
  }, [setValues]);

  return (
    <>
      {
        isStarted ?
          <Game /> :
          <div
            className=""
            style={{
              width: "100vw",
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1 className="diplay-4 mb-5"> Welcome to Pocker Center</h1>
            <h3>Fill your info and start</h3>
            <form onSubmit={handleSubmit} className="w-25 mx-auto">
              <input
                type="input"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                placeholder="username"
                className="w-100 form-control mb-3"
              />
              {touched.username && errors.username && <p className="text-danger">{errors.username}</p>}
              <input
                type="input"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="email"
                className="w-100 form-control mb-3"
              />
              {touched.email && errors.email && <p className="text-danger">{errors.email}</p>}
              <input
                type="input"
                name="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                placeholder="phone"
                className="w-100 form-control mb-3"
              />
              {touched.phone && errors.phone && <p className="text-danger">{errors.phone}</p>}
              <button className="btn btn-success" disabled={!isValid} >Start new Game</button>
            </form>
            <button onClick={handleSetDefaultPlayer} className="btn btn-primary">Set default player</button>
          </div>
      }
    </>
  );
};

export default Home;
