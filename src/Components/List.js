import ListItems from './ListItems'
import ListName from './ListName'

const Lists = ( {list} ) => {
  
  return (
    <>
    <ListName key={list.id} list={list}/>
    {list.items.length > 0 &&
    list.items.map((item) => {
      return (
        <ListItems
          listID={list.id} 
          key={item.id}
          item={item}
        />
      );
    })
    }
    {!list.items.length > 0 && 
        <p className="statusMsg">No items to display. Open list to add new item.</p>
    }
    </>
  )
}

export default Lists