import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  Icon: IconType;
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  Icon,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center w-full py-3 rounded-md bg-gray-300 hover:bg-gray-400"
    >
      <Icon className="w-5 h-5" />
    </button>
  );
};

export default AuthSocialButton;
