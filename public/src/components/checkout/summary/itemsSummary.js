// Import basics
import { Link } from 'react-router-dom';
// Import Components
import Message   from '../../multipurpose/message.js';
import InfoPanel from '../../multipurpose/infoPanel.js';
import Item      from './item.js';

const ItemsSummary = ({ items }) => {
  return (
    <InfoPanel title="Items"
      extraClasses="h-full"
      contentClasses="h-full sm:rounded-bl-xl"
      contents={
        items.length === 0 ? <Message error="Your cart is empty." /> :
        items.map((item, index) => {
          return <Item key={index} index={index} item={item} />
        })
      } />
  )
}

export default ItemsSummary;
