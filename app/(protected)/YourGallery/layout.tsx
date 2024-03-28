
interface layoutProps {
    children : React.ReactNode
}

const ProtectedLayout = ({children} : layoutProps) => {
    return (
        <div className="h-full w-full bg">
            {children}
        </div>
    );
}
 
export default ProtectedLayout;