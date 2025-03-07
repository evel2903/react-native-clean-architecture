// src/auth/presentation/screens/AuthScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Button, Text, TextInput, Surface, Snackbar, HelperText } from 'react-native-paper';
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
    const theme = useTheme();
    const i18n = useI18n();
    const navigation = useNavigation<RootScreenNavigationProp<'Auth'>>();
    const authStore = useAuthStore();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

    const validateEmailOrUsername = (value: string): boolean => {
        // If it's empty
        if (!value) {
            setEmailError(i18n.t('auth.errors.emailOrUsernameRequired'));
            return false;
        }
        
        // If it contains @ - treat as email and validate format
        if (value.includes('@')) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isValid = emailRegex.test(value);
            
            if (!isValid) {
                setEmailError(i18n.t('auth.errors.invalidEmail'));
                return false;
            }
        } else {
            // Treat as username - basic validation
            if (value.length < 3) {
                setEmailError(i18n.t('auth.errors.usernameTooShort'));
                return false;
            }
            
            // Check for invalid characters in username
            const usernameRegex = /^[a-zA-Z0-9_.\-]+$/;
            if (!usernameRegex.test(value)) {
                setEmailError(i18n.t('auth.errors.invalidUsername'));
                return false;
            }
        }
        
        setEmailError(null);
        return true;
    };

    const validatePassword = (password: string): boolean => {
        if (!password) {
            setPasswordError(i18n.t('auth.errors.passwordRequired'));
            return false;
        } else if (password.length < 6) {
            setPasswordError(i18n.t('auth.errors.passwordTooShort'));
            return false;
        }
        
        setPasswordError(null);
        return true;
    };

    const validateInputs = (): boolean => {
        const isEmailOrUsernameValid = validateEmailOrUsername(email);
        const isPasswordValid = validatePassword(password);
        
        return isEmailOrUsernameValid && isPasswordValid;
    };

    const handleLogin = async () => {
        if (!validateInputs()) return;

        const success = await authStore.login({ email, password });
        if (success) {
            navigation.navigate('Home');
        }
    };

    const handleEmailChange = (text: string) => {
        setEmail(text);
        if (emailError) validateEmailOrUsername(text);
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
        if (passwordError) validatePassword(text);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.theme.colors.background }]}>
            <StatusBar style={theme.isDarkTheme ? 'light' : 'dark'} />
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
                                label={i18n.t('auth.screens.Auth.emailOrUsername')}
                                value={email}
                                onChangeText={handleEmailChange}
                                mode="outlined"
                                keyboardType={email.includes('@') ? "email-address" : "default"}
                                autoCapitalize="none"
                                left={<TextInput.Icon icon="account" />}
                                style={styles.input}
                                error={!!emailError}
                                onBlur={() => validateEmailOrUsername(email)}
                            />
                            {emailError && (
                                <HelperText type="error" visible={!!emailError}>
                                    {emailError}
                                </HelperText>
                            )}

                            <TextInput
                                label={i18n.t('auth.screens.Auth.password')}
                                value={password}
                                onChangeText={handlePasswordChange}
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
                                error={!!passwordError}
                                onBlur={() => validatePassword(password)}
                            />
                            {passwordError && (
                                <HelperText type="error" visible={!!passwordError}>
                                    {passwordError}
                                </HelperText>
                            )}

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
        marginBottom: 4,
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