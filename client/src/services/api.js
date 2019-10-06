import axios from "axios";

const signup = (email, password) => {
  return axios
    .post("/api/auth/signup", { email, password })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err.response.data;
    });
};

const login = (email, password) => {
  return axios
    .post("/api/auth/login", { email, password })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err.response.data;
    });
};

const logout = () => {
  return axios
    .delete("/api/auth/logout")
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err.response.data;
    });
};

const getQuote = () => {
  return axios
    .get("/api/wisdom")
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err.resonse.data;
    });
};

export { signup, login, logout, getQuote };
