import { getInLocalStorage } from "@/actions/get-from-localstorage";
import { setInLocalStorage } from "@/actions/set-in-localStorage";
import { User } from "@/interfaces/user.interface";
import { auth, getDocument } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import { usePathname, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export const useUser = () => {
  const [user, setUser] = useState<User | undefined | DocumentData>(undefined);



  const pathName = usePathname();
  const router = useRouter()

  const protectedRoutes = ['/dashboard']

  const isInprotectedRoute = protectedRoutes.includes(pathName);


  const getUserFromDb = async (uid: string) => {
    const path = `users/${uid}`;

    try {
      let res = await getDocument(path);
      setUser(res);
      setInLocalStorage("user", res);
    } catch (error)  {
      console.log(error);
    }
  };

  useEffect(() => {
    return onAuthStateChanged(auth, async (authUser) => {
      //EXISTE USUARIO AUTENTICADO
      if (authUser) {
        const userInLocal = getInLocalStorage("user");

        if (userInLocal) setUser(userInLocal);
        else getUserFromDb(authUser.uid);
      }
      //NO HAY USUARIO AUTENTICADO
      else {
        if(isInprotectedRoute) router.push("./")
      }
    });
  }, []);

  return user;
};
