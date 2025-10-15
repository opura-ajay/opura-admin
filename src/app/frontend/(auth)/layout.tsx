import { ThemeSwitchMode } from "@/components/theme/theme-switch-mode";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>
  <div className="flex justify-center">
    <ThemeSwitchMode />
  </div>
  <div>{children}</div>;
  </>
  
}
