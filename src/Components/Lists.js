import ListItems from './ListItems'
import { Link } from 'react-router-dom'
import { useState, useRef } from 'react'

const Lists = ({ listID, items, name }) => {
  
  return (
    <>
    <Link to={`lists/${listID}`}>
    <h2>{name}</h2>
    </Link>
      {items.map((item) => (
          <ListItems
              listID={listID} 
              key={item.id}
              item={item}
          />
        ))}
    </>
  )
}

export default Lists