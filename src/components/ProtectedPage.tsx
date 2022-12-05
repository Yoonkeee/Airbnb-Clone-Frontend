import { useQuery } from "@tanstack/react-query";
import useUser from "../lib/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useProtectedPage() {
  const { user, isLoggedIn, userLoading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLoading && !isLoggedIn) {
      navigate("/");
    }
  }, [userLoading, isLoggedIn, navigate]);
  return;
}
