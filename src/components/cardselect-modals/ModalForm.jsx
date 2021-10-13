import React from 'react'
import BackgroundInfo from './BackgroundInfo';
import ClassInfo from './ClassInfo';
import RaceInfo from './RaceInfo';

export default function ModalForm({modalinfo}) {

    const category = modalinfo?.category;
    const type = modalinfo?.type;


    return (
        <>
        {category === "classes" && (<ClassInfo modalinfo={modalinfo}/>)}
        {category === "backgrounds" && (<BackgroundInfo modalinfo={modalinfo}/>)}
        {category === "races" && (<RaceInfo modalinfo={modalinfo}/>)}
        </>
    )
}
