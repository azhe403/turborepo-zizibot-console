'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getUserInfo, validateTelegramSession } from '@zizibot/rest-client/internal/user-rest';
import { useAppDispatch } from '@zizibot/store/user/hook';
import { setId, setName } from '@zizibot/store/user/state';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@zizibot/shadcn/components/ui/dialog';
import { MaterialProgressBar } from '@zizibot/shadcn/components/material-progress-bar';
import { setCookie } from '@zizibot/utils/cookie';
import logDebug from '@zizibot/utils/logger';

const TelegramLogin: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [progressMessage, setProgressMessage] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const queryParams = Object.fromEntries(searchParams);
  console.debug('query params', queryParams);

  const useValidateSession = async () => {
    setOpenDialog(true);
    setProgressMessage('Validating session...');

    const { message, result } = await validateTelegramSession({
      session_id: queryParams.session_id,
      id: queryParams.id,
      first_name: queryParams.first_name,
      last_name: queryParams.last_name,
      username: queryParams.username,
      photo_url: queryParams.photo_url,
      auth_date: queryParams.auth_date,
      hash: queryParams.hash
    });

    if (result.isSessionValid) {
      const bearerToken = result.bearerToken;
      setCookie('bearerToken', bearerToken);

      // @ts-ignore
      dispatch(setName(queryParams.first_name));
      // @ts-ignore
      dispatch(setId(queryParams.id));
      router.replace('/');
    }

    setProgressMessage(message);
    setTimeout(() => setOpenDialog(false), 3000);
  };

  const useGetUserInfo = async () => {
    getUserInfo().then(({ result }) => {
      logDebug('user info', result);

      // @ts-ignore
      dispatch(setName(result.name));
      // @ts-ignore
      dispatch(setId(result.userId));
    });
  };

  useEffect(() => {
    if (queryParams.session_id)
      useValidateSession();
    else
      useGetUserInfo();
  }, [pathname]);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent hideClose={true} onPointerDownOutside={event => event.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Logging to Console</DialogTitle>
          <MaterialProgressBar mode={'indeterminate'} color={'accent'} />
          <DialogDescription>
            {progressMessage}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default TelegramLogin;
