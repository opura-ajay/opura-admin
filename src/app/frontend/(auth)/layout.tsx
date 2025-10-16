import { ThemeSwitchMode } from "@/components/theme/theme-switch-mode";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
  <div className="flex md:justify-center justify-end pt-4 pr-4">
    <ThemeSwitchMode />
  </div>
  <div>{children}</div>;
  </>
  
}
