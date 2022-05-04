// Import components
import Header from '../multipurpose/header.js';
import Update from './update.js';
import Orders from './orders.js';

const Profile = ({ history }) => {
  return (
    <div  className="flex items-center justify-center w-full h-full px-4 sm:px-12 py-10" >
      <div className="flex flex-col">
        <Header text="Your Account" />
        <div className="grid grid-cols-1 sm:grid-cols-2 ">
          <Update history={history} />
          <Orders history={history} />
        </div>
      </div>
    </div>
  )
}

export default Profile;
