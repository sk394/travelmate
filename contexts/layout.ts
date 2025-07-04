import { createContext } from 'react';
import { User } from '@supabase/supabase-js';

interface OpenContextType {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
type UserDetails = { [x: string]: any } | null;

//create comtext for open, user and user details
export const OpenContext = createContext<OpenContextType | undefined>(undefined);
export const UserContext = createContext<User | undefined | null>(undefined);
export const UserDetailsContext = createContext<UserDetails | undefined | null>(
    undefined
);