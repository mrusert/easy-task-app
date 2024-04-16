import ListItems from './ListItems'
import ListName from './ListName'
import { selectListById} from './listsSlice'
import { useSelector } from "react-redux";

const List = ( {list} ) => {
  
  return (
    <>
      <ListName key={list.id} listId={list.id} />
      {list && list.items && list.items.length > 0 ? (
        list.items.map((item) => (
          <ListItems key={item.id} listId={list.id} itemId={item.id} />
        ))
      ) : (
        <p className="statusMsg">No items to display. Open list to add new item.</p>
      )}
    </>
  )
}

export default List