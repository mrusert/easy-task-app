// import { Link } from 'react-router-dom'
import List from './List'

const Lists = ({ list, name }) => {

  return (
    <>
      <li>{name}</li>
      <ul>
      {list.map((item) => (
            <List 
                key={item.id}
                item={item}
            />
        ))}
      </ul>
      
    </>
  )
}

export default Lists