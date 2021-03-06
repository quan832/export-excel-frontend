import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { Formik } from 'formik';
import { DatePickerAntd, FormGroup, InputAntd } from 'stylesheet/Input/Input.styled';
import { ButtonStyled } from 'stylesheet/Button/Button.styled';
import {
  CLINIC_OPTIONS,
  FORMAT_DATE,
  FORMAT_YEAR,
  GENDER_OPTIONS,
  typeModal
} from 'helper/constant';
import moment from 'moment';
import './ModalAntd.scss';
import SelectInput from 'components/SelectInput/SelectInput';

export default function ModalAntd({ onSubmit, isOpen, onCancel, type, data }) {
  const handleSubmit = () => {
    console.log('submit');
  };

  const initialValue = {
    name: '',
    date: moment(),
    clinic: '',
    gender: '',
    datePositive: moment().format(FORMAT_DATE),
    dateOfBirth: moment().format(FORMAT_YEAR),
    infectedFrom: '',
    fromNote: ''
  };

  const [initialValues, setValues] = React.useState(initialValue);

  useEffect(() => {
    if (type === typeModal.edit || (type === typeModal.view && data)) {
      const { dateOfBirth, gender, ...rest } = data;
      setValues({
        ...initialValues,
        dateOfBirth: dateOfBirth ? dateOfBirth : moment().format(FORMAT_YEAR),
        gender: gender,
        ...rest
      });
    }
  }, [data]);

  const onSetDateOfBirth = (value, index) => {
    setValues({ ...initialValues, dateOfBirth: value });
  };

  return (
    <Modal
      title="Basic Modal"
      visible={isOpen}
      onOk={() => onSubmit(initialValues)}
      onCancel={onCancel}
      width={800}>
      <Formik
        initialValues={{ name: '', date: moment(), clinic: '' }}
        onSubmit={async (values, { resetForm }) => {
          resetForm();
        }}
        //   validationSchema={Yup.object().shape({
        //       name: Yup.string(),
        //       date
        //   })}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleReset
          } = props;
          return (
            <form onSubmit={handleSubmit} className="form-modal">
              <div className="w-40 w-100 mb-14">
                <p className="fw-bold mb-2">H??? t??n</p>
                <InputAntd
                  id="name"
                  name="name"
                  placeholder="??i???n th??ng tin h??? t??n nh??n vi??n nhi???m COVID"
                  type="text"
                  value={initialValues.name}
                  onChange={(e) => setValues({ ...initialValues, name: e.target.value })}
                  onBlur={handleBlur}
                  className={errors.name && touched.name ? 'text-input error' : 'text-input'}
                  disabled={type === typeModal.view ? true : false}
                />
              </div>
              <div className="flex-x align-center mb-14 w-100">
                <div className="w-50 pr-15">
                  <p className="fw-bold mb-5">Gi???i t??nh</p>
                  <SelectInput
                    id="gender"
                    placeholder="Ch???n gi???i t??nh"
                    type="text"
                    value={initialValues.gender}
                    options={GENDER_OPTIONS}
                    onChange={(value, option) =>
                      setValues({ ...initialValues, gender: option.children })
                    }
                    onBlur={handleBlur}
                    className={errors.gender && touched.gender ? 'text-input error' : 'text-input'}
                    disabled={type === typeModal.view ? true : false}
                  />
                </div>
                <div className="w-50 ">
                  <p className="fw-bold mb-5">N??m sinh</p>
                  <DatePickerAntd
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    picker="year"
                    placeholder="Ch???n n??m sinh"
                    onChange={(date, dateString) => onSetDateOfBirth(dateString)}
                    onBlur={handleBlur}
                    value={moment(initialValues.dateOfBirth, FORMAT_YEAR)}
                    className={
                      errors.dateOfBirth && touched.dateOfBirth ? 'text-input error' : 'text-input'
                    }
                    format={FORMAT_YEAR}
                    disabled={type === typeModal.view ? true : false}
                    // defaultValue={moment(defaultDate, FOR)}
                  />
                </div>
              </div>
              <div className="w-100  mb-14">
                <p className="fw-bold mb-5">Khoa/ ph??ng</p>
                <SelectInput
                  id="clinic"
                  placeholder="Ch???n khoa/ ph??ng"
                  type="text"
                  value={initialValues.clinic}
                  options={CLINIC_OPTIONS}
                  onChange={(value, option) =>
                    setValues({ ...initialValues, clinic: option.children })
                  }
                  onBlur={handleBlur}
                  className={errors.clinic && touched.clinic ? 'text-input error' : 'text-input'}
                  disabled={type === typeModal.view ? true : false}
                />
              </div>
              <div className="w-100  mb-14">
                <p className="fw-bold mb-5">Ng??y XN d????ng t??nh </p>
                <InputAntd
                  id="datePositive"
                  placeholder="Ng??y x??c nh???n d????ng t??nh"
                  type="text"
                  value={initialValues.datePositive}
                  // onChange={(e) => setValues({ ...initialValues, clinic: e.currentTarget.value })}
                  // onBlur={handleBlur}
                  className={
                    errors.datePositive && touched.datePositive ? 'text-input error' : 'text-input'
                  }
                  disabled={true}
                />
              </div>
              <div className="w-100  mb-14">
                <p className="fw-bold mb-5">Ngu???n nghi nhi???m</p>
                <InputAntd
                  id="infectedFrom"
                  placeholder="??i???n th??ng tin ngu???n nghi nhi???m"
                  type="text"
                  value={initialValues.infectedFrom}
                  onChange={(e) => setValues({ ...initialValues, infectedFrom: e.target.value })}
                  onBlur={handleBlur}
                  className={errors.name && touched.name ? 'text-input error' : 'text-input'}
                  disabled={type === typeModal.view ? true : false}
                />
              </div>
              {type !== typeModal.add ? (
                <div className="w-100  mb-14">
                  <p className="fw-bold mb-5">Th??ng tin ??i???n t??? bi???u m???u</p>
                  <InputAntd
                    id="fromNote"
                    placeholder="Ghi ch?? t??? bi???u m???u"
                    type="text"
                    value={initialValues.fromNote}
                    // onChange={(e) => setValues({ ...initialValues, clinic: e.currentTarget.value })}
                    // onBlur={handleBlur}
                    className={
                      errors.fromNote && touched.fromNote ? 'text-input error' : 'text-input'
                    }
                    disabled={true}
                  />
                </div>
              ) : null}
            </form>
          );
        }}
      </Formik>
    </Modal>
  );
}
