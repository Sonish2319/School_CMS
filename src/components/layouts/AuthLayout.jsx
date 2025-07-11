export default function AuthLayout({ children }) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#EBEEF6]">
        <div className="bg-[#EBEEF6] rounded-lg  ">
            {children}
        </div>
      </div>
    );
}
