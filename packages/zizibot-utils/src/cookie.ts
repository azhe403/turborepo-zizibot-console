import Cookies, { Cookie } from 'universal-cookie';

const cookie = new Cookies();

export function setCookie(name: string, value: Cookie) {
  cookie.set(name, value, {
    domain: '.azhe.my.id'
  });
}

export function getCookie(name: string) {
  return cookie.get(name);
}
