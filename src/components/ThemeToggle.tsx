import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useColorScheme } from 'nativewind';
import Storage from 'expo-sqlite/kv-store';

// Chave usada para lembrar o tema escolhido entre aberturas do app
export const THEME_KEY = 'theme';

// Botão do cabeçalho que alterna entre tema claro e escuro
export function ThemeToggle() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const toggle = () => {
    const next = isDark ? 'light' : 'dark';
    setColorScheme(next);
    Storage.setItemSync(THEME_KEY, next);
  };

  return (
    <TouchableOpacity onPress={toggle} className="px-2 py-1">
      <Text className="text-xl">{isDark ? '☀️' : '🌙'}</Text>
    </TouchableOpacity>
  );
}
