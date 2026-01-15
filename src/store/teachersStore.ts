import { ref, onValue, DataSnapshot } from "firebase/database";
import { useEffect, useState } from "react";
import type { Teacher } from "../type/teacher";
import { db } from "../firebase/firebase";

export function useTeachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const teachersRef = ref(db, "teachers");

    const unsubscribe = onValue(teachersRef, (snapshot: DataSnapshot) => {
      const data = snapshot.val() as Record<string, Omit<Teacher, "id">> | null;
      if (data) {
        const teachersArray: Teacher[] = Object.entries(data).map(
          ([id, value]) => ({
            id,
            ...value,
          })
        );
        setTeachers(teachersArray);
      } else {
        setTeachers([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { teachers, loading };
}
