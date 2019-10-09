import axios from "axios";

const signup = (username, password) => {
  return axios
    .post("/api/auth/signup", { username, password })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

const login = (username, password) => {
  return axios
    .post("/api/auth/login", { username, password })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

const logout = () => {
  return axios
    .delete("/api/auth/logout")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

const getQuote = () => {
  return axios
    .get("/api/wisdom")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.resonse.data;
    });
};

const pushGem = (gemInfos) => {
  return axios
    .post("/api/gem/create", gemInfos)
    .then((response) => {
      console.log("Here is the new gem", response.data);
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

const pushTrip = (tripInfos) => {
  return axios
    .post("/api/trip/create", tripInfos)
    .then((response) => {
      console.log("Here is the new trip", response.data);
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

const requestTrips = (creatorid) => {
  const param = creatorid;
  console.log("Check Param", param);
  return axios
    .get(`/api/trip/${param}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

const updateTrip = (updatedTrip) => {
  console.log(
    "Updated Trip to pass to function which makes axios call object:",
    updatedTrip
  );
  let gemsVisited = updatedTrip.existingGems;
  let gemId = updatedTrip.selectedTrip;
  return axios
    .put("/api/trip/update", { gemsVisited, gemId })
    .then((updatedtrip) => {
      console.log("Received Data from server back frontend", updatedtrip);
    })
    .catch((err) => {
      console.log(err);
    });
};

const specificGems = (creatorid) => {
  const param = creatorid;
  return axios
    .get(`/api/gem/creator/${param}`)
    .then((response) => {
      console.log("Got data from Axios call", response.data);
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export {
  signup,
  login,
  logout,
  getQuote,
  pushGem,
  requestTrips,
  pushTrip,
  specificGems,
  updateTrip
};
