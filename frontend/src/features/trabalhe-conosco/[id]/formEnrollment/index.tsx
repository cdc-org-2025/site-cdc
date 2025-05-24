'use client'

import Box from '@mui/material/Box'
import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import AnimetedSlide from '@/components/animations/slide'
import TextfieldComponent from '@/components/atoms/Textfield'
import ButtonAction from '@/components/atoms/ButtonAction'
import ButtonUpload from '@/components/atoms/ButtonUpload'
import { useCandidaturaMutation } from '@/clients/api/candidaturas'
import { toast } from 'react-toastify'

const schema = yup
  .object({
    nome: yup
      .string()
      .required('O nome é obrigatório')
      .min(3, 'São necessários 3 caracteres.'),
    email: yup
      .string()
      .email('É necessaria formatar para E-mail.')
      .required('O e-mail é obrigatório.'),
    mensagem: yup
      .string()
      .required('A mensagem é obrigatório')
      .min(10, 'O mensagem deve ter pelo menos 10 caracteres.'),
    anexo: yup
      .mixed()
      .required('O arquivo é obrigatório e apenas arquivos PDF ou Word (.pdf, .doc, .docx) são permitidos.')
      .test(
        'fileFormat',
        'Apenas arquivos PDF ou Word (.pdf, .doc, .docx) são permitidos.',
        (file) => {
          if (!file) return false

          const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          ]

          const allowedExtensions = ['.pdf', '.doc', '.docx']

          const fileType = (file as File).type
          const fileName = (file as File).name.toLowerCase()

          const isValidType = allowedTypes.includes(fileType)
          const isValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext))

          return isValidType && isValidExtension
        }
      )
      .test(
        'fileSize',
        'O arquivo deve ter no máximo 5MB.',
        (file) => {
          if (!file) return false
          return (file as File).size <= 5 * 1024 * 1024 // 5MB
        }
      )
  })
  .required()

export default function FormEnrollment({ tituloVaga }: { tituloVaga?: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    clearErrors,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  })
  const [messageResponseForm, setmessageResponseForm] = useState<{
    sucesso?: boolean
    mensagem?: string
  }>({ sucesso: undefined, mensagem: '' })
  const [fileName, setFileName] = useState('')

  const { mutateAsync } = useCandidaturaMutation();

  const onSubmit = async (data: any) => {
    const id = toast.loading("O formulário está sendo enviado", {
      toastId: "custom-loading",
      className: 'toast-loading-gray',
    })

    const payload = { ...data, tituloVaga }
    try {
      await mutateAsync(payload);
      toast.update(id, {
        render: "Formulário enviado com sucesso",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });

      setmessageResponseForm({
        sucesso: true,
        mensagem: 'Formulário enviado com sucesso!',
      });
      reset();
      setFileName('');
    } catch (error) {
      toast.update(id, {
        render: "Erro no envio do formulário",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
      setmessageResponseForm({
        sucesso: false,
        mensagem:
          'Algum erro aconteceu no envio do formulário. Entre em contato com a organização',
      });
    }
  };

  return (
    <Box width="100%" pt="16px" pb="160px">
      <Typography variant="h4" color="secondary.dark">
        Formulário de Inscrição
      </Typography>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        gap={{ xs: '32px', md: '100px' }}
        pt="40px"
      >
        <Box
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          width="100%"
          display="flex"
          flexDirection="column"
          maxWidth="600px"
          gap="14px"
        >
          <AnimetedSlide distance={200} tension={10} friction={5}>
            <Box display="flex" gap="16px" pb="8px">
              <TextfieldComponent
                label="Nome"
                placeholder={'Digite seu nome'}
                register={register('nome')}
                error={!!errors.nome}
                helperText={errors.nome?.message}
              />
              <TextfieldComponent
                label="E-mail"
                placeholder={'seuemail@email.com'}
                register={register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Box>
            <TextfieldComponent
              label="Descrição"
              placeholder={'Descrição'}
              register={register('mensagem')}
              error={!!errors.mensagem}
              helperText={errors.mensagem?.message}
              rows={4}
            />
            <Box maxWidth="280px" pt="10px">
              <ButtonUpload
                label={'Anexo'}
                placeholder={'Anexe um documento'}
                onFileSelect={(file: any) => {
                  if (!file) return;

                  const allowedTypes = [
                    'application/pdf',
                    'application/msword',
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                  ];
                  const allowedExtensions = ['.pdf', '.doc', '.docx'];
                  const fileType = file.type;
                  const fileName = file.name.toLowerCase();

                  const isValidType = allowedTypes.includes(fileType);
                  const isValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));

                  if (isValidType && isValidExtension) {
                    setFileName(file.name);
                    setValue('anexo', file, { shouldValidate: true });
                    clearErrors('anexo');
                  } else {
                    setFileName('');
                    setValue('anexo', null as any, { shouldValidate: true });
                  }
                }}
                fileName={fileName}
                error={!!errors.anexo}
                helperText={errors.anexo?.message}
              />
            </Box>

            <Box
              pt="24px"
              width="100%"
              display="flex"
              justifyContent={'flex-end'}
            >
              <Box width="185px" mb="24px">
                <ButtonAction type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Enviando...' : 'Enviar'}
                </ButtonAction>
              </Box>
            </Box>

            <Typography
              width="100%"
              color={
                messageResponseForm.sucesso === true
                  ? '#286213'
                  : 'secondary.main'
              }
            >
              {messageResponseForm.mensagem}
            </Typography>
          </AnimetedSlide>
        </Box>
      </Box>
    </Box>
  )
}
