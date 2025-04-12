'use client'
import React from 'react'
import { SettingsProvider } from './settingsContext'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from '@/clients/shared/queryClient'
import { FeaturesProvider } from './featuresContext'

type ProviderProps = {
  children: React.ReactNode
}

type ProviderType<T> = React.ComponentType<T & ProviderProps>

const composeProviders =
  <T extends object>(...providers: ProviderType<T>[]) =>
  (props: T & ProviderProps) =>
    providers.reduceRight(
      (children: React.ReactNode, Provider: ProviderType<T>) => (
        <QueryClientProvider client={queryClient}>
          <Provider {...props}>{children}</Provider>
        </QueryClientProvider>
      ),
      props.children
    )

export const ContextProviders = composeProviders(
  SettingsProvider,
  FeaturesProvider
)
