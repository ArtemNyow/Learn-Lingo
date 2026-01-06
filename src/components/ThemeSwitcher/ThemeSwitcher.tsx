import { useThemeStore } from "../../store/themeStore";

export function ThemeSwitcher() {
  const setVariant = useThemeStore((s) => s.setVariant);

  return (
    <div>
      <button onClick={() => setVariant("orange")}>Orange</button>
      <button onClick={() => setVariant("blue")}>Blue</button>
      <button onClick={() => setVariant("red")}>Red</button>
      <button onClick={() => setVariant("green")}>Green</button>
      <button onClick={() => setVariant("peach")}>Peach</button>
    </div>
  );
}
