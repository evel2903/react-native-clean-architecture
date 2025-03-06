import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Button, Text, TextInput, Surface, Snackbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'src/core/presentation/theme/ThemeProvider';
import { useI18n } from 'src/core/presentation/hooks/useI18n';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { RootScreenNavigationProp } from 'src/core/presentation/navigation/types';
import { observer } from 'mobx-react';
import { useAuthStore } from '../stores/AuthStore/useAuthStore';
import { withProviders } from 'src/core/presentation/utils/withProviders';
import { AuthStoreProvider } from '../stores/AuthStore/AuthStoreProvider';

const AuthScreen = observer(() => {
    const { theme } = useTheme();
    const i18n = useI18n();
    const navigation = useNavigation<RootScreenNavigationProp<'Auth'>>();
    const authStore = useAuthStore();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

    const validateInputs = () => {
        if (!email || !password) {
            return false;
        }
        return true;
    };

    const handleLogin = async () => {
        if (!validateInputs()) return;

        const success = await authStore.login({ email, password });
        if (success) {
            navigation.navigate('Posts');
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <StatusBar style={theme.dark ? 'light' : 'dark'} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidView}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.header}>
                        <Text variant="headlineMedium" style={styles.title}>
                            {i18n.t('auth.screens.Auth.welcomeBack')}
                        </Text>
                        <Text variant="bodyMedium" style={styles.subtitle}>
                            {i18n.t('auth.screens.Auth.signInContinue')}
                        </Text>
                    </View>

                    <Surface style={styles.authForm} elevation={1}>
                        <View style={styles.formContent}>
                            <TextInput
                                label={i18n.t('auth.screens.Auth.email')}
                                value={email}
                                onChangeText={setEmail}
                                mode="outlined"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                left={<TextInput.Icon icon="email" />}
                                style={styles.input}
                            />

                            <TextInput
                                label={i18n.t('auth.screens.Auth.password')}
                                value={password}
                                onChangeText={setPassword}
                                mode="outlined"
                                secureTextEntry={!passwordVisible}
                                left={<TextInput.Icon icon="lock" />}
                                right={
                                    <TextInput.Icon
                                        icon={passwordVisible ? 'eye-off' : 'eye'}
                                        onPress={togglePasswordVisibility}
                                    />
                                }
                                style={styles.input}
                            />

                            <Button
                                mode="text"
                                compact
                                // onPress={() => {}}
                                style={styles.forgotPassword}
                            >
                                {i18n.t('auth.screens.Auth.forgotPassword')}
                            </Button>

                            <Button
                                mode="contained"
                                onPress={handleLogin}
                                style={styles.submitButton}
                                loading={authStore.isLoading}
                                disabled={authStore.isLoading}
                            >
                                {i18n.t('auth.screens.Auth.login')}
                            </Button>
                        </View>
                    </Surface>
                </ScrollView>
            </KeyboardAvoidingView>

            <Snackbar
                visible={!!authStore.error}
                onDismiss={() => authStore.setError(null)}
                duration={3000}
                action={{
                    label: i18n.t('common.close'),
                    onPress: () => authStore.setError(null),
                }}
            >
                {authStore.error}
            </Snackbar>
        </SafeAreaView>
    );
});

export default withProviders(AuthStoreProvider)(AuthScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboardAvoidView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 16,
        justifyContent: 'center',
    },
    header: {
        marginBottom: 32,
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtitle: {
        textAlign: 'center',
        marginTop: 8,
    },
    authForm: {
        borderRadius: 8,
        overflow: 'hidden',
    },
    formContent: {
        padding: 16,
    },
    input: {
        marginBottom: 16,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 16,
    },
    submitButton: {
        marginTop: 8,
        marginBottom: 16,
    },
    errorText: {
        color: 'red',
        marginBottom: 8,
    },
});