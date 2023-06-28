// component for the toast message when quiz is deleted
export default function DeleteQuizToast({
  isLoading,
  statusCode,
  errorMsg,
}: {
  isLoading: boolean;
  statusCode: number;
  errorMsg: string;
}) {
  return (
    <div className="toast toast-end">
      {/* toast for successful delete */}
      {statusCode === 200 && (
        <div className="alert alert-success">
          <span>Quiz is successfully deleted!</span>
        </div>
      )}

      {isLoading && (
        <div className="alert alert-warning flex ">
          <span>Deleting the quiz...</span>
          <span className="loading loading-infinity loading-md"></span>
        </div>
      )}

      {/* toast for error in deleting */}
      {statusCode !== 0 && statusCode !== 200 && (
        <div className="alert alert-error">
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
}
