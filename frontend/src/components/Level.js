import classes from './Level.module.css';


function Level({won , lost , level}) {

  return (
    <>
    { !won && !lost && <div className= {classes.levelTag}>
      <h1 >Level {level}...</h1>
    </div> 
    }
    </>
  ) 

}
export default Level