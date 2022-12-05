import { Button, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack } from "@chakra-ui/react";
import { FaEnvelope, FaKey, FaPersonBooth, FaUserCheck } from "react-icons/fa";
import SocialLogin from "./SocialLogin";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>회원가입 모달창</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <InputGroup>
              <InputLeftElement children={<FaUserCheck color={"gray"} />} />
              <Input variant={"filled"} placeholder={"아이디 입력하셈"} />
            </InputGroup>
            <InputGroup>
              <InputLeftElement children={<FaKey color={"gray"} />} />
              <Input variant={"filled"} placeholder={"비번 입력하셈"} />
            </InputGroup>
            <InputGroup>
              <InputLeftElement children={<FaPersonBooth color={"gray"} />} />
              <Input variant={"filled"} placeholder={"이름 입력하셈"} />
            </InputGroup>
            <InputGroup>
              <InputLeftElement children={<FaEnvelope color={"gray"} />} />
              <Input variant={"filled"} placeholder={"이메일 입력하셈"} />
            </InputGroup>
          </VStack>
          <Button mt={"2rem"} w={"100%"} colorScheme={"red"}>
            눌러유
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
