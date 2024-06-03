// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, getDoc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdDXOjDh0zoyUmKEUhYBIdDCnSp3Hhs4Y",
  authDomain: "product-admin-nextjs-53f75.firebaseapp.com",
  projectId: "product-admin-nextjs-53f75",
  storageBucket: "product-admin-nextjs-53f75.appspot.com",
  messagingSenderId: "269947844524",
  appId: "1:269947844524:web:a23aa68a4afe4616b16c09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

export const auth = getAuth(app);

//BASE DE DATOS
export const db = getFirestore(app);


// ========== AUTH FUNCTIONS ==========

// ========== Registrar Usuario: Email,Password ==========
export const createUser = async (user:{email:string,password:string}) =>{

  return await createUserWithEmailAndPassword(
      auth, user.email,user.password
  )
}

// ========== Iniciar sesion con correo y contraseña ==========

export const signIn = async (user:{email:string,password:string}) =>{

    return await signInWithEmailAndPassword(
        auth, user.email,user.password
    )
}


// CERRAR SESION Y BORRAR DE LOCALSTORAGE
export const signOutAccount = async ()=>{
    localStorage.removeItem('user')
    return auth.signOut();
}


//ACTUALIZAR NOMBRE DE USUARIO Y FOTO DE PERFIL

export const updateUser = (user: {
  displayName?: string | null | undefined;
  photoURL?: string | null | undefined;
}) =>{
  if(auth.currentUser) return updateProfile(auth.currentUser,user)
}

// ===== DATABASE FUNCTIONS =====


// === Guarda un documento en una coleccion ===
// ==== Set a document in a collection ====
export const setDocument = (path:string,data:any) =>{
  data.createAt = serverTimestamp()
  return setDoc(doc(db,path),data)
}

// === Obtiene un documento de una coleccion ===

export const getDocument = async (path:string) =>{
  
  return (await getDoc(doc(db,path))).data();
  
}


