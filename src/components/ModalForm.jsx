import React from 'react'
import BackgroundInfo from './subcomponents/BackgroundInfo';
import ClassInfo from './subcomponents/ClassInfo';

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
