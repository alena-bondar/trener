interface User {
  phoneNumber: string;
  email: string;
  name: string;
  lastName: string;
  sport: string;
  age: number;
  price: number;
  password: string;
  submitPassword: string;
  location: string;
}

const defaultData = {
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
};

const NEW_USER = "NEW_USER";
const NEW_LOGIN = "NEW_LOGIN";

const userReducer = (
  state = defaultData,
  action: { type: string; [key: string]: string }
) => {
  switch (action.type) {
    case NEW_USER:
      return {
        ...state,
        user: {
          ...state.user,
          name: state.user.name,
          lastName: state.user.lastName,
          email: state.user.email,
          phoneNumber: state.user.phoneNumber,
          price: state.user.price,
          sport: state.user.sport,
          locationSport: state.user.locationSport,
        },
      };

    case NEW_LOGIN:
      return {
        ...state,
        emailInLogin: action.payload,
      };

    default:
      return state;
  }
};

export const addUserAction = (payload: User) => ({
  type: NEW_USER,
  payload,
});

export const addEmailAction = (payload: string) => ({
  type: NEW_LOGIN,
  payload,
});

export default userReducer;
