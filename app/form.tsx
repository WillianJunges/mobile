import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import * as TaskRepository from '../src/database/taskRepository';

// Formulário unificado: /form cria uma tarefa, /form?id=5 edita a tarefa 5
export default function FormScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const isEditing = !!id;
  const router = useRouter();
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);

  // Ajusta o título do cabeçalho conforme o modo
  useEffect(() => {
    navigation.setOptions({ title: isEditing ? 'Editar Tarefa' : 'Nova Tarefa' });
  }, [navigation, isEditing]);

  // No modo edição, carrega a tarefa do banco e preenche os campos
  useEffect(() => {
    if (!isEditing) return;
    TaskRepository.getTaskById(Number(id))
      .then((task) => {
        if (!task) {
          Alert.alert('Erro', 'Tarefa não encontrada.');
          router.back();
          return;
        }
        setTitle(task.title);
        setDescription(task.description ?? '');
      })
      .catch((error) => console.error('Erro ao carregar tarefa:', error))
      .finally(() => setLoading(false));
  }, [id, isEditing, router]);

  const handleSave = async () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      Alert.alert('Atenção', 'O título da tarefa é obrigatório.');
      return;
    }
    // Descrição vazia é salva como null no banco
    const trimmedDescription = description.trim() || null;

    try {
      setSaving(true);
      if (isEditing) {
        await TaskRepository.updateTask({
          id: Number(id),
          title: trimmedTitle,
          description: trimmedDescription,
        });
      } else {
        await TaskRepository.createTask({
          title: trimmedTitle,
          description: trimmedDescription,
        });
      }
      // Volta para a lista, que recarrega sozinha pelo useFocusEffect
      router.back();
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
      Alert.alert('Erro', 'Não foi possível salvar a tarefa.');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-50"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerClassName="p-4" keyboardShouldPersistTaps="handled">
        <Text className="text-sm font-semibold text-gray-700 mb-2">Título *</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Ex.: Estudar React Native"
          placeholderTextColor="#9ca3af"
          autoFocus={!isEditing}
          maxLength={100}
          className="bg-white rounded-xl px-4 py-3 text-base text-gray-800 border border-gray-200 mb-5"
        />

        <Text className="text-sm font-semibold text-gray-700 mb-2">Descrição</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Detalhes da tarefa (opcional)"
          placeholderTextColor="#9ca3af"
          multiline
          textAlignVertical="top"
          className="bg-white rounded-xl px-4 py-3 text-base text-gray-800 border border-gray-200 mb-8 min-h-32"
        />

        <TouchableOpacity
          onPress={handleSave}
          disabled={saving}
          className={`rounded-xl py-4 items-center ${
            saving ? 'bg-indigo-300' : 'bg-indigo-600'
          }`}
        >
          {saving ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text className="text-white text-base font-bold">
              {isEditing ? 'Salvar alterações' : 'Adicionar tarefa'}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
