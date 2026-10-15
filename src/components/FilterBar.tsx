import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TaskFilter } from '../types/task';

interface FilterBarProps {
  filter: TaskFilter;
  onChange: (filter: TaskFilter) => void;
  counts: Record<TaskFilter, number>;
}

// Rótulo exibido em cada botão de filtro
const OPTIONS: { value: TaskFilter; label: string }[] = [
  { value: 'all', label: 'Todas' },
  { value: 'pending', label: 'Pendentes' },
  { value: 'completed', label: 'Concluídas' },
];

// Barra com os três filtros; o botão ativo fica com fundo índigo e texto branco
export function FilterBar({ filter, onChange, counts }: FilterBarProps) {
  return (
    <View className="flex-row gap-2 px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
      {OPTIONS.map(({ value, label }) => {
        const active = filter === value;
        return (
          <TouchableOpacity
            key={value}
            onPress={() => onChange(value)}
            className={`flex-1 items-center rounded-full py-2 ${
              active ? 'bg-indigo-600' : 'bg-gray-100 dark:bg-gray-800'
            }`}
          >
            <Text
              className={`text-sm font-semibold ${
                active ? 'text-white' : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              {label} ({counts[value]})
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
