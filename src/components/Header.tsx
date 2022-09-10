import { Box, Flex, Button, useDisclosure, Image } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';

import { ModalAddImage } from './Modal/AddImage';

export function Header(): JSX.Element {
  const { t } = useTranslation();
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bgColor="pGray.800">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          maxW={1120}
          mx="auto"
          px={[10, '', 20]}
          py={6}
        >
          <Image src="logo.svg" h={10} />
          <Button onClick={() => onOpen()}>{t('common:imageButton')}</Button>
        </Flex>
      </Box>

      <ModalAddImage isOpen={isOpen} onClose={onClose} />
    </>
  );
}
