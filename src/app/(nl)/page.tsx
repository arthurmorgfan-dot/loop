import { localizedMetadata, PublicPage } from "@/i18n/route-content";
export const metadata = localizedMetadata("nl");
export default function Page() {
  return <PublicPage locale="nl" />;
}
