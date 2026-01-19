import { useMemo } from "react";
import type { Teacher } from "../type/teacher";

export interface FilterOption {
  value: string;
  label: string;
}

export function useTeacherFilters(teachers: Teacher[]) {
  const languages: FilterOption[] = useMemo(() => {
    const uniqueLangs = Array.from(
      new Set(teachers.flatMap((t) => t.languages)),
    );
    return uniqueLangs.map((lang) => ({ value: lang, label: lang }));
  }, [teachers]);

  const levels: FilterOption[] = useMemo(() => {
    const uniqueLevels = Array.from(new Set(teachers.flatMap((t) => t.levels)));
    return uniqueLevels.map((lvl) => ({ value: lvl, label: lvl }));
  }, [teachers]);

  const prices: FilterOption[] = useMemo(() => {
    const uniquePrices = Array.from(
      new Set(teachers.map((t) => t.price_per_hour)),
    );
    return uniquePrices
      .sort((a, b) => a - b)
      .map((p) => ({ value: p.toString(), label: `≤ ${p}$` }));
  }, [teachers]);

  return { languages, levels, prices };
}
