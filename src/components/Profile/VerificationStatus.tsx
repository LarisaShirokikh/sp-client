"use client";

import { FC, useState } from 'react';
import { Button } from '@/components/UI/button';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { Spinner } from '@/components/UI/spinner';

interface VerificationStatusProps {
  isVerified?: boolean;
  sendVerification: () => Promise<void>;
  label: string;
}

export const VerificationStatus: FC<VerificationStatusProps> = ({
  isVerified = false,
  sendVerification,
  label
}) => {
  const [isSending, setIsSending] = useState(false);

  const handleSendVerification = async () => {
    setIsSending(true);
    try {
      await sendVerification();
    } finally {
      setIsSending(false);
    }
  };

  if (isVerified) {
    return (
      <div className="flex items-center px-2 py-2 bg-green-100 text-green-800 rounded-r-md border border-l-0 border-green-300">
        <CheckCircle className="h-4 w-4 mr-1" />
        <span className="text-xs">Подтвержден</span>
      </div>
    );
  }

  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      className="rounded-l-none border-l-0 flex items-center"
      onClick={handleSendVerification}
      disabled={isSending}
    >
      {isSending ? (
        <Spinner className="h-4 w-4 mr-1" />
      ) : (
        <AlertCircle className="h-4 w-4 mr-1 text-amber-500" />
      )}
      <span className="text-xs">
        {isSending ? 'Отправка...' : `Подтвердить ${label}`}
      </span>
    </Button>
  );
};