import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  filter: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    height: 70,
    alignItems: "center",
  },
  filterTextActived: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#EE6B26",
  },
  filterTextInactived: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#20295f",
    opacity: 0.5,
  },
});

export default styles;
