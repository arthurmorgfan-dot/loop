import {
  localizedMetadata,
  DemoRoute,
  type DemoSearchParams,
} from "@/i18n/route-content";
export const metadata = localizedMetadata("en", true);
export default function Page({
  searchParams,
}: {
  searchParams: DemoSearchParams;
}) {
  return <DemoRoute searchParams={searchParams} />;
}
