import Lists from "./Lists"
const Feed = ( {lists} ) => {
  return (
    <ul>
        {lists.map((list) => (
            <Lists 
                key={list.id}
                name={list.name}
                list={list.items}
            />
        ))}
    </ul>
  )
}

export default Feed