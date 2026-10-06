import { localizedMetadata, PublicPage } from "@/i18n/route-content";
export const metadata = localizedMetadata("en");
export default function Page() {
  return <PublicPage locale="en" />;
}
