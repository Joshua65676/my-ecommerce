import Banner from '@/components/Banner'
import ProductForU from '@/components/ProductForU'
import React from 'react'

const page: React.FC = () => {
  return (
    <div className=''>
      <Banner fetchAll={false}/>
      <ProductForU />
    </div>
  )
}

export default page
