import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, useSegments } from "expo-router";
import { login } from "@/app/api/index";
import axios from "axios";

interface User {
  id: string;
  email: string;
  name?: string;
  role: "student" | "teacher";
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string, role: string) => Promise<void>;
  signOut: () => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    role: "student" | "teacher",
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      router.replace("/login");
    } else if (user && inAuthGroup) {
      router.replace("/(tabs)");
    }
  }, [user, segments]);

  const signIn = async (email: string, password: string, role: string) => {
    // Simulate API call with default accounts
    if (email === "admin@example.com" && password === "admin123") {
      setUser({
        id: "1",
        email: email,
        name: "Admin Teacher",
        role: "teacher",
      });
    } else if (email === "student@example.com" && password === "student123") {
      setUser({
        id: "2",
        email: email,
        name: "Demo Student",
        role: "student",
      });
    } else {
      try {
        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        if (role !== "student" && role !== "teacher") {
          throw new Error("Role must be either 'student' or 'teacher'");
        }

        const userInfo = await login(email, password, role);

        console.log(userInfo);
        setUser({
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.name,
          role: userInfo.role,
        });
      } catch (error) {
        console.error("Error during login:", error);
      }
      throw new Error("Invalid credentials");
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: "student" | "teacher",
  ) => {
    try {
      const URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      axios.defaults.baseURL = URL;

      const response = await axios.post("/auth/register", {
        name: name,
        email: email,
        password: password,
        userType: role,
      });

      console.log(response);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const signOut = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
