import Navbar from "./_components/Navbar";

interface layoutProps {
    children : React.ReactNode
}

const ProtectedLayout = ({children} : layoutProps) => {
    return (
        <div className="h-full w-full flex flex-col gap-y-10 items-center py-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-400">
            <Navbar/>
            {children}
        </div>
    );
}
 
export default ProtectedLayout;