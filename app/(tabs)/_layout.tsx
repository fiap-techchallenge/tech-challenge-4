import { Tabs } from 'expo-router';
import { GraduationCap, SquarePen as PenSquare, ScrollText, UserCog, Settings } from 'lucide-react-native';
import { useAuth } from '@/context/auth';

export default function TabLayout() {
  const { user } = useAuth();
  const isTeacher = user?.role === 'teacher';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#f5f5f5',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => (
            <GraduationCap size={size} color={color} />
          ),
        }}
      />
      {isTeacher && (
        <>
          <Tabs.Screen
            name="new-post"
            options={{
              title: 'Nova Postagem',
              tabBarIcon: ({ color, size }) => (
                <PenSquare size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="my-posts"
            options={{
              title: 'Minhas Postagens',
              tabBarIcon: ({ color, size }) => (
                <ScrollText size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="users"
            options={{
              title: 'Usuários',
              tabBarIcon: ({ color, size }) => (
                <UserCog size={size} color={color} />
              ),
            }}
          />
        </>
      )}
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color, size }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}