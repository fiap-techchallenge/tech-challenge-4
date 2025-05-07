import { useCallback, useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { usePosts } from "@/hooks/usePosts";
import { useAuth } from "@/context/auth";
import { ArrowUpDown } from "lucide-react-native";

type SortField = "date" | "title" | "author";
type SortOrder = "asc" | "desc";

export default function MyPostsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { posts, isLoading, error, deletePost, refetch } = usePosts();
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      const myPosts = async () => {
        try {
          await refetch();
          await posts.filter((post) => post.author === user?.name);
        } catch (err) {
          console.error("Failed to fetch posts:", err);
        }
      };
      myPosts();
    }, []),
  );

  const myPosts = posts.filter((post) => post.author === user?.name);

  const sortedPosts = [...myPosts].sort((a, b) => {
    if (sortField === "date") {
      return sortOrder === "desc"
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    if (sortField === "title") {
      return sortOrder === "desc"
        ? b.title.localeCompare(a.title)
        : a.title.localeCompare(b.title);
    }
    return sortOrder === "desc"
      ? b.author.localeCompare(a.author)
      : a.author.localeCompare(b.author);
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((current) => (current === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const confirmDelete = (postId: string) => {
    setSelectedPostId(postId);
    setDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    if (selectedPostId) {
      await deletePost(selectedPostId);
      setDeleteModalVisible(false);
      setSelectedPostId(null);
    }
  };

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
      <View style={styles.header}>
        <Text style={styles.title}>Minhas Postagens</Text>
        <View style={styles.sortButtons}>
          <TouchableOpacity
            style={[
              styles.sortButton,
              sortField === "date" && styles.sortButtonActive,
            ]}
            onPress={() => handleSort("date")}
          >
            <Text style={styles.sortButtonText}>Data</Text>
            <ArrowUpDown
              size={16}
              color={sortField === "date" ? "#007AFF" : "#666"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.sortButton,
              sortField === "title" && styles.sortButtonActive,
            ]}
            onPress={() => handleSort("title")}
          >
            <Text style={styles.sortButtonText}>Título</Text>
            <ArrowUpDown
              size={16}
              color={sortField === "title" ? "#007AFF" : "#666"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.sortButton,
              sortField === "author" && styles.sortButtonActive,
            ]}
            onPress={() => handleSort("author")}
          >
            <Text style={styles.sortButtonText}>Autor</Text>
            <ArrowUpDown
              size={16}
              color={sortField === "author" ? "#007AFF" : "#666"}
            />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={sortedPosts}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.postCard}
            onPress={() => router.push(`/post/${item.id}`)}
          >
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postAuthor}>Por {item.authorName}</Text>
            <Text style={styles.postDate}>
              {new Date(item.createdAt).toLocaleDateString()}
            </Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => confirmDelete(item.id)}
            >
              <Text style={styles.deleteButtonText}>Excluir</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Excluir Postagem</Text>
            <Text style={styles.modalText}>
              Tem certeza que deseja excluir esta postagem? Esta ação não pode
              ser desfeita.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleDelete}
              >
                <Text
                  style={[styles.modalButtonText, styles.confirmButtonText]}
                >
                  Excluir
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  sortButtons: {
    flexDirection: "row",
    gap: 12,
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    gap: 4,
  },
  sortButtonActive: {
    backgroundColor: "#e3f2ff",
  },
  sortButtonText: {
    fontSize: 14,
    color: "#666",
  },
  postCard: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  postAuthor: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  postDate: {
    fontSize: 12,
    color: "#999",
  },
  deleteButton: {
    position: "absolute",
    right: 16,
    top: 16,
    backgroundColor: "#ff3b30",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  error: {
    color: "#ff3b30",
    textAlign: "center",
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    width: "80%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
    lineHeight: 24,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  modalButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  cancelButton: {
    backgroundColor: "#f5f5f5",
  },
  confirmButton: {
    backgroundColor: "#ff3b30",
  },
  confirmButtonText: {
    color: "#fff",
  },
});
