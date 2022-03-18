// anything that mutate database, create function here so its not in a componenet
import fetcher from './fetcher';

export const auth = (
  mode: 'signin' | 'signup', 
  body: { email: string, password: string } 
  ) => {
  return fetcher(`/${mode}`, body);
}