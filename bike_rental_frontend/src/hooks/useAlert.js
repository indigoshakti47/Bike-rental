import { useDispatch } from 'react-redux';
import { setAlert } from '../actions/alerts';

export const useAlert = () => {
	const dispatch = useDispatch();
	return (message, type = 'success', time = 5000) => {
    dispatch(setAlert({ message, type }));
    setTimeout(() => {
      dispatch(setAlert(null));
    }, time);
  };
};
