<>
 <Button onClick={handleClick}>{"(?)"}</Button>
    <Popover id={id} open={open} anchorEl={anchorElement} onClose={handleClose} anchorOrigin={{vertical:"bottom", horizontal: "right"}}>
        <Typography sx={{ p: 2 }}>"Charisma measures your ability to interact effectively with others. It includes such factors as confidence and eloquence, and it can represent a charming or commanding personality."
        </Typography>
        <Typography sx={{ p: 2 }}>"A Charisma check might arise when you try to influence or entertain others, when you try to make an impression or tell a convincing lie, or when you are navigating a tricky social situation. The Deception, Intimidation, Performance, and Persuasion skills reflect aptitude in certain kinds of Charisma checks."</Typography>
            <div style={{width:"100%", display:"flex", flexDirection:"row-reverse", margin: "2px"}}>
                <Button variant="contained" sx={{margin:"10px"}} onClick={handleClose}>OK</Button> 
            </div>
    </Popover> 
</>
