import { User } from "@/types";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => (
  <View style={styles.card}>
    <Text style={styles.name}>{user.name}</Text>
    <Text>{user.email}</Text>
    <Text>{user.fullAddress}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default UserCard;
