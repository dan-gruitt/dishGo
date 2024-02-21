import React, { useEffect } from "react";
import { Searchbar } from "react-native-paper";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { createClient, Deno } from "@supabase/supabase-js";
import {
  AutocompleteDropdownContextProvider,
  AutocompleteDropdown,
} from "react-native-autocomplete-dropdown";
import { DataSortingForAutocomplete } from "../utils/DataSorting";

const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL,
  process.env.EXPO_PUBLIC_SUPABASE_KEY
);

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [dishes, SetDishes] = React.useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const { data, error } = supabase
      .from("test_dishes")
      .select()
      .then(({ data }) => {
        SetDishes(DataSortingForAutocomplete(data));
      })
      .catch((error) => {
        console.log("ERROR >>", error);
      });
  };

  return (
    <>
      <View style={styles.container}>
        <AutocompleteDropdownContextProvider>
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        </AutocompleteDropdownContextProvider>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
