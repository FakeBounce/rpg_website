import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useToastContext } from '../../contexts/toastContext';

const ErrorPrinter = ({ error }) => {
  const { notify } = useToastContext();

  useEffect(() => {
    if (error && error !== '' && error !== 'error.transfer.failed') {
      console.log('error', error);
      notify(error.toString(), 'error', {
        toastId: 'error',
      });
    }
  }, [error, notify]);

  return null;
};

const mapStateToProps = store => ({
  error: store.appState.error,
});

export default connect(mapStateToProps)(ErrorPrinter);
