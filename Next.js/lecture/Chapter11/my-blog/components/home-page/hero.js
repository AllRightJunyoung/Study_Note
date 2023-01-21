import Image from 'next/image'
import classes from './hero.module.css'
const Hero=()=>{
    return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image src="/images/site/ncs.jpeg" alt="hello" width={300} height={300}/>
      </div>
      <h1>안녕하세요</h1>
      <p>개인 블로그 입니다. </p>
    </section>
    )
}
export default Hero