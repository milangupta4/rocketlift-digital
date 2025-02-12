interface LogoContainerProps {
  children: React.ReactNode; // Define the type for children
}

const LogoContainer: React.FC<LogoContainerProps> = ({ children }) => {
  return <div className="logoContainer">{children}</div>;
};

export default LogoContainer;