import SideNavigation from "@/components/SideNavigation"
interface LayoutProps {
    children: React.ReactNode
}
export default function Layout({ children }: LayoutProps) {
    return <div className="grid grid-cols-[16rem_1fr]  gap-12 h-full">
        <SideNavigation />
        <div>{children}</div>
    </div>
}