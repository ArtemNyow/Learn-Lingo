import { ref, get, query, orderByKey } from "firebase/database";
import { useState, useEffect } from "react";
import type { Teacher } from "../type/teacher";
import { db } from "../firebase/firebase";

type FirebaseTeachersResponse = Record<string, Omit<Teacher, "id">>;

export function useTeachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      setLoading(true);
      setError(null);
      try {
        const teachersRef = ref(db, "teachers");
        const teachersQuery = query(teachersRef, orderByKey());
        const snapshot = await get(teachersQuery);

        if (snapshot.exists()) {
          const data = snapshot.val() as FirebaseTeachersResponse;

          const teachersArray: Teacher[] = Object.entries(data).map(
            ([id, teacherData]) => ({
              id,
              ...teacherData,
            }),
          );

          setTeachers(teachersArray);
        } else {
          setTeachers([]);
        }
      } catch (err) {
        console.error("Failed to fetch teachers:", err);
        setError("Failed to load teachers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  return { teachers, loading, error };
}
