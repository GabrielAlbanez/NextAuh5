
interface layoutProps {
    children : React.ReactNode
}

const ProtectedLayout = ({children} : layoutProps) => {
    return (
        <div className="h-full w-full flex  items-center justify-center py-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900">
            {children}
        </div>
    );
}
 
export default ProtectedLayout;