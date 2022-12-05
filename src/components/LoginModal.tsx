import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FaKey, FaUserCheck } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  IUsernameLoginError,
  IUsernameLoginSuccess,
  IUsernameLoginVariables,
  usernameLogin,
} from "../api";
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}
interface IForm {
  username: string;
  password: string;
}
export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>();
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation(usernameLogin, {
    onSuccess: () => {
      toast({
        title: "ㅎㅇㅎㅇ",
        status: "success",
        position: "top-right",
        duration: 500,
      });
      onClose();
      queryClient.refetchQueries(["me"]);
      reset();
    },
    // onError: () => {
    //   console.log("Mutation 에러낫음..ㅠ");
    // },
  });
  const onSubmit = ({ username, password }: IForm) => {
    mutation.mutate({ username, password });
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>로그인 모달창</ModalHeader>
        <ModalCloseButton />
        <ModalBody as={"form"} onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <InputGroup>
              <InputLeftElement children={<FaUserCheck color={"gray"} />} />
              <Input
                isInvalid={Boolean(errors.username?.message)}
                {...register("username", { required: "아이디 입력하셔야죠" })}
                variant={"filled"}
                placeholder={"아이디 입력하셈"}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement children={<FaKey color={"gray"} />} />
              <Input
                isInvalid={Boolean(errors.password?.message)}
                {...register("password", { required: "비번도 입력하셔야죠" })}
                type={"password"}
                variant={"filled"}
                placeholder={"비번 입력하셈"}
              />
            </InputGroup>
          </VStack>
          {mutation.isError ? (
            <Text color={"red.500"} textAlign={"center"} fontSize={"xl"}>
              아디나 비번이 틀렸잖아요
            </Text>
          ) : null}
          <Button
            isLoading={mutation.isLoading}
            type={"submit"}
            mt={"2rem"}
            w={"100%"}
            colorScheme={"red"}
          >
            눌러보셈
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
