import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import Loader from "../Loader/Loader";

interface Props {
  children: React.ReactNode;
}

export default function AuthMiddleware({ children }: Props) {
  const { setUser } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [setUser]);
  if (loading) {
    return <Loader />;
  }
  return <>{children}</>;
}
