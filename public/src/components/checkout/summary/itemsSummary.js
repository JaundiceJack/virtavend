import { Link } from 'react-router-dom';
import Message from '../../message.js';
import Item from './item.js';
import InfoPanel from '../../infoPanel.js';

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
