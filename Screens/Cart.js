import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

const Cart = ({ route }) => {
  const { product } = route.params;

  // Dummy reviews data
  const reviews = [
    { id: 1, rating: 4, comment: "Great product!" },
    { id: 2, rating: 5, comment: "Amazing quality!" },
    { id: 3, rating: 3, comment: "Average, but does the job." },
    { id: 4, rating: 5, comment: "Highly recommend!" },
  ];

  const renderReviewItem = ({ item }) => (
    <Card style={styles.reviewCard}>
      <Card.Content>
        <Title style={styles.reviewRating}>Rating: {item.rating}/5</Title>
        <Paragraph style={styles.reviewComment}>{item.comment}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.productInfo}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>
      <View style={styles.reviews}>
        <Title style={styles.reviewsTitle}>Customer Reviews</Title>
        <FlatList
          data={reviews}
          renderItem={renderReviewItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  productInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  reviews: {
    flex: 1,
  },
  reviewsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  reviewCard: {
    marginBottom: 10,
  },
  reviewRating: {
    fontSize: 16,
    fontWeight: "bold",
  },
  reviewComment: {
    fontSize: 16,
  },
});

export default Cart;
