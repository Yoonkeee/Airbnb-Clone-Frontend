import ProtectedPage from "../components/ProtectedPage";
import useHostOnlyPage from "../components/HostOnlyPage";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FaBed, FaMoneyBill, FaToilet } from "react-icons/fa";
import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAmenities,
  getCategories,
  IUploadRoomVariables,
  uploadRoom,
} from "../api";
import { IAmenity, ICategory, IRoomDetail } from "../types";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useProtectedPage from "../components/ProtectedPage";

export default function UploadRoom() {
  const navigate = useNavigate();
  const { register, watch, handleSubmit } = useForm<IUploadRoomVariables>();
  const { data: amenities, isLoading: isAmenitiesLoading } = useQuery<
    IAmenity[]
  >(["amenities"], getAmenities);
  const toast = useToast();
  const mutation = useMutation(uploadRoom, {
    onSuccess: (data: IRoomDetail) => {
      toast({
        status: "success",
        title: "방 생성됏어요~~",
        position: "bottom",
      });
      navigate(`/rooms/${data.id}`);
    },
  });
  const { data: categories, isLoading: isCategoriesLoading } = useQuery<
    ICategory[]
  >(["categories"], getCategories);
  const onSubmit = (data: IUploadRoomVariables) => {
    mutation.mutate(data);
  };
  useHostOnlyPage();
  useProtectedPage();
  return (
    <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
      <Container>
        <Heading textAlign={"center"}>방 만들기</Heading>
        <VStack
          spacing={5}
          as={"form"}
          mt={5}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControl>
            <FormLabel>이름</FormLabel>
            <Input
              {...register("name", { required: true })}
              required
              type={"text"}
            />
          </FormControl>
          <HStack>
            <FormControl w={350}>
              <FormLabel>국가</FormLabel>
              <Input
                {...register("country", { required: true })}
                required
                type={"text"}
              />
            </FormControl>
            <FormControl w={350}>
              <FormLabel>도시</FormLabel>
              <Input
                {...register("city", { required: true })}
                required
                type={"text"}
              />
            </FormControl>
          </HStack>
          <FormControl>
            <FormLabel>주소</FormLabel>
            <Input
              {...register("address", { required: true })}
              required
              type={"text"}
            />
          </FormControl>
          <HStack>
            <FormControl>
              <FormLabel>가격</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaMoneyBill />} />
                <Input
                  {...register("price", { required: true })}
                  required
                  type={"number"}
                  min={0}
                ></Input>
                <InputRightAddon children={"원"} />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>방 갯수</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaBed />} />
                <Input
                  {...register("rooms", { required: true })}
                  required
                  type={"number"}
                  min={0}
                ></Input>
                <InputRightAddon children={"개"} />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>화장실</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaToilet />} />
                <Input
                  {...register("toilets", { required: true })}
                  required
                  type={"number"}
                  min={0}
                ></Input>
                <InputRightAddon children={"개"} />
              </InputGroup>
            </FormControl>
          </HStack>
          <FormControl>
            <FormLabel>방 설명</FormLabel>
            <Textarea
              {...register("description", { required: true })}
              required
            />
          </FormControl>
          <FormControl>
            <Checkbox
              {...register("pet_friendly", { required: true })}
              required
            >
              애견 동반 가능
            </Checkbox>
          </FormControl>
          <HStack>
            <FormControl w={350}>
              <FormLabel>방 종류</FormLabel>
              <Select
                {...register("kind", { required: true })}
                required
                placeholder={"종류를 골라보셈"}
              >
                <option value={"entire_place"}>집 전체</option>
                <option value={"private_room"}>개인 방</option>
                <option value={"shared_room"}>공유 방</option>
              </Select>
              <FormHelperText>이 방 종류가 머임</FormHelperText>
            </FormControl>
            <FormControl w={350}>
              <FormLabel>카테고리</FormLabel>
              <Select
                {...register("category", { required: true })}
                placeholder={"종류를 골라보셈"}
              >
                {categories?.map((category) => (
                  <option key={category.pk} value={category.pk}>
                    {category.name}
                  </option>
                ))}
              </Select>
              <FormHelperText>카테고리를 골라보세여</FormHelperText>
            </FormControl>
          </HStack>
          <FormControl>
            <FormLabel>어메니티</FormLabel>
            <Grid templateColumns={"1fr 1fr"} gap={5}>
              {amenities?.map((amenity) => (
                <Box key={amenity.pk}>
                  <Checkbox
                    value={amenity.pk}
                    {...register("amenities", { required: true })}
                  >
                    {amenity.name}
                  </Checkbox>
                  <FormHelperText>{amenity.description}</FormHelperText>
                </Box>
              ))}
            </Grid>
          </FormControl>
          {mutation.isError ? (
            <Text color={"red.500"}>에러낫어여 T_T</Text>
          ) : null}
          <Button
            type={"submit"}
            isLoading={mutation.isLoading}
            colorScheme={"red"}
            size={"lg"}
            w={"100%"}
          >
            방 만들기~
          </Button>
        </VStack>
      </Container>
    </Box>
  );
}
