import React from 'react'
import BackgroundInfo from './modals/BackgroundInfo';
import ClassInfo from './modals/ClassInfo';

export default function ModalForm(props) {

    console.log("ModalForm props --- ", props)
    const category = props?.modalinfo?.category;
    const type = props?.modalinfo?.type;
    console.log(category)


    return (
        <>
        {category === "classes" && (<ClassInfo/>)}
        {category === "backgrounds" && (<BackgroundInfo/>)}
        {category === "races" && (<ClassInfo/>)}
        </>
    )
}
