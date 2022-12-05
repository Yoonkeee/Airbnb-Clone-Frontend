import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FaCamera, FaRegHeart, FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
interface IRoomProps {
  imageUrl: string;
  name: string;
  rating: number;
  city: string;
  country: string;
  price: number;
  pk: number;
  isOwner: boolean;
}

export default function Room({
  pk,
  imageUrl,
  name,
  rating,
  city,
  country,
  price,
  isOwner,
}: IRoomProps) {
  const gray = useColorModeValue("gray.600", "gray.300");
  const navigate = useNavigate();
  const onCameraClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault(); // stop propagation
    navigate(`/rooms/${pk}/photos`);
  };
  return (
    <Link to={`/rooms/${pk}`}>
      <VStack alignItems={"flex-start"} spacing={-0.5}>
        <Box position={"relative"} overflow={"hidden"} mb={2} rounded={"2xl"}>
          {imageUrl ? (
            <Image minH="280" src={imageUrl} objectFit={"cover"} />
          ) : (
            <Box minH={"280"} h={"100%"} w={"100%"} p={10} bg={"green300"} />
          )}
          <Button
            variant={"unstyled"}
            position={"absolute"}
            top={5}
            right={5}
            color={"white"}
            onClick={onCameraClick}
          >
            {isOwner ? <FaCamera size={35} /> : <FaRegHeart size={35} />}
          </Button>
        </Box>
        <Box>
          <Grid gap={2} templateColumns={"6fr 1fr"}>
            <Text as={"b"} noOfLines={1} fontSize={"md"}>
              {name}
            </Text>
            <HStack _hover={{ color: "red" }} spacing={1}>
              <FaStar size={15} />
              <Text>{rating}</Text>
            </HStack>
          </Grid>
          <Text fontSize={"sm"} color={gray}>
            {city}, {country}
          </Text>

          <Text fontSize={"sm"} color={gray}>
            <Text as={"b"}>{price}원</Text> / 1밤
          </Text>
        </Box>
      </VStack>
    </Link>
  );
}
