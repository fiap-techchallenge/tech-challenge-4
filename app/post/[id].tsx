import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '@/context/auth';
import { Pencil, Trash2, Save, X, ArrowLeft } from 'lucide-react-native';

interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
}

export default function PostScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [editedAuthorName, setEditedAuthorName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Simulated API call to fetch post
    const mockPost = {
      id: id as string,
      title: 'Introdução ao React Native',
      content: 'React Native é um framework de desenvolvimento móvel de código aberto criado pelo Facebook (agora Meta). Ele permite que os desenvolvedores usem React junto com recursos nativos da plataforma para criar aplicativos móveis.\n\nCom o React Native, você pode manter uma única base de código para plataformas iOS e Android, o que reduz significativamente o tempo e os custos de desenvolvimento. O framework usa componentes nativos internamente, o que resulta em melhor desempenho em comparação com soluções híbridas.\n\nPrincipais características do React Native incluem:\n\n• Hot Reloading\n• Componentes Nativos\n• Grande Comunidade\n• Desenvolvimento Multiplataforma\n• Suporte a JavaScript/TypeScript',
      authorId: '1',
      authorName: 'Professor Admin',
      createdAt: new Date().toISOString(),
    };
    setPost(mockPost);
    setEditedTitle(mockPost.title);
    setEditedContent(mockPost.content);
    setEditedAuthorName(mockPost.authorName);
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(post?.title || '');
    setEditedContent(post?.content || '');
    setEditedAuthorName(post?.authorName || '');
  };

  const handleSave = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPost(prev => prev ? {
        ...prev,
        title: editedTitle,
        content: editedContent,
        authorName: editedAuthorName,
      } : null);
      
      setIsEditing(false);
    } catch (err) {
      setError('Falha ao salvar alterações');
    }
  };

  const handleDelete = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.back();
    } catch (err) {
      setError('Falha ao excluir postagem');
    }
  };

  if (!post) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  const isTeacher = user?.role === 'teacher';
  const isAuthor = user?.id === post.authorId;
  const canEdit = isTeacher && isAuthor;

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}>
        <ArrowLeft size={24} color="#007AFF" />
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>

      {error ? <Text style={styles.error}>{error}</Text> : null}
      
      <View style={styles.header}>
        {isEditing ? (
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
        ) : (
          <>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.author}>Por {post.authorName}</Text>
          </>
        )}
        
        <Text style={styles.date}>
          {new Date(post.createdAt).toLocaleDateString()}
        </Text>

        {canEdit && (
          <View style={styles.actions}>
            {isEditing ? (
              <>
                <TouchableOpacity
                  style={[styles.actionButton, styles.saveButton]}
                  onPress={handleSave}>
                  <Save size={20} color="#fff" />
                  <Text style={styles.actionButtonText}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.cancelButton]}
                  onPress={handleCancel}>
                  <X size={20} color="#fff" />
                  <Text style={styles.actionButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={[styles.actionButton, styles.editButton]}
                  onPress={handleEdit}>
                  <Pencil size={20} color="#fff" />
                  <Text style={styles.actionButtonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={handleDelete}>
                  <Trash2 size={20} color="#fff" />
                  <Text style={styles.actionButtonText}>Excluir</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
      </View>

      {isEditing ? (
        <TextInput
          style={styles.contentInput}
          value={editedContent}
          onChangeText={setEditedContent}
          placeholder="Conteúdo da postagem"
          multiline
          textAlignVertical="top"
        />
      ) : (
        <Text style={styles.content}>{post.content}</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
    marginLeft: 8,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  author: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  titleInput: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
  },
  authorInput: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  contentInput: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    minHeight: 200,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  editButton: {
    backgroundColor: '#007AFF',
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
  },
  saveButton: {
    backgroundColor: '#34c759',
  },
  cancelButton: {
    backgroundColor: '#8e8e93',
  },
  error: {
    color: '#ff3b30',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#ffebeb',
    borderRadius: 8,
  },
});