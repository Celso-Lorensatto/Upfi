import { Box, Heading, Flex, Progress } from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';

export function Loading(): JSX.Element {
  const { t } = useTranslation();
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      h="100vh"
      flexDir="column"
    >
      <Box>
        <Heading>{t('common:applicationLoading')}</Heading>
        <Progress
          mt={4}
          size="xs"
          isIndeterminate
          bgColor="transparent"
          colorScheme="orange"
        />
      </Box>
    </Flex>
  );
}
