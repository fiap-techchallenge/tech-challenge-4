import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { updateStudent } from "@/app/api";

export default function EditStudentScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [name, setName] = useState(params.name as string);
  const [email, setEmail] = useState(params.email as string);
  const [error, setError] = useState("");

  const handleSave = async () => {
    try {
      if (!name.trim() || !email.trim()) {
        setError("Todos os campos são obrigatórios");
        return;
      }
      setError("");
      await updateStudent(params.id as string, name, email);
    } catch (err) {
      setError("Falha ao salvar alterações");
    }
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Editar Estudante</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar Alterações</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => router.back()}
      >
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1a1a1a",
  },
  input: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  cancelButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
  error: {
    color: "#ff3b30",
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#ffebeb",
    borderRadius: 8,
  },
});
