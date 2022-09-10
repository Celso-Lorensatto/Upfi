import { Button, Box, HStack } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import useTranslation from 'next-translate/useTranslation';
import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { api } from '../services/api';

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    ({ pageParam = null }) => {
      const request = `/api/images${
        //@ts-ignore
        !pageParam || pageParam == 'next-cursor' ? '' : '?after=' + pageParam
      }`;
      return api.get(request);
    },
    {
      getNextPageParam: lastPage => {
        return lastPage.data.after || null;
      },
    }
  );

  const { t } = useTranslation();

  type Card = {
    title: string;
    description: string;
    url: string;
    ts: number;
    id: string;
  };

  const formattedData = useMemo(() => {
    const dados = [];
    data?.pages.forEach(page => {
      page.data.data.forEach(data => {
        dados.push({
          url: data.url,
          title: data.title,
          description: data.description,
          ts: data.ts,
          id: data.id,
        });
      });
    });
    return dados;
  }, [data]);

  // TODO RENDER LOADING SCREEN
  if (isLoading) {
    return <Loading />;
  }
  // TODO RENDER ERROR SCREEN
  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        {!isLoading && !isError && <CardList cards={formattedData} />}
        {hasNextPage ? (
          <Button marginTop="2rem" onClick={fetchNextPage} type="button">
            {isFetchingNextPage
              ? t('common:applicationButtonLoadingMoreImages')
              : t('common:applicationButtonLoadMoreImages')}
          </Button>
        ) : (
          ''
        )}
      </Box>
    </>
  );
}
