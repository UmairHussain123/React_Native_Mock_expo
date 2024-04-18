import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text, ScrollView } from "react-native";

import { Card, Title, Paragraph, Chip, TextInput } from "react-native-paper";

const Home = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = () => {
    fetch("https://fakestoreapi.com/products?limit=100")
      .then((res) => res.json())
      .then((json) => setProducts(json))
      .catch((error) => console.error("Error fetching product data:", error));
  };
  const navigateToCart = (product) => {
    navigation.navigate("Cart", { product });
  };
  const renderProductItem = ({ item }) => (
    <Card
      style={styles.card}
      onPress={() => {
        navigateToCart(item);
      }}
    >
      <Card.Cover source={{ uri: item.image }} />
      <Card.Content>
        <Title>{item.title}</Title>
        <Paragraph>${item.price}</Paragraph>
      </Card.Content>
    </Card>
  );

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    // Fetch products based on selected category
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
        console.log(json);
      })
      .catch((error) => console.error("Error fetching product data:", error));
  };

  const filterBySearchQuery = (query) => {
    setSearchQuery(query);
    if (!query) {
      fetchProductData();
      return;
    }
    // Split the search query into individual words
    const words = query.toLowerCase().split(" ");
    console.log(words);
    // Filter products based on search query words
    const filteredProducts = products.filter((product) =>
      words.every((word) => product.title.toLowerCase().includes(word))
    );
    console.log("filterPro flag>>", filteredProducts);
    setProducts(filteredProducts);
  };

  return (
    <View style={styles.container}>
      <View style={styles.chipContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            "electronics",
            "jewelery",
            "men's clothing",
            "women's clothing",
          ].map((category, index) => (
            <Chip
              key={index}
              style={
                selectedCategory === category
                  ? styles.selectedChip
                  : styles.chip
              }
              onPress={() => filterByCategory(category)}
            >
              {category}
            </Chip>
          ))}
        </ScrollView>
      </View>
      <TextInput
        label="Search products"
        value={searchQuery}
        onChangeText={filterBySearchQuery}
        style={styles.input}
      />
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  chipContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  chip: {
    marginHorizontal: 4,
  },
  selectedChip: {
    marginHorizontal: 4,
    backgroundColor: "#d4c4e2",
  },
  card: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
  },
});

export default Home;
