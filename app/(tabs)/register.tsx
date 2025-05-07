import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/auth";

type UserRole = "student" | "teacher";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { register } = useAuth();
  const { user } = useAuth();

  const [role, setRole] = useState<UserRole>(user?.role || "student");

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Todos os campos são obrigatórios");
      return;
    }

    try {
      await register(name, email, password, role);
      router.replace("/(tabs)");
    } catch (err) {
      setError("Falha no cadastro. Por favor, tente novamente.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>
      <Text style={styles.subtitle}>
        Junte-se à nossa comunidade de aprendizado
      </Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={styles.roleContainer}>
        <View style={styles.roleButtons}>
          {user?.role === "teacher"
            ? (
              <TouchableOpacity
                style={[styles.roleButton, styles.roleButtonActive]}
                disabled={true}
              >
                <Text
                  style={[styles.roleButtonText, styles.roleButtonTextActive]}
                >
                  Professor
                </Text>
              </TouchableOpacity>
            )
            : (
              <TouchableOpacity
                style={[styles.roleButton, styles.roleButtonActive]}
                disabled={true}
              >
                <Text
                  style={[styles.roleButtonText, styles.roleButtonTextActive]}
                >
                  Estudante
                </Text>
              </TouchableOpacity>
            )}
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Criar Conta</Text>
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
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 60,
    marginBottom: 8,
    color: "#1a1a1a",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 32,
  },
  input: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  roleContainer: {
    marginBottom: 24,
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 12,
  },
  roleButtons: {
    flexDirection: "row",
    gap: 12,
  },
  roleButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#e5e5e5",
    alignItems: "center",
  },
  roleButtonActive: {
    backgroundColor: "#e5e5e5",
    borderColor: "#e5e5e5",
  },
  roleButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  roleButtonTextActive: {
    color: "#000",
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
  error: {
    color: "#ff3b30",
    marginBottom: 16,
  },
  linkButton: {
    marginTop: 16,
    alignItems: "center",
  },
  linkText: {
    color: "#007AFF",
    fontSize: 16,
  },
});
