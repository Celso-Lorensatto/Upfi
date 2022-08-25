import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bgColor="#00000087" />
      <ModalContent>
        <ModalBody display="flex" p={0}>
          <Image h="auto" w="100%" src={imgUrl} />
        </ModalBody>
        <ModalFooter
          display="flex"
          w="100%"
          justifyContent="flex-start"
          p={2}
          bg="#353431"
        >
          <Link _focus={{ outline: 'none' }} href={imgUrl}>
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
