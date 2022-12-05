import { Box, Button, Divider, HStack, Text } from "@chakra-ui/react";
import { FaComment, FaGithub } from "react-icons/fa";

export default function SocialLogin() {
  const kakaoParams = {
    client_id: "076cda1a675030227aa306f335840650",
    redirect_uri: "http://127.0.0.1:3000/social/kakao",
    response_type: "code",
  };
  const params = new URLSearchParams(kakaoParams).toString();
  return (
    <Box>
      <HStack my={5}>
        <Divider />
        <Text
          textTransform={"uppercase"}
          color={"gray.400"}
          fontSize={"xs"}
          as={"b"}
        >
          Or
        </Text>
        <Divider />
      </HStack>
      <HStack>
        <Button
          as={"a"}
          href={
            "https://github.com/login/oauth/authorize?" +
            "client_id=a422a39e972841a14bec&scope=read:user,user:email"
          }
          w={"50%"}
          leftIcon={<FaGithub />}
          colorScheme={"telegram"}
        >
          깃헙으로 로그인
        </Button>
        <Button
          as={"a"}
          href={`https://kauth.kakao.com/oauth/authorize?${params}`}
          w={"50%"}
          leftIcon={<FaComment />}
          colorScheme={"yellow"}
        >
          카카오로 로그인
        </Button>
      </HStack>
    </Box>
  );
}
