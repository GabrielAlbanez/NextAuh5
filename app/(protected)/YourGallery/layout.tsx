import { ToastContainer } from "react-toastify";

interface layoutProps {
    children: React.ReactNode
}

const ProtectedLayout = ({ children }: layoutProps) => {
    return (
        <div className="h-full w-full bg">
            <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
            {children}
        </div>
    );
}

export default ProtectedLayout;