import { LocaleProvider } from "./locale-provider";
import { HeaderOffset } from "./header-offset";
import type { Locale } from "./locale";
import "@/app/globals.css";
export function LocaleDocument({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <html lang={locale}>
      <body>
        <LocaleProvider locale={locale}>
          <HeaderOffset />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
