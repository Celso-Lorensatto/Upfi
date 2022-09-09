import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  Flex,
  Text,
  Button,
} from '@chakra-ui/react';
import { TextInput } from '../Input/TextInput';

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
          justifyContent="space-between"
          alignItems="center"
          p={2}
          bg="#353431"
        >
          <Link _focus={{ outline: 'none' }} href={imgUrl}>
            Abrir original
          </Link>
          <Flex alignContent="center" alignItems="center">
            <TextInput
              marginRight={2}
              padding="0"
              disabled
              cursor="text"
              w="100%"
              name="url"
              value={imgUrl}
            />
            <Button
              padding="0"
              type="button"
              backgroundColor="#353431"
              outline="solid 1px currentColor"
              color="black"
              _hover={{ color: '#dd6b20', outlineColor: '#dd6b20' }}
              onClick={e => {
                const element = e.target.closest('button');
                const icon = element.firstChild.firstChild;

                if (navigator.userAgent.match(/android/i)) {
                  const elem = document.createElement('textarea');
                  elem.value = imgUrl;
                  document.body.appendChild(elem);
                  elem.select();
                  window.prompt('Copy to clipboard: Ctrl+C, Enter', imgUrl);
                  document.body.removeChild(elem);
                } else {
                  navigator.clipboard.writeText(imgUrl);
                }
                element.style.color = 'white';
                element.style.backgroundColor = '#40c057';
                icon.setAttribute('xlink:href', 'img/sprite.svg#icon-check');
              }}
            >
              <svg fill="currentColor" color="inherit" width="1.5rem">
                <use xlinkHref="img/sprite.svg#icon-paste" />
              </svg>
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
