import { useFormikContext } from 'formik';
import React, { useEffect } from 'react'

const FormikFormObserver: React.FC<{callback: Function}> = ({ callback }) => {
    const { values } = useFormikContext();
    useEffect(() => callback(values), [values]);
    return null;
  };

export default FormikFormObserver