import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author: string;
  createdAt: string;
}

interface PostCardProps {
  post: Post;
  onPress: () => void;
}

export function PostCard({ post, onPress }: PostCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.preview} numberOfLines={2}>
        {post.content}
      </Text>
      <View style={styles.footer}>
        <Text style={styles.author}>Por {post.author}</Text>
        <Text style={styles.date}>
          {new Date(post.createdAt).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  preview: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  author: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  date: {
    fontSize: 12,
    color: "#999",
  },
});
