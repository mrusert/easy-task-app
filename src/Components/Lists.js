import ListItems from './ListItems'
import { Link } from 'react-router-dom'

const Lists = ({ listID, items, name }) => {

  return (
    <>
    <Link to={`lists/${listID}`}>
    <h2>{name}</h2>
    </Link>
      {items.length > 0 && items.map((item) => (
          <ListItems
              listID={listID} 
              key={item.id}
              item={item}
          />
        ))}
        {!items.length > 0 && 
          <p className="statusMsg">No items to display. Open list to add new item.</p>
        }
    </>
  )
}

export default Lists