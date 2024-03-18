import Lists from "./Lists"
const Feed = ( {lists} ) => {
  return (
        <>
        {lists.map((list) => (
            <Lists 
                key={list.id}
                name={list.name}
                items={list.items}
                listID={list.id}
            />
        ))}
        </>
  )
}

export default Feed