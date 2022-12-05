import {
  Button,
  Heading,
  HStack,
  Spinner,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { kakaoLogin } from "../api";
import { useQueryClient } from "@tanstack/react-query";
import { SiKakao } from "react-icons/si";
import { FaComment } from "react-icons/fa";

export default function KakaoConfirm() {
  const { search } = useLocation();
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const confirmLogin = async () => {
    // TODO: useMutation Refactoring
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if (code) {
      const status = await kakaoLogin(code);
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
      <HStack>
        <Heading>카카오 </Heading>
        <FaComment fontSize={"50"} color={"orange"} />
        <Heading>로그인중~~~</Heading>
      </HStack>
      <Text>기다리세영</Text>
      <Spinner size={"xl"}></Spinner>
    </VStack>
  );
}
