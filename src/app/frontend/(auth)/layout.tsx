import { ThemeSwitcher } from "@/components/theme/theme-switcher";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
  <ThemeSwitcher />
  <div>{children}</div>;
  </>
  
}
