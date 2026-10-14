import '../global.css'; // ⚠️ Deve ser a primeira importação!
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

// Layout raiz: um Stack Navigator com o cabeçalho na cor índigo
export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#4f46e5' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="index" options={{ title: '📋 Minhas Tarefas' }} />
        <Stack.Screen name="form" options={{ title: 'Nova Tarefa' }} />
      </Stack>
    </>
  );
}
