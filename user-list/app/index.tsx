import { store } from "@/store";
import { Provider } from "react-redux";
import UserListScreen from "./users-list";

export default function Index() {
  return (
    <Provider store={store}>
      <UserListScreen />
    </Provider>
  );
}
