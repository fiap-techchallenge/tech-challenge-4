import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAuth } from "@/context/auth";
import { ArrowLeft, Pencil, Save, Trash2, X } from "lucide-react-native";
import { postInfo } from "@/app/api/index";
import { usePosts } from "@/hooks/usePosts";

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author: string;
  createdAt: string;
}

export default function PostScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [editedAuthorName, setEditedAuthorName] = useState("");
  const [error, setError] = useState("");
  const { updatePost } = usePosts();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await postInfo(id);
        console.log("Post fetched:", post);
        setPost(post);
        setEditedTitle(post.title);
        setEditedContent(post.content);
        setEditedAuthorName(post.author);
      } catch (err) {
        setError("Falha ao carregar postagem");
      }
    };

    fetchPost();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(post?.title || "");
    setEditedContent(post?.content || "");
    setEditedAuthorName(post?.author || "");
  };

  const handleSave = async () => {
    try {
      if (
        !editedTitle.trim() || !editedContent.trim() || !editedAuthorName.trim()
      ) {
        setError("Todos os campos são obrigatórios");
        return;
      }
      await updatePost({
        id: post?.id || "",
        title: editedTitle,
        content: editedContent,
        author: editedAuthorName,
        authorId: post?.authorId || "",
        createdAt: post?.createdAt || "",
      }, id as string);

      setPost((prev) =>
        prev
          ? {
            ...prev,
            title: editedTitle,
            content: editedContent,
            author: editedAuthorName,
          }
          : null
      );

      setIsEditing(false);
    } catch (err) {
      setError("Falha ao salvar alterações");
    }
  };

  const handleDelete = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.back();
    } catch (err) {
      setError("Falha ao excluir postagem");
    }
  };

  if (!post) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  const isTeacher = user?.role === "teacher";
  const isAuthor = user?.name === post.author;
  const canEdit = isTeacher && isAuthor;

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <ArrowLeft size={24} color="#007AFF" />
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.header}>
        {isEditing
          ? (
            <>
              <TextInput
                style={styles.titleInput}
                value={editedTitle}
                onChangeText={setEditedTitle}
                placeholder="Título da postagem"
              />
              <TextInput
                style={styles.authorInput}
                value={editedAuthorName}
                onChangeText={setEditedAuthorName}
                placeholder="Nome do autor"
              />
            </>
          )
          : (
            <>
              <Text style={styles.title}>{post.title}</Text>
              <Text style={styles.author}>Por {post.author}</Text>
            </>
          )}

        <Text style={styles.date}>
          {new Date(post.createdAt).toLocaleDateString()}
        </Text>

        {isEditing
          ? (
            <TextInput
              style={styles.contentInput}
              value={editedContent}
              onChangeText={setEditedContent}
              placeholder="Conteúdo da postagem"
              multiline
              textAlignVertical="top"
            />
          )
          : <Text style={styles.content}>{post.content}</Text>}

        {canEdit && (
          <View style={styles.actions}>
            {isEditing
              ? (
                <>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.saveButton]}
                    onPress={handleSave}
                  >
                    <Save size={20} color="#fff" />
                    <Text style={styles.actionButtonText}>Salvar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.cancelButton]}
                    onPress={handleCancel}
                  >
                    <X size={20} color="#fff" />
                    <Text style={styles.actionButtonText}>Cancelar</Text>
                  </TouchableOpacity>
                </>
              )
              : (
                <>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.editButton]}
                    onPress={handleEdit}
                  >
                    <Pencil size={20} color="#fff" />
                    <Text style={styles.actionButtonText}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={handleDelete}
                  >
                    <Trash2 size={20} color="#fff" />
                    <Text style={styles.actionButtonText}>Excluir</Text>
                  </TouchableOpacity>
                </>
              )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButtonText: {
    color: "#007AFF",
    fontSize: 16,
    marginLeft: 8,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  author: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  titleInput: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 8,
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
  },
  authorInput: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
  },
  date: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  contentInput: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    minHeight: 200,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  editButton: {
    backgroundColor: "#007AFF",
  },
  deleteButton: {
    backgroundColor: "#ff3b30",
  },
  saveButton: {
    backgroundColor: "#34c759",
  },
  cancelButton: {
    backgroundColor: "#8e8e93",
  },
  error: {
    color: "#ff3b30",
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#ffebeb",
    borderRadius: 8,
  },
});
