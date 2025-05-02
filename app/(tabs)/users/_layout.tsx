import { Stack } from 'expo-router';

export default function UsersLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Gerenciamento de Usuários',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="edit-teacher"
        options={{
          title: 'Editar Professor',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="edit-student"
        options={{
          title: 'Editar Estudante',
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}