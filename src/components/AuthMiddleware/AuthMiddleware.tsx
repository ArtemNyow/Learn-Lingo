import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { ref, onValue } from "firebase/database";
import { useFavoritesStore } from "../../store/useFavoritesStore";
import Loader from "../Loader/Loader";
import type { Teacher } from "../../type/teacher";

export default function AuthMiddleware({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser } = useAuthStore();
  const { setFavorites, clearFavorites } = useFavoritesStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);

        const favoritesRef = ref(db, `users/${user.uid}/favorites`);
        onValue(favoritesRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const favoritesArray = Object.values(data) as Teacher[];
            setFavorites(favoritesArray);
          } else {
            setFavorites([]);
          }
        });
      } else {
        setUser(null);
        clearFavorites();
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setFavorites, clearFavorites]);

  if (loading) return <Loader />;
  return <>{children}</>;
}
