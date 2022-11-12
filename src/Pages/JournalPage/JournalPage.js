import s from "../JournalPage/JournalPage.module.scss"

export  const JournalPage =()=>{
    return <div><h1>JOURNAL</h1>
    <div>
    <form><input type={"search"} placeholder={"search by numder"}></input >
    <button style={{width: "fitContent", height: "20px"}}>find</button>
    </form>
    </div>
    <div>
    <form>
        <input type={"search"} placeholder={"number"}></input >
        <input type={"search"} placeholder={"label"}></input >
        <input type={"search"} placeholder={"color"}></input >
        <input type={"search"} placeholder={"count"}></input >
    <button style={{width: "fitContent", height: "20px"}}>Add to my list</button>
    </form>
    </div>
    <div>
        <h2>My list</h2>
        <ul className={s.ul}>
        <li> <span className={s.span}>3861</span><span className={s.span}>Cocoa </span><span className={s.span}>DMC</span>
        <button style={{width: "fitContent", height: "20px"}}>-</button><span className={s.span}> count: <span>3</span> </span><button style={{width: "fitContent", height: "20px"}}>+</button> <button style={{width: "fitContent", height: "20px"}}>Del</button><span className={s.span}></span>
        </li>
        <li> <span className={s.span}>2341</span><span className={s.span}>green </span><span className={s.span}>DMC</span>
        <button style={{width: "fitContent", height: "20px"}}>-</button><span className={s.span}> count: <span>1</span> </span><button style={{width: "fitContent", height: "20px"}}>+</button> <button style={{width: "fitContent", height: "20px"}}>Del</button><span className={s.span}></span>
        </li>
        <li> <span className={s.span}>1861</span><span className={s.span}>Yellow</span><span className={s.span}>DMC</span>
        <button style={{width: "fitContent", height: "20px"}}>-</button><span className={s.span}> count: <span>9</span> </span><button style={{width: "fitContent", height: "20px"}}>+</button> <button style={{width: "fitContent", height: "20px"}}>Del</button><span className={s.span}></span>
        </li>
        <li> <span className={s.span}>5431</span><span className={s.span}>black </span><span className={s.span}>DMC</span>
        <button style={{width: "fitContent", height: "20px"}}>-</button><span className={s.span}> count: <span>2</span> </span><button style={{width: "fitContent", height: "20px"}}>+</button> <button style={{width: "fitContent", height: "20px"}}>Del</button><span className={s.span}></span>
        </li>
      </ul>
    </div>

    </div>
    }