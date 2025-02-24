import React from 'react'

interface BaseCotainerProps {
    children: React.ReactNode
}
const BaseCotainer = ({children}: BaseCotainerProps) => {
  return (
    <div className="w-full px-10 xl:px-20">
        {children}
    </div>
  )
}

export default BaseCotainer