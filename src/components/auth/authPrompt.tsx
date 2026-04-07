import { Link } from 'react-router-dom';

interface AuthPromptProps {
  message: string;
  linkText: string;
  linkTo: string;
  className?: string;
}

export default function AuthPrompt({ message, linkText, linkTo, className }: AuthPromptProps) {
  return (
    <p className={`mt-6 text-center text-sm text-gray-600 ${className ?? ''}`}>
      {message}{' '}
      <Link to={linkTo} className="font-medium text-primary hover:underline">
        {linkText}
      </Link>
    </p>
  );
}
