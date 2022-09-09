import { Box, useMediaQuery } from '@chakra-ui/react';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError, FieldErrorsImpl } from 'react-hook-form';
import {
  FormControl,
  FormErrorMessage,
  Icon,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  Tooltip,
} from '@chakra-ui/react';
import { FiAlertCircle } from 'react-icons/fi';

interface InputProps extends ChakraInputProps {
  name: string;
  error?: FieldError | FieldErrorsImpl;
}

const TextInputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, error = null, ...rest },
  ref
) => {
  const [mobile] = useMediaQuery('(max-width:33em)');
  return (
    <FormControl
      display="flex"
      flexDirection="row"
      alignItems="center"
      isInvalid={!!error}
    >
      <ChakraInput
        aria-label={name}
        name={name}
        ref={ref}
        autoComplete="off"
        borderColor="transparent"
        bgColor="pGray.800"
        color="pGray.50"
        _placeholder={{
          color: 'pGray.200',
        }}
        _hover={{
          borderColor: 'orange.400',
        }}
        py={6}
        pr={8}
        {...rest}
      />

      {mobile ? (
        <></>
      ) : (
        <>
          {!!error && (
            <Tooltip label={error.message} bg="red.500">
              <FormErrorMessage ml={-6} mt={0} zIndex="tooltip">
                <Icon as={FiAlertCircle} color="red.500" w={4} h={4} />
              </FormErrorMessage>
            </Tooltip>
          )}
        </>
      )}
    </FormControl>
  );
};

export const TextInput = forwardRef(TextInputBase);
