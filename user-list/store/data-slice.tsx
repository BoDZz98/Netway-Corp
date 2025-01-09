import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, UsersState } from "@/types";

const API_URL = "https://jsonplaceholder.typicode.com/users";
const initialState: UsersState = {
  loading: false,
  error: null,
  users: [],
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      // await AsyncStorage.removeItem("users");
      const cachedUsers = await AsyncStorage.getItem("users");
      if (cachedUsers) return JSON.parse(cachedUsers);

      const response = await axios.get(API_URL);
      const users = response.data.map((user: User) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        fullAddress: `${user.address.street}, ${user.address.city}, ${user.address.zipcode}`,
      }));
      // console.log(users);

      await AsyncStorage.setItem("users", JSON.stringify(users));

      return users;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;

/* 
{
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  },
*/
