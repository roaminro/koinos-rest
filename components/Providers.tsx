'use client'

import { FC } from 'react'
import { NextUIProvider } from '@nextui-org/react'

type ProvidersProps = {
  children: React.ReactNode
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>
}

export default Providers
