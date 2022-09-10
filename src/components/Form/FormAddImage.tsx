import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import useTranslation from 'next-translate/useTranslation';
import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormAddImageProps {
  closeModal: () => void;
}

interface dataProps {
  title: string;
  description: string;
}

interface imageMutationProps {
  data: dataProps;
  img: string;
}

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const { t } = useTranslation();
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  const formValidations = {
    image: {
      required: t('common:formImageRequiredError'),
      validate: {
        lessThan10MB: file =>
          file[0].size < 10000000 || t('common:formInvalidImageSize'),
        acceptedFormats: file =>
          !!file[0].name.match(/png|jpeg|jpg|gif/i) ||
          t('common:formInvalidImageType'),
      },
    },
    title: {
      required: t('common:formTitleRequiredError'),
      minLength: {
        value: 2,
        message: t('common:formTitleInvalidMinLength'),
      },
      maxLength: { value: 20, message: t('common:formTitleInvalidMaxLength') },
    },
    description: {
      required: t('common:formDescriptiopnRequiredError'),
      maxLength: {
        value: 65,
        message: t('common:formDescriptionInvalidMaxLength'),
      },
    },
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    ({ data, img }: imageMutationProps) =>
      api.post('api/images', {
        title: data.title,
        description: data.description,
        url: img,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries(),
    }
  );

  const { register, handleSubmit, reset, formState, setError, trigger } =
    useForm();
  const { errors } = formState;

  const onSubmit = async (data: dataProps): Promise<void> => {
    try {
      if (!imageUrl) {
        toast({
          status: 'error',
          title: t('common:formToastImageNullErrorTitle'),
          description: t('common:formToastImageNullErrorDescription'),
          isClosable: true,
        });
      }
      await mutation.mutateAsync({ data, img: imageUrl });
      toast({
        status: 'success',
        title: t('common:formToastImageSuccessTitle'),
        description: t('common:formToastImageSuccessDescription'),
      });
    } catch (err) {
      toast({
        status: 'error',
        title: err.status,
        description: err.message,
        isClosable: true,
      });
    } finally {
      reset();
      closeModal();
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={[2, 4]}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          error={errors.image}
          {...register('image', formValidations.image)}
        />

        <TextInput
          name="title"
          {...register('title', formValidations.title)}
          placeholder={t('common:modalTitleInput')}
          error={errors.title}
        />

        <TextInput
          name="description"
          {...register('description', formValidations.description)}
          placeholder={t('common:modalDescriptionInput')}
          error={errors.description}
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        {t('common:modalSubmitButton')}
      </Button>
    </Box>
  );
}
