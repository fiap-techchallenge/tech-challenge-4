import { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { usePosts } from "@/hooks/usePosts";
import { SearchBar } from "@/components/SearchBar";
import { PostCard } from "@/components/PostCard";
import React from "react";

export default function HomeScreen() {
  const router = useRouter();
  const { posts, isLoading, error, refetch } = usePosts();
  const [searchQuery, setSearchQuery] = useState("");

  useFocusEffect(
    useCallback(() => {
      const loadPosts = async () => {
        try {
          await refetch();
        } catch (err) {
          console.error("Failed to fetch posts:", err);
        }
      };
      loadPosts();
    }, []), // Remove refetch from dependencies
  );

  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query)
    );
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Carregando postagens...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar onSearch={setSearchQuery} />
      <FlatList
        data={filteredPosts}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onPress={() => router.push(`/post/${item.id}`)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhuma postagem encontrada</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  list: {
    padding: 16,
  },
  error: {
    color: "#ff3b30",
    textAlign: "center",
    marginTop: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
});
