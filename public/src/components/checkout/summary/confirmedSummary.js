import InfoPanel from '../../multipurpose/infoPanel.js';

const ConfirmedSummary = ({ id }) => {
  return (
    <InfoPanel title="Confirmation"
      contents={
        <div className="grid grid-cols-4 gap-x-2">
          <p className="text-white mr-1 text-right">Order #:</p>
          <p className="text-white col-span-3 self-end">{id.toUpperCase()}</p>
        </div>
      } />
  )
}

export default ConfirmedSummary;
