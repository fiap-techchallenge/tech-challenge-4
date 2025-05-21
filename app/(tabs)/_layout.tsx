import { Tabs } from "expo-router";
import {
  GraduationCap,
  ScrollText,
  Settings,
  SquarePen as PenSquare,
  UserCog,
} from "lucide-react-native";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#999",
        tabBarShowLabel: false, // Add this line to hide labels
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: "#f5f5f5",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          headerTitle: "Plataforma Educacional",
          tabBarIcon: ({ color, size }) => (
            <GraduationCap size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="new-post"
        options={{
          title: "Nova Postagem",
          headerTitle: "Criar Postagem",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <PenSquare size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="my-posts"
        options={{
          title: "Minhas Postagens",
          headerTitle: "Meus Posts",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <ScrollText size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: "Usuários",
          headerTitle: "Gerenciar Usuários",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <UserCog
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Configurações",
          tabBarIcon: ({ color, size }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
