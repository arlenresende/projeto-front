import { Link } from 'react-router-dom';

interface AuthPromptProps {
  message: string;
  linkText: string;
  linkTo: string;
  className?: string;
}

export default function AuthPrompt({ message, linkText, linkTo, className }: AuthPromptProps) {
  return (
    <p className={`text-center text-sm text-muted-foreground ${className ?? ''}`}>
      {message}{' '}
      <Link
        to={linkTo}
        className="font-bold text-accents-6 underline underline-offset-4 hover:text-foreground"
      >
        {linkText}
      </Link>
    </p>
  );
}
