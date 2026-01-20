import { useState, useRef, useEffect } from "react";
import { useThemeStore } from "../../store/themeStore";
import styles from "./ThemeSwitcher.module.css";
import { THEMES } from "../../themes/themes";

type ThemeVariant = keyof typeof THEMES;

export function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const setVariant = useThemeStore((s) => s.setVariant);
  const currentVariant = useThemeStore((s) => s.variant) as ThemeVariant;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={styles.trigger}
          style={{ backgroundColor: THEMES[currentVariant].color }}
          aria-label="Open theme menu"
        />
      )}

      <div className={`${styles.menu} ${isOpen ? styles.menuOpen : ""}`}>
        {(
          Object.entries(THEMES) as [ThemeVariant, (typeof THEMES)["orange"]][]
        ).map(([key, value]) => (
          <button
            key={key}
            onClick={() => {
              setVariant(key);
              setIsOpen(false);
            }}
            className={`
              ${styles.colorBtn} 
              ${currentVariant === key ? styles.active : ""}
            `}
            style={{
              backgroundColor: value.color,
              borderColor: currentVariant === key ? "white" : "transparent",
            }}
            title={key}
          />
        ))}
      </div>
    </div>
  );
}
