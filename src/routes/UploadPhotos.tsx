import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import useHostOnlyPage from "../components/HostOnlyPage";
import useProtectedPage from "../components/ProtectedPage";
import { useMutation } from "@tanstack/react-query";
import { createPhoto, getUploadURL, uploadImage } from "../api";
import { watch } from "fs";

interface IForm {
  file: FileList;
}
interface IUploadURLResponse {
  id: string;
  uploadURL: string;
}

export default function UploadPhotos() {
  const toast = useToast();
  const { register, handleSubmit, watch } = useForm<IForm>();
  const { roomPk } = useParams();
  const createPhotoMutation = useMutation(createPhoto, {
    onSuccess: () => {
      toast({
        status: "success",
        title: "이미지 올라갓음",
        description: "ㅎ굿ㅎ",
      });
    },
  });
  const uploadImageMutation = useMutation(uploadImage, {
    onSuccess: ({ result }: any) => {
      if (roomPk) {
        createPhotoMutation.mutate({
          description: "Message",
          file: `https://imagedelivery.net/zD0Crtd4n6Z3fD7_la_iRQ/${result.id}/public`,
          roomPk,
        });
      }
    },
  });
  const uploadURLMutation = useMutation(getUploadURL, {
    onSuccess: (data: IUploadURLResponse) => {
      uploadImageMutation.mutate({
        file: watch("file"),
        uploadURL: data.uploadURL,
      });
    },
  });
  const onSubmit = (data: any) => {
    uploadURLMutation.mutate();
  };
  useHostOnlyPage();
  useProtectedPage();
  return (
    <Box
      pb={40}
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
    >
      <Container>
        <Heading textAlign={"center"}>Upload a Photo</Heading>
        <VStack
          spacing={5}
          mt={10}
          as={"form"}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControl>
            <Input {...register("file")} type="file" accept="image/*" />
          </FormControl>
          <Button
            isLoading={
              createPhotoMutation.isLoading ||
              uploadImageMutation.isLoading ||
              uploadURLMutation.isLoading
            }
            type={"submit"}
            w="full"
            colorScheme={"red"}
          >
            방 사진 올리기~
          </Button>
        </VStack>
      </Container>
    </Box>
  );
}
