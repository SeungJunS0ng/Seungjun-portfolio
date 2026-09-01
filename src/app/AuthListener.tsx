import type { Session } from "@supabase/supabase-js";
import { useEffect } from "react";
import { supabase } from "../shared/api/supabase";
import { useAppDispatch } from "./hooks";
import { setUser } from "../entity/session/model/authSlice";

function pickUser(session: Session | null) {
  if (!session) return null;
  return {
    id: session.user.id,
    email: session.user.email,
  };    
}   

export default function AuthListener() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                const user = pickUser(session);
                dispatch(setUser(user));
            }
        );

        return () => {
            subscription?.unsubscribe();
        };
    }, [dispatch]);

    return null;
}