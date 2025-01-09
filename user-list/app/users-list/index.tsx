import UserCard from "@/components/UserCard";
import { AppDispatch, RootState } from "@/store";
import { fetchUsers } from "@/store/data-slice";
import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const UserListScreen = () => {
  const [search, setSearch] = useState("");
  const [visibleUsers, setVisibleUsers] = useState(5);

  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );
  //   console.log("user is", users[0]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const loadMore = () => setVisibleUsers((prev) => prev + 5);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by name"
        value={search}
        onChangeText={setSearch}
      />
      {loading && <Text>Loading...</Text>}
      {error && <Text style={styles.error}>Error: {error}</Text>}
      <FlatList
        data={filteredUsers.slice(0, visibleUsers)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <UserCard user={item} />}
      />
      {visibleUsers < filteredUsers.length && (
        <Button title="Load More" onPress={loadMore} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  searchBar: {
    padding: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  error: {
    color: "red",
  },
});

export default UserListScreen;
