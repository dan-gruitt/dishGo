import { View, Text, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard, TextInput, FlatList, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Ionicons } from '@expo/vector-icons';

const supabase = createClient(process.env.EXPO_PUBLIC_SUPABASE_URL, process.env.EXPO_PUBLIC_SUPABASE_KEY)
