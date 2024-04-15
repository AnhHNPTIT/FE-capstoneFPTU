
export const fadeIn =(Direction,delay) =>{
    return{
        hidden: {
            y:Direction ==='up' ? 40 : Direction === 'down' ? -40 :0 ,
            x:Direction ==='left' ? 40 : Direction === 'right' ? -40 :0 ,
        },
        show :{
           y:0,
           x:0,
           opacity:1,
           transition: {
            type: 'tween',
            duration:1.2,
            delay:delay,
            ease: [0.25 , 0.25 , 0.25 , 0.75]
           }
        }
    }
}