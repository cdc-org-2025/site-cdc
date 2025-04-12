'use client'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import React, { useState } from 'react'
import TextfieldComponent from '../atoms/Textfield'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import ButtonAction from '../atoms/ButtonAction'
import SelectComponent from '../atoms/Select'
import AnimationSplitText from '../animations/splitText'
import AnimetedSlide from '../animations/slide'

const schema = yup
  .object({
    name: yup
      .string()
      .required('O nome é obrigatório')
      .min(3, 'São necessários 3 caracteres.'),
    email: yup
      .string()
      .email('É necessaria formatar para E-mail.')
      .required('O e-mail é obrigatório.'),
    subject: yup.string().required('O motivo é obrigatório.'),
    message: yup
      .string()
      .required('A mensagem é obrigatório')
      .min(10, 'O mensagem deve ter pelo menos 10 caracteres.'),
  })
  .required()

export default function FormContactMap() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const [messageResponseForm, setmessageResponseForm] = useState<{
    sucesso?: boolean
    mensagem?: string
  }>({ sucesso: undefined, mensagem: '' })
  const onSubmit = (data: any) => {
    console.log('Dados do formulário:', data)

    setmessageResponseForm({
      sucesso: false,
      mensagem:
        'Algum erro aconteceu no envio do formulário. Entre em contato com a organização',
    })

    setmessageResponseForm({
      sucesso: true,
      mensagem: 'Formulário enviado com sucesso!',
    })
  }

  return (
    <Box
      mb={{ xs: '120px', md: '80px' }}
      px={{ xs: '16px', md: '32px' }}
      width="100%"
    >
      <AnimationSplitText>
        <Typography
          width="100%"
          variant="h3"
          color="primary"
          textTransform="none"
          pb="24px"
        >
          Entre em contato conosco
        </Typography>
      </AnimationSplitText>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        gap={{ xs: '32px', md: '100px' }}
      >
        <Box
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          width={{ xs: '100%', md: '40%' }}
          display="flex"
          flexDirection="column"
          gap="14px"
        >
          <AnimetedSlide distance={200} tension={10} friction={5}>
            <Box display="flex" gap="16px" pb="8px">
              <TextfieldComponent
                label="Nome"
                placeholder={'Digite seu nome'}
                register={register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <TextfieldComponent
                label="E-mail"
                placeholder={'seuemail@email.com'}
                register={register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Box>
            <Box width="100%" pb="8px">
              <SelectComponent
                label={'Razão do contato'}
                register={register('subject')}
                error={!!errors.subject}
                helperText={errors.subject?.message}
                options={[
                  { label: 'teste1', value: 1 },
                  { label: 'teste2', value: 3 },
                ]}
              />
            </Box>
            <TextfieldComponent
              label="Motivo do contato"
              placeholder={'Digite aqui sua mensagem'}
              register={register('message')}
              error={!!errors.message}
              helperText={errors.message?.message}
              rows={4}
            />
            <Box width="185px" mb="24px">
              <ButtonAction type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Enviar'}
              </ButtonAction>
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
        <Box width={{ xs: '100%', md: '40%' }} height="100%">
          <Box width="100%" height="400px" bgcolor="#ccc" />
        </Box>
      </Box>
    </Box>
  )
}
