'use client';

import { getUserInfo, validateTelegramSession } from '@zizibot/rest-client/internal/user-rest';
import { MaterialProgressBar } from '@zizibot/shadcn/components/material-progress-bar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@zizibot/shadcn/components/ui/dialog';
import { useAppDispatch, useAppSelector } from '@zizibot/store/user/hook';
import { setId, setName, setRole } from '@zizibot/store/user/state';
import { IF } from '@zizibot/ui/components/IF';
import { setCookie } from '@zizibot/utils/cookie';
import { logDebug } from '@zizibot/utils/logger';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const TelegramLogin: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(true);
  const [progressMessage, setProgressMessage] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const queryParams = Object.fromEntries(searchParams);

  console.debug('query params', queryParams);

  const useValidateSession = () => {
    setOpenDialog(true);
    setProgressMessage('Validating session...');

    validateTelegramSession({
      session_id: queryParams.session_id,
      id: queryParams.id,
      first_name: queryParams.first_name,
      last_name: queryParams.last_name,
      username: queryParams.username,
      photo_url: queryParams.photo_url,
      auth_date: queryParams.auth_date,
      hash: queryParams.hash
    }).then(({ status, message, result }) => {
      if (status != 200) {
        setProgressMessage(message);
        setShowProgressBar(false);
      } else if (result.isSessionValid) {
        const bearerToken = result.bearerToken;
        setCookie('bearerToken', bearerToken);

        if (queryParams.first_name)
          dispatch(setName(queryParams.first_name));

        if (queryParams.id)
          dispatch(setId(Number(queryParams.id)));

        router.replace('/');

        setProgressMessage(message);
        setTimeout(() => setOpenDialog(false), 3000);
      }
    });
  };

  const useGetUserInfo = () => {
    getUserInfo().then(({ result }) => {
      logDebug('user info', result);
      if (result) {
        dispatch(setName(result.name));
        dispatch(setId(result.userId));
        dispatch(setRole(result.roles));
      }
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
          <IF condition={showProgressBar}>
            <MaterialProgressBar mode={'indeterminate'} color={'accent'} />
          </IF>
          <DialogDescription>
            {progressMessage}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default TelegramLogin;
