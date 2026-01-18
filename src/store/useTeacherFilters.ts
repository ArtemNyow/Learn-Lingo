import { useMemo } from "react";
import type { Teacher } from "../type/teacher";

interface Option {
  value: string | number;
  label: string;
}

export function useTeacherFilters(teachers: Teacher[]) {
  const languages: Option[] = useMemo(() => {
    return Array.from(new Set(teachers.flatMap((t) => t.languages))).map(
      (lang) => ({ value: lang as string, label: lang }),
    );
  }, [teachers]);

  const levels: Option[] = useMemo(() => {
    return Array.from(new Set(teachers.flatMap((t) => t.levels))).map(
      (lvl) => ({ value: lvl, label: lvl }),
    );
  }, [teachers]);

  const prices: Option[] = useMemo(() => {
    return Array.from(new Set(teachers.map((t) => t.price_per_hour)))
      .sort((a, b) => a - b)
      .map((p) => ({ value: p, label: `≤ ${p}$` }));
  }, [teachers]);

  return { languages, levels, prices };
}
