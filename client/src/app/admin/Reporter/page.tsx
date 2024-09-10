"use client"
import PhotoModal from '@/app/components/modal/PhotoModal'
import React, { useState } from 'react'

export default function page() {
    const [isOpenModal,setIsOpenModal]= useState(false);
    const openModal =()=>{
        setIsOpenModal(true);
    }
  return (
    <>
    <PhotoModal onClose={openModal} isOpen={isOpenModal}/>
    <button onClick={openModal}>123</button>
    </>
  )
}
