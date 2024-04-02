
import { Controller, } from 'react-hook-form';
import Select from 'react-select';


export type SelectOptions = {
  label: string;
  value: string;
};

const SelectOptions = ({ name,
  control, label, options, placeholder = 'Select...' }: any) => {

  const customStyles = {
    control: (baseStyles: any, state: any) => ({
      ...baseStyles,
      borderColor: state.isFocused ? '#3cb7ed' : '#3d4d60',
      borderRadius: '10px',
      height: 'full',
      padding: '5px',
      backgroundColor: 'transparent',
      color: "black"
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#3cb7ed' : 'white',
      color: state.isSelected ? '#3d4d60' : 'black',
      '&:hover': {
        backgroundColor: '#2E3A47',
        color: 'white'
      }
    })
  };
  return (
    <div>
      <label className="mb-3 block text-black dark:text-white">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select
            {...field}
            styles={customStyles}
            options={options}
            placeholder={placeholder}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                neutral80: "#fff"
              },
            })}
          />
        )}
      />

    </div>
  );
};

export default SelectOptions;