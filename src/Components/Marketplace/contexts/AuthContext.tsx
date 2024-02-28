import React, { createContext, useState } from 'react';
import { signUp, otpChecker, signIn } from '../hooks/useMarketplaceAuth';

export const AuthContext = createContext<any>(null);

export const AuthContextProvider = ({ children }: any) => {
    /* Temporary logic for registration */

    const [user, setUser] = useState<any>();

    // temp otp generator
    function generateRandomString(length: any) {
        const characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }
        return result;
    }

    const register = async (payload: any, code: any) => {
        if (!otpChecker(code)) {
            throw new Error('Invalid code');
        }
        try {
            const res = await signUp(payload);
            return {
                status: 'User Created',
            };
        } catch (e: any) {
            throw new Error(e.message);
        }
    };

    const login = async (payload: any, code: any) => {
        if (!otpChecker(code)) {
            throw new Error('Invalid code');
        }
        try {
            const res = await signIn(payload);
            if (!res) {
                throw new Error('Please register!');
            }
            setUser(res.email);
            return {
                status: `Hello ${res.email}!`,
            };
        } catch (e: any) {
            throw new Error(e.message);
        }
    };

    const requestOtp = (): null | string => {
        const code = generateRandomString(6);
        return code;
    };

    const logout = (payload: any, code: any) => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, register, requestOtp, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
