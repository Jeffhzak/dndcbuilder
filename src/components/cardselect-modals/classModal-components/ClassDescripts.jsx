import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

export default function ClassDescripts({className}) {

    const rowStyle = {
        display: "flex",
        flexDirection: "row",
        alignItems:"center",
        m: 1,
      }

    const classDescBlock = {
        barbarian:{
            desc: "A fierce warrior of primitive background who can enter a battle rage.",
            imageSrc: "https://www.dndbeyond.com/avatars/thumbnails/6/342/420/618/636272680339895080.png"
        },
        bard:{
            desc:"An inspiring magician whose power echoes the music of creation.",
            imageSrc:"https://www.dndbeyond.com/avatars/thumbnails/6/369/420/618/636272705936709430.png",
        },
        cleric:{
            desc:"A priestly champion who wields divine magic in service of a higher power.",
            imageSrc:"https://www.dndbeyond.com/avatars/thumbnails/6/371/420/618/636272706155064423.png",
        },
        druid:{
            desc:"A priest of the Old Faith, wielding the powers of nature—moonlight and plant growth, fire and lightning—and adapting animal forms.",
            imageSrc:"https://www.dndbeyond.com/avatars/thumbnails/6/346/420/618/636272691461725405.png",
        },
        fighter:{
            desc:"A master of martial combat, skilled with a variety of weapons and armor.",
            imageSrc:"https://www.dndbeyond.com/avatars/thumbnails/6/359/420/618/636272697874197438.png",
        },
        monk:{
            desc:"A master of martial arts harnessing the power of the body in pursuit of physical and spiritual perfection.",
            imageSrc:"https://www.dndbeyond.com/avatars/thumbnails/6/489/420/618/636274646181411106.png",
        },
        paladin:{
            desc:"A holy warrior bound to a sacred oath.",
            imageSrc:"https://www.dndbeyond.com/avatars/thumbnails/6/365/420/618/636272701937419552.png",
        },
        ranger:{
            desc:"A warrior who uses martial prowess and nature magic to combat threats on the edges of civilization.",
            imageSrc:"https://www.dndbeyond.com/avatars/thumbnails/6/367/420/618/636272702826438096.png",
        },
        rogue:{
            desc:"A scoundrel who uses stealth and trickery to overcome obstacles and enemies.",
            imageSrc:"https://www.dndbeyond.com/avatars/thumbnails/6/384/420/618/636272820319276620.png",
        },
        sorcerer:{
            desc:"A spellcaster who draws on inherent magic from a gift or bloodline.",
            imageSrc:"https://www.dndbeyond.com/avatars/thumbnails/6/485/420/618/636274643818663058.png",
        },
        warlock:{
            desc:"A wielder of magic that is derived from a bargain with an extraplanar entity.",
            imageSrc:"https://www.dndbeyond.com/avatars/thumbnails/6/375/420/618/636272708661726603.png",
        },
        wizard:{
            desc:"A scholarly magic-user capable of manipulating the structures of reality.",
            imageSrc:"https://www.dndbeyond.com/avatars/thumbnails/6/357/420/618/636272696881281556.png",
        },
    }
    return (

        <Box sx={rowStyle}>
            <Box sx={{width:"50%"}}>
                <img src={classDescBlock[className]?.imageSrc} width="auto" height="auto"/>
            </Box>
            <Box sx={{width:"50%"}}>
                <Typography variant="h6">{classDescBlock[className]?.desc}</Typography>
            </Box>
        </Box>
    )
}
