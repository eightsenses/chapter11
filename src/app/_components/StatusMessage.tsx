'use client';
type StatusMessageProps = {
  message: string;
  className?: string;
};

const StatusMessage: React.FC<StatusMessageProps> = ({ message, className = '' }) => {
  return <div className={`mt-6 text-center ${className}`}>{message}</div>;
};
export default StatusMessage;
