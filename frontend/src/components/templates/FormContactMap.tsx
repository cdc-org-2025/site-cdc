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
import { IPostContato, useContatoMutation } from '@/clients/api/contato'
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
    motivo: yup.string().required('O motivo é obrigatório.'),
    mensagem: yup
      .string()
      .required('A mensagem é obrigatório')
      .min(10, 'O mensagem deve ter pelo menos 10 caracteres.'),
  })
  .required()

export default function FormContactMap() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const { mutateAsync } = useContatoMutation();

  const [messageResponseForm, setmessageResponseForm] = useState<{
    sucesso?: boolean
    mensagem?: string
  }>({ sucesso: undefined, mensagem: '' })
  const onSubmit = async (data: IPostContato) => {
    const id = toast.loading("O formulário está sendo enviado");
    try {
      await mutateAsync(data)
      toast.update(id, {
        render: "Formulário enviado com sucesso",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      setmessageResponseForm({
        sucesso: true,
        mensagem: 'Formulário enviado com sucesso!',
      })
      reset()
    } catch {
      toast.update(id, {
        render: 'Algum erro aconteceu no envio do formulário. Entre em contato com a organização',
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
      setmessageResponseForm({
        sucesso: false,
        mensagem:
          'Algum erro aconteceu no envio do formulário. Entre em contato com a organização',
      })
    }

  }

  return (
    <Box
      mb={{ xs: '40px', md: '80px' }}
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
          fontSize={{ xs: '27px', md: '1.94rem' }}
        >
          Entre em contato conosco
        </Typography>
      </AnimationSplitText>

      <AnimationSplitText>
        <Typography
          width="100%"
          variant="overline"
          color="#222"
          textTransform="none"
          lineHeight={"150%"}
        >
          O Centro de Democracia e Cidadania está disponível para contato, tanto por e-mail, WhatsApp, como presencialmente.</Typography>
      </AnimationSplitText>

      <Box
        mt="32px"
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
            <Box width="100%" pb="8px">
              <SelectComponent
                label={'Razão do contato'}
                register={register('motivo')}
                error={!!errors.motivo}
                helperText={errors.motivo?.message}
                options={[
                  { label: 'teste1', value: 1 },
                  { label: 'teste2', value: 3 },
                ]}
              />
            </Box>
            <TextfieldComponent
              label="Motivo do contato"
              placeholder={'Digite aqui sua mensagem'}
              register={register('mensagem')}
              error={!!errors.mensagem}
              helperText={errors.mensagem?.message}
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
        <Box
          width={{ xs: '100%', md: '40%' }}
          height="400px"
          overflow={'hidden'}
          borderRadius='18px'
        >
          <iframe
            title="Google Maps Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4716.891056847212!2d-34.884723699999995!3d-8.054413599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab18a4e806175b%3A0xc362cf117c4f32b2!2sCentro%20de%20Desenvolvimento%20e%20Cidadania!5e0!3m2!1spt-BR!2sbr!4v1745449189839!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Box>
      </Box>
    </Box>
  )
}
