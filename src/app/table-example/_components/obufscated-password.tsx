'use client';

import { useMemo, useState } from 'react';

export const ObfuscatedPasswordField = ({ password }: { password: string }) => {
  const [visible, setVisible] = useState<boolean>(false);

  const toggleVisibility = () => {
    setVisible((prev) => !prev);
  };

  const obfuscatedPassword = useMemo(() => {
    if (visible) {
      return password;
    }
    return password[0] + '*'.repeat(password.length - 2) + password[password.length - 1];
  }, [password, visible]);

  return (
    <span className='cursor-pointer select-none' onClick={toggleVisibility}>
      {obfuscatedPassword}
    </span>
  );
};
