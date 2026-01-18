import {
  ref,
  query,
  orderByKey,
  startAfter,
  limitToFirst,
  get,
  DataSnapshot,
} from "firebase/database";
import { useState, useEffect, useCallback, useRef } from "react";
import type { Teacher } from "../type/teacher";
import { db } from "../firebase/firebase";

const PAGE_SIZE = 4;

export function useTeachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  // Використовуємо Ref, щоб гарантувати, що ми не запустимо завантаження двічі одночасно
  const isFetching = useRef(false);

  const loadTeachers = useCallback(async () => {
    // Якщо вже вантажиться або даних більше немає — виходимо
    if (isFetching.current || !hasMore) return;

    isFetching.current = true;
    setLoading(true);

    try {
      let teachersQuery = query(
        ref(db, "teachers"),
        orderByKey(),
        limitToFirst(PAGE_SIZE),
      );

      if (lastKey) {
        teachersQuery = query(
          ref(db, "teachers"),
          orderByKey(),
          startAfter(lastKey),
          limitToFirst(PAGE_SIZE),
        );
      }

      const snapshot: DataSnapshot = await get(teachersQuery);
      const data = snapshot.val() as Record<string, Omit<Teacher, "id">> | null;

      if (data) {
        const teachersArray: Teacher[] = Object.entries(data).map(
          ([id, value]) => ({
            id,
            ...value,
          }),
        );

        setTeachers((prev) => {
          const newItems = teachersArray.filter(
            (item) => !prev.some((p) => p.id === item.id),
          );
          return [...prev, ...newItems];
        });

        const keys = Object.keys(data);
        const lastSnapshotKey = keys[keys.length - 1];
        setLastKey(lastSnapshotKey);

        if (keys.length < PAGE_SIZE) setHasMore(false);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Firebase Error:", error);
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  }, [lastKey, hasMore]);

  useEffect(() => {
    loadTeachers();
  }, []);

  return { teachers, loading, hasMore, loadTeachers };
}
