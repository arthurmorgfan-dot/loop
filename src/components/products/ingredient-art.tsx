import type { IngredientId } from "@/types/loop";

const shapes = {
  grain: (
    <>
      <path
        d="M16 42V16m16 26V12m16 30V18"
        fill="none"
        stroke="#758a55"
        strokeWidth="2"
      />
      <path
        d="M16 28C5 27 6 17 16 23c10-6 11 4 0 5Zm16-6c-11-1-10-11 0-5 10-6 11 4 0 5Zm16 9c-11-1-10-11 0-5 10-6 11 4 0 5Z"
        fill="#cbb888"
      />
      <path d="M10 42h44l-6 11H16Z" fill="#d7debd" />
    </>
  ),
  rice: (
    <>
      <path d="M9 31h46c-2 27-44 27-46 0Z" fill="#d8dfc4" />
      <ellipse cx="32" cy="31" rx="23" ry="8" fill="#eee7d3" />
      {[18, 25, 32, 39, 46].map((x, i) => (
        <path
          key={x}
          d={`M${x} ${27 + (i % 2) * 5}l4 2`}
          stroke="#bda57a"
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
    </>
  ),
  bread: (
    <>
      <path d="M10 43V27C10 8 54 8 54 27v16Z" fill="#c3a879" />
      <path d="M16 42V27c0-12 32-12 32 0v15Z" fill="#e8d7ac" />
      <path d="m23 23 4 5m10-7 4 5" stroke="#b49460" strokeWidth="2" />
    </>
  ),
  potato: (
    <>
      <path
        d="M12 40c-7-16 8-31 23-24 19-7 29 20 14 29-13 10-31 6-37-5Z"
        fill="#cbb888"
      />
      <path
        d="m24 27 2 1m15 8 2-2m-16 6 2 1"
        stroke="#9a845e"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </>
  ),
  lentils: (
    <>
      <path d="M9 31h46c-2 27-44 27-46 0Z" fill="#d8dfc4" />
      <ellipse cx="32" cy="31" rx="23" ry="8" fill="#f0ead7" />
      {[19, 28, 37, 46].map((x, i) => (
        <ellipse
          key={x}
          cx={x}
          cy={29 + (i % 2) * 4}
          rx="5"
          ry="3"
          fill="#8b9c69"
        />
      ))}
      <ellipse cx="33" cy="24" rx="5" ry="3" fill="#b59c6f" />
    </>
  ),
  carrot: (
    <>
      <path d="m17 51 15-33 16 11Z" fill="#c8a172" />
      <path
        d="M36 24C20 17 29 7 36 18c0-18 13-14 8 0 15-10 20 2 0 8Z"
        fill="#82986a"
      />
      <path d="m26 35 6 3m-11 5 5 2" stroke="#ac875f" strokeWidth="2" />
    </>
  ),
  leaf: (
    <>
      <path
        d="M31 54V19m0 21L18 27m13 8 14-15"
        fill="none"
        stroke="#617b4e"
        strokeWidth="2"
      />
      <path
        d="M28 35C4 36 6 13 17 17c8 2 11 13 11 18Zm5-5C27 7 51 7 51 18c0 8-12 12-18 12Zm0 15c1-19 22-16 20-6-1 8-12 11-20 6Z"
        fill="#8a9e6c"
      />
    </>
  ),
  apple: (
    <>
      <path
        d="M31 23c-22-14-27 21-12 29 8 5 12 0 14 0 12 7 28-14 19-28-6-8-14-5-21-1Z"
        fill="#a6b37b"
      />
      <path d="m32 25 2-14" stroke="#65794f" strokeWidth="3" />
      <path d="M34 17c-2-10 14-9 15-4-4 6-10 5-15 4Z" fill="#70895a" />
    </>
  ),
  orange: (
    <>
      <circle cx="32" cy="36" r="20" fill="#d4b67d" />
      <path d="M32 17c0-12 14-13 16-5-5 7-12 6-16 5Z" fill="#839768" />
      <path
        d="M20 31c0-5 3-8 7-9"
        fill="none"
        stroke="#ead6a9"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </>
  ),
  nuts: (
    <>
      {[
        [20, 29, -25],
        [40, 27, 25],
        [31, 46, 70],
      ].map(([x, y, a]) => (
        <ellipse
          key={x}
          cx={x}
          cy={y}
          rx="9"
          ry="13"
          transform={`rotate(${a} ${x} ${y})`}
          fill="#bc9e70"
          stroke="#d9c394"
          strokeWidth="2"
        />
      ))}
    </>
  ),
  oil: (
    <>
      <path d="M25 13h14v9l7 7v25H18V29l7-7Z" fill="#c9cf9c" />
      <path d="M25 9h14v7H25Z" fill="#617b50" />
      <path d="M18 36h28v12H18Z" fill="#eeead9" />
      <path d="M32 38c-7 2-7 7 0 8 7-1 7-6 0-8Z" fill="#889c66" />
    </>
  ),
  drink: (
    <>
      <path d="m18 20 8-10h18l7 10v34H18Z" fill="#e6e2cd" />
      <path d="m26 10 8 10v34H18V20Z" fill="#d5d9bd" />
      <path d="M34 20h17" stroke="#b9c3a4" />
      <path d="M29 33c-9-8-13 5-4 8 5 2 9-4 4-8Z" fill="#8ca073" />
    </>
  ),
};
type Shape = keyof typeof shapes;
const family: Record<IngredientId, Shape> = {
  oats: "grain",
  "wholegrain-bread": "bread",
  potatoes: "potato",
  "green-lentils": "lentils",
  "red-lentils": "lentils",
  carrots: "carrot",
  spinach: "leaf",
  apples: "apple",
  orange: "orange",
  "mixed-nuts": "nuts",
  "rapeseed-oil": "oil",
  "brown-rice": "rice",
  "soy-drink": "drink",
  pear: "apple",
  chickpeas: "lentils",
  beans: "lentils",
  "rye-bread": "bread",
  bulgur: "grain",
  kale: "leaf",
  pumpkin: "orange",
  "pumpkin-seeds": "nuts",
  "olive-oil": "oil",
  "oat-drink": "drink",
  "buckwheat-flakes": "grain",
};
export function IngredientArt({ ingredient }: { ingredient: IngredientId }) {
  return (
    <svg
      className="ingredient-art"
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      {shapes[family[ingredient]]}
    </svg>
  );
}
