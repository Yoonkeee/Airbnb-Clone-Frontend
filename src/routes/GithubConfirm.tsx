import {
  Button,
  Heading,
  Spinner,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { githubLogin } from "../api";
import { useQueryClient } from "@tanstack/react-query";

export default function GithubConfirm() {
  const { search } = useLocation();
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const confirmLogin = async () => {
    // TODO: useMutation Refactoring
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if (code) {
      const status = await githubLogin(code);
      if (status === 200) {
        toast({
          status: "success",
          title: "어서오셈",
          description: "ㅎㅇㅎㅇ",
          position: "top-right",
          duration: 500,
        });
        queryClient.refetchQueries(["me"]);
        navigate("/");
      }
    }
  };
  useEffect(() => {
    confirmLogin();
  }, []);
  return (
    <VStack justifyContent={"center"} mt={40}>
      <Heading>깃허브 로그인중~~~</Heading>
      <Text>기다리세영</Text>
      <Spinner size={"xl"}></Spinner>
    </VStack>
  );
}
