import React from 'react';
import auth from '@react-native-firebase/auth';
import { initConnectyCube, authenticateChatUser } from './messaging';


async function signUp(email, password) {
    let authUser = await auth().createUserWithEmailAndPassword(email, password);
    let user = await initConnectyCube();
    let chatUser = await authenticateChatUser(user);
    return authUser;
}

async function signIn(email, password) {
    let authUser = await auth().signInWithEmailAndPassword(email, password);
    return authUser;
}

export { signUp, signIn };