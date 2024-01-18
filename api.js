// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    doc,
    getDocs,
    getDoc,
    query,
    where
} from "firebase/firestore/lite"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADsuOMzib1QcVbKkWBwrsJIrnfzIFHisM",
  authDomain: "vanlife-22e7f.firebaseapp.com",
  projectId: "vanlife-22e7f",
  storageBucket: "vanlife-22e7f.appspot.com",
  messagingSenderId: "1043863383355",
  appId: "1:1043863383355:web:49b7cf7ec684abdd369b1e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export const auth = getAuth(app)

// User management
export async function createUser(creds) {
    const res = await createUserWithEmailAndPassword(auth, creds.email, creds.password)
    return res
}
export async function loginUser(creds) {
    const res = await signInWithEmailAndPassword(auth, creds.email, creds.password)
    return res
}

export async function logoutUser() {
    await signOut(auth)
}

// Refactoring the fetching functions below
const vansCollectionRef = collection(db, "van")

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function getVan(id) {
    const docRef = doc(db, "van", id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const snapshot = await getDocs(q)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}