import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <VStack bg={"gray.100"} justifyContent={"center"} minH={"100vh"}>
      <Heading>Page Not Found 404</Heading>
      <Text>여기 어디임</Text>
      <Link to="/">
        <Button colorScheme={"twitter"} variant={"solid"}>
          돌아가셈 &rarr;
        </Button>
      </Link>
    </VStack>
  );
}
