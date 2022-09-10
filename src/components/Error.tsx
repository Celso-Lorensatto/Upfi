import { Button, Heading, Flex } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';

export function Error(): JSX.Element {
  const { t } = useTranslation();

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      h="100vh"
      flexDir="column"
    >
      <Heading>{t('common:applicationError')}</Heading>
      <Button py={6} onClick={() => window.location.reload()} mt={4}>
        {t('common:applicationErrorReloadButton')}
      </Button>
    </Flex>
  );
}
