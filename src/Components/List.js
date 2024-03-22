import ListItems from './ListItems'
import ListName from './ListName'

const List = ( {listToUpdate} ) => {
  
  return (
    <>
    <ListName key={listToUpdate.id} listToUpdate={listToUpdate} />
    {listToUpdate.items.length > 0 &&
    listToUpdate.items.map((item) => (
        <ListItems
          listID={listToUpdate.id} 
          key={item.id}
          item={item}
        />
      ))
    }
    {!listToUpdate.items.length > 0 && 
        <p className="statusMsg">No items to display. Open list to add new item.</p>
    }
    </>
  )
}

export default List