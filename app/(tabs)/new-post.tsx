import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/auth';
import { useCreatePost } from '@/hooks/usePosts';

export default function NewPostScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const router = useRouter();
  const { user } = useAuth();
  const { createPost, isLoading, error } = useCreatePost();

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim() || !authorName.trim()) {
      return;
    }

    try {
      await createPost({
        title,
        content,
        authorId: user?.id,
        authorName,
      });
      router.back();
    } catch (err) {
      console.error('Falha ao criar postagem:', err);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Criar Nova Postagem</Text>
      
      {error ? <Text style={styles.error}>{error}</Text> : null}
      
      <TextInput
        style={styles.titleInput}
        placeholder="Título da Postagem"
        value={title}
        onChangeText={setTitle}
        maxLength={100}
      />

      <TextInput
        style={styles.authorInput}
        placeholder="Nome do Autor"
        value={authorName}
        onChangeText={setAuthorName}
        maxLength={50}
      />
      
      <TextInput
        style={styles.contentInput}
        placeholder="Escreva o conteúdo da sua postagem aqui..."
        value={content}
        onChangeText={setContent}
        multiline
        textAlignVertical="top"
      />
      
      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={isLoading}>
        <Text style={styles.buttonText}>
          {isLoading ? 'Publicando...' : 'Publicar Postagem'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1a1a1a',
  },
  titleInput: {
    fontSize: 18,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginBottom: 16,
  },
  authorInput: {
    fontSize: 18,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginBottom: 16,
  },
  contentInput: {
    fontSize: 16,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginBottom: 20,
    height: 300,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: '#ff3b30',
    marginBottom: 16,
  },
});