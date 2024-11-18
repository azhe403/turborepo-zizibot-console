'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import { validateTelegramSession } from '@zizibot/rest-client/internal/user-rest';
import { useAppDispatch } from '@zizibot/store/src/state/hook';
import {setId, setName} from '@zizibot/store/src/state/slicers/user';

const TelegramLogin: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [progressMessage, setProgressMessage] = useState('');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const queryParams = Object.fromEntries(searchParams);
  console.debug('query params', queryParams);

  const fetchData = async () => {
    setProgressMessage('Validating session...');

    const { result } = await validateTelegramSession({
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

      Cookies.set('bearerToken', bearerToken);
      dispatch(setName(queryParams.first_name));
      dispatch(setId(queryParams.id));
      router.replace('/');

      setLoading(false);
    }
  };

  useEffect(() => {
    if (queryParams.session_id)
      fetchData();
  }, []);


  if (loading) return (
    <h1>{progressMessage}</h1>
  );
};

export default TelegramLogin;