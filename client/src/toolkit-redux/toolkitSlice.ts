import { createSlice } from "@reduxjs/toolkit";

const toolkitSlice = createSlice({
  name: "toolkit",
  initialState: {
    user: {
      name: "Name",
      lastName: "Surname",
      email: "e-mail",
      phoneNumber: "000",
      price: 0,
      sport: "sport",
      locationSport: { lat: 50.45466, lng: 30.5238 },
    },

    emailInLogin: "",
  },
  reducers: {
    newUser(state, action) {
      state.user = action.payload;
    },
    newLogin(state, action) {
      state.emailInLogin = action.payload;
    },
  },
});

export default toolkitSlice.reducer;
export const { newUser, newLogin } = toolkitSlice.actions;
