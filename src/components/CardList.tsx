import { Grid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE
  const { isOpen, onClose, onOpen } = useDisclosure();

  // TODO SELECTED IMAGE URL STATE
  const [imgUrl, setImageUrl] = useState('');

  // TODO FUNCTION HANDLE VIEW IMAGE
  function viewImage(url) {
    setImageUrl(url);
    onOpen();
  }

  return (
    <Grid
      templateColumns={['1fr', '1fr 1fr', '1fr 1fr', '1fr 1fr 1fr']}
      alignItems="center"
      gap="40px"
    >
      {cards.map(card => {
        return <Card key={card.id} viewImage={viewImage} data={card} />;
      })}
      <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={imgUrl} />
    </Grid>
  );
}
