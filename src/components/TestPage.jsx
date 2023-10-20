import { notifyError, notifySuccess } from '../helpers/notification';
function TestPage() {
  const handleNotifyError = () => {
    notifyError('This is an error message.');
  };

  const handleNotifySuccess = () => {
    notifySuccess('This is a success message.');
  };
  return (
    <>
      <h1 className="text-3xl font-bold underline">Secure Online Auction System</h1>

      <div className="mt-4">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg mr-4"
          onClick={handleNotifyError}
        >
          Show Error
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
          onClick={handleNotifySuccess}
        >
          Show Success
        </button>
      </div>
    </>
  );
}

export default TestPage;
