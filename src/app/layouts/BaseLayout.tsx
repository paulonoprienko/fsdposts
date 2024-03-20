import { Layout } from "@/shared/ui/Layout/Layout";
import { LayoutFooter } from "../../widgets/LayoutFooter";
import { LayoutHeader } from "../../widgets/LayoutHeader";

export const BaseLayout = () => {
  return <Layout headerSlot={<LayoutHeader />} footerSlot={<LayoutFooter />} />;
};
