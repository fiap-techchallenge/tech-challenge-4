import { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { Pencil, Trash2 } from 'lucide-react-native';
import { useAuth } from '@/context/auth';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher';
}

export default function UsersScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Simulated data - replace with actual API calls
  const teachers: User[] = [
    { id: '1', name: 'João Silva', email: 'joao@exemplo.com', role: 'teacher' },
    { id: '2', name: 'Maria Santos', email: 'maria@exemplo.com', role: 'teacher' },
  ];

  const students: User[] = [
    { id: '3', name: 'Pedro Oliveira', email: 'pedro@exemplo.com', role: 'student' },
    { id: '4', name: 'Ana Costa', email: 'ana@exemplo.com', role: 'student' },
  ];

  const confirmDelete = (user: User) => {
    setSelectedUser(user);
    setDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    if (selectedUser) {
      // Implement delete logic here
      console.log('Deletando usuário:', selectedUser.id);
      setDeleteModalVisible(false);
      setSelectedUser(null);
    }
  };

  const renderUser = ({ item }: { item: User }) => (
    <View style={styles.userCard}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => router.push(item.role === 'teacher' ? '/users/edit-teacher' : '/users/edit-student')}>
          <Pencil size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => confirmDelete(item)}>
          <Trash2 size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  // Show only users of the same role
  const displayData = user?.role === 'teacher' ? teachers : students;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gerenciamento de Usuários</Text>
        <Text style={styles.subtitle}>
          {user?.role === 'teacher' ? 'Lista de Professores' : 'Lista de Estudantes'}
        </Text>
      </View>

      <FlatList
        data={displayData}
        renderItem={renderUser}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Excluir Usuário</Text>
            <Text style={styles.modalText}>
              Tem certeza que deseja excluir {selectedUser?.name}? Esta ação não pode ser desfeita.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setDeleteModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleDelete}>
                <Text style={[styles.modalButtonText, styles.confirmButtonText]}>
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
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  list: {
    padding: 16,
  },
  userCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
  },
  editButton: {
    backgroundColor: '#007AFF',
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    lineHeight: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  modalButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  confirmButton: {
    backgroundColor: '#ff3b30',
  },
  confirmButtonText: {
    color: '#fff',
  },
});